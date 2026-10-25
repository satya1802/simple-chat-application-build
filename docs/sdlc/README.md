# Simple Chat Application - Build — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Simple Chat Application - Build Prompt Build a simple full-stack chat application with username and password login.  Show only the Login page before authentication.  After successful login, show the Chat Dashboard with sidebar, chat history, message input, Send button, and Logout.  Store users and chat history in PostgreSQL.  Chat history must persist after refresh and re-login.  Hash passwords securely using bcrypt.  Logout should return the user to the Login page.  Use React + TypeScript for frontend and FastAPI (Python) for backend.  Keep the UI simple, clean, and responsive.

**Documentation version:** v7
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 12 entries |
| [Development](development/README.md) | 16 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 4 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 68 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 22 requirements |
| [Changelog](CHANGELOG.md) | 7 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Architecture

- Deployment nodes are a design, not a confirmed provisioned environment -- no deployment phase input exists yet confirming any of this has actually been stood up on AWS.

### Development

- Input does not state which backlog items/tasks are explicitly assigned to each sprint -- sprint-to-story mapping below is inferred only loosely from epic order and sprint goal wording, not confirmed by the input.
- Exact item list for this sprint is not explicitly given; inferred from goal text matching story titles.
- Exact item list for this sprint is not explicitly given; inferred from goal text.
- No development run entry reports status for any item in this sprint.
- Discrepancy: run status is labeled 'completed' but only 5 of 22 planned stories (22.7%) have reported ticket/commit evidence -- unclear whether 'completed' refers to the whole plan or only to Sprint 1.
- US-001, US-002, and US-003 share the same commit hash, and US-004 and US-006 share a second commit hash -- input does not clarify whether these are legitimately combined commits or a reporting duplication; flagging for confirmation.
- No test or QA confirmation provided for this ticket in the input.
- Input marks the story delivered but does not separately confirm the QA task (test per-user salting and response safety) was executed or passed.
- No ticket status or commit evidence exists for any of these 17 stories despite the run being reported 'completed' -- build/delivery status for the Chat Dashboard, AI reply loop, conversation persistence, cross-user security, responsive layout, and setup documentation is currently undocumented.
- US-005 in particular is thematically part of the auth-gating work delivered alongside US-004/US-006 but was not included in the delivered ticket list -- confirm whether it was actually completed or missed in reporting.
<!-- sdlc:auto:end open-gaps -->
