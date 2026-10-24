# Test Cases

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
117 test cases · 117 approved · 0 draft · Passed 0 · Failed 0 · Skipped 0 · Not automated 0 · Not run 117

Acceptance criteria covered: 64/64 · passing: 0/64 · No E2E run yet
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start cases -->
## Sprint 1: Sprint 1 - Auth Foundation

### US-001: Create an account by self-registration

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-001 | AC-001 | e2e | Sign-up link opens registration form with only username and password fields | approved | not run |
| TC-002 | AC-002 | e2e | Successful registration with a unique username creates a usable account | approved | not run |
| TC-003 | AC-002 | e2e | Newly registered account can sign in right away without approval | approved | not run |
| TC-004 | AC-003 | e2e | Registering with an already-taken username is rejected with inline error | approved | not run |
| TC-005 | AC-004 | e2e | Submitting registration form with empty username shows validation error | approved | not run |
| TC-006 | AC-004 | e2e | Submitting registration form with empty password shows validation error | approved | not run |

#### TC-001: Sign-up link opens registration form with only username and password fields

**Criterion:** AC-001 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is on the Login page and not signed in

**Steps:**

1. Open the Login page
2. Click the Sign-up link
3. Observe the registration form that appears

**Expected result:** The registration form is displayed with exactly a username field and a password field; no email address field or any other field is present

#### TC-002: Successful registration with a unique username creates a usable account

**Criterion:** AC-002 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** No existing account uses the username 'newuser1'

**Steps:**

1. Open the registration form
2. Enter 'newuser1' in the username field
3. Enter 'SecurePass123' in the password field
4. Submit the registration form

**Expected result:** The account is created and immediately usable; the user is taken to the Chat Dashboard signed in, or to the Login page where signing in with 'newuser1' and 'SecurePass123' succeeds, with no invitation or approval step required

#### TC-003: Newly registered account can sign in right away without approval

**Criterion:** AC-002 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** An account with username 'newuser2' was just created via registration and no sign-in occurred automatically

**Steps:**

1. Register a new account with username 'newuser2' and password 'AnotherPass1'
2. Navigate to the Login page
3. Enter 'newuser2' and 'AnotherPass1'
4. Click the sign-in button

**Expected result:** Sign-in succeeds immediately and the user lands on the Chat Dashboard, confirming no invitation or admin approval is needed

#### TC-004: Registering with an already-taken username is rejected with inline error

**Criterion:** AC-003 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** An account with username 'alice' already exists

**Steps:**

1. Open the registration form
2. Enter 'alice' in the username field
3. Enter any valid password in the password field
4. Submit the registration form

**Expected result:** No new account is created; an inline error message is shown stating the username is already taken, and the username field still shows 'alice'

#### TC-005: Submitting registration form with empty username shows validation error

**Criterion:** AC-004 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is on the registration form

**Steps:**

1. Leave the username field empty
2. Enter a password in the password field
3. Submit the registration form

**Expected result:** No account is created; an inline validation message is displayed identifying the username field as missing/required

#### TC-006: Submitting registration form with empty password shows validation error

**Criterion:** AC-004 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is on the registration form

**Steps:**

1. Enter a username in the username field
2. Leave the password field empty
3. Submit the registration form

**Expected result:** No account is created; an inline validation message is displayed identifying the password field as missing/required

### US-002: Passwords stored hashed with bcrypt

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-007 | AC-005 | api | Stored password value is a bcrypt hash, not plaintext | approved | not run |
| TC-008 | AC-005 | api | Plain-text password never appears in logs or API responses | approved | not run |
| TC-009 | AC-006 | api | Two users with identical passwords get different stored hashes | approved | not run |
| TC-010 | AC-007 | e2e | User logs in successfully with correct password | approved | not run |
| TC-011 | AC-007 | e2e | Login fails when password does not match stored hash | approved | not run |

#### TC-007: Stored password value is a bcrypt hash, not plaintext

**Criterion:** AC-005 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** A new user account has just been registered with a known plain-text password

**Steps:**

1. Register a new user with password 'TestPass123!'
2. Query the users table/row for the newly registered account via an authorized database inspection tool
3. Inspect the value stored in the password field

**Expected result:** The stored value matches the bcrypt hash format (e.g. starts with $2a$, $2b$ or $2y$ followed by a cost factor and salt/hash string) and is not equal to or derivable as 'TestPass123!'

#### TC-008: Plain-text password never appears in logs or API responses

**Criterion:** AC-005 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** A new user account has just been registered with a known plain-text password

**Steps:**

1. Register a new user with password 'TestPass123!' via the registration API
2. Inspect the full body of the registration API response
3. Inspect application/server logs generated during and immediately after the registration request

**Expected result:** The string 'TestPass123!' does not appear anywhere in the API response body or in the application logs

#### TC-009: Two users with identical passwords get different stored hashes

**Criterion:** AC-006 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** No existing accounts use the test password

**Steps:**

1. Register User A with password 'SamePass456!'
2. Register User B with password 'SamePass456!'
3. Retrieve the stored password hash for User A from the database
4. Retrieve the stored password hash for User B from the database
5. Compare the two hash values

**Expected result:** The two stored hashes are different strings, even though both users registered with the identical password text

#### TC-010: User logs in successfully with correct password

**Criterion:** AC-007 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A user account exists with a password stored as a bcrypt hash

**Steps:**

1. Open the login page
2. Enter the registered username/email
3. Enter the correct plain-text password
4. Click the 'Log In' button

**Expected result:** The backend verifies the entered password against the stored bcrypt hash, authentication succeeds, and the user is logged in and redirected to the chat application

#### TC-011: Login fails when password does not match stored hash

**Criterion:** AC-007 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A user account exists with a password stored as a bcrypt hash

**Steps:**

1. Open the login page
2. Enter the registered username/email
3. Enter an incorrect password
4. Click the 'Log In' button

**Expected result:** Authentication fails, the user is not logged in, and an invalid credentials message is displayed

### US-003: Log in with username and password

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-012 | AC-008 | e2e | Successful login with correct username and password | approved | not run |
| TC-013 | AC-009 | e2e | Login attempt with unknown username shows generic error | approved | not run |
| TC-014 | AC-009 | e2e | Login attempt with correct username but wrong password shows same generic error | approved | not run |
| TC-015 | AC-010 | e2e | Login page does not offer a password reset or forgotten-password link | approved | not run |

#### TC-012: Successful login with correct username and password

**Criterion:** AC-008 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A registered user account exists with a known username and password

**Steps:**

1. Open the Login page
2. Enter the registered username
3. Enter the correct password
4. Click the Login/Submit button

**Expected result:** The user is redirected to the Chat Dashboard and the session is active (subsequent authenticated actions succeed, indicating a token was issued and stored)

#### TC-013: Login attempt with unknown username shows generic error

**Criterion:** AC-009 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** No registered account exists with the username to be entered

**Steps:**

1. Open the Login page
2. Enter a username that is not registered
3. Enter any password
4. Click the Login/Submit button

**Expected result:** No token is issued, the user remains on the Login page, and a single inline error message is shown that does not indicate whether the username exists

#### TC-014: Login attempt with correct username but wrong password shows same generic error

**Criterion:** AC-009 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A registered user account exists with a known username

**Steps:**

1. Open the Login page
2. Enter the registered username
3. Enter an incorrect password
4. Click the Login/Submit button

**Expected result:** No token is issued, the user remains on the Login page, and the same single inline error message is shown as for an unknown username, without revealing that the username exists

#### TC-015: Login page does not offer a password reset or forgotten-password link

**Criterion:** AC-010 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** —

**Steps:**

1. Open the Login page
2. Visually inspect the page for any password reset or forgotten-password link or option

