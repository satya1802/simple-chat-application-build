// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Input, Label } = UI;
const { Check, X, Clock, ArrowLeft, AlertCircle, CheckCircle } = Icons;

const TAKEN_USERNAMES = ["alice", "maya", "dev_sam", "priya", "jonas", "sam", "nina"];
const RESERVED_USERNAMES = ["admin", "root", "support", "system", "help"];

const PREVIEW_THREAD = [
  { role: "user", content: "I have leftover rice and two eggs. Dinner ideas?", at: "20:14" },
  { role: "assistant", content: "Egg fried rice — 10 minutes. Fry the rice hard before the egg goes in so it stays loose.", at: "20:14" },
  { role: "user", content: "Make it vegetarian and a bit spicier", at: "20:16" }
];

const STRENGTH_LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];

export default function Screen() {
  const navigate = useNavigate();
  const ink = `color-mix(in srgb, ${brand.neutralColor}, black 58%)`;
  const muted = brand.neutralColor;
  const hairline = `color-mix(in srgb, ${brand.neutralColor} 26%, white)`;
  const primarySoft = `color-mix(in srgb, ${brand.primaryColor} 9%, white)`;
  const accentSoft = `color-mix(in srgb, ${brand.accentColor} 22%, white)`;
  const dangerInk = `color-mix(in srgb, ${brand.primaryColor} 18%, #8a1c3b)`;
  const dangerSoft = `color-mix(in srgb, ${brand.accentColor} 14%, white)`;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [formError, setFormError] = React.useState(null);
  const [availability, setAvailability] = React.useState("idle");
  const [status, setStatus] = React.useState("idle"); // idle | submitting | done
  const [createdName, setCreatedName] = React.useState("");
  const [online, setOnline] = React.useState(true);

  const css = `
    @keyframes pmRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @keyframes pmPop { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: none; } }
    @keyframes pmDot { 0%, 80%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
    .pm-rise { animation: pmRise .32s ease-out both; }
    .pm-pop { animation: pmPop .3s ease-out both; }
    .pm-dot { animation: pmDot 1.1s infinite ease-in-out; }
    .pm-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; }
    .pm-focus-light:focus-visible { outline: 2px solid ${brand.accentColor}; outline-offset: 2px; }
    .pm-field:focus-within { box-shadow: 0 0 0 3px color-mix(in srgb, ${brand.primaryColor} 18%, transparent); border-color: ${brand.primaryColor}; }
    @media (prefers-reduced-motion: reduce) {
      .pm-rise, .pm-pop, .pm-dot { animation: none !important; }
      * { transition: none !important; }
    }
  `;

  // Connection awareness — keeps what the visitor typed if the backend is unreachable.
  React.useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    if (typeof navigator !== "undefined" && navigator.onLine === false) setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  // Live username availability (POST /auth/register would reject duplicates anyway).
  React.useEffect(() => {
    if (status !== "idle") return;
    const u = username.trim().toLowerCase();
    if (u.length < 3 || !/^[a-z0-9_]+$/.test(u)) {
      setAvailability("idle");
      return;
    }
    setAvailability("checking");
    const t = setTimeout(() => {
      if (TAKEN_USERNAMES.includes(u)) setAvailability("taken");
      else if (RESERVED_USERNAMES.includes(u)) setAvailability("reserved");
      else setAvailability("free");
    }, 420);
    return () => clearTimeout(t);
  }, [username, status]);

  // Registration round-trip.
  React.useEffect(() => {
    if (status !== "submitting") return;
    const typed = username.trim();
    const u = typed.toLowerCase();
    const t = setTimeout(() => {
      if (TAKEN_USERNAMES.includes(u)) {
        setStatus("idle");
        setAvailability("taken");
        setFieldErrors({ username: `Someone already chats as @${typed}.` });
        setFormError({
          title: `“${typed}” is already taken`,
          body: "Pick another name — your password is still typed in below."
        });
        const el = document.getElementById("username");
        if (el) el.focus();
      } else if (RESERVED_USERNAMES.includes(u)) {
        setStatus("idle");
        setAvailability("reserved");
        setFieldErrors({ username: `“${typed}” is reserved by the app.` });
        setFormError({
          title: "That name is kept aside",
          body: "Names like admin and support are reserved. Anything else is yours."
        });
        const el = document.getElementById("username");
        if (el) el.focus();
      } else {
        setCreatedName(typed);
        setStatus("done");
      }
    }, 950);
    return () => clearTimeout(t);
  }, [status, username]);

  const strength = React.useMemo(() => {
    if (!password) return 0;
    if (password.length < 8) return 0;
    let s = 1;
    if (password.length >= 12) s += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s += 1;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) s += 1;
    return Math.min(s, 4);
  }, [password]);

  const suggestions = React.useMemo(() => {
    const base = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (!base) return [];
    return [`${base}_26`, `${base}_chats`, `real_${base}`].filter(
      (s) => !TAKEN_USERNAMES.includes(s) && !RESERVED_USERNAMES.includes(s)
    );
  }, [username]);

  const busy = status === "submitting";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busy || status === "done") return;

    const u = username.trim();
    const errs = {};
    if (!u) errs.username = "Choose a username — it’s how you’ll sign in.";
    else if (u.length < 3) errs.username = "Usernames need at least 3 characters.";
    else if (!/^[a-z0-9_]+$/i.test(u)) errs.username = "Letters, numbers and underscores only — no spaces.";

    if (!password) errs.password = "Enter a password to protect your account.";
    else if (password.length < 8) errs.password = "Use at least 8 characters.";

    setFieldErrors(errs);

    if (Object.keys(errs).length > 0) {
      setFormError(null);
      const first = errs.username ? "username" : "password";
      const el = document.getElementById(first);
      if (el) el.focus();
      return;
    }

    if (!online) {
      setFormError({
        title: "We can’t reach the server",
        body: "You look offline. Nothing you typed is lost — press Create account again once you’re back."
      });
      return;
    }

    setFormError(null);
    setStatus("submitting");
  };

  const availabilityPill = () => {
    if (status !== "idle") return null;
    if (availability === "checking") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: muted }}>
          <span className="pm-dot inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: muted }} aria-hidden="true" />
          Checking…
        </span>
      );
    }
    if (availability === "free") {
      return (
        <span
          className="pm-pop inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ backgroundColor: accentSoft, color: ink }}
        >
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          Available
        </span>
      );
    }
    if (availability === "taken" || availability === "reserved") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: dangerInk }}>
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          {availability === "taken" ? "Taken" : "Reserved"}
        </span>
      );
    }
    return null;
  };

  const inputShell = (invalid) => ({
    borderRadius: brand.radius,
    border: `1px solid ${invalid ? dangerInk : hairline}`,
    backgroundColor: "#fff",
    transition: "border-color .15s ease, box-shadow .15s ease"
  });

  return (
    <div
      className="min-h-screen w-full px-4 py-6 sm:px-8 sm:py-12"
      style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: ink }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-5xl lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        {/* Brand / product preview — desktop only */}
        <aside
          className="hidden lg:flex lg:flex-col lg:justify-between p-8"
          style={{ backgroundColor: brand.primaryColor, borderRadius: `calc(${brand.radius} * 2.5)`, color: "#fff" }}
        >
          <div>
            <p className="text-sm font-semibold tracking-wide" style={{ color: accentSoft }}>
              Pocket Messenger
            </p>
            <p
              className="mt-5 text-3xl leading-snug font-semibold"
              style={{ fontFamily: brand.fontHeading }}
            >
              An assistant that keeps
              <span
                className="mx-1 inline-block px-1"
                style={{ backgroundColor: brand.accentColor, color: ink, borderRadius: brand.radius }}
              >
                the whole thread
              </span>
              in mind.
            </p>
          </div>

          <ul className="my-8 space-y-3" aria-label="Example conversation">
            {PREVIEW_THREAD.map((m, i) => (
              <li key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className="max-w-[17rem] px-3.5 py-2.5 text-sm leading-relaxed"
                  style={{
                    backgroundColor: m.role === "user" ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.14)",
                    color: m.role === "user" ? ink : "#fff",
                    borderRadius: `calc(${brand.radius} * 2)`,
                    borderBottomRightRadius: m.role === "user" ? brand.radius : undefined,
                    borderBottomLeftRadius: m.role === "user" ? undefined : brand.radius
                  }}
                >
                  <span className="block">{m.content}</span>
                  <span
                    className="mt-1 block text-[11px]"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      color: m.role === "user" ? muted : "rgba(255,255,255,0.72)"
                    }}
                  >
                    {m.at}
                  </span>
                </div>
              </li>
            ))}
            <li className="flex justify-start" aria-hidden="true">
              <div
                className="flex items-center gap-1.5 px-4 py-3"
                style={{ backgroundColor: "rgba(255,255,255,0.14)", borderRadius: `calc(${brand.radius} * 2)` }}
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="pm-dot inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "#fff", animationDelay: `${d * 0.16}s` }}
                  />
                ))}
              </div>
            </li>
          </ul>

          <p className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
            <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            Every message is saved, so your chats are still here after a refresh or a fresh login.
          </p>
        </aside>

        {/* Form column */}
        <main className="flex flex-col justify-center">
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <span
              className="inline-block h-7 w-7"
              style={{ backgroundColor: brand.primaryColor, borderRadius: `calc(${brand.radius} * 1.4)` }}
              aria-hidden="true"
            />
            <span className="text-sm font-semibold" style={{ color: brand.primaryColor }}>
              Pocket Messenger
            </span>
          </div>

          <div
            className="pm-rise p-6 sm:p-8"
            style={{
              backgroundColor: "#fff",
              borderRadius: `calc(${brand.radius} * 2.5)`,
              border: `1px solid ${hairline}`,
              boxShadow: "0 18px 40px -28px rgba(27,20,63,0.45)"
            }}
          >
            {status === "done" ? (
              <div className="pm-rise text-center">
                <span
                  className="pm-pop mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: accentSoft }}
                >
                  <CheckCircle className="h-7 w-7" style={{ color: brand.primaryColor }} aria-hidden="true" />
                </span>
                <h1
                  className="mt-5 text-2xl font-semibold"
                  style={{ fontFamily: brand.fontHeading, color: ink }}
                >
                  You’re in, @{createdName}
                </h1>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed" style={{ color: muted }}>
                  Your account is saved and you’re signed in. Your first chat starts the moment you type.
                </p>
                <Button
                  type="button"
                  onClick={() => navigate("chat")}
                  className="pm-focus mt-6 w-full justify-center px-4 py-3 text-base font-semibold"
                  style={{ backgroundColor: brand.primaryColor, color: "#fff", borderRadius: brand.radius }}
                >
                  Open my chats
                </Button>
                <button
                  type="button"
                  onClick={() => navigate("login")}
                  className="pm-focus mt-3 w-full py-2 text-sm font-medium underline underline-offset-4"
                  style={{ color: muted, borderRadius: brand.radius }}
                >
                  Sign in as someone else
                </button>
              </div>
            ) : (
              <React.Fragment>
                <button
                  type="button"
                  onClick={() => navigate("login")}
                  className="pm-focus -ml-1 mb-5 inline-flex items-center gap-1.5 px-1 py-1 text-sm font-medium"
                  style={{ color: muted, borderRadius: brand.radius }}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to sign in
                </button>

                <h1
                  className="text-3xl font-semibold tracking-tight"
                  style={{ fontFamily: brand.fontHeading, color: ink }}
                >
                  Create your account
                </h1>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
                  A username and a password is all it takes — no email, no invitation, no waiting for approval.
                </p>

                {!online && (
                  <p
                    className="pm-rise mt-5 flex items-start gap-2 px-3.5 py-3 text-sm"
                    style={{ backgroundColor: primarySoft, borderRadius: brand.radius, color: ink }}
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold">Offline.</strong> We’ll keep what you’ve typed and send it
                      as soon as the connection is back.
                    </span>
                  </p>
                )}

                {formError && (
                  <div
                    role="alert"
                    className="pm-rise mt-5 flex items-start gap-2.5 px-3.5 py-3"
                    style={{
                      backgroundColor: dangerSoft,
                      borderRadius: brand.radius,
                      border: `1px solid ${hairline}`
                    }}
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: dangerInk }} aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: ink }}>
                        {formError.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed" style={{ color: muted }}>
                        {formError.body}
                      </p>
                      {availability === "taken" && suggestions.length > 0 && (
                        <ul className="mt-2.5 flex flex-wrap gap-2">
                          {suggestions.map((s) => (
                            <li key={s}>
                              <button
                                type="button"
                                onClick={() => {
                                  setUsername(s);
                                  setFieldErrors({});
                                  setFormError(null);
                                  const el = document.getElementById("username");
                                  if (el) el.focus();
                                }}
                                className="pm-focus px-2.5 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: "#fff",
                                  border: `1px solid ${hairline}`,
                                  borderRadius: `calc(${brand.radius} * 2)`,
                                  color: brand.primaryColor
                                }}
                              >
                                @{s}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <Label htmlFor="username" className="text-sm font-semibold" style={{ color: ink }}>
                        Username
                      </Label>
                      <span aria-live="polite">{availabilityPill()}</span>
                    </div>
                    <div className="pm-field mt-2" style={inputShell(Boolean(fieldErrors.username))}>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        autoComplete="username"
                        spellCheck={false}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (fieldErrors.username) setFieldErrors((p) => ({ ...p, username: undefined }));
                          if (formError) setFormError(null);
                        }}
                        aria-invalid={fieldErrors.username ? "true" : "false"}
                        aria-describedby={fieldErrors.username ? "username-error" : "username-hint"}
                        className="w-full border-0 bg-transparent px-3.5 py-3 text-base outline-none"
                        style={{ color: ink, borderRadius: brand.radius }}
                      />
                    </div>
                    {fieldErrors.username ? (
                      <p id="username-error" className="mt-2 flex items-center gap-1.5 text-sm font-medium" style={{ color: dangerInk }}>
                        <X className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {fieldErrors.username}
                      </p>
                    ) : (
                      <p id="username-hint" className="mt-2 text-sm" style={{ color: muted }}>
                        Letters, numbers and underscores. Everyone’s username is unique.
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-semibold" style={{ color: ink }}>
                      Password
                    </Label>
                    <div className="pm-field relative mt-2" style={inputShell(Boolean(fieldErrors.password))}>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                        }}
                        aria-invalid={fieldErrors.password ? "true" : "false"}
                        aria-describedby={fieldErrors.password ? "password-error password-strength" : "password-strength"}
                        className="w-full border-0 bg-transparent py-3 pl-3.5 pr-20 text-base outline-none"
                        style={{ color: ink, borderRadius: brand.radius }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-pressed={showPassword}
                        className="pm-focus absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1.5 text-xs font-semibold"
                        style={{ color: brand.primaryColor, borderRadius: brand.radius }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <div id="password-strength" className="mt-3">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-1 gap-1.5" aria-hidden="true">
                          {[1, 2, 3, 4].map((i) => (
                            <span
                              key={i}
                              className="h-1.5 flex-1 rounded-full"
                              style={{
                                backgroundColor: i <= strength ? brand.primaryColor : hairline,
                                transition: "background-color .2s ease"
                              }}
                            />
                          ))}
                        </div>
                        <span
                          className="w-20 text-right text-xs font-semibold"
                          style={{ color: strength >= 3 ? brand.primaryColor : muted }}
                        >
                          {password ? STRENGTH_LABELS[strength] : "—"}
                        </span>
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 text-sm" style={{ color: muted }}>
                        {password.length >= 8 ? (
                          <Check className="h-4 w-4 shrink-0" style={{ color: brand.primaryColor }} aria-hidden="true" />
                        ) : (
                          <span
                            className="inline-block h-4 w-4 shrink-0 rounded-full"
                            style={{ border: `1.5px solid ${hairline}` }}
                            aria-hidden="true"
                          />
                        )}
                        <span style={{ fontVariantNumeric: "tabular-nums" }}>
                          At least 8 characters — {password.length} so far. Stored as a bcrypt hash, never as text.
                        </span>
                      </p>
                      {fieldErrors.password && (
                        <p id="password-error" className="mt-2 flex items-center gap-1.5 text-sm font-medium" style={{ color: dangerInk }}>
                          <X className="h-4 w-4 shrink-0" aria-hidden="true" />
                          {fieldErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={busy}
                    className="pm-focus w-full justify-center px-4 py-3 text-base font-semibold"
                    style={{
                      backgroundColor: busy ? `color-mix(in srgb, ${brand.primaryColor} 60%, white)` : brand.primaryColor,
                      color: "#fff",
                      borderRadius: brand.radius,
                      cursor: busy ? "progress" : "pointer",
                      transition: "background-color .18s ease"
                    }}
                  >
                    {busy ? (
                      <span className="inline-flex items-center gap-2">
                        Creating your account
                        <span className="inline-flex gap-1" aria-hidden="true">
                          {[0, 1, 2].map((d) => (
                            <span
                              key={d}
                              className="pm-dot inline-block h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: "#fff", animationDelay: `${d * 0.16}s` }}
                            />
                          ))}
                        </span>
                      </span>
                    ) : (
                      "Create account"
                    )}
                  </Button>

                  <p aria-live="polite" className="sr-only">
                    {busy ? "Creating your account" : ""}
                  </p>
                </form>

                <p className="mt-6 text-center text-sm" style={{ color: muted }}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("login")}
                    className="pm-focus font-semibold underline underline-offset-4"
                    style={{ color: brand.primaryColor, borderRadius: brand.radius }}
                  >
                    Sign in
                  </button>
                </p>
              </React.Fragment>
            )}
          </div>

          <p className="mx-auto mt-6 max-w-sm text-center text-xs leading-relaxed" style={{ color: muted }}>
            Free to use, with no plans or per-message charges. Your conversations are visible only to you.
          </p>
        </main>
      </div>
    </div>
  );
}
