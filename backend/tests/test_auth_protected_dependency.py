"""The shared dependency guarding `security: [bearerAuth]` routes must reject
missing, malformed, tampered and expired tokens with 401.

`GET /conversations` is the simplest bearer-protected route in the spec and is
used here as the probe; the behaviour under test is the dependency, not this
particular endpoint.
"""

from datetime import timedelta

from fastapi.testclient import TestClient


def _get_valid_token(client: TestClient, username: str) -> str:
    client.post("/auth/register", json={"username": username, "password": "a-strong-password-1"})
    login = client.post(
        "/auth/login", json={"username": username, "password": "a-strong-password-1"}
    )
    return login.json()["access_token"]


def test_missing_token_returns_401(client: TestClient) -> None:
    response = client.get("/conversations")
    assert response.status_code == 401


def test_malformed_token_returns_401(client: TestClient) -> None:
    response = client.get("/conversations", headers={"Authorization": "Bearer not-a-jwt"})
    assert response.status_code == 401


def test_tampered_token_returns_401(client: TestClient) -> None:
    token = _get_valid_token(client, "judy")
    tampered = token[:-1] + ("A" if token[-1] != "A" else "B")

    response = client.get("/conversations", headers={"Authorization": f"Bearer {tampered}"})

    assert response.status_code == 401


def test_expired_token_returns_401(client: TestClient) -> None:
    security = __import__("app.security", fromlist=["create_access_token"])
    _get_valid_token(client, "kevin")

    expired_token = security.create_access_token(
        {"sub": "kevin"}, expires_delta=timedelta(seconds=-1)
    )

    response = client.get(
        "/conversations", headers={"Authorization": f"Bearer {expired_token}"}
    )

    assert response.status_code == 401