**Expected result:** No 'Forgot password' or password reset link or control is present anywhere on the Login page

### US-004: Only the Login page is reachable before authentication

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-016 | AC-011 | e2e | Root URL redirects unauthenticated visitor to Login page | approved | not run |
| TC-017 | AC-011 | e2e | Direct navigation to Chat Dashboard URL redirects unauthenticated visitor to Login page | approved | not run |
| TC-018 | AC-012 | e2e | Login page offers only the Sign-up link as navigation | approved | not run |
| TC-019 | AC-012 | e2e | Sign-up link on Login page navigates to the registration form | approved | not run |

#### TC-016: Root URL redirects unauthenticated visitor to Login page

**Criterion:** AC-011 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has no valid authentication token and is not signed in

**Steps:**

1. Open the application root URL in a browser with no active session
2. Observe the page that loads

**Expected result:** The Login page is displayed; no sidebar, conversation list or chat history pane is visible anywhere on the page

#### TC-017: Direct navigation to Chat Dashboard URL redirects unauthenticated visitor to Login page

**Criterion:** AC-011 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has no valid authentication token and is not signed in

**Steps:**

1. Type the Chat Dashboard URL directly into the browser address bar
2. Press Enter to navigate to that URL
3. Observe the page that loads

**Expected result:** The Login page is displayed instead of the Chat Dashboard; no sidebar, conversation list or chat history pane is rendered

#### TC-018: Login page offers only the Sign-up link as navigation

**Criterion:** AC-012 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is not signed in and is viewing the Login page

**Steps:**

1. Open the application and land on the Login page
2. Inspect all visible navigation links and menu items on the page

**Expected result:** The only navigation option presented besides the login form is the Sign-up link; no links to chat, dashboard, or other application pages are shown

#### TC-019: Sign-up link on Login page navigates to the registration form

**Criterion:** AC-012 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is not signed in and is viewing the Login page

**Steps:**

1. Open the application and land on the Login page
2. Click the Sign-up link

**Expected result:** The registration form page is displayed

### US-006: Log out and return to the Login page

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-026 | AC-016 | e2e | Clicking Logout ends session and returns to Login page | approved | not run |
| TC-027 | AC-016 | e2e | Logout control is visible and accessible on the Chat Dashboard | approved | not run |
| TC-028 | AC-017 | e2e | Browser Back button after logout shows Login page, not conversation content | approved | not run |
| TC-029 | AC-017 | e2e | Re-entering Chat Dashboard URL after logout redirects to Login page | approved | not run |

#### TC-026: Clicking Logout ends session and returns to Login page

**Criterion:** AC-016 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and viewing the Chat Dashboard

**Steps:**

1. Open the Chat Dashboard while signed in
2. Click the Logout control

**Expected result:** The app navigates to the Login page and the previously stored JWT access token is no longer present (e.g. subsequent protected requests are unauthorized)

#### TC-027: Logout control is visible and accessible on the Chat Dashboard

**Criterion:** AC-016 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and viewing the Chat Dashboard

**Steps:**

1. Open the Chat Dashboard while signed in
2. Look for the Logout control on the page

**Expected result:** A Logout control is visible and clickable on the Chat Dashboard

#### TC-028: Browser Back button after logout shows Login page, not conversation content

**Criterion:** AC-017 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has just logged out of the Chat Dashboard

**Steps:**

1. Log out from the Chat Dashboard
2. Press the browser Back button

**Expected result:** The Login page is shown; no previous conversation content is displayed

#### TC-029: Re-entering Chat Dashboard URL after logout redirects to Login page

**Criterion:** AC-017 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has just logged out of the Chat Dashboard

**Steps:**

1. Log out from the Chat Dashboard
2. Manually enter the Chat Dashboard URL in the browser address bar and navigate to it

**Expected result:** The Login page is shown instead of the Chat Dashboard; no previous conversation content is displayed

## Sprint 2: Sprint 2 - Core Chat Flow

### US-005: Chat endpoints reject unauthenticated requests

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-020 | AC-013 | api | Read-type chat endpoints reject requests with no Authorization token | approved | not run |
| TC-021 | AC-013 | api | Write-type chat endpoints reject requests with no Authorization token | approved | not run |
| TC-022 | AC-014 | api | Chat endpoints reject requests with a malformed or tampered JWT | approved | not run |
| TC-023 | AC-014 | api | Chat endpoints reject requests with an expired JWT | approved | not run |
| TC-024 | AC-015 | e2e | App logs user out and redirects to Login when a chat endpoint returns 401 | approved | not run |
| TC-025 | AC-015 | e2e | User cannot access chat screens after being logged out due to a 401 | approved | not run |

#### TC-020: Read-type chat endpoints reject requests with no Authorization token

**Criterion:** AC-013 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** At least one conversation with messages already exists in the system

**Steps:**

1. Send a GET request to list conversations with no Authorization header
2. Send a GET request to read a specific conversation with no Authorization header

**Expected result:** Both requests return 401 Unauthorized, no conversation or message data is included in the responses, and the underlying conversation data remains unchanged

#### TC-021: Write-type chat endpoints reject requests with no Authorization token

**Criterion:** AC-013 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** At least one existing conversation is available to attempt deletion against

**Steps:**

1. Send a POST request to send a message with no Authorization header
2. Send a POST request to create a new conversation with no Authorization header
3. Send a DELETE request to delete the existing conversation with no Authorization header
4. Re-check the conversation list and the existing conversation's contents using a valid token

**Expected result:** Each unauthenticated write request returns 401 Unauthorized, no new message or conversation is created, and the existing conversation is not deleted or altered

#### TC-022: Chat endpoints reject requests with a malformed or tampered JWT

**Criterion:** AC-014 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** A conversation exists; an obviously malformed token string and a valid token with an altered signature are available

**Steps:**

1. Send a GET request to list conversations with Authorization set to a malformed token string
2. Send a POST request to send a message with Authorization set to a tampered (signature-altered) valid token
3. Verify, using a valid token, that no new message was created

**Expected result:** Both requests return 401 Unauthorized, no message is created, and no conversation data is read or changed

#### TC-023: Chat endpoints reject requests with an expired JWT

**Criterion:** AC-014 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** A token that has already passed its expiration time is available, along with an existing conversation

**Steps:**

1. Send a GET request to read the existing conversation with Authorization set to the expired token
2. Send a DELETE request to delete the existing conversation with Authorization set to the expired token
3. Verify, using a valid token, that the conversation still exists and is unchanged

**Expected result:** Both requests return 401 Unauthorized, the conversation is not deleted, and no conversation data is returned in the read response

#### TC-024: App logs user out and redirects to Login when a chat endpoint returns 401

**Criterion:** AC-015 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is logged into the app with a token that will be rejected by the backend on the next chat request (e.g. expired)

**Steps:**

1. Open the chat screen while logged in
2. Perform an action that calls a chat endpoint (e.g. send a message or open a conversation)
3. Observe the app's response to the resulting 401

**Expected result:** The app discards the stored token and navigates the user to the Login page

#### TC-025: User cannot access chat screens after being logged out due to a 401

**Criterion:** AC-015 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has just been redirected to the Login page after receiving a 401 from a chat endpoint, as in the prior scenario

**Steps:**

1. After being redirected to the Login page, use the browser back button to attempt to return to the chat screen
2. Observe whether chat content loads or the Login page is shown

**Expected result:** No chat data is displayed; the user remains on or is returned to the Login page, confirming the token was discarded

