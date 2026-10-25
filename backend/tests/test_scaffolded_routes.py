"""Confirms the generated stub routes start, validate their request shape and
appear in the OpenAPI document -- the same contract `test_health.py` applies
to `/health`, extended to the routers this scaffold added so a typo in a path
or a schema import breaks here, not on a development agent's first real
request.

The auth routes themselves now have real behaviour (see
`tests/integration/test_auth.py` and `tests/test_security.py`); this module
keeps only the route-registration check for auth and the stub round trip for
the still-unimplemented conversation endpoints.
"""

import uuid

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_auth_routes_are_registered() -> None:
    paths = client.get("/openapi.json").json()["paths"]
    assert "/auth/register" in paths
    assert "/auth/login" in paths


def test_conversation_routes_are_registered() -> None:
    paths = client.get("/openapi.json").json()["paths"]
    for path in (
        "/conversations",
        "/conversations/{conversation_id}/messages",
        "/conversations/{conversation_id}",
    ):
        assert path in paths


def test_conversation_stub_round_trip() -> None:
    listed = client.get("/conversations")
    assert listed.status_code == 200

    created = client.post("/conversations", json={})
    assert created.status_code == 200

    conversation_id = uuid.uuid4()
    messages = client.get(f"/conversations/{conversation_id}/messages")
    assert messages.status_code == 200

    sent = client.post(f"/conversations/{conversation_id}/messages", json={"content": "hi"})
    assert sent.status_code == 200

    deleted = client.delete(f"/conversations/{conversation_id}")
    assert deleted.status_code == 204
