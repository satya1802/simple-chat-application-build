# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:overview

Product owner approved an exact technology stack for a lightweight-scope build: FastAPI 0.115 backend, AWS cloud, PostgreSQL 16 database, React 19 frontend, with OpenAI as the sole AI provider.

Delivery scope: lightweight. Requirements version 1. Stack is fixed, not to be substituted: Backend=FastAPI 0.115 (auth, bcrypt, JWT, Postgres writes, OpenAI calls); Cloud=AWS (hosts backend, static frontend, and Postgres in one account, server-side OpenAI key); Database=PostgreSQL 16 (users/conversations/messages tables, DB-enforced ownership); Frontend=React 19 (single SPA screen behind login: sidebar, thread, input). Runtime service: OpenAI (SaaS), env var OPENAI_API_KEY, used for hosted chat completions with prior messages as context. Required API keys: OPENAI_API_KEY.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004

### REQ-SCOPE · approved · source: requirements:overview

Explicit scope boundaries were agreed to keep the build simple: no native app, no user-to-user features, no password reset, no streaming, no billing, no admin tooling.

Out of scope: native mobile app (responsive web covers phones); user-to-user messaging; file/image attachments; voice input; file-upload document search. Also explicitly excluded within capabilities: no password reset/forgotten-password flow; signup captures only username+password (no email); replies render only when complete (no word-by-word streaming); app is entirely free (no payments/plans/charging); no admin role, user management screen, or usage limits.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004

### REQ-EPIC-001 · draft · source: requirements:EPIC-001

Open self-registration and username/password auth. Only the Login page (with Sign-up link) is reachable pre-auth; JWT issued on login, discarded on logout.

Covers account creation, bcrypt password storage, login, pre-auth route gating, auth-rejection on chat endpoints, and logout. Assumptions: JWT access token only, no server-side session store, no refresh-token flow; no email field/verification/password reset; no admin role, user management, or moderation; app is entirely free.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006

### REQ-EPIC-002 · draft · source: requirements:EPIC-002

The signed-in Chat Dashboard experience: sidebar, chat thread, input, Send, Logout, with AI replies from a hosted model.

User sends a message; backend forwards conversation to a hosted LLM (OpenAI) and the reply appears in-thread. Assumptions: OpenAI is the default hosted provider via OPENAI_API_KEY, no model trained/self-hosted; earlier messages sent as context; replies render only when complete (no streaming); only AI chat is supported -- no user-to-user messaging, attachments, voice, or document search.

**Related:** US-007, US-008, US-009, US-010, US-011, US-012

### REQ-EPIC-003 · draft · source: requirements:EPIC-003

ChatGPT-style conversation management (list, replay, new, switch, delete, auto-title) backed by durable PostgreSQL storage, scoped per user.

Sidebar lists the signed-in user's own conversations; selecting one replays messages; New Chat/switch/delete supported; titles auto-derived from first message. Every message persisted with a timestamp as it happens so history survives refresh and re-login. Assumption: conversation management was not in the original uploaded document and was agreed during elicitation; no sharing, no admin view -- a user only ever sees their own conversations.

**Related:** US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020

### REQ-EPIC-004 · draft · source: requirements:EPIC-004

Cross-cutting delivery requirements: simple, clean, responsive UI that works on phones, plus setup/run documentation.

React + TypeScript frontend, FastAPI backend, PostgreSQL; responsive layout for phone and desktop; README-level setup and run instructions. Assumptions: native mobile app explicitly excluded; no billing capability; no per-user usage limits or hardening beyond stated requirements -- simplicity favoured over hardening at this scope.

**Related:** US-021, US-022

### REQ-US-001 · draft · source: requirements:US-001

[critical] New visitors can self-register via a Sign-up link using only a username and password.

AC-001: Sign-up form asks only for username+password, no email field. AC-002: unique username+password creates an account in PostgreSQL usable immediately, no approval step, user lands signed in or able to log in. AC-003: duplicate username ('alice') blocks creation with inline 'username taken' error, entered username retained. AC-004: empty username or password blocks creation with field-specific inline validation message.

**Related:** EPIC-001, AC-001, AC-002, AC-003, AC-004

### REQ-US-002 · draft · source: requirements:US-002