### US-007: Land on the Chat Dashboard after login

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-030 | AC-018 | e2e | Chat Dashboard shows all required elements after successful sign-in | approved | not run |
| TC-031 | AC-018 | e2e | All five dashboard elements are present simultaneously, not partially rendered | approved | not run |
| TC-032 | AC-019 | e2e | Empty state is shown in chat history pane when no conversation is selected | approved | not run |
| TC-033 | AC-019 | e2e | Message input and Send button remain available in the empty state | approved | not run |

#### TC-030: Chat Dashboard shows all required elements after successful sign-in

**Criterion:** AC-018 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has a valid account and is on the sign-in page

**Steps:**

1. Enter valid credentials into the sign-in form
2. Click the sign-in button
3. Observe the page that loads after authentication

**Expected result:** The Chat Dashboard loads displaying a sidebar, a chat history pane, a message input field, a Send button and a Logout control, all visible on screen

#### TC-031: All five dashboard elements are present simultaneously, not partially rendered

**Criterion:** AC-018 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has just signed in and the Chat Dashboard has loaded

**Steps:**

1. Wait for the Chat Dashboard page to finish loading
2. Visually inspect each area of the page: sidebar, chat history pane, message input, Send button, Logout control

**Expected result:** Each of the five elements (sidebar, chat history pane, message input, Send button, Logout control) is visible and none are missing or still loading

#### TC-032: Empty state is shown in chat history pane when no conversation is selected

**Criterion:** AC-019 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is on the Chat Dashboard with no conversation selected

**Steps:**

1. Land on the Chat Dashboard without selecting any conversation from the sidebar
2. Look at the chat history pane

**Expected result:** The chat history pane shows an empty state message inviting the user to type their first message

#### TC-033: Message input and Send button remain available in the empty state

**Criterion:** AC-019 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is on the Chat Dashboard with no conversation selected and the empty state is displayed

**Steps:**

1. Observe the chat history pane showing the empty state
2. Check the message input field
3. Check the Send button

**Expected result:** The message input field is present and accepts focus/typing, and the Send button is visible and enabled, even though no conversation is selected

### US-008: Send a message and receive an AI reply

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-034 | AC-020 | e2e | Send message by clicking Send button | approved | not run |
| TC-035 | AC-020 | e2e | Send message by pressing Enter | approved | not run |
| TC-036 | AC-021 | e2e | Assistant reply appears below user message in order | approved | not run |
| TC-037 | AC-021 | e2e | Multiple exchanges remain in chronological order | approved | not run |
| TC-038 | AC-022 | e2e | Reply appears fully formed, not streamed word by word | approved | not run |
| TC-039 | AC-023 | e2e | Clicking Send with empty input does nothing | approved | not run |
| TC-040 | AC-023 | e2e | Clicking Send with whitespace-only input does nothing | approved | not run |

#### TC-034: Send message by clicking Send button

**Criterion:** AC-020 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard with the message input focused

**Steps:**

1. Click into the message input field
2. Type a message, e.g. 'Hello, how are you?'
3. Click the Send button

**Expected result:** The typed message appears immediately in the chat history pane, attributed to the user, and the message input field is now empty

#### TC-035: Send message by pressing Enter

**Criterion:** AC-020 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard with the message input focused

**Steps:**

1. Click into the message input field
2. Type a message, e.g. 'What is the weather today?'
3. Press the Enter key

**Expected result:** The typed message appears immediately in the chat history pane, attributed to the user, and the message input field is cleared

#### TC-036: Assistant reply appears below user message in order

**Criterion:** AC-021 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard; user has just sent a message that was accepted by the backend

**Steps:**

1. Type a message into the input field
2. Click Send
3. Wait for the assistant's response to be returned

**Expected result:** The complete assistant reply appears in the chat thread, attributed to the assistant, positioned below the user's message, maintaining chronological order

#### TC-037: Multiple exchanges remain in chronological order

**Criterion:** AC-021 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard with at least one prior message/reply exchange already in the thread

**Steps:**

1. Type a second message into the input field
2. Click Send
3. Wait for the assistant's second reply to be returned

**Expected result:** The new user message and the new assistant reply are appended below the previous exchange, with all messages displayed in the correct chronological order

#### TC-038: Reply appears fully formed, not streamed word by word

**Criterion:** AC-022 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard; a message has just been sent and the model is generating a reply

**Steps:**

1. Type a message into the input field
2. Click Send
3. Observe the chat pane closely while waiting for the reply

**Expected result:** No partial or incrementally growing text is displayed while the reply is being generated; the assistant's reply appears in the chat pane only once as a complete block of text

#### TC-039: Clicking Send with empty input does nothing

**Criterion:** AC-023 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard with the message input empty

**Steps:**

1. Leave the message input field empty
2. Click the Send button

**Expected result:** No new message is added to the chat history pane, and the input field remains empty with no error disruption to the thread

#### TC-040: Clicking Send with whitespace-only input does nothing

**Criterion:** AC-023 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard with the message input focused

**Steps:**

1. Type only spaces into the message input field, e.g. '   '
2. Click the Send button

**Expected result:** No new message is added to the chat history pane, and nothing is sent to the backend

### US-012: Hosted model configured by API key

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-058 | AC-033 | e2e | Chat reply is generated via hosted OpenAI model when API key is configured | approved | not run |
| TC-059 | AC-034 | api | Backend logs a clear configuration error at startup when API key is absent | approved | not run |
| TC-060 | AC-034 | e2e | User sees inline failed-reply error when sending a message without a configured API key | approved | not run |
| TC-061 | AC-035 | api | API key is never returned in API responses to the client | approved | not run |
| TC-062 | AC-035 | e2e | API key is never present in the frontend bundle | approved | not run |

#### TC-058: Chat reply is generated via hosted OpenAI model when API key is configured

**Criterion:** AC-033 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Backend is running with a valid OPENAI_API_KEY set in its configuration/environment

**Steps:**

1. Open the chat application
2. Type a message into the chat input
3. Send the message
4. Wait for the response

**Expected result:** A reply from the assistant is displayed in the chat, confirming the backend successfully called the hosted OpenAI chat completion API

#### TC-059: Backend logs a clear configuration error at startup when API key is absent

**Criterion:** AC-034 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** OPENAI_API_KEY is not set in the backend environment

**Steps:**

1. Start the backend service without the OPENAI_API_KEY configured
2. Inspect the backend startup logs

**Expected result:** The logs contain a clear, specific error message indicating the OPENAI_API_KEY configuration is missing

#### TC-060: User sees inline failed-reply error when sending a message without a configured API key

**Criterion:** AC-034 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Backend is running without an OPENAI_API_KEY configured

**Steps:**

1. Open the chat application
2. Type a message into the chat input
3. Send the message
4. Observe the chat interface

**Expected result:** An inline failed-reply error message is shown in the chat; the screen is never blank or stuck hanging/loading indefinitely

#### TC-061: API key is never returned in API responses to the client

**Criterion:** AC-035 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** Backend is configured with a valid OPENAI_API_KEY

**Steps:**

1. Open browser developer tools and go to the Network tab
2. Send a chat message from the application
3. Inspect the response headers and body of the chat request
4. Search the response content for the configured API key value

**Expected result:** The OPENAI_API_KEY value does not appear anywhere in the response headers or body

#### TC-062: API key is never present in the frontend bundle

**Criterion:** AC-035 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Backend is configured with a valid OPENAI_API_KEY

**Steps:**

1. Open the chat application in the browser
2. View the page source and loaded JavaScript bundle files
3. Search the bundle contents for the configured API key value

**Expected result:** The OPENAI_API_KEY value is not found anywhere in the frontend bundle or page source, confirming all model calls are made server-side

## Sprint 3: Sprint 3 - Context, Feedback & Conversation Access

