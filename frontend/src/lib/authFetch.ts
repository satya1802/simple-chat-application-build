/**
 * Wraps `apiFetch` for calls made once a user is signed in. A 401 from any
 * such call means the stored token is no longer good -- expired, revoked, or
 * never valid in the first place -- so this discards it immediately. The
 * route guard in App.tsx reacts to that and sends the user back to Login on
 * its own; this helper's only job is making sure the token doesn't linger.
 *
 * Login and Signup call `apiFetch` directly: a 401 there means "wrong
 * credentials", not "your session died", so they keep their own handling.
 */
import { apiFetch, ApiError } from "@/lib/api";
import { clearToken } from "@/lib/auth";

export async function authFetch<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    return await apiFetch<T>(path, init);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      clearToken();
    }
    throw err;
  }
}