[critical] Passwords must be stored only as bcrypt hashes, never in plain text.

AC-005: stored value is a bcrypt hash; plaintext password appears nowhere in DB, logs, or API responses. AC-006: identical passwords across two users produce different hashes (per-user salting). AC-007: login verifies password against the stored bcrypt hash.

**Related:** EPIC-001, AC-005, AC-006, AC-007

### REQ-US-003 · draft · source: requirements:US-003

[critical] Registered users log in with username/password and receive a JWT that unlocks the Chat Dashboard.

AC-008: correct credentials issue a JWT, stored by the React app, and redirect to the Chat Dashboard. AC-009: unknown username or wrong password yields one generic inline error that does not reveal whether the username exists. AC-010: no password reset/forgotten-password link is offered on the Login page.

**Related:** EPIC-001, AC-008, AC-009, AC-010

### REQ-US-004 · draft · source: requirements:US-004

[critical] Before authentication, only the Login page (with Sign-up link) is reachable -- no chat content is exposed.

AC-011: unauthenticated visit to the root or a direct Chat Dashboard URL shows only the Login page; no sidebar, conversation list, or history renders. AC-012: the only navigation offered pre-auth is the Sign-up link.

**Related:** EPIC-001, AC-011, AC-012

### REQ-US-005 · draft · source: requirements:US-005

[critical] All chat/conversation API endpoints must reject unauthenticated or invalid-token requests.

AC-013: any chat/conversation endpoint called with no Authorization token returns 401 and performs no read/write. AC-014: same for malformed, tampered, or expired JWTs. AC-015: on receiving a 401 from any chat endpoint, the React app discards the stored token and returns the user to the Login page.

**Related:** EPIC-001, AC-013, AC-014, AC-015

### REQ-US-006 · draft · source: requirements:US-006

[high] A Logout control ends the session and returns the user to the Login page, leaving no trace for the next browser user.

AC-016: Logout discards the stored JWT and returns to the Login page. AC-017: after logout, Back button or direct Chat Dashboard URL re-entry shows the Login page with no previous conversation content.

**Related:** EPIC-001, AC-016, AC-017

### REQ-US-007 · draft · source: requirements:US-007

[critical] Signed-in users land on a Chat Dashboard with sidebar, history pane, input, Send, and Logout.

AC-018: dashboard renders sidebar, chat history pane, message input, Send button, Logout control after successful sign-in. AC-019: with no conversation selected, an empty state invites the first message; input and Send remain available.

**Related:** EPIC-002, AC-018, AC-019

### REQ-US-008 · draft · source: requirements:US-008

[critical] Users can send a message and see the AI assistant's reply appear in the thread.

AC-020: Send/Enter adds the user's message to the pane immediately, attributed to them, and clears the input. AC-021: the complete model reply appears below it, attributed to the assistant, in chronological order. AC-022: no word-by-word streaming -- reply appears only once complete. AC-023: empty or whitespace-only input sends nothing.

**Related:** EPIC-002, AC-020, AC-021, AC-022, AC-023

### REQ-US-009 · draft · source: requirements:US-009

[high] Earlier messages in the current conversation are sent to the model as context so replies follow the thread.

AC-024: backend includes the active conversation's prior messages, in order, in the model request. AC-025: a follow-up referencing an earlier stated fact (e.g. the user's name) gets a reply that reflects it. AC-026: starting a New Chat sends only that conversation's messages as context, excluding other conversations.

**Related:** EPIC-002, AC-024, AC-025, AC-026

### REQ-US-010 · draft · source: requirements:US-010

[high] A visible typing/pending indicator shows while the assistant's reply is being generated.

AC-027: indicator shown in the pane where the reply will appear once the model call is in flight. AC-028: indicator is replaced by the reply when it arrives. AC-029: Send button is disabled or otherwise blocked from a second submission while a reply is pending.

**Related:** EPIC-002, AC-027, AC-028, AC-029

### REQ-US-011 · draft · source: requirements:US-011

[high] A clear inline error is shown in the thread when the AI call fails, without losing the user's message.