### US-009: Earlier messages sent to the model as context

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-041 | AC-024 | e2e | Earlier messages in a conversation are included, in order, when a new message is sent | approved | not run |
| TC-042 | AC-025 | e2e | Follow-up reply reflects information given earlier in the same conversation | approved | not run |
| TC-043 | AC-025 | e2e | Follow-up in a conversation without prior context does not reflect unseen information | approved | not run |
| TC-044 | AC-026 | e2e | First message in a New Chat sends only that conversation's context | approved | not run |
| TC-045 | AC-026 | e2e | Information from another conversation is not available in a New Chat | approved | not run |

#### TC-041: Earlier messages in a conversation are included, in order, when a new message is sent

**Criterion:** AC-024 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an existing conversation containing at least two prior user messages and two prior assistant replies

**Steps:**

1. Open the existing conversation
2. Open the browser developer tools network panel
3. Type a new message in the message box
4. Send the message
5. Inspect the outgoing request made to the model

**Expected result:** The outgoing request payload contains the earlier user messages and assistant replies from this conversation, listed in the same chronological order they were sent

#### TC-042: Follow-up reply reflects information given earlier in the same conversation

**Criterion:** AC-025 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an active conversation

**Steps:**

1. Open or start a conversation
2. Send a message telling the assistant your name (e.g. 'My name is Alex')
3. Wait for the assistant's reply
4. Send a follow-up message asking 'What is my name?'
5. Wait for the assistant's reply

**Expected result:** The assistant's reply to the follow-up correctly states the name given earlier in the conversation

#### TC-043: Follow-up in a conversation without prior context does not reflect unseen information

**Criterion:** AC-025 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and starts a brand-new conversation where no name has been mentioned

**Steps:**

1. Start a New Chat
2. Send the message 'What is my name?' without having told the assistant a name
3. Wait for the assistant's reply

**Expected result:** The assistant's reply indicates it does not know the user's name, showing no name is fabricated or carried over from another conversation

#### TC-044: First message in a New Chat sends only that conversation's context

**Criterion:** AC-026 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least one existing conversation with prior messages

**Steps:**

1. Open the browser developer tools network panel
2. Click New Chat to start a fresh conversation
3. Type a message in the message box
4. Send the message
5. Inspect the outgoing request made to the model

**Expected result:** The outgoing request contains only the single message just sent and no messages from the earlier, separate conversation

#### TC-045: Information from another conversation is not available in a New Chat

**Criterion:** AC-026 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an existing conversation in which they told the assistant their name

**Steps:**

1. Open the existing conversation and confirm the assistant previously learned the user's name
2. Click New Chat to start a separate conversation
3. Send the message 'What is my name?' in the new conversation
4. Wait for the assistant's reply

**Expected result:** The assistant's reply does not state the name from the other conversation, confirming conversations are isolated

### US-010: Typing / pending indicator while waiting for a reply

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-046 | AC-027 | e2e | Typing indicator appears immediately after sending a message | approved | not run |
| TC-047 | AC-027 | e2e | Typing indicator remains visible for the duration of a slow reply | approved | not run |
| TC-048 | AC-028 | e2e | Typing indicator is replaced by the assistant's reply once it arrives | approved | not run |
| TC-049 | AC-029 | e2e | Send button is disabled while a reply is pending | approved | not run |
| TC-050 | AC-029 | e2e | Send button is re-enabled after the pending reply resolves successfully | approved | not run |
| TC-051 | AC-029 | e2e | Send button is re-enabled after the pending reply fails | approved | not run |

#### TC-046: Typing indicator appears immediately after sending a message

**Criterion:** AC-027 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an open chat conversation

**Steps:**

1. Type a message in the chat input
2. Click the Send button
3. Observe the chat history pane immediately after sending

**Expected result:** A typing/pending indicator is displayed in the chat history pane in the location where the assistant's reply will appear, while the reply is still being generated

#### TC-047: Typing indicator remains visible for the duration of a slow reply

**Criterion:** AC-027 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an open chat conversation; the model response is delayed

**Steps:**

1. Type a message in the chat input
2. Click the Send button
3. Wait several seconds without the reply arriving
4. Observe the chat history pane during the wait

**Expected result:** The typing/pending indicator stays visible continuously for as long as the reply has not arrived, with no gaps or disappearance before the reply is received

#### TC-048: Typing indicator is replaced by the assistant's reply once it arrives

**Criterion:** AC-028 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has sent a message and the typing/pending indicator is currently showing

**Steps:**

1. Wait for the assistant's reply to be generated and returned
2. Observe the chat history pane at the moment the reply is rendered

**Expected result:** The typing/pending indicator is no longer visible and is replaced by the assistant's rendered reply in the same location

#### TC-049: Send button is disabled while a reply is pending

**Criterion:** AC-029 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an open chat conversation

**Steps:**

1. Type a message in the chat input
2. Click the Send button
3. Immediately attempt to click the Send button again or type another message and submit

**Expected result:** The Send button is disabled (or otherwise prevents submission) and the second message is not sent while the first reply is still pending

#### TC-050: Send button is re-enabled after the pending reply resolves successfully

**Criterion:** AC-029 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has sent a message and the Send button is currently disabled while awaiting a reply

**Steps:**

1. Wait for the assistant's reply to arrive and be rendered
2. Observe the state of the Send button
3. Type a new message and click Send

**Expected result:** Once the reply resolves, the Send button becomes enabled again and the new message can be submitted successfully

#### TC-051: Send button is re-enabled after the pending reply fails

**Criterion:** AC-029 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User has sent a message and the Send button is disabled while awaiting a reply that will fail (e.g. backend error or timeout)

**Steps:**

1. Wait for the backend call to fail or time out
2. Observe the state of the Send button
3. Type a new message and click Send

**Expected result:** After the failure, the Send button becomes enabled again, allowing the user to submit another message

### US-011: Inline error when the model call fails

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-052 | AC-030 | e2e | Inline error shown when hosted model call fails | approved | not run |
| TC-053 | AC-030 | e2e | Inline error shown when hosted model call times out | approved | not run |
| TC-054 | AC-030 | e2e | Inline error shown when OPENAI_API_KEY is missing or invalid | approved | not run |
| TC-055 | AC-031 | e2e | User's message remains visible after a failed reply and retry is possible | approved | not run |
| TC-056 | AC-031 | e2e | User can resend the same message after a failed reply | approved | not run |
| TC-057 | AC-032 | e2e | No fabricated or partial assistant reply persists after reload following a failed call | approved | not run |

#### TC-052: Inline error shown when hosted model call fails

**Criterion:** AC-030 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an active chat thread; the hosted model call is configured to fail or error out

**Steps:**

1. Open the chat thread
2. Type a message in the input box
3. Send the message
4. Wait for the typing indicator to appear
5. Observe the thread after the model call fails

**Expected result:** The typing indicator disappears and an inline error message appears in the thread explaining that the reply could not be generated

#### TC-053: Inline error shown when hosted model call times out

**Criterion:** AC-030 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an active chat thread; the hosted model call is configured to time out

**Steps:**

1. Open the chat thread
2. Type a message in the input box
3. Send the message
4. Wait for the typing indicator to appear
5. Wait for the call to time out

**Expected result:** The typing indicator is removed and an inline error message is shown in the thread explaining that the reply could not be generated

#### TC-054: Inline error shown when OPENAI_API_KEY is missing or invalid

**Criterion:** AC-030 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an active chat thread; the server's OPENAI_API_KEY is missing or invalid

**Steps:**

1. Open the chat thread
2. Type a message in the input box
3. Send the message
4. Wait for the typing indicator to appear
5. Observe the thread after the call fails due to the key issue

**Expected result:** The typing indicator is removed and an inline error message is shown in the thread explaining that the reply could not be generated, without exposing key details

