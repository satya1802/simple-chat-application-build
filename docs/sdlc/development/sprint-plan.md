# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1 - Auth Foundation

Self-registration, bcrypt hashing, JWT login, gated Login-only unauthenticated access, and Logout.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Create an account by self-registration | 5 | backend-agent | — |
| ↳ US-001-T1 | Task | Design users table migration | — | backend-agent | — |
| ↳ US-001-T2 | Task | Build POST /auth/register endpoint | — | backend-agent | — |
| ↳ US-001-T3 | Task | Build Sign-up page UI | — | frontend-agent | — |
| ↳ US-001-T4 | Task | Wire Sign-up form to register API | — | frontend-agent | — |
| US-002 | Story | Passwords stored hashed with bcrypt | 3 | backend-agent | US-001 |
| ↳ US-002-T1 | Task | Integrate bcrypt hashing on registration | — | backend-agent | — |
| ↳ US-002-T2 | Task | Implement bcrypt verification on login | — | backend-agent | — |
| ↳ US-002-T3 | Task | Test per-user salting and response safety | — | qa-agent | — |
| US-003 | Story | Log in with username and password | 5 | backend-agent | US-001, US-002 |
| ↳ US-003-T1 | Task | Implement POST /auth/login endpoint | — | backend-agent | — |
| ↳ US-003-T2 | Task | Issue JWT access token | — | backend-agent | — |
| ↳ US-003-T3 | Task | Build Login form UI | — | frontend-agent | — |
| ↳ US-003-T4 | Task | Store token and redirect to dashboard | — | frontend-agent | — |
| US-004 | Story | Only the Login page is reachable before authentication | 3 | frontend-agent | US-003 |
| ↳ US-004-T1 | Task | Implement protected route guard | — | frontend-agent | — |
| ↳ US-004-T2 | Task | Redirect unauthenticated visitors | — | frontend-agent | — |
| ↳ US-004-T3 | Task | Restrict pre-auth navigation to Sign-up link only | — | frontend-agent | — |
| US-006 | Story | Log out and return to the Login page | 2 | frontend-agent | US-003, US-004 |
| ↳ US-006-T1 | Task | Add Logout control | — | frontend-agent | — |
| ↳ US-006-T2 | Task | Discard token and redirect | — | frontend-agent | — |

## Sprint 2: Sprint 2 - Core Chat Flow

Chat Dashboard shell, authenticated chat endpoints, OpenAI-backed send/reply loop with server-side key.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Chat endpoints reject unauthenticated requests | 3 | backend-agent | US-003 |
| ↳ US-005-T1 | Task | Add JWT auth dependency | — | backend-agent | — |
| ↳ US-005-T2 | Task | Apply auth guard to all chat endpoints | — | backend-agent | — |
| ↳ US-005-T3 | Task | Test 401 responses for bad tokens | — | qa-agent | — |
| US-007 | Story | Land on the Chat Dashboard after login | 5 | frontend-agent | US-004, US-006 |
| ↳ US-007-T1 | Task | Build Chat Dashboard shell | — | frontend-agent | — |
| ↳ US-007-T2 | Task | Fetch conversations on load | — | frontend-agent | — |
| ↳ US-007-T3 | Task | Implement empty-state view | — | frontend-agent | — |
| US-008 | Story | Send a message and receive an AI reply | 8 | integration-agent | US-007, US-005, US-012 |
| ↳ US-008-T1 | Task | Implement message send endpoint | — | backend-agent | — |
| ↳ US-008-T2 | Task | Integrate OpenAI chat completion call | — | integration-agent | — |
| ↳ US-008-T3 | Task | Persist assistant reply | — | backend-agent | — |
| ↳ US-008-T4 | Task | Wire frontend send flow | — | frontend-agent | — |
| ↳ US-008-T5 | Task | Handle first-message new conversation creation | — | integration-agent | — |
| US-012 | Story | Hosted model configured by API key | 3 | integration-agent | — |
| ↳ US-012-T1 | Task | Load OPENAI_API_KEY from configuration | — | devops-agent | — |
| ↳ US-012-T2 | Task | Build OpenAI client service | — | integration-agent | — |
| ↳ US-012-T3 | Task | Add missing-key startup check | — | backend-agent | — |

## Sprint 3: Sprint 3 - Context, Feedback & Conversation Access

