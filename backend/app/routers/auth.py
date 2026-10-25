"""Auth endpoints: self-registration and login.

`POST /auth/register` creates the account immediately usable -- no
invitation or approval step -- and rejects a taken username with 409 and an
empty field with 422 (FastAPI/pydantic validation). `POST /auth/login`
verifies the submitted password against the stored bcrypt hash and, on
success, returns a PyJWT access token. A wrong password and an unknown
username return the identical 401 so neither reveals the other.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import LoginRequest, RegisterRequest, TokenResponse
from app.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

_INVALID_CREDENTIALS = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={"code": "invalid_credentials", "message": "Incorrect username or password."},
)


def _username_taken_error(username: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail={
            "code": "username_taken",
            "message": f"The username '{username}' is already taken.",
            "username": username,
        },
    )


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db),  # noqa: B008
) -> TokenResponse:
    existing = db.query(User).filter(User.username == payload.username).first()
    if existing is not None:
        raise _username_taken_error(payload.username)

    user = User(username=payload.username, password_hash=hash_password(payload.password))
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        # Race with a concurrent registration of the same username: the
        # uniqueness constraint catches it even though our own check above
        # did not.
        db.rollback()
        raise _username_taken_error(payload.username) from None
    db.refresh(user)

    token = create_access_token(user.id, user.username)
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),  # noqa: B008
) -> TokenResponse:
    user = db.query(User).filter(User.username == payload.username).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise _INVALID_CREDENTIALS

    token = create_access_token(user.id, user.username)
    return TokenResponse(access_token=token)
