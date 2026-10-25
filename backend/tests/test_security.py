"""Unit tests for password hashing, JWT issuance and `get_current_user`.

No database and no running app here -- `test_auth.py` under `integration/`
covers the endpoints; this module covers the primitives they are built on.
"""

import uuid
from datetime import datetime, timedelta, timezone

import jwt
import pytest
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.security import (
    JWT_ALGORITHM,
    JWT_SECRET,
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)


def _bearer(token: str) -> HTTPAuthorizationCredentials:
    return HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)


def test_ac006_identical_passwords_get_different_hashes() -> None:
    first = hash_password("secret123")
    second = hash_password("secret123")

    assert first != second
    assert verify_password("secret123", first)
    assert verify_password("secret123", second)


def test_hash_password_rejects_wrong_password_on_verify() -> None:
    hashed = hash_password("secret123")

    assert verify_password("not-the-password", hashed) is False


def test_ac007_ac008_token_carries_identity_claim_and_expiry() -> None:
    user_id = uuid.uuid4()
    token = create_access_token(user_id, "alice")

    payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

    assert payload["sub"] == str(user_id)
    assert payload["username"] == "alice"
    assert "exp" in payload


def test_get_current_user_rejects_missing_token() -> None:
    with pytest.raises(HTTPException) as excinfo:
        get_current_user(credentials=None)

    assert excinfo.value.status_code == 401


def test_get_current_user_rejects_malformed_token() -> None:
    with pytest.raises(HTTPException) as excinfo:
        get_current_user(credentials=_bearer("not-a-jwt"))

    assert excinfo.value.status_code == 401


def test_get_current_user_rejects_tampered_token() -> None:
    token = create_access_token(uuid.uuid4(), "alice")
    tampered = token[:-1] + ("a" if token[-1] != "a" else "b")

    with pytest.raises(HTTPException) as excinfo:
        get_current_user(credentials=_bearer(tampered))

    assert excinfo.value.status_code == 401


def test_get_current_user_rejects_expired_token() -> None:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(uuid.uuid4()),
        "username": "alice",
        "iat": now - timedelta(hours=2),
        "exp": now - timedelta(hours=1),
    }
    expired = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    with pytest.raises(HTTPException) as excinfo:
        get_current_user(credentials=_bearer(expired))

    assert excinfo.value.status_code == 401


def test_get_current_user_accepts_valid_token() -> None:
    user_id = uuid.uuid4()
    token = create_access_token(user_id, "alice")

    current = get_current_user(credentials=_bearer(token))

    assert current.id == user_id
    assert current.username == "alice"
