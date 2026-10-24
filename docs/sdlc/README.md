# Simple Chat Application - Build — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Simple Chat Application - Build Prompt Build a simple full-stack chat application with username and password login.  Show only the Login page before authentication.  After successful login, show the Chat Dashboard with sidebar, chat history, message input, Send button, and Logout.  Store users and chat history in PostgreSQL.  Chat history must persist after refresh and re-login.  Hash passwords securely using bcrypt.  Logout should return the user to the Login page.  Use React + TypeScript for frontend and FastAPI (Python) for backend.  Keep the UI simple, clean, and responsive.

**Documentation version:** v6
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 12 entries |
| [Development](development/README.md) | 11 entries |
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
| [Test cases](testing/test-cases.md) | 117 test cases |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 22 requirements |
| [Changelog](CHANGELOG.md) | 6 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Architecture

- Deployment nodes are a design, not a confirmed provisioned environment -- no deployment phase input exists yet confirming any of this has actually been stood up on AWS.

### Development

- Sprints 1, 2 and 3 each commit more points than their stated 20-point capacity (21, 24, 22 respectively) — see individual sprint entries for the discrepancy.
- Committed points (21) exceed stated sprint capacity (20) by 1 — not flagged as resolved in the input.
- Only 5 of this sprint's 6 stories (missing US-005) appear in the development run status; see DEVRUN-SPRINT1.
- Committed points (24) exceed stated sprint capacity (20) by 4.
- No development run data exists for any Sprint 2 story; build status is entirely undocumented.
- Committed points (22) exceed stated sprint capacity (20) by 2.
- No development run data exists for any Sprint 3 story; build status is entirely undocumented.
- No development run data exists for any Sprint 4 story; build status is entirely undocumented.
- No root-cause or error detail was provided for the overall 'failed' run status.
- US-005 (Chat endpoints reject unauthenticated requests) is in Sprint 1/EPIC-001 scope but is absent from the run output — unclear if it was attempted.
- Tickets marked 'planned' (US-001, US-004) have no commit, so it is unconfirmed whether any implementation work exists beyond planning.
- Reason for skipping US-002, US-003, US-006 is not stated.
- No commit or code artifact exists for this ticket; actual implementation progress beyond 'planned' is unknown.
- No reason given for skipping this security-critical ticket.
- Password hashing is a stated core requirement (bcrypt) and remains unimplemented per this run.
- No reason given for skipping.
- Login is foundational to the whole application; its absence blocks all downstream authenticated functionality.
- No commit or code artifact exists; implementation progress beyond 'planned' is unknown.
<!-- sdlc:auto:end open-gaps -->
