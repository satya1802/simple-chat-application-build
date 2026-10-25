import { afterEach, describe, expect, it } from "vitest";

import { clearToken, getToken, isAuthenticated, setToken, subscribe } from "@/lib/auth";

describe("auth helper", () => {
  afterEach(() => {
    clearToken();
  });

  it("stores, reads and clears the token", () => {
    expect(getToken()).toBeNull();
    expect(isAuthenticated()).toBe(false);

    setToken("abc-123");
    expect(getToken()).toBe("abc-123");
    expect(isAuthenticated()).toBe(true);

    clearToken();
    expect(getToken()).toBeNull();
    expect(isAuthenticated()).toBe(false);
  });

  it("notifies subscribers when the token changes", () => {
    let calls = 0;
    const unsubscribe = subscribe(() => {
      calls += 1;
    });

    setToken("xyz");
    clearToken();
    expect(calls).toBe(2);

    unsubscribe();
    setToken("again");
    expect(calls).toBe(2);
  });
});
