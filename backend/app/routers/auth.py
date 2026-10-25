"""Auth endpoints: self-registration and login.

Generated as stubs from the approved API spec. `POST /auth/register` and
`POST /auth/login` already validate their request body against the agreed
shape -- a missing `username` or `password` is a 422 before this module's
code ever runs -- and return a typed placeholder. The development sprint
replaces each body with the real bcrypt hashing, the uniqueness check and the
JWT issuance; no behaviour beyond FastAPI's own validation lives here yet.
"""

from fastapi import APIRouter

from app.schemas import LoginRequest, RegisterRequest, StubResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=StubResponse)
async def register(payload: RegisterRequest) -> StubResponse:
    return StubResponse(endpoint="POST /auth/register")


@router.post("/login", response_model=StubResponse)
async def login(payload: LoginRequest) -> StubResponse:
    return StubResponse(endpoint="POST /auth/login")
