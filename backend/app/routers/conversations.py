"""Conversation and message endpoints.

Generated as stubs from the approved API spec: every route the architecture
assigned to this component exists here with its agreed request shape, so the
OpenAPI document is complete and the frontend can be built against it before
a single handler holds real behaviour. JWT validation, per-user ownership
checks, persistence and the OpenAI call are the development sprint's work --
this module only reserves the path, the method and the body shape.
"""

import uuid

from fastapi import APIRouter, Response, status

from app.schemas import ConversationCreateRequest, MessageCreateRequest, StubResponse

router = APIRouter(prefix="/conversations", tags=["conversations"])


@router.get("", response_model=StubResponse)
async def list_conversations() -> StubResponse:
    return StubResponse(endpoint="GET /conversations")


@router.post("", response_model=StubResponse)
async def create_conversation(payload: ConversationCreateRequest) -> StubResponse:
    return StubResponse(endpoint="POST /conversations")


@router.get("/{conversation_id}/messages", response_model=StubResponse)
async def list_messages(conversation_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="GET /conversations/{id}/messages")


@router.post("/{conversation_id}/messages", response_model=StubResponse)
async def send_message(conversation_id: uuid.UUID, payload: MessageCreateRequest) -> StubResponse:
    return StubResponse(endpoint="POST /conversations/{id}/messages")


@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(conversation_id: uuid.UUID) -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)
