"""SQLAlchemy models.

One class per entity in the approved data model: users, conversations and
messages. Primary and foreign keys are UUIDs stored as 36-character strings
rather than the Postgres-only `UUID` column type, so the same model definitions
work unchanged against both the SQLite fallback this scaffold boots with and
the PostgreSQL 16 the architecture names -- only `DATABASE_URL` has to change.

`Base` is already bound to the engine in `app.database`; `main.py` imports this
module before it creates the schema, so these tables register automatically.
"""

import uuid
from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, Index, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


def _new_uuid() -> str:
    return str(uuid.uuid4())


def _utcnow() -> datetime:
    return datetime.now(UTC)


class User(Base):
    """A registered account. Usernames are unique; passwords are never
    stored -- only the bcrypt hash the auth feature computes at register time.
    """

    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("username", name="uq_users_username"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    username: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, nullable=False
    )

    conversations: Mapped[list["Conversation"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )


class Conversation(Base):
    """A thread of messages owned by exactly one user."""

    __tablename__ = "conversations"
    __table_args__ = (
        # The sidebar lists a user's own conversations ordered by recency, so
        # this composite index covers that query directly.
        Index("ix_conversations_user_updated", "user_id", "updated_at"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    title: Mapped[str] = mapped_column(String(120), nullable=False, default="New conversation")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow, nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="conversations")
    messages: Mapped[list["Message"]] = relationship(
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="Message.created_at",
    )


class Message(Base):
    """One turn in a conversation -- `role` is "user", "assistant" or a
    feature-defined variant such as an inline error marker.
    """

    __tablename__ = "messages"
    __table_args__ = (
        # Replaying a conversation filters by conversation_id and orders by
        # created_at; this composite index turns that into a single index scan.
        Index("ix_messages_conversation_created", "conversation_id", "created_at"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    conversation_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False
    )
    role: Mapped[str] = mapped_column(String(16), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, nullable=False
    )

    conversation: Mapped["Conversation"] = relationship(back_populates="messages")


__all__ = ["Base", "User", "Conversation", "Message"]
