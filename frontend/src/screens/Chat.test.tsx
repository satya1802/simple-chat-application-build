import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import Screen from "./Chat";
import Login from "./Login";
import { clearToken, getToken, setToken } from "@/lib/auth";

function renderChat() {
  return render(
    <MemoryRouter initialEntries={["/chat"]}>
      <Routes>
        <Route path="/chat" element={<Screen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Chat screen", () => {
  afterEach(() => {
    clearToken();
  });

  it("[AC-016] shows a Logout control that discards the token and routes to Login", async () => {
    const user = userEvent.setup();
    setToken("tok-abc");
    renderChat();

    const logoutButtons = screen.getAllByRole("button", { name: /log out/i });
    expect(logoutButtons.length).toBeGreaterThan(0);

    await user.click(logoutButtons[0]);

    expect(getToken()).toBeNull();
    expect(await screen.findByRole("heading", { name: /welcome back/i })).toBeInTheDocument();
  });
});
