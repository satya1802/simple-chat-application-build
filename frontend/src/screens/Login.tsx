// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Input, Label, Checkbox, Separator } = UI;
const { Check, X, Clock, ArrowRight, AlertCircle, CheckCircle } = Icons;

const UIX = typeof UI !== "undefined" && UI ? UI : {};
const IconsX = typeof Icons !== "undefined" && Icons ? Icons : {};

const UIInput = UIX.Input || ((props) => React.createElement("input", props));
const UILabel = UIX.Label || ((props) => React.createElement("label", props));
const UICheckbox =
  UIX.Checkbox || ((props) => React.createElement("input", { type: "checkbox", ...props }));
const UIButton = UIX.Button || ((props) => React.createElement("button", props));
const UISeparator = UIX.Separator || ((props) => React.createElement("hr", props));

const IconAlert = IconsX.AlertCircle || (() => null);
const IconCheck = IconsX.CheckCircle || (() => null);
const IconClose = IconsX.X || (() => null);
const IconClock = IconsX.Clock || (() => null);
const IconArrow = IconsX.ArrowRight || (() => null);

// Seeded demo accounts for this learning build (passwords are bcrypt-hashed server side)
const ACCOUNTS = [
  { username: "alice", password: "wanderlust24", note: "12 conversations · last active Wed 09:14" },
  { username: "raj", password: "testing123", note: "3 conversations · last active Tue 17:40" },
  { username: "noor", password: "firstlight", note: "New account · no conversations yet" },
];

