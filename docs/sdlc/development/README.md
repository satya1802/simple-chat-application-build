# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-v5 · approved · source: plan:v5

Development plan version 5 is approved. It organizes the 22-story backlog (4 epics) into 4 sprints of capacity 20 each, moving from authentication, through core chat, to conversation management, then polish and setup docs.

Approved plan (version 5):
- Sprint 1 - Auth Foundation (capacity 20): Self-registration, bcrypt hashing, JWT login, gated Login-only unauthenticated access, and Logout. Covers US-001–US-006 (EPIC-001), 21 committed points.
- Sprint 2 - Core Chat Flow (capacity 20): Chat Dashboard shell, authenticated chat endpoints, OpenAI-backed send/reply loop with server-side key. Covers US-007–US-012 (EPIC-002), 24 committed points.
- Sprint 3 - Context, Feedback & Conversation Access (capacity 20): Conversation context for replies, typing/error feedback, sidebar listing, replay, new chat/switching, timestamped persistence. Covers US-013–US-020 (EPIC-003), 22 committed points.
- Sprint 4 - Management, Security & Polish (capacity 20): Auto-titling, delete, cross-user security, refresh/re-login persistence verification, responsive layout, setup docs. Covers US-021–US-022 (EPIC-004), 7 committed points.
Total backlog: 4 epics, 22 stories, 74 story points.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021, US-022

- ⚠ Sprints 1, 2 and 3 each commit more points than their stated 20-point capacity (21, 24, 22 respectively) — see individual sprint entries for the discrepancy.

### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 - Auth Foundation (EPIC-001: Account Creation, Login and Session Handling). Goal: self-registration, bcrypt hashing, JWT login, Login-only gating before auth, chat-endpoint auth guard, and logout.

Capacity: 20 points. Committed: 21 points (1 over capacity).
Stories/tasks:
- US-001 (5 pts, backend-agent) Create an account by self-registration — tasks: design users table migration; build POST /auth/register; build Sign-up page UI; wire Sign-up form to register API.
- US-002 (3 pts, backend-agent) Passwords stored hashed with bcrypt — tasks: integrate bcrypt hashing on registration; implement bcrypt verification on login; test per-user salting and response safety (qa-agent).
- US-003 (5 pts, backend-agent) Log in with username and password — tasks: implement POST /auth/login; issue JWT access token; build Login form UI (frontend-agent); store token and redirect to dashboard (frontend-agent).
- US-004 (3 pts, frontend-agent) Only the Login page is reachable before authentication — tasks: implement protected route guard; redirect unauthenticated visitors; restrict pre-auth navigation to Sign-up link only.
- US-005 (3 pts, backend-agent) Chat endpoints reject unauthenticated requests — tasks: add JWT auth dependency; apply auth guard to all chat endpoints; test 401 responses for bad tokens (qa-agent).
- US-006 (2 pts, frontend-agent) Log out and return to the Login page — tasks: add Logout control; discard token and redirect.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006

- ⚠ Committed points (21) exceed stated sprint capacity (20) by 1 — not flagged as resolved in the input.
- ⚠ Only 5 of this sprint's 6 stories (missing US-005) appear in the development run status; see DEVRUN-SPRINT1.

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 - Core Chat Flow (EPIC-002: Chat Dashboard and AI Assistant Replies). Goal: Chat Dashboard shell, authenticated chat endpoints, OpenAI-backed send/reply loop using a server-side API key.

Capacity: 20 points. Committed: 24 points (4 over capacity).
Stories/tasks:
- US-007 (5 pts, frontend-agent) Land on the Chat Dashboard after login — tasks: build Chat Dashboard shell; fetch conversations on load; implement empty-state view.
- US-008 (8 pts, integration-agent) Send a message and receive an AI reply — tasks: implement message send endpoint; integrate OpenAI chat completion call; persist assistant reply; wire frontend send flow; handle first-message new conversation creation.
- US-009 (3 pts, integration-agent) Earlier messages sent to the model as context — tasks: query conversation history in order; assemble context into OpenAI request; test conversation context isolation (qa-agent).
- US-010 (2 pts, frontend-agent) Typing / pending indicator while waiting for a reply — tasks: add typing/pending indicator; disable Send while pending.
- US-011 (3 pts, frontend-agent) Inline error when the model call fails — tasks: handle model call failures in backend; render inline error in thread; verify no partial reply persisted on failure (qa-agent).
- US-012 (3 pts, integration-agent) Hosted model configured by API key — tasks: load OPENAI_API_KEY from configuration (devops-agent); build OpenAI client service; add missing-key startup check.

**Related:** US-007, US-008, US-009, US-010, US-011, US-012

- ⚠ Committed points (24) exceed stated sprint capacity (20) by 4.
- ⚠ No development run data exists for any Sprint 2 story; build status is entirely undocumented.

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 - Context, Feedback & Conversation Access (EPIC-003: Conversation Management and Persistent History). Goal: sidebar listing, replay, new chat/switching, auto-titling groundwork, and timestamped persistence.

