import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import App from "./App";
import { clearToken, setToken } from "@/lib/auth";

describe("App", () => {
  afterEach(() => {
    clearToken();
  });

  it("opens on Login, with no menu around it", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container.firstChild).not.toBeNull();
    // The menu belongs to the screens behind sign-in, so none of its links is here.
    expect(screen.queryByRole("link", { name: "Sign Up" })).toBeNull();
  });

  it("[AC-011] shows Login, with no sidebar or chat content, when the Chat Dashboard URL is opened with no token", () => {
    render(
      <MemoryRouter initialEntries={["/chat"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Chat Dashboard" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Chats" })).toBeNull();
  });

  it("[AC-012] renders Signup with no Shell sidebar while signed out", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /create your account/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Sign Up" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Chat Dashboard" })).toBeNull();
  });

  it("lets a signed-in user reach and stay on the Chat Dashboard while the token is valid", () => {
    setToken("tok-valid");
    render(
      <MemoryRouter initialEntries={["/chat"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Chats" })).toBeInTheDocument();
  });

  it("[AC-017] returns to Login and renders no chat content once the token has been cleared", () => {
    setToken("tok-valid");
    const { rerender } = render(
      <MemoryRouter initialEntries={["/chat"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Chats" })).toBeInTheDocument();

    clearToken();
    rerender(
      <MemoryRouter initialEntries={["/chat"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Chats" })).toBeNull();
  });
});
