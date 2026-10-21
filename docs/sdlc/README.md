# Simple Chat Application - Build — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Simple Chat Application - Build Prompt Build a simple full-stack chat application with username and password login.  Show only the Login page before authentication.  After successful login, show the Chat Dashboard with sidebar, chat history, message input, Send button, and Logout.  Store users and chat history in PostgreSQL.  Chat history must persist after refresh and re-login.  Hash passwords securely using bcrypt.  Logout should return the user to the Login page.  Use React + TypeScript for frontend and FastAPI (Python) for backend.  Keep the UI simple, clean, and responsive.

**Documentation version:** v5
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 12 entries |
| [Development](development/README.md) | 15 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 4 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 22 requirements |
| [Changelog](CHANGELOG.md) | 5 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Architecture

- Deployment nodes are a design, not a confirmed provisioned environment -- no deployment phase input exists yet confirming any of this has actually been stood up on AWS.

### Development

- Input does not explicitly state which backlog items belong to which sprint -- the sprint-to-epic correspondence below is inferred from matching goal wording to epic titles, not given as an explicit mapping.
- Explicit item list for this sprint was not provided; mapping to US-001..US-006 is inferred.
- Explicit item list for this sprint was not provided; mapping is inferred and partial.
- Explicit item list for this sprint was not provided; mapping is inferred.
- Overall run status is 'failed' with no stated reason provided in the input.
- 17 of 22 planned stories (including all of EPIC-002, EPIC-003, EPIC-004) have no run record at all -- unclear if they were never attempted or simply not reported.
- Two critical-path stories were skipped outright: US-002 (bcrypt password hashing) and US-003 (login/JWT issuance) -- these are prerequisites for nearly every other story, so their skip likely blocks downstream work.
- No commit hashes exist for any ticket, so no implementation can be verified against the approved plan or architecture.
- Not yet implemented; no commit or completion evidence.
- Skipped with no stated reason; this is a critical security requirement (bcrypt hashing) and remains unimplemented.
- Reason for skip not provided -- cannot be inferred.
- Skipped with no stated reason; this is a critical story (login/JWT issuance) and remains unimplemented.
- Skipped with no stated reason; remains unimplemented.
<!-- sdlc:auto:end open-gaps -->
