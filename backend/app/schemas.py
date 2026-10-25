"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented. The request models
are real -- they give the generated stub routes the validation FastAPI
derives from a typed body (a missing field is already a 422) -- but the
response bodies stay `StubResponse` until the development sprint implements
each handler and swaps it for the real one.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."


# ---------------------------------------------------------------------------
# users / auth -- POST /auth/register, POST /auth/login
# ---------------------------------------------------------------------------


class RegisterRequest(BaseModel):
    username: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------------------------------------------------------------------------
# conversations -- GET/POST /conversations, DELETE /conversations/{id}
# ---------------------------------------------------------------------------


class ConversationCreateRequest(BaseModel):
    """Empty today -- the title is derived from the first message, per the
    API spec -- but kept as its own model so a field can be added later
    without changing the route signature."""

    model_config = ConfigDict(extra="ignore")


class ConversationSummary(BaseModel):
    id: uuid.UUID
    title: str
    updated_at: datetime


class ConversationCreated(BaseModel):
    id: uuid.UUID
    title: str
    created_at: datetime


# ---------------------------------------------------------------------------
# messages -- GET/POST /conversations/{id}/messages
# ---------------------------------------------------------------------------


class MessageCreateRequest(BaseModel):
    content: str


class MessageOut(BaseModel):
    id: uuid.UUID
    role: str
    content: str
    created_at: datetime


class MessageExchange(BaseModel):
    """What a successful `POST /conversations/{id}/messages` returns: the
    persisted user message and the assistant's reply, both already saved."""

    user_message: MessageOut
    assistant_message: MessageOut
