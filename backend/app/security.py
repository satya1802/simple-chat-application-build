"""Password hashing, JWT issuance and the `get_current_user` dependency.

Hashing uses bcrypt directly (not passlib, which the architecture did not
approve). JWTs are signed with PyJWT using a symmetric secret read from the
environment, with a development-only fallback so the scaffold still runs
with nothing configured -- never hard-code a value meant for production.
"""

import os
import uuid
from datetime import UTC, datetime, timedelta

import bcrypt
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRES_MINUTES = int(os.getenv("JWT_EXPIRES_MINUTES", "60"))

_bearer_scheme = HTTPBearer(auto_error=False)

_CREDENTIALS_ERROR = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={"code": "invalid_token", "message": "Could not validate credentials."},
    headers={"WWW-Authenticate": "Bearer"},
)


def hash_password(password: str) -> str:
    """Bcrypt-hash a plain-text password with a fresh random salt per call."""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    """True if `password` matches the stored bcrypt hash; never raises."""
    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    except (ValueError, TypeError):
        return False


def create_access_token(
    user_id: uuid.UUID, username: str, expires_delta: timedelta | None = None
) -> str:
    """A PyJWT-encoded access token carrying the user's identity and an expiry.

    `expires_delta` lets a caller (tests, mainly) mint an already-expired
    token; it defaults to `JWT_EXPIRES_MINUTES` for every real caller.
    """
    now = datetime.now(UTC)
    payload = {
        "sub": str(user_id),
        "username": username,
        "iat": now,
        "exp": now + (expires_delta if expires_delta is not None else timedelta(
            minutes=JWT_EXPIRES_MINUTES
        )),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


class CurrentUser:
    """The identity decoded from a verified access token. Carries no session
    state and triggers no database read -- callers that need the full user
    row look it up themselves, scoped to this id."""

    def __init__(self, id: uuid.UUID, username: str) -> None:
        self.id = id
        self.username = username


# Module-level singleton per ruff B008: a `Depends(...)` call does not belong
# in a parameter default, it belongs assigned once here.
_bearer_dependency = Depends(_bearer_scheme)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = _bearer_dependency,
) -> CurrentUser:
    """FastAPI dependency: 401 on missing, malformed, tampered or expired
    bearer tokens. Performs no read or write -- just decodes the claims."""
    if credentials is None or not credentials.credentials:
        raise _CREDENTIALS_ERROR

    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise _CREDENTIALS_ERROR from None

    subject = payload.get("sub")
    username = payload.get("username")
    if not subject or not username:
        raise _CREDENTIALS_ERROR

    try:
        user_id = uuid.UUID(str(subject))
    except ValueError:
        raise _CREDENTIALS_ERROR from None

    return CurrentUser(id=user_id, username=username)
