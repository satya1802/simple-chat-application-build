# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1 - Auth Foundation

Self-registration, bcrypt-hashed passwords, login with JWT, pre-auth route gating, and logout.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Create an account by self-registration | 5 | backend-agent | — |
| ↳ US-001-T1 | Task | Create users table migration | — | backend-agent | — |
| ↳ US-001-T2 | Task | Build POST /auth/register endpoint | — | backend-agent | — |
| ↳ US-001-T3 | Task | Build Sign-up form | — | frontend-agent | — |
| ↳ US-001-T4 | Task | Wire registration to auto sign-in or redirect to login | — | frontend-agent | — |
| US-002 | Story | Passwords stored hashed with bcrypt | 3 | backend-agent | US-001 |
| ↳ US-002-T1 | Task | Integrate bcrypt hashing on registration | — | backend-agent | — |
| ↳ US-002-T2 | Task | Add bcrypt verification on login | — | backend-agent | — |
| ↳ US-002-T3 | Task | Write unit tests for hashing/verification | — | qa-agent | — |
| US-003 | Story | Log in with username and password | 5 | backend-agent | US-001, US-002 |
| ↳ US-003-T1 | Task | Build POST /auth/login endpoint | — | backend-agent | — |
| ↳ US-003-T2 | Task | Build Login form | — | frontend-agent | — |
| ↳ US-003-T3 | Task | Store JWT and redirect to dashboard | — | frontend-agent | — |
| US-004 | Story | Only the Login page is reachable before authentication | 3 | frontend-agent | US-003 |
| ↳ US-004-T1 | Task | Implement auth-gated routing | — | frontend-agent | — |
| ↳ US-004-T2 | Task | Restrict pre-auth navigation | — | frontend-agent | — |
| US-006 | Story | Log out and return to the Login page | 2 | frontend-agent | US-003 |
| ↳ US-006-T1 | Task | Add Logout control | — | frontend-agent | — |
| ↳ US-006-T2 | Task | Verify back-navigation after logout | — | qa-agent | — |

## Sprint 2: Sprint 2 - Core Chat Flow

Chat Dashboard shell, authenticated chat endpoints, OpenAI integration, and send/receive of a single AI reply.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Chat endpoints reject unauthenticated requests | 3 | backend-agent | US-003 |
| ↳ US-005-T1 | Task | Build JWT auth dependency | — | backend-agent | — |
| ↳ US-005-T2 | Task | Apply auth dependency to all chat/conversation routes | — | backend-agent | — |
| ↳ US-005-T3 | Task | Handle 401 on the frontend | — | frontend-agent | — |
| ↳ US-005-T4 | Task | Write auth rejection tests | — | qa-agent | — |
| US-007 | Story | Land on the Chat Dashboard after login | 5 | frontend-agent | US-003, US-004 |
| ↳ US-007-T1 | Task | Build Chat Dashboard layout | — | frontend-agent | — |
| ↳ US-007-T2 | Task | Implement empty-conversation state | — | frontend-agent | — |
| US-008 | Story | Send a message and receive an AI reply | 8 | integration-agent | US-007, US-005, US-012 |
| ↳ US-008-T1 | Task | Build send-message UI flow | — | frontend-agent | — |
| ↳ US-008-T2 | Task | Build POST /conversations/{id}/messages endpoint | — | backend-agent | — |
| ↳ US-008-T3 | Task | Integrate OpenAI Chat Completions call | — | integration-agent | — |
| ↳ US-008-T4 | Task | Render assistant reply in order | — | frontend-agent | — |
| US-012 | Story | Hosted model configured by API key | 3 | integration-agent | — |
| ↳ US-012-T1 | Task | Load OPENAI_API_KEY from environment | — | backend-agent | — |
| ↳ US-012-T2 | Task | Log configuration error on missing key | — | backend-agent | — |

## Sprint 3: Sprint 3 - Context, Feedback & Conversation Access