Conversation context for replies, typing/error feedback, sidebar listing, replay, new chat/switching, and timestamped persistence.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-009 | Story | Earlier messages sent to the model as context | 3 | integration-agent | US-008 |
| ↳ US-009-T1 | Task | Query conversation history in order | — | backend-agent | — |
| ↳ US-009-T2 | Task | Assemble context into OpenAI request | — | integration-agent | — |
| ↳ US-009-T3 | Task | Test conversation context isolation | — | qa-agent | — |
| US-010 | Story | Typing / pending indicator while waiting for a reply | 2 | frontend-agent | US-008 |
| ↳ US-010-T1 | Task | Add typing/pending indicator | — | frontend-agent | — |
| ↳ US-010-T2 | Task | Disable Send while pending | — | frontend-agent | — |
| US-011 | Story | Inline error when the model call fails | 3 | frontend-agent | US-008, US-012 |
| ↳ US-011-T1 | Task | Handle model call failures in backend | — | backend-agent | — |
| ↳ US-011-T2 | Task | Render inline error in thread | — | frontend-agent | — |
| ↳ US-011-T3 | Task | Verify no partial reply persisted on failure | — | qa-agent | — |
| US-013 | Story | See my past conversations in the sidebar | 3 | frontend-agent | US-005, US-007 |
| ↳ US-013-T1 | Task | Implement scoped GET /conversations endpoint | — | backend-agent | — |
| ↳ US-013-T2 | Task | Render sidebar conversation list | — | frontend-agent | — |
| ↳ US-013-T3 | Task | Highlight selected conversation | — | frontend-agent | — |
| ↳ US-013-T4 | Task | Add empty sidebar state | — | frontend-agent | — |
| US-014 | Story | Select a conversation and replay its messages | 3 | frontend-agent | US-013 |
| ↳ US-014-T1 | Task | Implement GET /conversations/{id}/messages endpoint | — | backend-agent | — |
| ↳ US-014-T2 | Task | Replay selected conversation | — | frontend-agent | — |
| ↳ US-014-T3 | Task | Append new sends to the open conversation | — | frontend-agent | — |
| US-015 | Story | Start a New Chat and switch between conversations | 3 | frontend-agent | US-013, US-014 |
| ↳ US-015-T1 | Task | Implement POST /conversations endpoint | — | backend-agent | — |
| ↳ US-015-T2 | Task | Add New Chat control | — | frontend-agent | — |
| ↳ US-015-T3 | Task | Implement conversation switching | — | frontend-agent | — |
| US-018 | Story | Messages saved with timestamps as they happen | 3 | backend-agent | US-008 |
| ↳ US-018-T1 | Task | Design messages table schema | — | backend-agent | — |
| ↳ US-018-T2 | Task | Write user message row immediately | — | backend-agent | — |
| ↳ US-018-T3 | Task | Write assistant reply row immediately | — | backend-agent | — |

## Sprint 4: Sprint 4 - Management, Security & Polish

Auto-titling, delete, cross-user security, refresh/re-login persistence verification, responsive layout, and setup docs.

Capacity: 20 points · Committed: 17

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Conversations auto-titled from the first message | 2 | backend-agent | US-008, US-015 |
| ↳ US-016-T1 | Task | Generate auto-title from first message | — | backend-agent | — |
| ↳ US-016-T2 | Task | Persist title once | — | backend-agent | — |
| ↳ US-016-T3 | Task | Display title in sidebar | — | frontend-agent | — |
| US-017 | Story | Delete a conversation | 2 | frontend-agent | US-013 |
| ↳ US-017-T1 | Task | Implement DELETE /conversations/{id} endpoint | — | backend-agent | — |
| ↳ US-017-T2 | Task | Add delete control with confirmation | — | frontend-agent | — |
| ↳ US-017-T3 | Task | Clear dashboard on deleting open conversation | — | frontend-agent | — |
| US-019 | Story | History survives page refresh and re-login | 3 | backend-agent | US-018, US-013, US-014 |
| ↳ US-019-T1 | Task | Reload state from API on mount/refresh | — | frontend-agent | — |
| ↳ US-019-T2 | Task | Verify persistence across logout/login | — | qa-agent | — |
| ↳ US-019-T3 | Task | Confirm ordered history read path | — | backend-agent | — |
| US-020 | Story | Conversations visible only to their owner | 3 | security-agent | US-005, US-013, US-014, US-017 |
| ↳ US-020-T1 | Task | Enforce ownership filter on all queries | — | security-agent | — |
| ↳ US-020-T2 | Task | Return 403/404 for cross-user access | — | security-agent | — |
| ↳ US-020-T3 | Task | Add cross-user access security tests | — | qa-agent | — |
| US-021 | Story | Simple, clean, responsive layout that works on a phone | 5 | frontend-agent | US-007, US-004 |
| ↳ US-021-T1 | Task | Build responsive dashboard layout | — | frontend-agent | — |
| ↳ US-021-T2 | Task | Add sidebar toggle for phone widths | — | frontend-agent | — |
| ↳ US-021-T3 | Task | Implement auto-scroll to latest message | — | frontend-agent | — |
| ↳ US-021-T4 | Task | Verify Login/Sign-up responsiveness | — | qa-agent | — |
| US-022 | Story | Setup and run instructions | 2 | devops-agent | — |
| ↳ US-022-T1 | Task | Write README setup instructions | — | devops-agent | — |
| ↳ US-022-T2 | Task | Document environment configuration | — | devops-agent | — |
| ↳ US-022-T3 | Task | Verify end-to-end setup on a clean machine | — | qa-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