AC-030: on failure/timeout/error (including missing/invalid OPENAI_API_KEY), the pending indicator is removed and an inline error explains the reply could not be generated. AC-031: the user's own message remains and they can retry. AC-032: no fabricated or partial assistant reply is saved for a failed call.

**Related:** EPIC-002, AC-030, AC-031, AC-032

### REQ-US-012 · draft · source: requirements:US-012

[high] The backend calls a hosted OpenAI model using an OPENAI_API_KEY from configuration; the key never reaches the browser.

AC-033: with OPENAI_API_KEY present, backend calls OpenAI Chat Completions and returns the reply. AC-034: missing key at startup/first request logs a configuration error and the user sees the inline failed-reply error, not a blank/hanging screen. AC-035: the key is never exposed in API responses or the frontend bundle -- all model calls are server-side.

**Related:** EPIC-002, AC-033, AC-034, AC-035

### REQ-US-013 · draft · source: requirements:US-013

[critical] The sidebar lists the signed-in user's own past conversations.

AC-036: sidebar lists all saved conversations by title, most recently active first. AC-037: with no saved conversations, sidebar shows an empty state plus a New Chat control. AC-038: the currently open conversation is visibly highlighted as selected.

**Related:** EPIC-003, AC-036, AC-037, AC-038

### REQ-US-014 · draft · source: requirements:US-014

[critical] Selecting a sidebar conversation replays all of its messages in order.

AC-039: clicking a conversation replaces the pane with its user/assistant messages in chronological order. AC-040: a new message sent while that conversation is open is appended and saved to that same conversation, not elsewhere.

**Related:** EPIC-003, AC-039, AC-040

### REQ-US-015 · draft · source: requirements:US-015

[high] Users can start a New Chat and switch freely between conversations without losing state.

AC-041: New Chat clears the pane to an empty conversation. AC-042: sending the first message in a New Chat creates a new conversation record that appears in the sidebar. AC-043: switching from conversation A to B and back to A shows A's full history unchanged.

**Related:** EPIC-003, AC-041, AC-042, AC-043

### REQ-US-016 · draft · source: requirements:US-016

[medium] Each conversation is auto-titled from its first message.

AC-044: title derived from the first message appears in the sidebar. AC-045: long first messages produce a truncated, layout-safe title. AC-046: title is set once and does not change on later messages; manual renaming is not part of this version.

**Related:** EPIC-003, AC-044, AC-045, AC-046

### REQ-US-017 · draft · source: requirements:US-017

[medium] Users can delete a conversation from the sidebar, with ownership enforced.

AC-047: delete + confirm removes the conversation and its messages from PostgreSQL and the sidebar. AC-048: deleting the currently open conversation clears the pane to the New Chat empty state. AC-049: a delete request against another user's conversation id is refused and nothing is deleted.

**Related:** EPIC-003, AC-047, AC-048, AC-049

### REQ-US-018 · draft · source: requirements:US-018

[critical] Every user message and AI reply is written to PostgreSQL with a timestamp as it happens.

AC-050: user message row written with conversation id, role=user, text, timestamp. AC-051: assistant reply row written with conversation id, role=assistant, text, timestamp. AC-052: reopened conversation replays messages in timestamp order with roles correctly distinguished.

**Related:** EPIC-003, AC-050, AC-051, AC-052

### REQ-US-019 · draft · source: requirements:US-019

[critical] Chat history must survive a page refresh and a full logout/re-login cycle.

AC-053: refreshing the browser with an open conversation restores the same conversation list and messages from PostgreSQL after re-authentication. AC-054: logging out, closing the browser, and logging back in later as the same user shows the full conversation list and messages again.

**Related:** EPIC-003, AC-053, AC-054

### REQ-US-020 · draft · source: requirements:US-020

[critical] Conversations are visible only to the user who created them; no admin/cross-user view exists.

AC-055: user A's sidebar lists only A's conversations, none of B's. AC-056: user A requesting user B's conversation with A's token is refused (404/403) and no B data returned. AC-057: no administrative or cross-user conversation view exists anywhere in the deployed app.

**Related:** EPIC-003, AC-055, AC-056, AC-057

### REQ-US-021 · draft · source: requirements:US-021

[high] The UI must be simple, clean, and responsive, including a usable phone-width layout.

