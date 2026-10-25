import React from "react";
import { NavLink, Navigate, Outlet, Route, Routes, useNavigate as useRouterNavigate } from "react-router-dom";

import Login from "@/screens/Login";
import Signup from "@/screens/Signup";
import Chat from "@/screens/Chat";
import { isAuthenticated, subscribe, clearToken } from "@/lib/auth";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The screens behind sign-in render inside the side menu. Login and Signup, which are
// available before sign-in, render on their own, with no menu around them -- only the
// Shell wraps the authenticated routes below.
function Shell() {
  const navigate = useRouterNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className="flex w-56 shrink-0 flex-col justify-between border-r p-4"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <div>
          <p
            className="mb-4 px-3 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"Simple Chat Application - Build"}
          </p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/signup" className={navLinkClass}>
              {"Sign Up"}
            </NavLink>
            <NavLink to="/chat" className={navLinkClass}>
              {"Chat Dashboard"}
            </NavLink>
          </nav>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="block rounded-[var(--brand-radius)] px-3 py-2 text-left text-sm font-medium text-[var(--brand-fg-muted)] transition-colors hover:bg-[var(--brand-hover)]"
        >
          {"Logout"}
        </button>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

// Guards every route behind the Shell: while a valid token is in storage the
// protected routes render as usual; the moment it is missing -- whether that is
// because none was ever stored, or because it was just discarded by logout or a
// 401 -- this renders Login instead, with no sidebar or chat content mounted.
function RequireAuth() {
  const [authed, setAuthed] = React.useState(isAuthenticated());

  React.useEffect(() => subscribe(() => setAuthed(isAuthenticated())), []);

  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return <Shell />;
}

function IndexRedirect() {
  return <Navigate to={isAuthenticated() ? "/chat" : "/login"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<RequireAuth />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
      <Route path="*" element={<IndexRedirect />} />
    </Routes>
  );
}