Thread context for replies, pending indicator, inline error handling, message persistence, sidebar conversation list, replay and New Chat.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-009 | Story | Earlier messages sent to the model as context | 3 | integration-agent | US-008 |
| ↳ US-009-T1 | Task | Assemble prior messages for context | — | backend-agent | — |
| ↳ US-009-T2 | Task | Scope context to the active conversation | — | backend-agent | — |
| ↳ US-009-T3 | Task | Add context-following test cases | — | qa-agent | — |
| US-010 | Story | Typing / pending indicator while waiting for a reply | 2 | frontend-agent | US-008 |
| ↳ US-010-T1 | Task | Add typing/pending indicator | — | frontend-agent | — |
| ↳ US-010-T2 | Task | Disable Send while pending | — | frontend-agent | — |
| US-011 | Story | Inline error when the model call fails | 3 | frontend-agent | US-008, US-012 |
| ↳ US-011-T1 | Task | Surface model-call failures from the backend | — | backend-agent | — |
| ↳ US-011-T2 | Task | Show inline error in the thread | — | frontend-agent | — |
| ↳ US-011-T3 | Task | Verify no fabricated reply is saved | — | qa-agent | — |
| US-013 | Story | See my past conversations in the sidebar | 3 | frontend-agent | US-005, US-008 |
| ↳ US-013-T1 | Task | Build GET /conversations endpoint | — | backend-agent | — |
| ↳ US-013-T2 | Task | Render sidebar conversation list | — | frontend-agent | — |
| ↳ US-013-T3 | Task | Highlight selected conversation | — | frontend-agent | — |
| US-014 | Story | Select a conversation and replay its messages | 3 | frontend-agent | US-013 |
| ↳ US-014-T1 | Task | Build GET /conversations/{id}/messages endpoint | — | backend-agent | — |
| ↳ US-014-T2 | Task | Replay selected conversation | — | frontend-agent | — |
| ↳ US-014-T3 | Task | Append new messages to the open conversation | — | frontend-agent | — |
| US-015 | Story | Start a New Chat and switch between conversations | 3 | frontend-agent | US-008, US-013 |
| ↳ US-015-T1 | Task | Build POST /conversations endpoint | — | backend-agent | — |
| ↳ US-015-T2 | Task | Implement New Chat action | — | frontend-agent | — |
| ↳ US-015-T3 | Task | Create conversation on first message | — | frontend-agent | — |
| ↳ US-015-T4 | Task | Support switching between conversations | — | frontend-agent | — |
| US-018 | Story | Messages saved with timestamps as they happen | 3 | backend-agent | US-008 |
| ↳ US-018-T1 | Task | Persist user message with timestamp | — | backend-agent | — |
| ↳ US-018-T2 | Task | Persist assistant reply with timestamp | — | backend-agent | — |
| ↳ US-018-T3 | Task | Verify chronological replay | — | qa-agent | — |

## Sprint 4: Sprint 4 - Management, Security & Polish

Auto-titling, delete conversation, persistence and ownership verification, responsive layout, and setup documentation.

Capacity: 20 points · Committed: 17

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Conversations auto-titled from the first message | 2 | backend-agent | US-015 |
| ↳ US-016-T1 | Task | Derive title from first message | — | backend-agent | — |
| ↳ US-016-T2 | Task | Lock title after creation | — | backend-agent | — |
| US-017 | Story | Delete a conversation | 2 | frontend-agent | US-013 |
| ↳ US-017-T1 | Task | Build DELETE /conversations/{id} endpoint | — | backend-agent | — |
| ↳ US-017-T2 | Task | Add delete confirmation and sidebar update | — | frontend-agent | — |
| US-019 | Story | History survives page refresh and re-login | 3 | backend-agent | US-018, US-013 |
| ↳ US-019-T1 | Task | Reload state from backend on app start | — | frontend-agent | — |
| ↳ US-019-T2 | Task | Verify persistence across refresh and re-login | — | qa-agent | — |
| US-020 | Story | Conversations visible only to their owner | 3 | security-agent | US-005, US-013 |
| ↳ US-020-T1 | Task | Enforce ownership on read/list endpoints | — | backend-agent | — |
| ↳ US-020-T2 | Task | Enforce ownership on delete endpoint | — | backend-agent | — |
| ↳ US-020-T3 | Task | Write cross-user access tests | — | qa-agent | — |
| US-021 | Story | Simple, clean, responsive layout that works on a phone | 5 | frontend-agent | US-007 |
| ↳ US-021-T1 | Task | Responsive Chat Dashboard layout | — | frontend-agent | — |
| ↳ US-021-T2 | Task | Responsive Login and Sign-up pages | — | frontend-agent | — |
| ↳ US-021-T3 | Task | Auto-scroll to latest message | — | frontend-agent | — |
| ↳ US-021-T4 | Task | Cross-device layout QA pass | — | qa-agent | — |
| US-022 | Story | Setup and run instructions | 2 | devops-agent | — |
| ↳ US-022-T1 | Task | Write README setup instructions | — | devops-agent | — |
| ↳ US-022-T2 | Task | Document environment configuration | — | devops-agent | — |
| ↳ US-022-T3 | Task | Verify end-to-end setup on a clean machine | — | qa-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