AC-058: desktop width shows sidebar and chat pane side by side with input/Send accessible at the bottom. AC-059: phone width (~375px) adapts without horizontal scrolling, sidebar reachable e.g. via toggle. AC-060: Login/Sign-up pages fully usable at phone width without horizontal scrolling. AC-061: chat pane auto-scrolls to the latest message on both phone and desktop widths.

**Related:** EPIC-004, AC-058, AC-059, AC-060, AC-061

### REQ-US-022 · draft · source: requirements:US-022

[medium] Written setup and run instructions let a builder or tester run the full stack locally.

AC-062: README lists prerequisites and install/run steps for the React+TypeScript frontend and FastAPI backend. AC-063: README configuration section names required env vars -- PostgreSQL connection, JWT signing secret, OPENAI_API_KEY -- with an example config file. AC-064: following instructions on a clean machine creates the users/conversations/messages schema and allows register, login, and receiving an AI reply end to end.

**Related:** EPIC-004, AC-062, AC-063, AC-064
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-10-16

**Capabilities in scope:** Username and password login with bcrypt-hashed passwords, Open self-registration from a Sign-up link, with unique usernames, Chat Dashboard with sidebar, history pane, message input and Send button, AI assistant reply in the thread, with earlier messages sent as context, Every user message and AI reply saved with a timestamp, Chat history that survives page refresh and re-login, Sidebar list of the signed-in user's own past conversations, Replay of a selected conversation's messages, New Chat, switching between conversations and deleting a conversation, Automatic conversation titles taken from the first message, Typing / pending indicator while the reply is being generated, Inline error message when the model call fails, Logout that discards the session and returns to the Login page, Chat endpoints that reject unauthenticated requests, Conversations visible only to the user who created them, Simple, clean responsive layout that works in a phone browser, Setup and run instructions for the app, OpenAI hosted models for AI replies, using an OPENAI_API_KEY, JWT access token sessions issued at login, discarded at logout, Signup captures username and password only — no email address, No password reset or forgotten-password flow, Reply shown when complete, no word-by-word streaming, Entirely free — no payments, plans or per-message charging, No admin role, user management screen or usage limits

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | This is what your document specifies and it is the right fit: the backend's whole job is to register and log in users with bcrypt, issue a JWT, store each message in PostgreSQL, and call OpenAI with the prior messages as context. Being Python, it sits directly on OpenAI's official library, so the AI call is a few lines rather than an integration project. |
| cloud | AWS | You need somewhere to run the FastAPI service, serve the React app and host the Postgres database, with the OpenAI key held as a server-side secret so it never reaches the browser. AWS covers all three in one account, and at demo volume — you plus a handful of testers — this sits at the small end of its pricing. |
| database | PostgreSQL | Your requirement is that history survives a refresh and a re-login, and that each user only ever sees their own conversations. That is exactly the shape Postgres handles best: a users table, a conversations table and a messages table with timestamps, with the ownership rule enforced by the database itself rather than trusted to the UI. It is also what your document names. |
| frontend | React | Your build note asks for React + TypeScript, and that is exactly what this is. The app is one screen behind a login — a sidebar of past conversations, a message thread, an input box — all of it rendered in the browser after the user signs in, with nothing public to show to search engines. A plain React single-page app keeps the whole thing to one simple front end that talks to your FastAPI backend, which matches your stated preference for simplicity over hardening on a demo project. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Account Creation, Login and Session Handling

Open self-registration and username/password authentication for the AI chat app. Before authentication the only page available is the Login page, which carries a Sign-up link. Registration captures a username and a password only; usernames must be unique and passwords are stored hashed with bcrypt. A successful login issues a JWT access token held by the React app; Logout discards it and returns the user to the Login page.

Assumptions surfaced from the confirmed understanding:
- Sessions use a JWT access token issued by FastAPI and stored by the React client; there is no server-side session store and no refresh-token flow.
- Registration captures username and password only — no email address, no email verification and no 'forgot password' / password reset flow. If an email field on the signup form is wanted, that is a change of scope.
- There is no admin role, no user management screen, no moderation and no per-user usage limits; this is a demo/learning project for the builder and a handful of testers, so simplicity is favoured over hardening.
- The app is entirely free: no payments, plans, billing or per-message charging anywhere in the product.

