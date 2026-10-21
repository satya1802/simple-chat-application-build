# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| username | varchar(50) | False | — | False |
| password_hash | varchar(255) | False | — | False |
| created_at | timestamptz | False | — | False |

### conversations

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| title | varchar(120) | False | — | True |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### messages

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| conversation_id | uuid | False | conversations.id | False |
| role | varchar(16) | False | — | False |
| content | text | False | — | False |
| created_at | timestamptz | False | — | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | conversations | one-to-many |
| conversations | messages | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    varchar_50_ username
    varchar_255_ password_hash
    timestamptz created_at
  }
  conversations {
    uuid id PK
    uuid user_id FK
    varchar_120_ title
    timestamptz created_at
    timestamptz updated_at
  }
  messages {
    uuid id PK
    uuid conversation_id FK
    varchar_16_ role
    text content
    timestamptz created_at
  }
  users ||--o{ conversations : "one-to-many"
  conversations ||--o{ messages : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
