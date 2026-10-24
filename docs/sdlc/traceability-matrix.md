# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Create an account by self-registration | US-001, US-001-T1, US-001-T2, US-001-T3, US-001-T4 | 1 | POST /auth/register, backend, database, frontend, users | — | — | planned | not run | 4/4 tested · 0/4 passing | — |
| US-002 | EPIC-001 | Passwords stored hashed with bcrypt | US-002, US-002-T1, US-002-T2, US-002-T3 | 1 | POST /auth/login, POST /auth/register, backend, database, users | — | — | skipped | not run | 3/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Log in with username and password | US-003, US-003-T1, US-003-T2, US-003-T3, US-003-T4 | 1 | POST /auth/login, backend, database, frontend, users | — | — | skipped | not run | 3/3 tested · 0/3 passing | — |
| US-004 | EPIC-001 | Only the Login page is reachable before authentication | US-004, US-004-T1, US-004-T2, US-004-T3 | 1 | frontend | — | — | planned | not run | 2/2 tested · 0/2 passing | — |
| US-005 | EPIC-001 | Chat endpoints reject unauthenticated requests | US-005, US-005-T1, US-005-T2, US-005-T3 | 2 | DELETE /conversations/{id}, GET /conversations, GET /conversations/{id}/messages, POST /conversations, POST /conversations/{id}/messages, backend, conversations, messages, users | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-006 | EPIC-001 | Log out and return to the Login page | US-006, US-006-T1, US-006-T2 | 1 | frontend | — | — | skipped | not run | 2/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Land on the Chat Dashboard after login | US-007, US-007-T1, US-007-T2, US-007-T3 | 2 | GET /conversations, backend, conversations, frontend | — | — | not started | not run | 2/2 tested · 0/2 passing | — |
| US-008 | EPIC-002 | Send a message and receive an AI reply | US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4, US-008-T5 | 2 | GET /conversations/{id}/messages, POST /conversations, POST /conversations/{id}/messages, backend, conversations, database, frontend, messages, openai | — | — | not started | not run | 4/4 tested · 0/4 passing | — |
| US-009 | EPIC-002 | Earlier messages sent to the model as context | US-009, US-009-T1, US-009-T2, US-009-T3 | 3 | POST /conversations/{id}/messages, backend, conversations, database, messages, openai | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-010 | EPIC-002 | Typing / pending indicator while waiting for a reply | US-010, US-010-T1, US-010-T2 | 3 | frontend | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-011 | EPIC-002 | Inline error when the model call fails | US-011, US-011-T1, US-011-T2, US-011-T3 | 3 | POST /conversations/{id}/messages, backend, database, frontend, messages | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-012 | EPIC-002 | Hosted model configured by API key | US-012, US-012-T1, US-012-T2, US-012-T3 | 2 | backend, openai | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-013 | EPIC-003 | See my past conversations in the sidebar | US-013, US-013-T1, US-013-T2, US-013-T3, US-013-T4 | 3 | GET /conversations, backend, conversations, database, frontend | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-014 | EPIC-003 | Select a conversation and replay its messages | US-014, US-014-T1, US-014-T2, US-014-T3 | 3 | GET /conversations/{id}/messages, backend, conversations, frontend, messages | — | — | not started | not run | 2/2 tested · 0/2 passing | — |
| US-015 | EPIC-003 | Start a New Chat and switch between conversations | US-015, US-015-T1, US-015-T2, US-015-T3 | 3 | POST /conversations, backend, conversations, frontend | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-016 | EPIC-003 | Conversations auto-titled from the first message | US-016, US-016-T1, US-016-T2, US-016-T3 | 4 | POST /conversations, POST /conversations/{id}/messages, backend, conversations, database, frontend | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-017 | EPIC-003 | Delete a conversation | US-017, US-017-T1, US-017-T2, US-017-T3 | 4 | DELETE /conversations/{id}, backend, conversations, database, frontend, messages | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-018 | EPIC-003 | Messages saved with timestamps as they happen | US-018, US-018-T1, US-018-T2, US-018-T3 | 3 | POST /conversations/{id}/messages, backend, database, messages | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-019 | EPIC-003 | History survives page refresh and re-login | US-019, US-019-T1, US-019-T2, US-019-T3 | 4 | GET /conversations, GET /conversations/{id}/messages, backend, conversations, database, frontend, messages | — | — | not started | not run | 2/2 tested · 0/2 passing | — |
| US-020 | EPIC-003 | Conversations visible only to their owner | US-020, US-020-T1, US-020-T2, US-020-T3 | 4 | DELETE /conversations/{id}, GET /conversations, GET /conversations/{id}/messages, backend, conversations, database, messages, users | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
| US-021 | EPIC-004 | Simple, clean, responsive layout that works on a phone | US-021, US-021-T1, US-021-T2, US-021-T3, US-021-T4 | 4 | frontend | — | — | not started | not run | 4/4 tested · 0/4 passing | — |
| US-022 | EPIC-004 | Setup and run instructions | US-022, US-022-T1, US-022-T2, US-022-T3 | 4 | backend, database, frontend, openai | — | — | not started | not run | 3/3 tested · 0/3 passing | — |
<!-- sdlc:auto:end matrix -->
