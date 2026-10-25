"""Password storage properties: AC-005, AC-006.

The plaintext password must never be recoverable from the stored row or from
any API response body, the stored value must be a bcrypt hash, and two users
who pick the same password must not end up with the same hash (per-user salt).
"""

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import User


def test_ac005_stored_value_is_a_bcrypt_hash_and_plaintext_appears_nowhere(
    client: TestClient, db_session: Session
) -> None:
    password = "super-secret-plaintext-9"
    response = client.post(
        "/auth/register", json={"username": "dana", "password": password}
    )
    assert response.status_code in (200, 201)

    row = db_session.query(User).filter_by(username="dana").one()
    assert row.password_hash.startswith("$2")
    assert password not in row.password_hash

    assert password not in response.text

    login = client.post("/auth/login", json={"username": "dana", "password": password})
    assert password not in login.text


def test_ac006_two_users_with_identical_passwords_get_different_hashes(
    client: TestClient, db_session: Session
) -> None:
    shared_password = "same-password-for-both-1"
    client.post("/auth/register", json={"username": "erin", "password": shared_password})
    client.post("/auth/register", json={"username": "frank", "password": shared_password})

    erin = db_session.query(User).filter_by(username="erin").one()
    frank = db_session.query(User).filter_by(username="frank").one()

    assert erin.password_hash != frank.password_hash
