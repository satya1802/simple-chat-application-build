<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted
Date: 2026-10-16

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Render
- Fly.io

## Decision Outcome

Chosen option: AWS, because One AWS account runs the FastAPI service, serves the static React build and hosts PostgreSQL via RDS, with the OpenAI key held as a server-side secret. At demo volume this stays at the small end of AWS pricing.

## Consequences

AWS has more setup overhead than a single PaaS, but keeps all three concerns and the secret in one managed place.
<!-- sdlc:auto:end adr -->