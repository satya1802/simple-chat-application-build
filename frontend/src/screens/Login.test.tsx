import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Screen from "./Login";
import { clearToken, getToken } from "@/lib/auth";

function renderLogin() {
  return render(
    <MemoryRouter>
      <Screen />
    </MemoryRouter>,
  );
}

describe("Login screen", () => {
  beforeEach(() => {
    clearToken();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearToken();
  });

  it("[AC-010] offers no password reset or forgotten-password link", () => {
    renderLogin();
    expect(screen.queryByText(/forgot|reset/i)).toBeNull();
  });

  it("[AC-012] offers a Sign-up link and no other navigation", () => {
    renderLogin();
    expect(screen.getByRole("button", { name: /create an account/i })).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("[AC-008] submits to POST /auth/login and stores the token on success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ access_token: "tok-123", token_type: "bearer" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderLogin();
    await user.type(screen.getByLabelText(/username/i), "alice");
    await user.type(screen.getByLabelText(/^password$/i), "hunter2000");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(getToken()).toBe("tok-123"));
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("[AC-009] shows one generic inline error on failed login and stores no token", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ detail: "Invalid credentials" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderLogin();
    await user.type(screen.getByLabelText(/username/i), "alice");
    await user.type(screen.getByLabelText(/^password$/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.queryAllByRole("alert")).toHaveLength(1);
    expect(alert.textContent).not.toMatch(/exist|no such user|not found/i);
    expect(getToken()).toBeNull();
  });

  it("[AC-004-like] shows inline validation and sends no request when fields are empty", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    renderLogin();
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/enter your username/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
