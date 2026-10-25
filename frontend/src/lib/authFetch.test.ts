import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { authFetch } from "@/lib/authFetch";
import { clearToken, getToken, setToken } from "@/lib/auth";

describe("authFetch", () => {
  beforeEach(() => {
    clearToken();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearToken();
  });

  it("[AC-005] discards the stored token when the API responds 401", async () => {
    setToken("tok-expired");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ detail: "Not authenticated" }),
      }),
    );

    await expect(authFetch("/conversations")).rejects.toThrow();
    expect(getToken()).toBeNull();
  });

  it("leaves the token alone on a successful call", async () => {
    setToken("tok-good");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [] }),
      }),
    );

    await authFetch("/conversations");
    expect(getToken()).toBe("tok-good");
  });

  it("leaves the token alone on a non-401 error", async () => {
    setToken("tok-good");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ detail: "boom" }),
      }),
    );

    await expect(authFetch("/conversations")).rejects.toThrow();
    expect(getToken()).toBe("tok-good");
  });
});
