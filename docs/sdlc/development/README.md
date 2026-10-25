# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-v5 · approved · source: plan:PLAN-v5

Development plan version 5 is approved and organizes the build into 4 sprints of 20 points capacity each, spanning auth, core chat, conversation management, and polish/setup.

Plan status: approved, version 5. Sprint 1 (Auth Foundation): self-registration, bcrypt hashing, JWT login, Login-only gating for unauthenticated users, and logout, capacity 20. Sprint 2 (Core Chat Flow): Chat Dashboard shell, authenticated chat endpoints, OpenAI-backed send/reply loop with server-side key, capacity 20. Sprint 3 (Context, Feedback & Conversation Access): conversation context for replies, typing/error feedback, sidebar listing, replay, new chat/switching, timestamped persistence, capacity 20. Sprint 4 (Management, Security & Polish): auto-titling, delete, cross-user security, refresh/re-login persistence verification, responsive layout, setup docs, capacity 20.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004

- ⚠ Input does not state which backlog items/tasks are explicitly assigned to each sprint -- sprint-to-story mapping below is inferred only loosely from epic order and sprint goal wording, not confirmed by the input.

### SPRINT-1 · approved · source: plan:SPRINT-1

Sprint 1 goal is to deliver the authentication foundation: self-registration, bcrypt hashing, JWT login, Login-only unauthenticated access, and logout.

Goal: 'Self-registration, bcrypt hashing, JWT login, gated Login-only unauthenticated access, and Logout.' Capacity: 20 points. Based on goal wording this aligns with stories US-001 (self-registration), US-002 (bcrypt hashing), US-003 (login), US-004 (Login-only unauthenticated access), and US-006 (logout).

**Related:** US-001, US-002, US-003, US-004, US-006

- ⚠ Exact item list for this sprint is not explicitly given; inferred from goal text matching story titles.

### SPRINT-2 · approved · source: plan:SPRINT-2

Sprint 2 goal is the Chat Dashboard shell, authenticated chat endpoints, and the OpenAI-backed send/reply loop using a server-side key.

Goal: 'Chat Dashboard shell, authenticated chat endpoints, OpenAI-backed send/reply loop with server-side key.' Capacity: 20 points. Based on goal wording this aligns with stories US-007 (land on dashboard), US-005 (chat endpoints reject unauthenticated requests), US-008 (send message / get AI reply), and US-012 (hosted model configured by API key).

**Related:** US-005, US-007, US-008, US-012

- ⚠ Exact item list for this sprint is not explicitly given; inferred from goal text.
- ⚠ No development run entry reports status for any item in this sprint.

### SPRINT-3 · approved · source: plan:SPRINT-3

Sprint 3 goal is conversation context for AI replies, typing/error feedback, sidebar listing, conversation replay, new chat/switching, and timestamped persistence.

Goal: 'Conversation context for replies, typing/error feedback, sidebar listing, replay, new chat/switching, and timestamped persistence.' Capacity: 20 points. Based on goal wording this aligns with stories US-009 (context to model), US-010 (typing/pending indicator), US-011 (inline error on failure), US-013 (sidebar conversation list), US-014 (select/replay conversation), US-015 (new chat/switching), and US-018 (timestamped message persistence).

**Related:** US-009, US-010, US-011, US-013, US-014, US-015, US-018

- ⚠ Exact item list for this sprint is not explicitly given; inferred from goal text.
- ⚠ No development run entry reports status for any item in this sprint.

### SPRINT-4 · approved · source: plan:SPRINT-4

Sprint 4 goal is auto-titling, conversation delete, cross-user security, refresh/re-login persistence verification, responsive layout, and setup documentation.

Goal: 'Auto-titling, delete, cross-user security, refresh/re-login persistence verification, responsive layout, and setup docs.' Capacity: 20 points. Based on goal wording this aligns with stories US-016 (auto-title), US-017 (delete conversation), US-019 (persistence across refresh/re-login), US-020 (owner-only visibility), US-021 (responsive layout), and US-022 (setup/run instructions).

**Related:** US-016, US-017, US-019, US-020, US-021, US-022

- ⚠ Exact item list for this sprint is not explicitly given; inferred from goal text.
- ⚠ No development run entry reports status for any item in this sprint.

### EPIC-001 · approved · source: plan:EPIC-001

Epic covering account creation, login, and session handling -- the authentication foundation of the app.

