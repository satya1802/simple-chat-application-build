<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted
Date: 2026-10-16

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Three tables — users, conversations, messages — with timestamps and a foreign-key ownership rule enforced by the database give persistence across refresh and re-login and strict per-user visibility.

## Consequences

A relational database is slightly heavier to run locally than SQLite, but matches the stated requirement and the AWS RDS deployment.
<!-- sdlc:auto:end adr -->