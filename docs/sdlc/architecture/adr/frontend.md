<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-16

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because A plain React + TypeScript single-page app renders the whole product — Login/Sign-up and the one Chat Dashboard screen behind auth — in the browser, holding the JWT and guarding routes client-side.

## Consequences

No server-side rendering or SEO, which is fine since every screen sits behind login and nothing is public. Client-side routing is added via react-router-dom.
<!-- sdlc:auto:end adr -->