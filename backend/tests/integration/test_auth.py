"""Integration tests for `POST /auth/register` and `POST /auth/login`.

Runs the real FastAPI app against an in-memory SQLite database (shared across
connections via `StaticPool`) so each handler's database access is exercised
end to end, without touching the file-backed `app.db` the dev server uses.
"""

import jwt
import pytest
from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models import User
from app.security import JWT_ALGORITHM, JWT_SECRET, get_current_user

_engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
_TestingSessionLocal = sessionmaker(bind=_engine, autoflush=False, expire_on_commit=False)

# Module-level singleton, per ruff B008: a `Depends(...)` call belongs outside
# the parameter default, not inlined there.
_current_user_dependency = Depends(get_current_user)


@pytest.fixture(autouse=True)
def _fresh_database():
    Base.metadata.create_all(bind=_engine)
    yield
    Base.metadata.drop_all(bind=_engine)


def _override_get_db():
    db = _TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = _override_get_db

client = TestClient(app)


def test_ac002_register_creates_usable_account_immediately() -> None:
    response = client.post("/auth/register", json={"username": "alice", "password": "secret123"})

    assert response.status_code == 201
    body = response.json()
    assert "password" not in body
    assert "password_hash" not in body
    assert body["token_type"] == "bearer"
    assert body["access_token"]

    # Usable immediately: no separate approval step before login succeeds.
    login = client.post("/auth/login", json={"username": "alice", "password": "secret123"})
    assert login.status_code == 200
    assert login.json()["access_token"]


def test_ac003_duplicate_username_returns_409_and_creates_no_second_row() -> None:
    first = client.post("/auth/register", json={"username": "bob", "password": "secret123"})
    assert first.status_code == 201

    second = client.post("/auth/register", json={"username": "bob", "password": "otherpass"})

    assert second.status_code == 409
    detail = second.json()["detail"]
    assert "username" in str(detail).lower()

    db = _TestingSessionLocal()
    try:
        count = db.query(User).filter(User.username == "bob").count()
    finally:
        db.close()
    assert count == 1


def test_ac004_empty_username_returns_422_naming_field() -> None:
    response = client.post("/auth/register", json={"username": "", "password": "secret123"})

    assert response.status_code == 422
    fields = [tuple(e["loc"]) for e in response.json()["detail"]]
    assert any("username" in loc for loc in fields)


def test_ac004_empty_password_returns_422_naming_field() -> None:
    response = client.post("/auth/register", json={"username": "carol", "password": ""})

    assert response.status_code == 422
    fields = [tuple(e["loc"]) for e in response.json()["detail"]]
    assert any("password" in loc for loc in fields)

    db = _TestingSessionLocal()
    try:
        count = db.query(User).filter(User.username == "carol").count()
    finally:
        db.close()
    assert count == 0


def test_ac005_registration_response_never_contains_plain_password() -> None:
    response = client.post("/auth/register", json={"username": "dave", "password": "secret123"})

    assert "secret123" not in response.text


def test_ac006_two_users_same_password_get_different_hashes() -> None:
    client.post("/auth/register", json={"username": "erin", "password": "samepassword"})
    client.post("/auth/register", json={"username": "frank", "password": "samepassword"})

    db = _TestingSessionLocal()
    try:
        erin = db.query(User).filter(User.username == "erin").first()
        frank = db.query(User).filter(User.username == "frank").first()
    finally:
        db.close()

    assert erin.password_hash != frank.password_hash
    assert "samepassword" not in erin.password_hash


def test_ac007_ac008_login_returns_pyjwt_token_with_identity_and_expiry() -> None:
    client.post("/auth/register", json={"username": "grace", "password": "secret123"})

    response = client.post("/auth/login", json={"username": "grace", "password": "secret123"})

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"

    payload = jwt.decode(body["access_token"], JWT_SECRET, algorithms=[JWT_ALGORITHM])
    assert payload["username"] == "grace"
    assert "exp" in payload


def test_ac009_unknown_username_returns_generic_401() -> None:
    response = client.post("/auth/login", json={"username": "nobody", "password": "whatever"})

    assert response.status_code == 401
    assert "access_token" not in response.json()


def test_ac009_wrong_password_returns_same_generic_401() -> None:
    client.post("/auth/register", json={"username": "hank", "password": "correct-password"})

    unknown = client.post("/auth/login", json={"username": "nosuchuser", "password": "whatever"})
    wrong = client.post("/auth/login", json={"username": "hank", "password": "wrong-password"})

    assert unknown.status_code == 401
    assert wrong.status_code == 401
    assert unknown.json()["detail"] == wrong.json()["detail"]


def test_bearer_protected_dependency_rejects_tampered_token() -> None:
    probe = FastAPI()

    @probe.get("/probe")
    def _probe(user=_current_user_dependency):
        return {"id": str(user.id)}

    probe_client = TestClient(probe)

    no_token = probe_client.get("/probe")
    assert no_token.status_code == 401

    malformed = probe_client.get("/probe", headers={"Authorization": "Bearer not-a-jwt"})
    assert malformed.status_code == 401