#### TC-055: User's message remains visible after a failed reply and retry is possible

**Criterion:** AC-031 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** An inline error has just been shown in the thread for a failed reply, and the user's original message was sent before the failure

**Steps:**

1. Open the chat thread showing the inline error
2. Look at the message list above the error
3. Type a new message in the input box
4. Send the new message

**Expected result:** The user's original message is still visible in the thread, and the new message is sent successfully, indicating the user can retry or continue the conversation

#### TC-056: User can resend the same message after a failed reply

**Criterion:** AC-031 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** An inline error has just been shown in the thread for a failed reply

**Steps:**

1. Open the chat thread showing the inline error
2. Retype the same message text that previously failed
3. Send the message again

**Expected result:** The original failed message remains in the thread, and the resent message is accepted and processed as a new send attempt

#### TC-057: No fabricated or partial assistant reply persists after reload following a failed call

**Criterion:** AC-032 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A model call has failed and an inline error was shown in the thread

**Steps:**

1. Note the messages currently visible in the thread, including the inline error
2. Reload the conversation page
3. Observe the thread after reload

**Expected result:** The thread shows the user's message and no assistant reply for the failed call; no partial or fabricated assistant text appears

### US-013: See my past conversations in the sidebar

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-063 | AC-036 | e2e | Sidebar lists all saved conversations ordered by most recently active | approved | not run |
| TC-064 | AC-036 | e2e | Sidebar order updates after a conversation becomes the most recently active | approved | not run |
| TC-065 | AC-037 | e2e | Sidebar shows empty state and New Chat control when no conversations exist | approved | not run |
| TC-066 | AC-038 | e2e | Currently open conversation is highlighted in the sidebar | approved | not run |
| TC-067 | AC-038 | e2e | Highlight moves when switching to a different conversation | approved | not run |

#### TC-063: Sidebar lists all saved conversations ordered by most recently active

**Criterion:** AC-036 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Signed-in user has three saved conversations, each with a distinct title and distinct last-active timestamp

**Steps:**

1. Sign in as the user
2. Open the Chat Dashboard

**Expected result:** The sidebar displays all three conversation titles, ordered with the most recently active conversation at the top and the least recently active at the bottom

#### TC-064: Sidebar order updates after a conversation becomes the most recently active

**Criterion:** AC-036 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Signed-in user has three saved conversations; the oldest-active conversation is currently last in the list

**Steps:**

1. Sign in as the user
2. Open the Chat Dashboard
3. Open the conversation that was previously the least recently active
4. Send a message in that conversation
5. Return to the Chat Dashboard sidebar view

**Expected result:** The conversation just interacted with now appears at the top of the sidebar list, ahead of the other two

#### TC-065: Sidebar shows empty state and New Chat control when no conversations exist

**Criterion:** AC-037 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Signed-in user has no saved conversations

**Steps:**

1. Sign in as the user
2. Open the Chat Dashboard

**Expected result:** The sidebar displays an empty state message instead of a conversation list, and a visible New Chat control is present

#### TC-066: Currently open conversation is highlighted in the sidebar

**Criterion:** AC-038 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Signed-in user has at least two saved conversations

**Steps:**

1. Sign in as the user
2. Open the Chat Dashboard
3. Click on one of the conversations in the sidebar to open it

**Expected result:** The opened conversation's entry in the sidebar is visibly highlighted as selected, while the other conversation entries are not highlighted

#### TC-067: Highlight moves when switching to a different conversation

**Criterion:** AC-038 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Signed-in user has at least two saved conversations; one conversation is currently open and highlighted

**Steps:**

1. Sign in as the user
2. Open the Chat Dashboard
3. Click on a different conversation in the sidebar

**Expected result:** The newly selected conversation is now highlighted in the sidebar, and the previously highlighted conversation no longer shows the highlight

### US-014: Select a conversation and replay its messages

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-068 | AC-039 | e2e | Selecting a conversation loads its messages in chronological order | approved | not run |
| TC-069 | AC-039 | e2e | Switching between conversations replaces pane content correctly | approved | not run |
| TC-070 | AC-039 | e2e | Selecting a conversation with no messages shows an empty chat pane | approved | not run |
| TC-071 | AC-040 | e2e | New message sent after selecting a conversation is appended to that conversation | approved | not run |
| TC-072 | AC-040 | e2e | Sending a message in one conversation does not appear in another conversation | approved | not run |

#### TC-068: Selecting a conversation loads its messages in chronological order

**Criterion:** AC-039 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least two conversations in the sidebar, each with multiple user messages and assistant replies

**Steps:**

1. Open the chat application
2. Locate the sidebar listing conversations
3. Click on a conversation from the list
4. Observe the chat history pane

**Expected result:** The chat history pane replaces its previous content with the selected conversation's user messages and assistant replies, displayed in chronological order from oldest to newest

#### TC-069: Switching between conversations replaces pane content correctly

**Criterion:** AC-039 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least two conversations with different message histories

**Steps:**

1. Open the chat application
2. Click on the first conversation in the sidebar
3. Observe the chat history pane content
4. Click on a second, different conversation in the sidebar
5. Observe the chat history pane content

**Expected result:** After clicking the second conversation, the chat history pane shows only that conversation's messages in chronological order, with no messages from the first conversation remaining

#### TC-070: Selecting a conversation with no messages shows an empty chat pane

**Criterion:** AC-039 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has a conversation in the sidebar with no messages yet

**Steps:**

1. Open the chat application
2. Click on the empty conversation in the sidebar
3. Observe the chat history pane

**Expected result:** The chat history pane is replaced with an empty state showing no messages, with no errors displayed

#### TC-071: New message sent after selecting a conversation is appended to that conversation

**Criterion:** AC-040 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has selected an existing conversation with prior messages

**Steps:**

1. Open the chat application
2. Click on an existing conversation in the sidebar to open it
3. Type a new message in the message input
4. Send the message
5. Observe the chat history pane
6. Reload the page or re-select the same conversation from the sidebar

**Expected result:** The new message and its assistant reply appear appended at the end of the selected conversation's message list in chronological order, and remain there after reload or re-selection

#### TC-072: Sending a message in one conversation does not appear in another conversation

**Criterion:** AC-040 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least two existing conversations

**Steps:**

1. Open the chat application
2. Click on the first conversation in the sidebar to open it
3. Type and send a new message in that conversation
4. Click on a second, different conversation in the sidebar
5. Observe the chat history pane of the second conversation
6. Click back on the first conversation

**Expected result:** The new message sent does not appear in the second conversation's history, and is only visible when the first conversation is reopened, confirming it was saved against the correct conversation

### US-015: Start a New Chat and switch between conversations

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-073 | AC-041 | e2e | Clicking New Chat clears the pane to an empty conversation | approved | not run |
| TC-074 | AC-041 | e2e | Clicking New Chat again while already on an empty new chat keeps it empty | approved | not run |
| TC-075 | AC-042 | e2e | Sending the first message in a new chat creates a conversation in the sidebar | approved | not run |
| TC-076 | AC-042 | e2e | Attempting to send an empty first message does not create a conversation | approved | not run |
| TC-077 | AC-043 | e2e | Switching away from and back to a conversation preserves its full message history | approved | not run |
| TC-078 | AC-043 | e2e | Repeatedly switching between multiple conversations keeps each history intact | approved | not run |

#### TC-073: Clicking New Chat clears the pane to an empty conversation

**Criterion:** AC-041 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and on the Chat Dashboard with an existing conversation open that has messages

**Steps:**

1. Open the Chat Dashboard
2. Confirm an existing conversation with messages is currently displayed
3. Click the 'New Chat' button