### US-001: Create an account by self-registration

**Priority:** critical

> As a new visitor, I want to create my own account from a Sign-up link on the Login page using a username and password, so that I can start using the AI chat assistant without needing an invitation or approval.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the Login page and not signed in | I click the Sign-up link | I am taken to a registration form that asks for a username and a password and nothing else (no email address field, in line with the confirmed assumption that signup captures username and password only) |
| AC-002 | I am on the registration form | I submit a username that no existing account uses, together with a password | an account is created in PostgreSQL, the account is usable immediately with no invitation or admin approval step, and I am taken to the Chat Dashboard signed in (or to the Login page able to sign in with those credentials) |
| AC-003 | an account with the username 'alice' already exists | I submit the registration form with the username 'alice' | no second account is created and the form shows a clear inline error stating that the username is already taken, with my entered username still visible so I can change it |
| AC-004 | I am on the registration form | I submit it with the username or the password left empty | no account is created and the form shows an inline validation message naming the missing field |

### US-002: Passwords stored hashed with bcrypt

**Priority:** critical

> As a registered user, I want my password to be stored only as a bcrypt hash, so that my password is not readable by anyone who can see the database.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | I have just registered with a password | the user row is inspected in PostgreSQL | the stored value is a bcrypt hash and the plain-text password appears nowhere in the users table, in logs or in any API response |
| AC-006 | two users register with the identical password text | their stored password hashes are compared | the hashes differ, confirming bcrypt per-user salting |
| AC-007 | a stored bcrypt hash for my account | I log in with the correct password | the backend verifies the password against the hash and authentication succeeds |

### US-003: Log in with username and password

**Priority:** critical

> As a registered user, I want to sign in with my username and password and receive a session token, so that I can reach my Chat Dashboard and my own conversations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | I have a registered account | I submit the Login form with my correct username and password | the FastAPI backend issues a JWT access token, the React app stores it, and I am taken to the Chat Dashboard |
| AC-009 | I am on the Login page | I submit an unknown username, or a known username with the wrong password | no token is issued and the page shows a single clear inline error that does not reveal whether the username exists |
| AC-010 | I have forgotten my password | I look at the Login page | no password reset or forgotten-password link is offered, consistent with the confirmed assumption that no reset flow is built in this version |

### US-004: Only the Login page is reachable before authentication

**Priority:** critical

> As a unauthenticated visitor, I want to see only the Login page (with its Sign-up link) until I sign in, so that no chat content or dashboard is exposed to anyone who is not signed in.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | I am not signed in and hold no valid token | I open the application root or type the Chat Dashboard URL directly | I am shown the Login page and no sidebar, conversation list or chat history pane is rendered |
| AC-012 | I am not signed in | I view the Login page | the only navigation offered is the Sign-up link to the registration form |

### US-005: Chat endpoints reject unauthenticated requests

**Priority:** critical

> As a user of the system, I want every chat and conversation API endpoint to refuse requests without a valid token, so that conversations cannot be read or changed by an unauthenticated caller.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | a chat or conversation endpoint (send message, list conversations, read a conversation, create, delete) | it is called with no Authorization token | the backend returns 401 Unauthorized and performs no read or write |
| AC-014 | a chat or conversation endpoint | it is called with a malformed, tampered or expired JWT | the backend returns 401 Unauthorized and performs no read or write |
| AC-015 | I am using the app and my token has expired or been rejected | the React app receives a 401 from any chat endpoint | the stored token is discarded and I am returned to the Login page |

### US-006: Log out and return to the Login page

**Priority:** high

> As a signed-in user, I want a Logout control that ends my session, so that the next person using the browser cannot see my conversations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am signed in on the Chat Dashboard | I click Logout | the React app discards the stored JWT access token and I am returned to the Login page |
| AC-017 | I have just logged out | I press the browser Back button or re-enter the Chat Dashboard URL | the Login page is shown and no previous conversation content is displayed |

## EPIC-002: Chat Dashboard and AI Assistant Replies

The signed-in experience: a Chat Dashboard made up of a sidebar, a chat history pane, a message input, a Send button and a Logout control. The user types a message, the FastAPI backend sends the conversation to a hosted language model, and the assistant's reply appears in the thread.

