import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Screen from "./Signup";
import { clearToken, getToken } from "@/lib/auth";

function renderSignup() {
  return render(
    <MemoryRouter>
      <Screen />
    </MemoryRouter>,
  );
}

describe("Signup screen", () => {
  beforeEach(() => {
    clearToken();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearToken();
  });

  it("[AC-001] asks only for a username and a password, no email field", () => {
    renderSignup();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
  });

  it("[AC-002] submits to POST /auth/register and signs the user in on success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ access_token: "tok-abc", token_type: "bearer" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderSignup();
    await user.type(screen.getByLabelText(/username/i), "newuser");
    await user.type(screen.getByLabelText(/^password$/i), "a-strong-pass1");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => expect(getToken()).toBe("tok-abc"));
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/auth/register"),
      expect.objectContaining({ method: "POST" }),
    );
    expect(await screen.findByText(/you're in, @newuser/i)).toBeInTheDocument();
  });

  it("[AC-003] shows a clear inline duplicate-username error with the username still populated", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => ({ detail: "Username already registered" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderSignup();
    await user.type(screen.getByLabelText(/username/i), "alice");
    await user.type(screen.getByLabelText(/^password$/i), "a-strong-pass1");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/already taken/i);
    expect(screen.getByLabelText(/username/i)).toHaveValue("alice");
    expect(getToken()).toBeNull();
  });

  it("[AC-004] shows inline validation naming the missing field and sends no request when empty", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    renderSignup();
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText(/choose a username/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a password/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