**Expected result:** The chat history pane becomes empty with no prior messages shown, ready to accept a first message

#### TC-074: Clicking New Chat again while already on an empty new chat keeps it empty

**Criterion:** AC-041 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has just clicked New Chat, resulting in an empty conversation pane

**Steps:**

1. Open the Chat Dashboard
2. Click 'New Chat'
3. Click 'New Chat' again without sending a message

**Expected result:** The chat history pane remains empty with no new unused conversation added to the sidebar

#### TC-075: Sending the first message in a new chat creates a conversation in the sidebar

**Criterion:** AC-042 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has clicked New Chat so the pane is empty

**Steps:**

1. Open the Chat Dashboard
2. Click 'New Chat'
3. Type a message into the message input
4. Click send (or press Enter)

**Expected result:** The message is saved and displayed in the chat pane, and a new conversation entry appears in the sidebar list

#### TC-076: Attempting to send an empty first message does not create a conversation

**Criterion:** AC-042 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has clicked New Chat so the pane is empty

**Steps:**

1. Open the Chat Dashboard
2. Click 'New Chat'
3. Leave the message input empty
4. Click send (or press Enter)

**Expected result:** No message is sent, the chat pane remains empty, and no new conversation entry is added to the sidebar

#### TC-077: Switching away from and back to a conversation preserves its full message history

**Criterion:** AC-043 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least two conversations, A and B, each with prior messages; conversation A is currently open

**Steps:**

1. Open the Chat Dashboard with conversation A displayed
2. Note the full list of messages currently shown in conversation A
3. Click conversation B in the sidebar
4. Confirm conversation B's messages are displayed
5. Click conversation A in the sidebar again

**Expected result:** Conversation A reappears showing its full message history exactly as it was before switching, unchanged

#### TC-078: Repeatedly switching between multiple conversations keeps each history intact

**Criterion:** AC-043 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least three conversations, A, B, and C, each with distinct prior messages

**Steps:**

1. Open conversation A and note its messages
2. Switch to conversation B and note its messages
3. Switch to conversation C and note its messages
4. Switch back to conversation A
5. Switch back to conversation B

**Expected result:** Each conversation displays its own unchanged message history matching what was noted before switching away

### US-018: Messages saved with timestamps as they happen

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-090 | AC-050 | e2e | User message is saved with sender role, text and timestamp | approved | not run |
| TC-091 | AC-050 | e2e | Sending an empty message does not create a saved message row | approved | not run |
| TC-092 | AC-051 | e2e | Assistant reply is saved with sender role, text and timestamp | approved | not run |
| TC-093 | AC-052 | e2e | Reopened conversation replays messages in timestamp order with roles distinguished | approved | not run |
| TC-094 | AC-052 | e2e | Reopening a conversation with interleaved rapid messages preserves correct chronological order | approved | not run |

#### TC-090: User message is saved with sender role, text and timestamp

**Criterion:** AC-050 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an open conversation

**Steps:**

1. Open an existing conversation
2. Type a message into the message input
3. Click the send button
4. Reopen the conversation (e.g. navigate away and back)

**Expected result:** The sent message appears in the conversation as a user turn, with its exact text and a timestamp shown

#### TC-091: Sending an empty message does not create a saved message row

**Criterion:** AC-050 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an open conversation

**Steps:**

1. Open an existing conversation
2. Leave the message input empty
3. Click the send button
4. Reopen the conversation

**Expected result:** No new message row appears in the conversation and no empty user turn is recorded

#### TC-092: Assistant reply is saved with sender role, text and timestamp

**Criterion:** AC-051 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an open conversation

**Steps:**

1. Open an existing conversation
2. Type a message and send it
3. Wait for the assistant's reply to appear
4. Reopen the conversation

**Expected result:** The assistant's reply appears in the conversation as an assistant turn, with its exact text and a timestamp shown

#### TC-093: Reopened conversation replays messages in timestamp order with roles distinguished

**Criterion:** AC-052 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A conversation exists containing multiple alternating user and assistant messages sent at different times

**Steps:**

1. Open the conversation list
2. Select the conversation with multiple messages
3. Observe the order and labeling of each message turn

**Expected result:** All messages are displayed in the exact order they were sent/received (oldest to newest by timestamp), with each turn clearly marked as either the user or the assistant

#### TC-094: Reopening a conversation with interleaved rapid messages preserves correct chronological order

**Criterion:** AC-052 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A conversation exists where a user sent multiple messages in quick succession, each followed by an assistant reply

**Steps:**

1. Open the conversation list
2. Select the conversation with the rapid message exchange
3. Scroll through the full message history

**Expected result:** Every user and assistant message is shown in the correct chronological sequence with no messages missing, duplicated, or mislabeled

## Sprint 4: Sprint 4 - Management, Security & Polish

### US-016: Conversations auto-titled from the first message

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-079 | AC-044 | e2e | New conversation gets title from first message | approved | not run |
| TC-080 | AC-044 | e2e | Title appears promptly after sending first message | approved | not run |
| TC-081 | AC-045 | e2e | Long first message produces a truncated, readable title | approved | not run |
| TC-082 | AC-045 | e2e | Short first message is not truncated or altered unnecessarily | approved | not run |
| TC-083 | AC-046 | e2e | Title remains unchanged after sending a second message | approved | not run |
| TC-084 | AC-046 | e2e | Title remains unchanged after multiple further messages | approved | not run |

#### TC-079: New conversation gets title from first message

**Criterion:** AC-044 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has started a New Chat with no messages sent yet

**Steps:**

1. Click 'New Chat' to start a new conversation
2. Type a short first message, e.g. 'What is the capital of France?'
3. Send the message
4. Observe the sidebar entry for this conversation

**Expected result:** The sidebar shows the conversation with a title derived from the first message text, replacing any placeholder like 'New Chat'

#### TC-080: Title appears promptly after sending first message

**Criterion:** AC-044 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has started a New Chat with no messages sent yet

**Steps:**

1. Start a New Chat
2. Send a first message
3. Wait for the assistant's response to begin or complete
4. Check the sidebar for the conversation title

**Expected result:** A non-empty, non-placeholder title based on the first message is visible in the sidebar once the first message has been sent

#### TC-081: Long first message produces a truncated, readable title

**Criterion:** AC-045 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has started a New Chat with no messages sent yet

**Steps:**

1. Start a New Chat
2. Type a very long first message (e.g. several sentences, well over 100 characters)
3. Send the message
4. Observe the resulting title in the sidebar

**Expected result:** The sidebar title is shortened to a brief, readable length (e.g. with an ellipsis or cut-off) and does not wrap or break the sidebar layout

#### TC-082: Short first message is not truncated or altered unnecessarily

**Criterion:** AC-045 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has started a New Chat with no messages sent yet

**Steps:**

1. Start a New Chat
2. Type a short first message under the truncation threshold, e.g. 'Hello there'
3. Send the message
4. Observe the resulting title in the sidebar

**Expected result:** The full short message (or an untruncated version of it) is shown as the title, with the sidebar layout intact

#### TC-083: Title remains unchanged after sending a second message

**Criterion:** AC-046 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A conversation exists with an auto-generated title from its first message

**Steps:**

1. Open the conversation with an existing auto-generated title
2. Note the current title shown in the sidebar
3. Type and send a second message, e.g. 'Can you explain more?'
4. Observe the sidebar title after the new message is sent

**Expected result:** The conversation title in the sidebar is identical to the title noted before sending the second message

#### TC-084: Title remains unchanged after multiple further messages

**Criterion:** AC-046 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A conversation exists with an auto-generated title from its first message

**Steps:**

1. Open the conversation with an existing auto-generated title
2. Note the current title shown in the sidebar
3. Send three additional messages in the conversation
4. Observe the sidebar title after each message

