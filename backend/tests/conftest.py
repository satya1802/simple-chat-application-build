"""Shared pytest fixtures for the FastAPI backend.

`app.database` falls back to a `./app.db` SQLite file so a bare `pip install`
can run the service with nothing else to stand up -- but that same file
persisting across test runs would let one test's rows leak into another's.
`db_session` and `client` below give each test its own isolated in-memory
database instead, so tests stay independent of each other and of whatever
`uvicorn --reload` left on disk.

Service credentials such as `OPENAI_API_KEY` are read at the point of use and
turned off cleanly when empty (see the architecture notes); tests exercising
that behaviour mock the client rather than calling the real API, and should
not rely on any key being set in this environment.
"""

from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app import models  # noqa: F401 -- registers tables on Base before create_all
from app.database import Base, get_db
from app.main import app


@pytest.fixture()
def db_session() -> Iterator[Session]:
    """A fresh, empty schema in its own in-memory SQLite database."""
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    testing_session_local = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)
    session = testing_session_local()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()


@pytest.fixture()
def client(db_session: Session) -> Iterator[TestClient]:
    """A `TestClient` wired to `db_session` instead of the app's own engine."""

    def _override_get_db() -> Iterator[Session]:
        yield db_session

    app.dependency_overrides[get_db] = _override_get_db
    try:
        yield TestClient(app)
    finally:
        app.dependency_overrides.pop(get_db, None)
