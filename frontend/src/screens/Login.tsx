import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { apiFetch, ApiError } from "@/lib/api";
import { setToken } from "@/lib/auth";

const { Label, Checkbox } = UI;
const { AlertCircle, CheckCircle, X, Clock, ArrowRight } = Icons;

type FieldErrors = { username?: string; password?: string };
type FormError = { title: string; body: string } | null;
type Status = "idle" | "checking" | "success";

type TokenResponse = { access_token: string; token_type: string };

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="pm-dot inline-block h-1.5 w-1.5 rounded-full bg-white"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    />
  );
}

function Mark({ size, color, radius }: { size: number; color: string; radius: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block"
      style={{ width: size, height: size, backgroundColor: color, borderRadius: `calc(${radius} * 1.4)` }}
    />
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = `color-mix(in srgb, ${brand.neutralColor} 42%, black)`;
  const inkSoft = brand.neutralColor;
  const line = `color-mix(in srgb, ${brand.neutralColor} 28%, white)`;
  const primarySoft = `color-mix(in srgb, ${brand.primaryColor} 8%, white)`;
  const accentSoft = `color-mix(in srgb, ${brand.accentColor} 22%, white)`;
  const accentInk = `color-mix(in srgb, ${brand.accentColor} 42%, black)`;
  const cardRadius = `calc(${brand.radius} * 2)`;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [capsOn, setCapsOn] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<FormError>(null);
  const [sessionNotice, setSessionNotice] = React.useState(true);

  const userRef = React.useRef<HTMLInputElement>(null);
  const passRef = React.useRef<HTMLInputElement>(null);

  const busy = status !== "idle";

  async function handleSubmit(e?: React.FormEvent) {
    if (e && e.preventDefault) e.preventDefault();
    if (busy) return;

    const errs: FieldErrors = {};
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

    try {
      const result = await apiFetch<TokenResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username: username.trim(), password }),
      });
      setToken(result.access_token);
      setStatus("success");
      navigate("chat");
    } catch (err) {
      setStatus("idle");
      if (err instanceof ApiError && err.status === 401) {
        setFormError({
          title: "That username and password don't match",
          body: "Check both and try again.",
        });
      } else {
        setFormError({
          title: "We couldn't reach the chat service",
          body: "Something went wrong talking to the server. Nothing was sent and your details are still here -- try again in a moment.",
        });
      }
      if (passRef.current) passRef.current.focus();
    }
  }

  const fieldStyle = (invalid: boolean): React.CSSProperties => ({
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
      style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: ink }}
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
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="flex-1 text-[13px] leading-relaxed" style={{ color: ink }}>
                  <span className="font-semibold">Session ended.</span> You were signed out after 30
                  quiet minutes. Your chats are safe -- sign in to carry on.
                </p>
                <button
                  type="button"
                  onClick={() => setSessionNotice(false)}
                  aria-label="Dismiss session notice"
                  className="pm-focus -mr-1 -mt-1 shrink-0 rounded p-1 transition-opacity hover:opacity-60"
                  style={{ color: inkSoft }}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
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
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold" style={{ color: accentInk }}>
                    {formError.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed" style={{ color: accentInk }}>
                    {formError.body}
                  </p>
                </div>
              </div>
            )}

            <form className="mt-6" onSubmit={handleSubmit} noValidate>
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <Label htmlFor="username" className="text-[13px] font-semibold" style={{ color: ink }}>
                    Username
                  </Label>
                  {fieldErrors.username && (
                    <span id="username-error" className="text-[12px] font-medium" style={{ color: accentInk }}>
                      {fieldErrors.username}
                    </span>
                  )}
                </div>
                <div className="mt-1.5">
                  <input
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
                      if (fieldErrors.username) setFieldErrors((f) => ({ ...f, username: undefined }));
                    }}
                    className="pm-field"
                    style={fieldStyle(!!fieldErrors.username)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <Label htmlFor="password" className="text-[13px] font-semibold" style={{ color: ink }}>
                    Password
                  </Label>
                  {fieldErrors.password && (
                    <span id="password-error" className="text-[12px] font-medium" style={{ color: accentInk }}>
                      {fieldErrors.password}
                    </span>
                  )}
                </div>
                <div className="relative mt-1.5">
                  <input
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
                      [fieldErrors.password ? "password-error" : null, capsOn ? "caps-hint" : null]
                        .filter(Boolean)
                        .join(" ") || undefined
                    }
                    onKeyUp={(e) => {
                      if (e.getModifierState) setCapsOn(e.getModifierState("CapsLock"));
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: undefined }));
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
                <Checkbox
                  id="remember"
                  checked={remember}
                  disabled={busy}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: brand.primaryColor }}
                  className="pm-focus h-4 w-4"
                />
                <Label htmlFor="remember" className="text-[13px]" style={{ color: inkSoft }}>
                  Keep me signed in on this device
                </Label>
              </div>

              <button
                type="submit"
                disabled={busy}
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
                    <CheckCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Opening your chats</span>
                  </>
                )}
                {status === "idle" && (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <p role="status" aria-live="polite" className="sr-only">
                {statusLine}
              </p>
            </form>

            <div className="mt-6">
              <hr style={{ borderColor: line, backgroundColor: line, height: 1, border: "none" }} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[14px]" style={{ color: inkSoft }}>
                New here?
              </p>
              <button
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
              </button>
            </div>
          </div>
        </div>

        <aside className="order-2 hidden lg:order-1 lg:block">
          <div className="flex items-center gap-3">
            <Mark size={42} color={brand.primaryColor} radius={brand.radius} />
            <span className="text-[18px] font-semibold tracking-tight" style={{ fontFamily: brand.fontHeading }}>
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
            Messages are saved the moment they're sent, so a refresh -- or signing in from your
            phone on the bus -- brings the whole thread back.
          </p>
        </aside>
      </div>
    </div>
  );
}