Assumptions surfaced from the confirmed understanding:
- AI replies come from a hosted language model API — OpenAI by default. The backend requires an OPENAI_API_KEY supplied by configuration. No model is trained or self-hosted.
- Earlier messages in the conversation are sent to the model as context so replies follow the thread.
- Replies are rendered when complete; there is no word-by-word streaming in this version.
- The user chats only with the AI assistant. User-to-user messaging, file/image attachments, voice input and uploading documents for the AI to search are explicitly out of scope.

### US-007: Land on the Chat Dashboard after login

**Priority:** critical

> As a signed-in user, I want a Chat Dashboard with a sidebar, chat history pane, message input, Send button and Logout, so that everything I need to chat is in one familiar place.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | I have just signed in successfully | the Chat Dashboard loads | I can see a sidebar, a chat history pane, a message input field, a Send button and a Logout control |
| AC-019 | I am on the Chat Dashboard with no conversation selected | I look at the chat history pane | an empty state is shown inviting me to type my first message, and the message input and Send button are available |

### US-008: Send a message and receive an AI reply

**Priority:** critical

> As a signed-in user, I want to type a message, send it, and see the assistant's reply in the thread, so that I can hold a conversation with the AI assistant.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I am on the Chat Dashboard with the message input focused | I type a message and click Send (or press Enter) | my message appears immediately in the chat history pane attributed to me, and the input is cleared |
| AC-021 | my message has been sent to the backend | the hosted language model returns a reply | the complete reply appears in the thread attributed to the assistant, below my message, in chronological order |
| AC-022 | the model is generating a reply | I look at the chat pane | the reply is not rendered word by word; it appears only once it is complete (no streaming in this version, per the confirmed assumption) |
| AC-023 | the message input is empty or contains only whitespace | I click Send | nothing is sent and no empty message is added to the thread |

### US-009: Earlier messages sent to the model as context

**Priority:** high

> As a signed-in user, I want my earlier messages in the current conversation to be sent to the model with each new message, so that the assistant's replies follow the thread instead of treating each message in isolation.