const PREVIEW_THREAD = [
  {
    role: "user",
    content: "Help me write two lines to my landlord about the boiler.",
    at: "09:12",
  },
  {
    role: "assistant",
    content:
      "Try this: “Hi Sam — the boiler stopped heating water on Sunday. Could you send someone this week? I'm home after 4pm.”",
    at: "09:12",
  },
  { role: "user", content: "Make it a bit firmer.", at: "09:14" },
  {
    role: "assistant",
    content: "“Hi Sam — the boiler has been out since Sunday. Please book an engineer for this week.”",
    at: "09:14",
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const ink = `color-mix(in srgb, ${brand.neutralColor} 42%, black)`;
  const inkSoft = brand.neutralColor;
  const line = `color-mix(in srgb, ${brand.neutralColor} 28%, white)`;
  const primarySoft = `color-mix(in srgb, ${brand.primaryColor} 8%, white)`;
  const accentSoft = `color-mix(in srgb, ${brand.accentColor} 22%, white)`;
  const accentInk = `color-mix(in srgb, ${brand.accentColor} 42%, black)`;
  const bubbleRadius = `calc(${brand.radius} * 2.5)`;
  const cardRadius = `calc(${brand.radius} * 2)`;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [capsOn, setCapsOn] = React.useState(false);
  const [status, setStatus] = React.useState("idle"); // idle | checking | success
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [formError, setFormError] = React.useState(null); // {kind, title, body}
  const [attempts, setAttempts] = React.useState(0);
  const [sessionNotice, setSessionNotice] = React.useState(true);
  const [failNext, setFailNext] = React.useState(false);

  const timers = React.useRef([]);
  const userRef = React.useRef(null);
  const passRef = React.useRef(null);

  React.useEffect(() => {
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, []);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const busy = status !== "idle";

  function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (busy) return;

    const errs = {};
    if (!username.trim()) errs.username = "Enter your username";
    if (!password) errs.password = "Enter your password";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setFormError(null);
      if (errs.username && userRef.current) userRef.current.focus();
      else if (errs.password && passRef.current) passRef.current.focus();
      return;
    }

    setFormError(null);
    setStatus("checking");

    later(() => {
      if (failNext) {
        setFailNext(false);
        setStatus("idle");
        setFormError({
          kind: "service",
          title: "We couldn't reach the chat service",
          body:
            "POST /auth/login timed out after 10 seconds. Nothing was sent and your details are still here — try again in a moment.",
        });
        return;
      }

      const match = ACCOUNTS.find(
        (a) => a.username === username.trim().toLowerCase() && a.password === password
      );

      if (!match) {
        setAttempts((n) => n + 1);
        setStatus("idle");
        setFormError({
          kind: "auth",
          title: "That username and password don't match",
          body: "Check both and try again. Usernames are all lower-case.",
        });
        if (passRef.current) passRef.current.focus();
        return;
      }

      setStatus("success");
      later(() => navigate("chat"), 700);
    }, 850);
  }

  function fill(account) {
    setUsername(account.username);
    setPassword(account.password);
    setFieldErrors({});
    setFormError(null);
    if (passRef.current) passRef.current.focus();
  }

  const fieldStyle = (invalid) => ({
    height: "3rem",
    width: "100%",
    borderRadius: brand.radius,
    border: `1px solid ${invalid ? accentInk : line}`,
    backgroundColor: "white",
    color: ink,
    fontSize: "15px",
    paddingLeft: "0.875rem",
    paddingRight: "0.875rem",
  });

  const statusLine =
    status === "checking"
      ? "Checking your details…"
      : status === "success"
      ? "Signed in. Opening your conversations."
      : formError
      ? formError.title
      : "";

  return (
    <div
      className="min-h-screen w-full px-4 py-8 sm:px-8 sm:py-12"
      style={{
        backgroundColor: brand.backgroundColor,
        fontFamily: brand.fontBody,
        color: ink,
      }}
    >
      <style>{`
        @keyframes pm-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes pm-slide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        @keyframes pm-dot { 0%, 80%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
        .pm-rise { animation: pm-rise .5s cubic-bezier(.2,.7,.3,1) both; }
        .pm-slide { animation: pm-slide .28s ease-out both; }
        .pm-dot { animation: pm-dot 1.1s infinite; }
        .pm-field:focus, .pm-field:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 1px; }
        .pm-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .pm-rise, .pm-slide, .pm-dot { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ---------- Sign-in column (first in reading order) ---------- */}
        <div className="order-1 w-full lg:order-2">
          <div
            className="pm-rise mx-auto w-full max-w-[430px] p-6 sm:p-8"
            style={{
              backgroundColor: "white",
              borderRadius: cardRadius,
              border: `1px solid ${line}`,
              boxShadow: "0 18px 40px -28px rgba(0,0,0,0.45)",
            }}
          >
            {/* Mark — visible on phones where the side panel is hidden */}
            <div className="mb-6 flex items-center gap-2.5 lg:hidden">
              <Mark size={34} color={brand.primaryColor} radius={brand.radius} />
              <span
                className="text-[15px] font-semibold tracking-tight"
                style={{ fontFamily: brand.fontHeading }}
              >
                Pocket Messenger
              </span>
            </div>

            <h1
              className="text-[28px] font-semibold leading-tight tracking-tight sm:text-[32px]"
              style={{ fontFamily: brand.fontHeading }}
            >
              Welcome back
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed" style={{ color: inkSoft }}>
              Sign in to pick up your conversations where you left them.
            </p>

            {sessionNotice && (
              <div
                className="pm-slide mt-6 flex items-start gap-3 p-3.5"
                style={{
                  backgroundColor: primarySoft,
                  borderRadius: brand.radius,
                  border: `1px solid color-mix(in srgb, ${brand.primaryColor} 22%, white)`,
                }}
              >
                <span style={{ color: brand.primaryColor }} className="mt-0.5 shrink-0">
                  <IconClock className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="flex-1 text-[13px] leading-relaxed" style={{ color: ink }}>
                  <span className="font-semibold">Session ended.</span> You were signed out after 30
                  quiet minutes. Your chats are safe — sign in to carry on.
                </p>
                <button
                  type="button"
                  onClick={() => setSessionNotice(false)}
                  aria-label="Dismiss session notice"
                  className="pm-focus -mr-1 -mt-1 shrink-0 rounded p-1 transition-opacity hover:opacity-60"
                  style={{ color: inkSoft }}
                >
                  <IconClose className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {formError && (
              <div
                role="alert"
                className="pm-slide mt-6 flex items-start gap-3 p-3.5"
                style={{
                  backgroundColor: accentSoft,
                  borderRadius: brand.radius,
                  border: `1px solid color-mix(in srgb, ${brand.accentColor} 55%, white)`,
                }}
              >
                <span style={{ color: accentInk }} className="mt-0.5 shrink-0">
                  <IconAlert className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold" style={{ color: accentInk }}>
                    {formError.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed" style={{ color: accentInk }}>
                    {formError.body}
                  </p>
                  {formError.kind === "auth" && attempts >= 2 && (
                    <p className="mt-2 text-[12px] leading-relaxed" style={{ color: accentInk }}>
                      Third try? There's no password reset in this build — ask whoever set up the
                      demo to re-create your account.
                    </p>
                  )}
                </div>
              </div>
            )}

            <form className="mt-6" onSubmit={handleSubmit} noValidate>
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <UILabel
                    htmlFor="username"
                    className="text-[13px] font-semibold"
                    style={{ color: ink }}
                  >
                    Username
                  </UILabel>
                  {fieldErrors.username && (
                    <span
                      id="username-error"
                      className="text-[12px] font-medium"
                      style={{ color: accentInk }}
                    >
                      {fieldErrors.username}
                    </span>
                  )}
                </div>
                <div className="mt-1.5">
                  <UIInput
                    id="username"
                    name="username"
                    type="text"
                    ref={userRef}
                    value={username}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="alice"
                    disabled={busy}
                    aria-invalid={fieldErrors.username ? true : undefined}
                    aria-describedby={fieldErrors.username ? "username-error" : undefined}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (fieldErrors.username)
                        setFieldErrors((f) => ({ ...f, username: undefined }));
                    }}
                    className="pm-field"
                    style={fieldStyle(!!fieldErrors.username)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <UILabel
                    htmlFor="password"
                    className="text-[13px] font-semibold"
                    style={{ color: ink }}
                  >
                    Password
                  </UILabel>
                  {fieldErrors.password && (
                    <span
                      id="password-error"
                      className="text-[12px] font-medium"
                      style={{ color: accentInk }}
                    >
                      {fieldErrors.password}
                    </span>
                  )}
                </div>
                <div className="relative mt-1.5">
                  <UIInput
                    id="password"
                    name="password"
                    ref={passRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={busy}
                    aria-invalid={fieldErrors.password ? true : undefined}
                    aria-describedby={
                      [
                        fieldErrors.password ? "password-error" : null,
                        capsOn ? "caps-hint" : null,
                      ]
                        .filter(Boolean)
                        .join(" ") || undefined
                    }
                    onKeyUp={(e) => {
                      if (e.getModifierState) setCapsOn(e.getModifierState("CapsLock"));
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password)
                        setFieldErrors((f) => ({ ...f, password: undefined }));
                    }}
                    className="pm-field"
                    style={{ ...fieldStyle(!!fieldErrors.password), paddingRight: "4.25rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="pm-focus absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1.5 text-[12px] font-semibold transition-colors"
                    style={{ color: brand.primaryColor, borderRadius: brand.radius }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {capsOn && (
                  <p id="caps-hint" className="pm-slide mt-2 text-[12px]" style={{ color: accentInk }}>
                    Caps Lock is on.
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center gap-2.5">
                <UICheckbox
                  id="remember"
                  checked={remember}
                  disabled={busy}
                  onChange={(e) =>
                    setRemember(e && e.target ? !!e.target.checked : !remember)
                  }
                  style={{ accentColor: brand.primaryColor }}
                  className="pm-focus h-4 w-4"
                />
                <UILabel htmlFor="remember" className="text-[13px]" style={{ color: inkSoft }}>
                  Keep me signed in on this device
                </UILabel>
              </div>

              <UIButton
                type="submit"
                disabled={busy}
                onClick={handleSubmit}
                className="pm-focus mt-6 flex w-full items-center justify-center gap-2 text-[15px] font-semibold transition-transform active:scale-[0.99]"
                style={{
                  height: "3rem",
                  width: "100%",
                  borderRadius: brand.radius,
                  backgroundColor:
                    status === "success"
                      ? `color-mix(in srgb, ${brand.primaryColor} 88%, black)`
                      : brand.primaryColor,
                  color: "white",
                  border: "none",
                  opacity: status === "checking" ? 0.92 : 1,
                  cursor: busy ? "default" : "pointer",
                }}
              >
                {status === "checking" && (
                  <>
                    <span className="flex items-end gap-1" aria-hidden="true">
                      <Dot delay="0s" />
                      <Dot delay="0.15s" />
                      <Dot delay="0.3s" />
                    </span>
                    <span>Signing in</span>
                  </>
                )}
                {status === "success" && (
                  <>
                    <IconCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Opening your chats</span>
                  </>
                )}
                {status === "idle" && (
                  <>
                    <span>Sign in</span>
                    <IconArrow className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </UIButton>

              <p role="status" aria-live="polite" className="sr-only">
                {statusLine}
              </p>
            </form>

            <div className="mt-6">
              <UISeparator style={{ borderColor: line, backgroundColor: line }} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[14px]" style={{ color: inkSoft }}>
                New here?
              </p>
              <UIButton
                type="button"
                onClick={() => navigate("signup")}
                className="pm-focus text-[14px] font-semibold transition-colors"
                style={{
                  height: "2.5rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  borderRadius: brand.radius,
                  backgroundColor: "white",
                  color: brand.primaryColor,
                  border: `1px solid color-mix(in srgb, ${brand.primaryColor} 35%, white)`,
                }}
              >
                Create an account
              </UIButton>
            </div>

            {/* Tester shortcuts — this is a demo build, seeded accounts live here */}
            <div
              className="mt-6 p-4"
              style={{
                backgroundColor: brand.backgroundColor,
                borderRadius: brand.radius,
              }}
            >
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: inkSoft, fontFamily: brand.fontHeading }}
              >
                Seeded test accounts
              </h2>
              <ul className="mt-3 space-y-2">
                {ACCOUNTS.map((a) => (
                  <li key={a.username} className="flex items-center justify-between gap-3">
                    <span className="min-w-0">
                      <span
                        className="block truncate text-[13px] font-semibold"
                        style={{ color: ink, fontVariantNumeric: "tabular-nums" }}
                      >
                        {a.username}
                      </span>
                      <span
                        className="block truncate text-[12px]"
                        style={{ color: inkSoft, fontVariantNumeric: "tabular-nums" }}
                      >
                        {a.note}
                      </span>
                    </span>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => fill(a)}
                      className="pm-focus shrink-0 rounded px-2 py-1 text-[12px] font-semibold underline-offset-4 hover:underline"
                      style={{ color: brand.primaryColor, borderRadius: brand.radius }}
                    >
                      Fill
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${line}` }}>
                <button
                  type="button"
                  onClick={() => setFailNext((v) => !v)}
                  aria-pressed={failNext}
                  className="pm-focus rounded text-[12px] font-medium underline-offset-4 hover:underline"
                  style={{ color: failNext ? accentInk : inkSoft, borderRadius: brand.radius }}
                >
                  {failNext
                    ? "Outage simulation armed — next sign-in will fail"
                    : "Simulate a backend outage on the next sign-in"}
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-5 flex w-full max-w-[430px] flex-wrap items-center justify-between gap-2">
            <p className="text-[12px]" style={{ color: inkSoft, fontVariantNumeric: "tabular-nums" }}>
              Pocket Messenger · build 0.4.2
            </p>
            <p
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: inkSoft, fontVariantNumeric: "tabular-nums" }}
            >
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: failNext ? brand.accentColor : brand.primaryColor }}
              />
              {failNext ? "Service: simulated outage" : "Service online · checked 10:42"}
            </p>
          </div>
        </div>

        {/* ---------- Brand / preview column ---------- */}
        <aside className="order-2 hidden lg:order-1 lg:block">
          <div className="flex items-center gap-3">
            <Mark size={42} color={brand.primaryColor} radius={brand.radius} />
            <span
              className="text-[18px] font-semibold tracking-tight"
              style={{ fontFamily: brand.fontHeading }}
            >
              Pocket Messenger
            </span>
          </div>

          <h2
            className="mt-8 max-w-[18ch] text-[34px] font-semibold leading-[1.15] tracking-tight"
            style={{ fontFamily: brand.fontHeading }}
          >
            Every chat, still waiting for you.
          </h2>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed" style={{ color: inkSoft }}>
            Messages are saved the moment they're sent, so a refresh — or signing in from your
            phone on the bus — brings the whole thread back.
          </p>

          <section
            className="pm-rise mt-8 max-w-[420px] p-4"
            style={{
              backgroundColor: "white",
              borderRadius: cardRadius,
              border: `1px solid ${line}`,
              boxShadow: "0 16px 36px -30px rgba(0,0,0,0.5)",
            }}
          >
            <h3
              className="px-1 text-[12px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: inkSoft, fontFamily: brand.fontHeading }}
            >
              Boiler email · yesterday
            </h3>
            <ul className="mt-3 space-y-2.5">
              {PREVIEW_THREAD.map((m, i) => {
                const mine = m.role === "user";
                return (
                  <li key={i} className={mine ? "flex justify-end" : "flex justify-start"}>
                    <div className="max-w-[86%]">
                      <p
                        className="px-3.5 py-2.5 text-[13px] leading-relaxed"
                        style={{
                          backgroundColor: mine ? brand.primaryColor : brand.backgroundColor,
                          color: mine ? "white" : ink,
                          borderRadius: bubbleRadius,
                          borderBottomRightRadius: mine ? brand.radius : bubbleRadius,
                          borderBottomLeftRadius: mine ? bubbleRadius : brand.radius,
                        }}
                      >
                        {m.content}
                      </p>
                      <p
                        className={
                          "mt-1 px-1 text-[11px] " + (mine ? "text-right" : "text-left")
                        }
                        style={{ color: inkSoft, fontVariantNumeric: "tabular-nums" }}
                      >
                        {mine ? "You" : "Assistant"} · {m.at}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Mark({ size, color, radius }) {
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-end justify-center gap-[3px] pb-[30%]"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: `calc(${radius} * 1.6)`,
        borderBottomLeftRadius: `calc(${radius} * 0.5)`,
      }}
    >
      <span className="block h-[4px] w-[4px] rounded-full bg-white opacity-90" />
      <span className="block h-[4px] w-[4px] rounded-full bg-white opacity-90" />
      <span className="block h-[4px] w-[4px] rounded-full bg-white opacity-90" />
    </span>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="pm-dot block h-[5px] w-[5px] rounded-full bg-white"
      style={{ animationDelay: delay }}
    />
  );
}
