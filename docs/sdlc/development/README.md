# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-OVERVIEW · approved · source: development:plan

Approved v1 delivery plan splits the 4 epics / 22 stories into 4 sprints of 20-point capacity each.

Sprint 1 - Auth Foundation (capacity 20): self-registration, bcrypt hashing, login+JWT, pre-auth route gating, logout. Sprint 2 - Core Chat Flow (capacity 20): Chat Dashboard shell, authenticated chat endpoints, OpenAI integration, single send/receive reply. Sprint 3 - Context, Feedback & Conversation Access (capacity 20): thread context, pending indicator, inline error handling, message persistence, sidebar list, replay, New Chat. Sprint 4 - Management, Security & Polish (capacity 20): auto-titling, delete, persistence/ownership verification, responsive layout, setup docs. The plan input lists sprint goals and a flat backlog of epics/stories/tasks with points and assigned agent roles, but does not explicitly map individual backlog items to a specific sprint id.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004

- ⚠ Input does not explicitly state which backlog items belong to which sprint -- the sprint-to-epic correspondence below is inferred from matching goal wording to epic titles, not given as an explicit mapping.

### DEV-SPRINT-1 · approved · source: development:plan:Sprint 1

Sprint 1 - Auth Foundation: self-registration, bcrypt hashing, login+JWT, pre-auth route gating, logout. Capacity 20.

Goal text aligns with EPIC-001's stories (US-001 through US-006), inferred by matching wording -- not an explicit item-to-sprint assignment in the input.

**Related:** EPIC-001, REQ-US-001, REQ-US-002, REQ-US-003, REQ-US-004, REQ-US-005, REQ-US-006

- ⚠ Explicit item list for this sprint was not provided; mapping to US-001..US-006 is inferred.

### DEV-SPRINT-2 · approved · source: development:plan:Sprint 2

Sprint 2 - Core Chat Flow: Chat Dashboard shell, authenticated chat endpoints, OpenAI integration, single send/receive reply. Capacity 20.

Goal text aligns with part of EPIC-002 (US-007, US-008, US-012), inferred by matching wording -- not an explicit item-to-sprint assignment in the input.

**Related:** EPIC-002, REQ-US-007, REQ-US-008, REQ-US-012

- ⚠ Explicit item list for this sprint was not provided; mapping is inferred and partial.

### DEV-SPRINT-3 · approved · source: development:plan:Sprint 3

Sprint 3 - Context, Feedback & Conversation Access: thread context, pending indicator, inline error handling, message persistence, sidebar list, replay, New Chat. Capacity 20.

Goal text aligns with remaining EPIC-002 stories (US-009, US-010, US-011) plus early EPIC-003 stories (US-013, US-014, US-015), inferred by matching wording -- not an explicit item-to-sprint assignment in the input.

**Related:** EPIC-002, EPIC-003, REQ-US-009, REQ-US-010, REQ-US-011, REQ-US-013, REQ-US-014, REQ-US-015

- ⚠ Explicit item list for this sprint was not provided; mapping is inferred.

### DEV-SPRINT-4 · approved · source: development:plan:Sprint 4

Sprint 4 - Management, Security & Polish: auto-titling, delete, persistence and ownership verification, responsive layout, setup documentation. Capacity 20.

Goal text aligns with remaining EPIC-003 stories (US-016 through US-020) plus all of EPIC-004 (US-021, US-022), inferred by matching wording -- not an explicit item-to-sprint assignment in the input.

**Related:** EPIC-003, EPIC-004, REQ-US-016, REQ-US-017, REQ-US-018, REQ-US-019, REQ-US-020, REQ-US-021, REQ-US-022

- ⚠ Explicit item list for this sprint was not provided; mapping is inferred.

### DEV-BACKLOG-EPIC-001 · approved · source: development:plan:backlog:EPIC-001

Backlog breakdown for EPIC-001: 6 stories, 21 points, split across backend-agent and frontend-agent with qa-agent for test tasks.

US-001 Create account by self-registration (5pts, backend-agent) -- tasks: users table migration, POST /auth/register, Sign-up form, wire registration to sign-in/redirect. US-002 Passwords hashed with bcrypt (3pts, backend-agent) -- tasks: bcrypt hashing on registration, bcrypt verification on login, unit tests (qa-agent). US-003 Log in (5pts, backend-agent) -- tasks: POST /auth/login, Login form, store JWT+redirect. US-004 Only Login reachable pre-auth (3pts, frontend-agent) -- tasks: auth-gated routing, restrict pre-auth navigation. US-005 Chat endpoints reject unauthenticated requests (3pts, backend-agent) -- tasks: JWT auth dependency, apply to all chat/conversation routes, handle 401 on frontend, auth rejection tests (qa-agent). US-006 Logout (2pts, frontend-agent) -- tasks: Logout control, verify back-navigation (qa-agent).

**Related:** REQ-US-001, REQ-US-002, REQ-US-003, REQ-US-004, REQ-US-005, REQ-US-006

### DEV-BACKLOG-EPIC-002 · approved · source: development:plan:backlog:EPIC-002

Backlog breakdown for EPIC-002: 6 stories, 24 points, spanning frontend-agent, backend-agent, and integration-agent.