| ID | Given | When | Then |
|---|---|---|---|
| AC-024 | a conversation that already contains earlier user messages and assistant replies | I send a new message in that conversation | the backend includes the earlier messages of that same conversation, in order, in the request to the hosted model (assumption: context is assembled from the conversation's stored history) |
| AC-025 | I told the assistant my name in an earlier message of the current conversation | I ask a follow-up that depends on it | the reply reflects the earlier message, demonstrating that thread context was supplied |
| AC-026 | I start a New Chat | I send my first message in it | only that conversation's messages are sent as context; messages from my other conversations are not included |

### US-010: Typing / pending indicator while waiting for a reply

**Priority:** high

> As a signed-in user, I want a visible typing or pending indicator while the reply is being generated, so that I know the assistant is working and do not think the app has frozen.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | I have just sent a message | the backend call to the model is in flight | a typing/pending indicator is shown in the chat history pane where the reply will appear |
| AC-028 | the typing indicator is showing | the assistant's reply arrives and is rendered | the indicator is removed and replaced by the reply |
| AC-029 | a reply is pending | I look at the Send button | it is disabled or otherwise prevents a second message being submitted until the pending reply resolves or fails |

### US-011: Inline error when the model call fails

**Priority:** high

> As a signed-in user, I want a clear inline error in the thread when the AI call fails, so that I understand what happened and can try again.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I have sent a message | the hosted model call fails, times out or returns an error (including a missing or invalid OPENAI_API_KEY) | the typing indicator is removed and an inline error message is shown in the chat thread explaining that the reply could not be generated |
| AC-031 | an inline error has been shown for a failed reply | I look at the thread | my own message is still present and I can send another message or retry |
| AC-032 | a model call has failed | the conversation is reloaded | no fabricated or partial assistant reply has been saved for the failed call |

### US-012: Hosted model configured by API key

**Priority:** high

> As a person running the app, I want the backend to call a hosted OpenAI model using an OPENAI_API_KEY from configuration, so that replies are generated without training or self-hosting any model.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | an OPENAI_API_KEY is present in the backend configuration/environment | a user sends a message | the backend calls the hosted OpenAI chat completion API and returns the reply to the client (assumption: OpenAI is the default hosted provider; no model is trained or self-hosted) |
| AC-034 | the OPENAI_API_KEY is absent at startup | the backend starts or the first chat request is made | a clear configuration error is logged and the user sees the inline failed-reply error rather than a blank or hanging screen |
| AC-035 | the configured API key | any API response or frontend bundle is inspected | the key is never exposed to the browser; all model calls are made server-side |

## EPIC-003: Conversation Management and Persistent History

ChatGPT-style conversation management in the sidebar, backed by PostgreSQL. The sidebar lists the signed-in user's own past conversations; selecting one replays its messages, and the user can start a New Chat, switch between conversations and delete one. Conversations are auto-titled from the first message. Every user message and AI reply is written to PostgreSQL with a timestamp as it happens, so history survives both a page refresh and a re-login.

Assumption surfaced from the confirmed understanding: conversation management (New Chat, switch, delete, auto-titling) was not in the uploaded document and was agreed during elicitation. A user only ever sees their own conversations; there is no sharing and no admin view.

### US-013: See my past conversations in the sidebar

**Priority:** critical

> As a signed-in user, I want the sidebar to list my past conversations, so that I can find and return to an earlier chat.

| ID | Given | When | Then |
|---|---|---|---|
| AC-036 | I have three saved conversations | the Chat Dashboard loads | the sidebar lists all three by title, most recently active first |
| AC-037 | I have no saved conversations yet | the Chat Dashboard loads | the sidebar shows an empty state and a New Chat control |
| AC-038 | a conversation is currently open | I look at the sidebar | that conversation is visibly highlighted as the selected one |

### US-014: Select a conversation and replay its messages

**Priority:** critical

> As a signed-in user, I want to select a conversation in the sidebar and see all of its messages in the chat pane, so that I can pick up an earlier chat where I left off.

| ID | Given | When | Then |
|---|---|---|---|
| AC-039 | the sidebar lists my conversations | I click one of them | the chat history pane is replaced by that conversation's user messages and assistant replies in chronological order |
| AC-040 | a conversation is open | I send a new message | it is appended to that same conversation and saved against it, not to a different conversation |

### US-015: Start a New Chat and switch between conversations

**Priority:** high

> As a signed-in user, I want to start a New Chat and switch freely between my conversations, so that I can keep separate topics apart.

| ID | Given | When | Then |
|---|---|---|---|
| AC-041 | I am on the Chat Dashboard | I click New Chat | the chat history pane is cleared to an empty conversation ready for my first message |
| AC-042 | I have started a New Chat and sent my first message | the message is saved | a new conversation record is created for me and appears in the sidebar list |
| AC-043 | I am partway through conversation A | I switch to conversation B and then back to A | conversation A's full message history is shown again unchanged |

### US-016: Conversations auto-titled from the first message

**Priority:** medium

> As a signed-in user, I want each conversation to be titled automatically from its first message, so that I can recognise conversations in the sidebar without naming them myself.

| ID | Given | When | Then |
|---|---|---|---|
| AC-044 | I start a New Chat | I send the first message in it | the conversation is given a title derived from that first message and the title appears in the sidebar |
| AC-045 | a first message that is long | the title is generated | the title is truncated to a short readable length so the sidebar layout is not broken |
| AC-046 | a conversation already has an auto-generated title | I send further messages in it | the title stays as it was (assumption: titles are set once from the first message; manual renaming is not part of this version) |

### US-017: Delete a conversation

**Priority:** medium

> As a signed-in user, I want to delete a conversation from the sidebar, so that I can clear out chats I no longer want.

| ID | Given | When | Then |
|---|---|---|---|
| AC-047 | a conversation listed in my sidebar | I choose its delete action and confirm | the conversation and its messages are removed from PostgreSQL and the conversation disappears from the sidebar |
| AC-048 | I delete the conversation that is currently open | the deletion completes | the chat history pane is cleared to the New Chat empty state |
| AC-049 | another user's conversation id | a delete request is made for it with my token | the backend refuses the request and the conversation is not deleted |

### US-018: Messages saved with timestamps as they happen

**Priority:** critical

> As a signed-in user, I want every message I send and every reply I receive to be written to PostgreSQL with a timestamp immediately, so that nothing I say or receive is lost.

| ID | Given | When | Then |
|---|---|---|---|
| AC-050 | I send a message | the backend handles the request | a message row is written to PostgreSQL recording the conversation, the sender role (user), the text and a timestamp |
| AC-051 | the assistant's reply is returned by the model | the backend handles it | a message row is written recording the conversation, the sender role (assistant), the reply text and a timestamp |
| AC-052 | a conversation containing several messages | it is reopened | the messages are replayed in timestamp order with user and assistant turns correctly distinguished |

### US-019: History survives page refresh and re-login

**Priority:** critical

> As a signed-in user, I want my conversations and their messages to still be there after I refresh the page or log out and back in, so that my chat history is genuinely persistent and not just held in the browser.

| ID | Given | When | Then |
|---|---|---|---|
| AC-053 | I have an open conversation with several messages | I refresh the browser page | after re-authentication state is restored I see the same conversation list and the same messages, loaded from PostgreSQL |
| AC-054 | I have conversations saved | I log out, close the browser, and log in again later as the same user | my full conversation list and each conversation's messages are available again |

### US-020: Conversations visible only to their owner

**Priority:** critical

> As a signed-in user, I want my conversations to be visible only to me, so that other users of the demo cannot read my chats.

| ID | Given | When | Then |
|---|---|---|---|
| AC-055 | user A and user B both have conversations | user A loads the Chat Dashboard | the sidebar lists only user A's conversations and none of user B's |
| AC-056 | user B's conversation id | user A requests that conversation's messages using user A's token | the backend refuses the request (404 or 403) and returns none of user B's messages |
| AC-057 | the deployed app | any user looks for an administrative or cross-user view of conversations | none exists, consistent with the confirmed assumption that there is no admin role, user management screen or moderation in this version |

## EPIC-004: Responsive Interface and Running the App

The cross-cutting delivery requirements for this demo/learning project: a simple, clean, responsive React + TypeScript interface that works in a phone browser, a FastAPI (Python) backend with PostgreSQL, and setup and run instructions so the builder and a handful of testers can get it running.

Assumptions surfaced from the confirmed understanding:
- A native mobile app is explicitly excluded; the responsive web UI covers phones.
- The app is entirely free — there are no payments, plans, billing or per-message charging screens anywhere, so no billing capability is drafted.
- There are no per-user usage limits, abuse protection or hardening requirements beyond those stated, as simplicity is explicitly favoured over hardening at this scope.

### US-021: Simple, clean, responsive layout that works on a phone

**Priority:** high

> As a user on a phone or a desktop browser, I want a simple, clean layout that adapts to my screen size, so that I can chat comfortably without needing a native app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-058 | the Chat Dashboard on a desktop-width browser | it renders | the sidebar and the chat history pane are shown side by side with the input and Send button accessible at the bottom |
| AC-059 | the Chat Dashboard on a phone-width browser (around 375px wide) | it renders | the layout adapts so the chat pane, message input and Send button are usable without horizontal scrolling, and the conversation sidebar is reachable (for example via a toggle) |
| AC-060 | the Login and Sign-up pages on a phone-width browser | they render | the fields and buttons are fully visible and usable without horizontal scrolling |
| AC-061 | a long conversation | new messages are added | the chat pane scrolls to show the latest message on both phone and desktop widths |

### US-022: Setup and run instructions

**Priority:** medium

> As a builder or tester of this demo, I want written instructions for setting up and running the app, so that I can get the frontend, backend and database running locally without guesswork.

| ID | Given | When | Then |
|---|---|---|---|
| AC-062 | the repository | I open the README | it lists prerequisites and the steps to install and run the React + TypeScript frontend and the FastAPI (Python) backend |
| AC-063 | the README | I follow the configuration section | it names the required environment variables, including the PostgreSQL connection details, the JWT signing secret and the OPENAI_API_KEY, with an example configuration file |
| AC-064 | a clean machine with the prerequisites installed | I follow the instructions end to end | the database schema for users, conversations and messages is created and I can register an account, log in and receive an AI reply |
<!-- sdlc:auto:end epics -->