Capacity: 20 points. Committed: 22 points (2 over capacity).
Stories/tasks:
- US-013 (3 pts, frontend-agent) See my past conversations in the sidebar — tasks: scoped GET /conversations endpoint; render sidebar conversation list; highlight selected conversation; add empty sidebar state.
- US-014 (3 pts, frontend-agent) Select a conversation and replay its messages — tasks: GET /conversations/{id}/messages endpoint; replay selected conversation; append new sends to the open conversation.
- US-015 (3 pts, frontend-agent) Start a New Chat and switch between conversations — tasks: POST /conversations endpoint; add New Chat control; implement conversation switching.
- US-016 (2 pts, backend-agent) Conversations auto-titled from the first message — tasks: generate auto-title from first message; persist title once; display title in sidebar.
- US-017 (2 pts, frontend-agent) Delete a conversation — tasks: DELETE /conversations/{id} endpoint; add delete control with confirmation; clear dashboard on deleting open conversation.
- US-018 (3 pts, backend-agent) Messages saved with timestamps as they happen — tasks: design messages table schema; write user message row immediately; write assistant reply row immediately.
- US-019 (3 pts, backend-agent) History survives page refresh and re-login — tasks: reload state from API on mount/refresh (frontend-agent); verify persistence across logout/login (qa-agent); confirm ordered history read path.
- US-020 (3 pts, security-agent) Conversations visible only to their owner — tasks: enforce ownership filter on all queries; return 403/404 for cross-user access; add cross-user access security tests (qa-agent).

**Related:** US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020

- ⚠ Committed points (22) exceed stated sprint capacity (20) by 2.
- ⚠ No development run data exists for any Sprint 3 story; build status is entirely undocumented.

### SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 - Management, Security & Polish (EPIC-004: Responsive Interface and Running the App). Goal: responsive layout verification and setup/run documentation.

Capacity: 20 points. Committed: 7 points (well under capacity).
Stories/tasks:
- US-021 (5 pts, frontend-agent) Simple, clean, responsive layout that works on a phone — tasks: build responsive dashboard layout; add sidebar toggle for phone widths; implement auto-scroll to latest message; verify Login/Sign-up responsiveness (qa-agent).
- US-022 (2 pts, devops-agent) Setup and run instructions — tasks: write README setup instructions; document environment configuration; verify end-to-end setup on a clean machine (qa-agent).

**Related:** US-021, US-022

- ⚠ No development run data exists for any Sprint 4 story; build status is entirely undocumented.

### DEVRUN-SPRINT1 · draft · source: dev:run-status

The development run is marked 'failed'. Only 5 of Sprint 1's 6 stories were reported, none completed, and no commits exist for any ticket.

Overall run status: failed. Reported tickets: US-001 = planned (no commit); US-002 = skipped (no commit); US-003 = skipped (no commit); US-004 = planned (no commit); US-006 = skipped (no commit). US-005 (also Sprint 1 / EPIC-001 scope) has no entry in the run output at all. No ticket reached an implemented/done state in this run.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006

- ⚠ No root-cause or error detail was provided for the overall 'failed' run status.
- ⚠ US-005 (Chat endpoints reject unauthenticated requests) is in Sprint 1/EPIC-001 scope but is absent from the run output — unclear if it was attempted.
- ⚠ Tickets marked 'planned' (US-001, US-004) have no commit, so it is unconfirmed whether any implementation work exists beyond planning.
- ⚠ Reason for skipping US-002, US-003, US-006 is not stated.

### DEV-US-001 · draft · source: dev:US-001

Self-registration ticket (US-001) is in 'planned' state in the failed development run; no commit recorded.

Plan defines tasks: design users table migration, build POST /auth/register endpoint, build Sign-up page UI, wire Sign-up form to register API. Run status reports this ticket as 'planned' with commit=(none), meaning implementation has not been confirmed to have started.

**Related:** US-001

- ⚠ No commit or code artifact exists for this ticket; actual implementation progress beyond 'planned' is unknown.

### DEV-US-002 · draft · source: dev:US-002

Bcrypt password hashing ticket (US-002) was skipped in the development run; not implemented.

Plan defines tasks: integrate bcrypt hashing on registration, implement bcrypt verification on login, test per-user salting and response safety. Run status reports this ticket as 'skipped' with commit=(none).

**Related:** US-002

- ⚠ No reason given for skipping this security-critical ticket.
- ⚠ Password hashing is a stated core requirement (bcrypt) and remains unimplemented per this run.

### DEV-US-003 · draft · source: dev:US-003

Login ticket (US-003) was skipped in the development run; not implemented.

Plan defines tasks: implement POST /auth/login endpoint, issue JWT access token, build Login form UI, store token and redirect to dashboard. Run status reports this ticket as 'skipped' with commit=(none).

**Related:** US-003

- ⚠ No reason given for skipping.
- ⚠ Login is foundational to the whole application; its absence blocks all downstream authenticated functionality.

### DEV-US-004 · draft · source: dev:US-004

Login-only pre-auth gating ticket (US-004) is in 'planned' state; no commit recorded.

Plan defines tasks: implement protected route guard, redirect unauthenticated visitors, restrict pre-auth navigation to Sign-up link only. Run status reports this ticket as 'planned' with commit=(none).

**Related:** US-004

- ⚠ No commit or code artifact exists; implementation progress beyond 'planned' is unknown.

### DEV-US-006 · draft · source: dev:US-006

Logout ticket (US-006) was skipped in the development run; not implemented.

Plan defines tasks: add Logout control, discard token and redirect. Run status reports this ticket as 'skipped' with commit=(none).

**Related:** US-006

- ⚠ No reason given for skipping.
<!-- sdlc:auto:end narrative -->