US-007 Land on Chat Dashboard (5pts, frontend-agent). US-008 Send message/receive AI reply (8pts, integration-agent) -- tasks across frontend, backend endpoint, OpenAI integration, rendering. US-009 Earlier messages as context (3pts, integration-agent) -- backend context assembly and scoping, qa test cases. US-010 Typing/pending indicator (2pts, frontend-agent). US-011 Inline error on model failure (3pts, frontend-agent) -- backend failure surfacing, frontend display, qa verification of no fabricated reply. US-012 Hosted model via API key (3pts, integration-agent) -- load OPENAI_API_KEY, log config error on missing key.

**Related:** REQ-US-007, REQ-US-008, REQ-US-009, REQ-US-010, REQ-US-011, REQ-US-012

### DEV-BACKLOG-EPIC-003 · approved · source: development:plan:backlog:EPIC-003

Backlog breakdown for EPIC-003: 8 stories, 22 points, spanning frontend-agent, backend-agent, security-agent, and qa-agent.

US-013 Sidebar conversation list (3pts, frontend-agent). US-014 Select/replay conversation (3pts, frontend-agent). US-015 New Chat + switching (3pts, frontend-agent). US-016 Auto-titling (2pts, backend-agent). US-017 Delete conversation (2pts, frontend-agent). US-018 Messages saved with timestamps (3pts, backend-agent) -- includes qa verification of chronological replay. US-019 History survives refresh/re-login (3pts, backend-agent) -- includes frontend reload-on-start task and qa verification. US-020 Conversations visible only to owner (3pts, security-agent) -- backend ownership enforcement on read/delete endpoints plus qa cross-user access tests.

**Related:** REQ-US-013, REQ-US-014, REQ-US-015, REQ-US-016, REQ-US-017, REQ-US-018, REQ-US-019, REQ-US-020

### DEV-BACKLOG-EPIC-004 · approved · source: development:plan:backlog:EPIC-004

Backlog breakdown for EPIC-004: 2 stories, 7 points, covering frontend-agent and devops-agent.

US-021 Responsive layout (5pts, frontend-agent) -- responsive dashboard and login/signup layouts, auto-scroll, cross-device QA pass (qa-agent). US-022 Setup and run instructions (2pts, devops-agent) -- README setup instructions, environment configuration docs, end-to-end clean-machine verification (qa-agent).

**Related:** REQ-US-021, REQ-US-022

### DEV-RUN-OVERVIEW · draft · source: development:run

The development execution run is recorded as FAILED. Only 5 of the 22 planned stories have any ticket record, and none has a commit.

Reported tickets: US-001 (planned, no commit), US-002 (skipped, no commit), US-003 (skipped, no commit), US-004 (planned, no commit), US-006 (skipped, no commit). No tickets are reported for US-005, US-007 through US-022. No ticket shows status 'done' or carries a commit reference, so there is no evidence any code has actually been merged.

**Related:** DEV-PLAN-OVERVIEW

- ⚠ Overall run status is 'failed' with no stated reason provided in the input.
- ⚠ 17 of 22 planned stories (including all of EPIC-002, EPIC-003, EPIC-004) have no run record at all -- unclear if they were never attempted or simply not reported.
- ⚠ Two critical-path stories were skipped outright: US-002 (bcrypt password hashing) and US-003 (login/JWT issuance) -- these are prerequisites for nearly every other story, so their skip likely blocks downstream work.
- ⚠ No commit hashes exist for any ticket, so no implementation can be verified against the approved plan or architecture.

### DEV-TICKET-US-001 · draft · source: development:run:US-001

Ticket for 'Create an account by self-registration' is in planned status; no commit exists yet.

Status: planned. Commit: none. No implementation evidence provided.

**Related:** REQ-US-001

- ⚠ Not yet implemented; no commit or completion evidence.

### DEV-TICKET-US-002 · draft · source: development:run:US-002

Ticket for 'Passwords stored hashed with bcrypt' was skipped; no commit exists.

Status: skipped. Commit: none. No reason for skipping is provided in the input.

**Related:** REQ-US-002

- ⚠ Skipped with no stated reason; this is a critical security requirement (bcrypt hashing) and remains unimplemented.
- ⚠ Reason for skip not provided -- cannot be inferred.

### DEV-TICKET-US-003 · draft · source: development:run:US-003

Ticket for 'Log in with username and password' was skipped; no commit exists.

Status: skipped. Commit: none. No reason for skipping is provided in the input.

**Related:** REQ-US-003

- ⚠ Skipped with no stated reason; this is a critical story (login/JWT issuance) and remains unimplemented.
- ⚠ Reason for skip not provided -- cannot be inferred.

### DEV-TICKET-US-004 · draft · source: development:run:US-004

Ticket for 'Only the Login page is reachable before authentication' is in planned status; no commit exists yet.

Status: planned. Commit: none. No implementation evidence provided.

**Related:** REQ-US-004

- ⚠ Not yet implemented; no commit or completion evidence.

### DEV-TICKET-US-006 · draft · source: development:run:US-006

Ticket for 'Log out and return to the Login page' was skipped; no commit exists.

Status: skipped. Commit: none. No reason for skipping is provided in the input.

**Related:** REQ-US-006

- ⚠ Skipped with no stated reason; remains unimplemented.
- ⚠ Reason for skip not provided -- cannot be inferred.
<!-- sdlc:auto:end narrative -->