Stories: US-001 Create an account by self-registration (5 pts, backend-agent; tasks: design users table migration, build POST /auth/register, build Sign-up page UI, wire Sign-up form to API). US-002 Passwords stored hashed with bcrypt (3 pts, backend-agent; tasks: integrate bcrypt hashing on registration, bcrypt verification on login, test per-user salting and response safety). US-003 Log in with username and password (5 pts, backend-agent; tasks: POST /auth/login endpoint, issue JWT access token, build Login form UI, store token and redirect to dashboard). US-004 Only the Login page is reachable before authentication (3 pts, frontend-agent; tasks: protected route guard, redirect unauthenticated visitors, restrict pre-auth navigation to Sign-up link only). US-005 Chat endpoints reject unauthenticated requests (3 pts, backend-agent; tasks: JWT auth dependency, apply guard to all chat endpoints, test 401 responses for bad tokens). US-006 Log out and return to the Login page (2 pts, frontend-agent; tasks: add Logout control, discard token and redirect).

**Related:** US-001, US-002, US-003, US-004, US-005, US-006

### EPIC-002 · approved · source: plan:EPIC-002

Epic covering the Chat Dashboard and AI assistant reply loop.

Stories: US-007 Land on the Chat Dashboard after login (5 pts, frontend-agent; tasks: build dashboard shell, fetch conversations on load, implement empty-state view). US-008 Send a message and receive an AI reply (8 pts, integration-agent; tasks: message send endpoint, integrate OpenAI chat completion call, persist assistant reply, wire frontend send flow, handle first-message new conversation creation). US-009 Earlier messages sent to the model as context (3 pts, integration-agent; tasks: query conversation history in order, assemble context into OpenAI request, test conversation context isolation). US-010 Typing/pending indicator while waiting for a reply (2 pts, frontend-agent; tasks: add indicator, disable Send while pending). US-011 Inline error when the model call fails (3 pts, frontend-agent; tasks: handle model call failures in backend, render inline error in thread, verify no partial reply persisted on failure). US-012 Hosted model configured by API key (3 pts, integration-agent; tasks: load OPENAI_API_KEY from configuration, build OpenAI client service, add missing-key startup check).

**Related:** US-007, US-008, US-009, US-010, US-011, US-012

### EPIC-003 · approved · source: plan:EPIC-003

Epic covering conversation management and persistent, owner-scoped chat history.

Stories: US-013 See past conversations in the sidebar (3 pts, frontend-agent; tasks: scoped GET /conversations endpoint, render sidebar list, highlight selected conversation, empty sidebar state). US-014 Select a conversation and replay its messages (3 pts, frontend-agent; tasks: GET /conversations/{id}/messages endpoint, replay selected conversation, append new sends to open conversation). US-015 Start a New Chat and switch between conversations (3 pts, frontend-agent; tasks: POST /conversations endpoint, New Chat control, conversation switching). US-016 Conversations auto-titled from the first message (2 pts, backend-agent; tasks: generate auto-title, persist title once, display title in sidebar). US-017 Delete a conversation (2 pts, frontend-agent; tasks: DELETE /conversations/{id} endpoint, delete control with confirmation, clear dashboard on deleting open conversation). US-018 Messages saved with timestamps as they happen (3 pts, backend-agent; tasks: design messages table schema, write user message row immediately, write assistant reply row immediately). US-019 History survives page refresh and re-login (3 pts, backend-agent; tasks: reload state from API on mount/refresh, verify persistence across logout/login, confirm ordered history read path). US-020 Conversations visible only to their owner (3 pts, security-agent; tasks: enforce ownership filter on all queries, return 403/404 for cross-user access, add cross-user access security tests).

**Related:** US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020

### EPIC-004 · approved · source: plan:EPIC-004

Epic covering the responsive interface and setup/run instructions for the application.

Stories: US-021 Simple, clean, responsive layout that works on a phone (5 pts, frontend-agent; tasks: build responsive dashboard layout, add sidebar toggle for phone widths, implement auto-scroll to latest message, verify Login/Sign-up responsiveness). US-022 Setup and run instructions (2 pts, devops-agent; tasks: write README setup instructions, document environment configuration, verify end-to-end setup on a clean machine).

**Related:** US-021, US-022

### DEV-RUN-STATUS · draft · source: dev:run-status

The development run is reported as 'completed', but only 5 of the 22 planned stories have recorded ticket status and commits.

Development run status field reads 'completed'. Ticket records provided: US-001 delivered (commit 14b2216711ca2f9e871dc8492f28aae9db2d2842), US-002 delivered (commit 14b2216711ca2f9e871dc8492f28aae9db2d2842), US-003 delivered (commit 14b2216711ca2f9e871dc8492f28aae9db2d2842), US-004 delivered (commit fdd19bde469cd4ace914240f333616be4704272a), US-006 delivered (commit fdd19bde469cd4ace914240f333616be4704272a). No ticket entries were provided for US-005 or US-007 through US-022.