**Expected result:** The title stays the same throughout all additional messages and does not change or regenerate

### US-017: Delete a conversation

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-085 | AC-047 | e2e | Delete a conversation from the sidebar after confirming | approved | not run |
| TC-086 | AC-047 | e2e | Cancel the delete confirmation keeps the conversation | approved | not run |
| TC-087 | AC-048 | e2e | Deleting the currently open conversation clears the chat pane | approved | not run |
| TC-088 | AC-048 | e2e | Deleting a conversation that is not open does not affect the current chat pane | approved | not run |
| TC-089 | AC-049 | api | Delete request for another user's conversation is refused | approved | not run |

#### TC-085: Delete a conversation from the sidebar after confirming

**Criterion:** AC-047 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least one conversation with messages listed in the sidebar

**Steps:**

1. Open the chat application
2. Locate a conversation in the sidebar
3. Click the delete action on that conversation
4. Confirm the deletion in the confirmation prompt

**Expected result:** The conversation is removed from the sidebar list and no longer appears when the sidebar is refreshed or reloaded

#### TC-086: Cancel the delete confirmation keeps the conversation

**Criterion:** AC-047 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least one conversation listed in the sidebar

**Steps:**

1. Open the chat application
2. Click the delete action on a conversation
3. Dismiss or cancel the confirmation prompt

**Expected result:** The conversation remains visible in the sidebar and is unchanged

#### TC-087: Deleting the currently open conversation clears the chat pane

**Criterion:** AC-048 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has a conversation open in the chat history pane

**Steps:**

1. Open a conversation from the sidebar so its history is shown in the main pane
2. Click the delete action on that same open conversation
3. Confirm the deletion

**Expected result:** Once deletion completes, the chat history pane shows the New Chat empty state instead of the deleted conversation's messages

#### TC-088: Deleting a conversation that is not open does not affect the current chat pane

**Criterion:** AC-048 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in, has at least two conversations, and has one conversation open in the chat pane

**Steps:**

1. Open conversation A in the chat pane
2. In the sidebar, click the delete action on a different conversation B
3. Confirm the deletion

**Expected result:** Conversation B is removed from the sidebar, while conversation A remains open and unchanged in the chat history pane

#### TC-089: Delete request for another user's conversation is refused

**Criterion:** AC-049 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** Two user accounts exist; User B has a conversation that User A does not own

**Steps:**

1. Sign in as User A and obtain a valid auth token
2. Send a delete request for User B's conversation id using User A's token

**Expected result:** The backend responds with a refusal (e.g. an authorization error) and does not delete the conversation; the conversation still exists and is retrievable by User B

### US-019: History survives page refresh and re-login

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-095 | AC-053 | e2e | Conversation and messages restored after page refresh | approved | not run |
| TC-096 | AC-053 | e2e | Refresh with multiple conversations preserves list and selection data | approved | not run |
| TC-097 | AC-054 | e2e | Full history available after logout, browser close, and re-login | approved | not run |
| TC-098 | AC-054 | e2e | Conversation history not available to a different user after login | approved | not run |

#### TC-095: Conversation and messages restored after page refresh

**Criterion:** AC-053 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has an open conversation containing several messages

**Steps:**

1. Open the chat application and sign in
2. Open an existing conversation that contains several messages
3. Note the conversation list entries and the visible messages
4. Refresh the browser page
5. Re-authenticate if prompted
6. Observe the restored conversation list and the opened conversation

**Expected result:** After re-authentication, the same conversation list appears and the same conversation shows the same messages in the same order as before the refresh

#### TC-096: Refresh with multiple conversations preserves list and selection data

**Criterion:** AC-053 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has at least two conversations, each with messages

**Steps:**

1. Sign in and view the conversation list showing multiple conversations
2. Open a conversation other than the first one and note its messages
3. Refresh the browser page
4. Re-authenticate if prompted
5. Check the conversation list and reopen the same conversation

**Expected result:** All conversations still appear in the list and the reopened conversation shows exactly the same messages as before the refresh

#### TC-097: Full history available after logout, browser close, and re-login

**Criterion:** AC-054 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is signed in and has multiple saved conversations, each with messages

**Steps:**

1. Sign in and note the full conversation list and messages in each conversation
2. Log out of the application
3. Close the browser completely
4. Reopen the browser and navigate to the application
5. Log in again as the same user
6. View the conversation list and open each conversation

**Expected result:** The full conversation list reappears and each conversation shows the same messages as before logging out

#### TC-098: Conversation history not available to a different user after login

**Criterion:** AC-054 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Two distinct user accounts exist; User A has saved conversations with messages

**Steps:**

1. Log in as User A and confirm conversations and messages are visible
2. Log out of User A's session
3. Log in as User B
4. View the conversation list for User B

**Expected result:** User B's conversation list does not contain User A's conversations or messages

### US-020: Conversations visible only to their owner

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-099 | AC-055 | e2e | Sidebar shows only own conversations | approved | not run |
| TC-100 | AC-055 | e2e | Sidebar updates correctly when switching signed-in users | approved | not run |
| TC-101 | AC-056 | api | User cannot fetch another user's conversation messages | approved | not run |
| TC-102 | AC-056 | api | Error response does not leak conversation metadata | approved | not run |
| TC-103 | AC-057 | e2e | No administrative or cross-user navigation element exists in the UI | approved | not run |
| TC-104 | AC-057 | api | No administrative API endpoint is reachable | approved | not run |

#### TC-099: Sidebar shows only own conversations

**Criterion:** AC-055 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User A and user B each have at least one existing conversation in the app

**Steps:**

1. Sign in as user A
2. Open the Chat Dashboard
3. Observe the list of conversations in the sidebar

**Expected result:** The sidebar lists only conversations belonging to user A; none of user B's conversation titles or ids appear

#### TC-100: Sidebar updates correctly when switching signed-in users

**Criterion:** AC-055 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User A and user B each have at least one existing conversation in the app

**Steps:**

1. Sign in as user B
2. Open the Chat Dashboard
3. Observe the list of conversations in the sidebar
4. Sign out and sign in as user A
5. Open the Chat Dashboard again

**Expected result:** Each time, the sidebar lists only the conversations of the currently signed-in user; no conversation from the other user ever appears

#### TC-101: User cannot fetch another user's conversation messages

**Criterion:** AC-056 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** User B has an existing conversation with known id and at least one message; user A has a valid auth token

**Steps:**

1. Sign in as user A to obtain a valid token
2. Send a request for user B's conversation messages using user B's conversation id and user A's token

**Expected result:** The backend responds with 404 or 403 and the response body contains no messages belonging to user B

#### TC-102: Error response does not leak conversation metadata

**Criterion:** AC-056 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** User B has an existing conversation with known id; user A has a valid auth token

**Steps:**

1. Sign in as user A to obtain a valid token
2. Send a request for user B's conversation messages using user B's conversation id and user A's token
3. Inspect the response body

**Expected result:** The response contains only an error status and generic message, with no conversation title, message content, or other details belonging to user B

#### TC-103: No administrative or cross-user navigation element exists in the UI

**Criterion:** AC-057 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User A is signed in with an existing conversation

**Steps:**

1. Sign in as user A
2. Open the Chat Dashboard
3. Inspect all visible navigation menus, links, and buttons

**Expected result:** No link, menu item, or button for an admin view, user management screen, or cross-user conversation view is present anywhere in the app

#### TC-104: No administrative API endpoint is reachable

**Criterion:** AC-057 · **Level:** api · **Status:** approved · **Result:** not run

**Preconditions:** User A has a valid auth token

**Steps:**

