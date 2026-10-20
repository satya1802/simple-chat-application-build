"""Pydantic request and response models.

One pair per entity in the approved data model, matching the shapes the
approved API spec declares, plus the placeholder every generated route
returns until it has been implemented. Defining these here -- rather than
inline in a router -- gives every ticket that implements an endpoint an
agreed shape to import instead of inventing its own.
"""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


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
# auth: POST /auth/register, POST /auth/login
# ---------------------------------------------------------------------------


class UserCredentials(BaseModel):
    """Body of both `/auth/register` and `/auth/login`."""

    username: str = Field(min_length=1, max_length=50)
    password: str = Field(min_length=1)


class Token(BaseModel):
    """What a successful register or login returns."""

    access_token: str
    token_type: str = "bearer"


# ---------------------------------------------------------------------------
# conversations: GET/POST /conversations, DELETE /conversations/{id}
# ---------------------------------------------------------------------------


class ConversationSummary(BaseModel):
    """One row of `GET /conversations`."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    updated_at: datetime


class ConversationCreated(BaseModel):
    """What `POST /conversations` returns -- an empty conversation; its title
    is derived once the first message arrives.
    """

    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    created_at: datetime


# ---------------------------------------------------------------------------
# messages: GET/POST /conversations/{id}/messages
# ---------------------------------------------------------------------------


class MessageOut(BaseModel):
    """One row of `GET /conversations/{id}/messages`, and each half of what
    `POST /conversations/{id}/messages` returns.
    """

    model_config = ConfigDict(from_attributes=True)

    id: str
    role: str
    content: str
    created_at: datetime


class MessageCreate(BaseModel):
    """Body of `POST /conversations/{id}/messages`."""

    content: str = Field(min_length=1)


class MessageExchange(BaseModel):
    """What `POST /conversations/{id}/messages` returns: the persisted user
    message and the assistant's reply, generated from prior context.
    """

    user_message: MessageOut
    assistant_message: MessageOut
