<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted
Date: 2026-10-16

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django REST Framework
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because FastAPI handles the small auth and chat API, sits directly on OpenAI's official Python library so the model call is a few lines, and validates requests with Pydantic. JWT auth dependencies guard every chat endpoint.

## Consequences

A stateless JWT approach means no server-side session store or token revocation, acceptable at demo scope per the confirmed assumptions.
<!-- sdlc:auto:end adr -->