"""Login: AC-007, AC-009.

`POST /auth/login` verifies the submitted password against the stored bcrypt
hash and returns a decodable JWT on success; a wrong password and an unknown
username must be indistinguishable to the caller, per the API spec's "single
generic error ... that does not reveal whether the username exists".
"""

import jwt
from fastapi.testclient import TestClient


def test_ac007_correct_password_returns_a_decodable_jwt(client: TestClient) -> None:
    client.post("/auth/register", json={"username": "gina", "password": "right-password-1"})

    response = client.post("/auth/login", json={"username": "gina", "password": "right-password-1"})

    assert response.status_code == 200
    body = response.json()
    assert body.get("token_type", "bearer").lower() == "bearer"
    token = body["access_token"]

    # Decoded without verifying the signature: this only proves the response is
    # a well-formed JWT, not that it was signed with any particular secret.
    claims = jwt.decode(token, options={"verify_signature": False})
    assert claims


def test_ac007_wrong_password_returns_401(client: TestClient) -> None:
    client.post("/auth/register", json={"username": "harry", "password": "right-password-2"})

    response = client.post("/auth/login", json={"username": "harry", "password": "wrong-password"})

    assert response.status_code == 401


def test_ac009_unknown_username_and_wrong_password_give_identical_responses(
    client: TestClient,
) -> None:
    client.post("/auth/register", json={"username": "ivy", "password": "right-password-3"})

    unknown_user = client.post(
        "/auth/login", json={"username": "no-such-user", "password": "whatever-1"}
    )
    wrong_password = client.post(
        "/auth/login", json={"username": "ivy", "password": "wrong-password-3"}
    )

    assert unknown_user.status_code == wrong_password.status_code == 401
    assert unknown_user.json() == wrong_password.json()
