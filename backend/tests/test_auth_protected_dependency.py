"""The shared `get_current_user` dependency must reject missing, malformed,
tampered and expired tokens with 401, performing no read or write.

The conversation endpoints are still unimplemented stubs in this sprint (see
`app/routers/conversations.py`) and are not yet wired to this dependency, so
a small throwaway probe route exercises it directly instead -- the same
pattern `tests/integration/test_auth.py` uses.
"""

import uuid
from datetime import timedelta

from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

from app.security import create_access_token, get_current_user

_probe_app = FastAPI()
_current_user_dependency = Depends(get_current_user)


@_probe_app.get("/probe")
def _probe(user=_current_user_dependency):
    return {"id": str(user.id)}


probe_client = TestClient(_probe_app)


def test_missing_token_returns_401() -> None:
    response = probe_client.get("/probe")
    assert response.status_code == 401


def test_malformed_token_returns_401() -> None:
    response = probe_client.get("/probe", headers={"Authorization": "Bearer not-a-jwt"})
    assert response.status_code == 401


def test_tampered_token_returns_401() -> None:
    token = create_access_token(uuid.uuid4(), "judy")
    tampered = token[:-1] + ("A" if token[-1] != "A" else "B")

    response = probe_client.get("/probe", headers={"Authorization": f"Bearer {tampered}"})

    assert response.status_code == 401


def test_expired_token_returns_401() -> None:
    expired_token = create_access_token(
        uuid.uuid4(), "kevin", expires_delta=timedelta(seconds=-1)
    )

    response = probe_client.get("/probe", headers={"Authorization": f"Bearer {expired_token}"})

    assert response.status_code == 401
