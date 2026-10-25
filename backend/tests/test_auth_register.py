"""Registration: AC-002, AC-003, AC-004.

Against the approved spec (`docs/sdlc/architecture/api/openapi.yaml`):
`POST /auth/register` returns `{access_token, token_type}` on success, 409 if
the username is taken, 422 if a field is missing/empty.
"""

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import User


def _register(client: TestClient, username: str, password: str):
    return client.post("/auth/register", json={"username": username, "password": password})


def test_ac002_registering_an_unused_username_creates_one_row_and_can_log_in(
    client: TestClient, db_session: Session
) -> None:
    response = _register(client, "alice", "correct-horse-1")

    assert response.status_code in (200, 201)
    assert db_session.query(User).count() == 1
    row = db_session.query(User).filter_by(username="alice").one()
    assert row.username == "alice"

    login = client.post("/auth/login", json={"username": "alice", "password": "correct-horse-1"})
    assert login.status_code == 200
    body = login.json()
    assert "access_token" in body
    assert body["access_token"]


def test_ac003_registering_an_existing_username_is_rejected_and_row_count_unchanged(
    client: TestClient, db_session: Session
) -> None:
    first = _register(client, "bob", "first-password-1")
    assert first.status_code in (200, 201)
    assert db_session.query(User).count() == 1

    second = _register(client, "bob", "a-different-password-2")

    assert second.status_code == 409
    assert "bob" in second.text
    assert db_session.query(User).count() == 1


def test_ac004_registering_with_empty_username_is_rejected_and_creates_no_row(
    client: TestClient, db_session: Session
) -> None:
    response = _register(client, "", "some-password-1")

    assert response.status_code in (400, 422)
    assert db_session.query(User).count() == 0


def test_ac004_registering_with_empty_password_is_rejected_and_creates_no_row(
    client: TestClient, db_session: Session
) -> None:
    response = _register(client, "charlie", "")

    assert response.status_code in (400, 422)
    assert db_session.query(User).count() == 0