**Related:** US-001, US-002, US-003, US-004, US-006

- ⚠ Discrepancy: run status is labeled 'completed' but only 5 of 22 planned stories (22.7%) have reported ticket/commit evidence -- unclear whether 'completed' refers to the whole plan or only to Sprint 1.
- ⚠ US-001, US-002, and US-003 share the same commit hash, and US-004 and US-006 share a second commit hash -- input does not clarify whether these are legitimately combined commits or a reporting duplication; flagging for confirmation.

### DEV-US-001 · approved · source: dev:US-001

Self-registration story delivered: users table, register endpoint, Sign-up UI, and form wiring.

Ticket US-001 'Create an account by self-registration' status=delivered, commit 14b2216711ca2f9e871dc8492f28aae9db2d2842. Covers planned tasks: design users table migration, build POST /auth/register endpoint, build Sign-up page UI, wire Sign-up form to register API.

**Related:** US-001, US-001-T1, US-001-T2, US-001-T3, US-001-T4

- ⚠ No test or QA confirmation provided for this ticket in the input.

### DEV-US-002 · approved · source: dev:US-002

Bcrypt password hashing story delivered: hashing on registration and verification on login.

Ticket US-002 'Passwords stored hashed with bcrypt' status=delivered, commit 14b2216711ca2f9e871dc8492f28aae9db2d2842. Covers planned tasks: integrate bcrypt hashing on registration, implement bcrypt verification on login, test per-user salting and response safety.

**Related:** US-002, US-002-T1, US-002-T2, US-002-T3

- ⚠ Input marks the story delivered but does not separately confirm the QA task (test per-user salting and response safety) was executed or passed.

### DEV-US-003 · approved · source: dev:US-003

Username/password login story delivered: login endpoint, JWT issuance, Login UI, and token storage/redirect.

Ticket US-003 'Log in with username and password' status=delivered, commit 14b2216711ca2f9e871dc8492f28aae9db2d2842. Covers planned tasks: implement POST /auth/login endpoint, issue JWT access token, build Login form UI, store token and redirect to dashboard.

**Related:** US-003, US-003-T1, US-003-T2, US-003-T3, US-003-T4

### DEV-US-004 · approved · source: dev:US-004

Login-only pre-authentication access story delivered: route guard, redirects, and restricted pre-auth navigation.

Ticket US-004 'Only the Login page is reachable before authentication' status=delivered, commit fdd19bde469cd4ace914240f333616be4704272a. Covers planned tasks: implement protected route guard, redirect unauthenticated visitors, restrict pre-auth navigation to Sign-up link only.

**Related:** US-004, US-004-T1, US-004-T2, US-004-T3

### DEV-US-006 · approved · source: dev:US-006

Logout story delivered: logout control added, token discarded, and user redirected to Login page.

Ticket US-006 'Log out and return to the Login page' status=delivered, commit fdd19bde469cd4ace914240f333616be4704272a. Covers planned tasks: add Logout control, discard token and redirect.

**Related:** US-006, US-006-T1, US-006-T2

### DEV-PENDING · draft

17 planned stories spanning chat endpoint security, the Chat Dashboard/AI reply loop, conversation management, cross-user security, responsive layout, and setup docs have no reported development ticket, commit, or status.

The plan (v5, approved) defines these stories as part of Sprints 1-4, but the development run input contains no ticket records for them: US-005 (chat endpoints reject unauthenticated requests), US-007 (land on dashboard), US-008 (send message/AI reply), US-009 (conversation context to model), US-010 (typing/pending indicator), US-011 (inline error on model failure), US-012 (hosted model via API key), US-013 (sidebar conversation list), US-014 (select/replay conversation), US-015 (new chat/switching), US-016 (auto-title), US-017 (delete conversation), US-018 (timestamped persistence), US-019 (refresh/re-login persistence), US-020 (owner-only visibility), US-021 (responsive layout), US-022 (setup/run instructions).

**Related:** US-005, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021, US-022

- ⚠ No ticket status or commit evidence exists for any of these 17 stories despite the run being reported 'completed' -- build/delivery status for the Chat Dashboard, AI reply loop, conversation persistence, cross-user security, responsive layout, and setup documentation is currently undocumented.
- ⚠ US-005 in particular is thematically part of the auth-gating work delivered alongside US-004/US-006 but was not included in the delivered ticket list -- confirm whether it was actually completed or missed in reporting.
<!-- sdlc:auto:end narrative -->