1. Sign in as user A to obtain a valid token
2. Send a request to a plausible administrative or cross-user listing endpoint (e.g. a request to list all users' conversations) using user A's token

**Expected result:** The backend returns a not-found or forbidden response and no cross-user conversation data is returned, confirming no admin or moderation capability exists

### US-021: Simple, clean, responsive layout that works on a phone

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-105 | AC-058 | e2e | Sidebar and chat history shown side by side on desktop width | approved | not run |
| TC-106 | AC-059 | e2e | Chat pane, input and Send button usable without horizontal scrolling on phone width | approved | not run |
| TC-107 | AC-059 | e2e | Conversation sidebar reachable via toggle on phone width | approved | not run |
| TC-108 | AC-060 | e2e | Login page fields and buttons fully visible and usable on phone width | approved | not run |
| TC-109 | AC-060 | e2e | Sign-up page fields and buttons fully visible and usable on phone width | approved | not run |
| TC-110 | AC-061 | e2e | Chat pane auto-scrolls to latest message on desktop width | approved | not run |
| TC-111 | AC-061 | e2e | Chat pane auto-scrolls to latest message on phone width | approved | not run |

#### TC-105: Sidebar and chat history shown side by side on desktop width

**Criterion:** AC-058 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is logged in and has at least one conversation

**Steps:**

1. Open the Chat Dashboard in a browser window set to a desktop width (e.g. 1280px)
2. Observe the page layout

**Expected result:** The sidebar and the chat history pane are displayed side by side, and the message input field with the Send button are visible and accessible at the bottom of the screen without scrolling to find them

#### TC-106: Chat pane, input and Send button usable without horizontal scrolling on phone width

**Criterion:** AC-059 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is logged in and has at least one conversation

**Steps:**

1. Open the Chat Dashboard in a browser window set to a phone width (around 375px)
2. Observe the page layout
3. Attempt to scroll the page horizontally
4. Type a message into the input field and tap Send

**Expected result:** The chat pane, message input and Send button are fully visible and usable without any horizontal scrolling, and the message sends successfully

#### TC-107: Conversation sidebar reachable via toggle on phone width

**Criterion:** AC-059 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is logged in and has at least one conversation

**Steps:**

1. Open the Chat Dashboard in a browser window set to a phone width (around 375px)
2. Locate and tap the sidebar toggle control
3. Observe the sidebar

**Expected result:** The conversation sidebar becomes visible and usable after tapping the toggle, without causing horizontal scrolling

#### TC-108: Login page fields and buttons fully visible and usable on phone width

**Criterion:** AC-060 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is logged out

**Steps:**

1. Open the Login page in a browser window set to a phone width (around 375px)
2. Observe the email/username and password fields and the login button
3. Attempt to scroll the page horizontally
4. Enter valid credentials and tap the login button

**Expected result:** All fields and the login button are fully visible and usable without horizontal scrolling, and the login submits successfully

#### TC-109: Sign-up page fields and buttons fully visible and usable on phone width

**Criterion:** AC-060 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** User is logged out

**Steps:**

1. Open the Sign-up page in a browser window set to a phone width (around 375px)
2. Observe all registration fields and the sign-up button
3. Attempt to scroll the page horizontally
4. Fill in required fields and tap the sign-up button

**Expected result:** All fields and the sign-up button are fully visible and usable without horizontal scrolling, and the sign-up submits successfully

#### TC-110: Chat pane auto-scrolls to latest message on desktop width

**Criterion:** AC-061 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A conversation exists with enough prior messages to exceed the visible chat pane height

**Steps:**

1. Open the Chat Dashboard in a browser window set to a desktop width (e.g. 1280px)
2. Open the long conversation
3. Send a new message
4. Observe the chat pane

**Expected result:** The chat pane automatically scrolls so the newly sent message is visible at the bottom of the pane

#### TC-111: Chat pane auto-scrolls to latest message on phone width

**Criterion:** AC-061 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A conversation exists with enough prior messages to exceed the visible chat pane height

**Steps:**

1. Open the Chat Dashboard in a browser window set to a phone width (around 375px)
2. Open the long conversation
3. Send a new message
4. Observe the chat pane

**Expected result:** The chat pane automatically scrolls so the newly sent message is visible at the bottom of the pane

### US-022: Setup and run instructions

| ID | Criterion | Level | Title | Status | Result |
|---|---|---|---|---|---|
| TC-112 | AC-062 | e2e | README lists prerequisites and frontend/backend setup steps | approved | not run |
| TC-113 | AC-062 | e2e | README setup steps are complete enough to run both components | approved | not run |
| TC-114 | AC-063 | e2e | README configuration section names all required environment variables | approved | not run |
| TC-115 | AC-063 | e2e | Example configuration file matches documented environment variables | approved | not run |
| TC-116 | AC-064 | e2e | Following README end to end creates schema and enables register, login and AI reply | approved | not run |
| TC-117 | AC-064 | e2e | Database schema contains required tables after setup | approved | not run |

#### TC-112: README lists prerequisites and frontend/backend setup steps

**Criterion:** AC-062 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** Access to the project repository

**Steps:**

1. Open the repository
2. Open the README file
3. Locate the prerequisites section
4. Locate the frontend (React + TypeScript) setup instructions
5. Locate the backend (FastAPI) setup instructions

**Expected result:** The README contains a clear prerequisites list and separate, step-by-step instructions to install and run both the React + TypeScript frontend and the FastAPI backend

#### TC-113: README setup steps are complete enough to run both components

**Criterion:** AC-062 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** README has been opened

**Steps:**

1. Read the frontend setup steps
2. Read the backend setup steps
3. Check that commands to install dependencies are included for each
4. Check that commands to start each service are included

**Expected result:** Both the frontend and backend sections include explicit install and run commands with no missing steps required to get each component running

#### TC-114: README configuration section names all required environment variables

**Criterion:** AC-063 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** README has been opened

**Steps:**

1. Open the configuration section of the README
2. Check for documented PostgreSQL connection detail variables
3. Check for a documented JWT signing secret variable
4. Check for a documented OPENAI_API_KEY variable

**Expected result:** The configuration section names the PostgreSQL connection variables, the JWT signing secret, and OPENAI_API_KEY as required environment variables

#### TC-115: Example configuration file matches documented environment variables

**Criterion:** AC-063 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** README configuration section has been reviewed

**Steps:**

1. Locate the example configuration file referenced in the README
2. Open the example configuration file
3. Compare each variable in the example file against the variables listed in the README

**Expected result:** The example configuration file exists and includes placeholders for every variable named in the README, including PostgreSQL connection details, JWT secret and OPENAI_API_KEY, with none missing

#### TC-116: Following README end to end creates schema and enables register, login and AI reply

**Criterion:** AC-064 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** A clean machine with only the documented prerequisites installed

**Steps:**

1. Follow the README prerequisite installation steps
2. Follow the README configuration steps, creating the config file from the example and setting required variables
3. Follow the README steps to set up and start the database
4. Follow the README steps to start the backend
5. Follow the README steps to start the frontend
6. Open the running frontend application
7. Register a new account
8. Log in with the new account
9. Send a message in the chat and wait for a reply

**Expected result:** The database schema for users, conversations and messages is created, the account registers successfully, login succeeds, and an AI reply is received in the chat

#### TC-117: Database schema contains required tables after setup

**Criterion:** AC-064 · **Level:** e2e · **Status:** approved · **Result:** not run

**Preconditions:** README setup steps have been followed on a clean machine and the database is running

**Steps:**

1. Connect to the configured PostgreSQL database
2. List the tables created by the setup process

**Expected result:** The database contains tables for users, conversations and messages as described in the README
<!-- sdlc:auto:end cases -->
