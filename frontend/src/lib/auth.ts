/**
 * Shared auth state for the app: where the JWT issued by POST /auth/login or
 * POST /auth/register is kept, and how other screens read it.
 *
 * Kept deliberately small -- route guarding and logout belong to US-004-1.
 * This module only owns the token itself.
 */

const TOKEN_KEY = "pm_auth_token";

type Listener = () => void;
let listeners: Listener[] = [];

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  notify();
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  notify();
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

/** Lets a component re-render when sign-in/sign-out happens elsewhere. */
export function subscribe(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
