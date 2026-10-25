import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { apiFetch, ApiError } from "@/lib/api";
import { setToken } from "@/lib/auth";

const { Button, Input, Label } = UI;
const { Check, X, ArrowLeft, AlertCircle, CheckCircle } = Icons;

type FieldErrors = { username?: string; password?: string };
type FormError = { title: string; body: string } | null;
type Status = "idle" | "submitting" | "done";
type TokenResponse = { access_token: string; token_type: string };

export default function Screen() {
  const navigate = useNavigate();
  const ink = `color-mix(in srgb, ${brand.neutralColor}, black 58%)`;
  const muted = brand.neutralColor;
  const hairline = `color-mix(in srgb, ${brand.neutralColor} 26%, white)`;
  const accentSoft = `color-mix(in srgb, ${brand.accentColor} 22%, white)`;
  const dangerInk = `color-mix(in srgb, ${brand.primaryColor} 18%, #8a1c3b)`;
  const dangerSoft = `color-mix(in srgb, ${brand.accentColor} 14%, white)`;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<FormError>(null);
  const [status, setStatus] = React.useState<Status>("idle");
  const [createdName, setCreatedName] = React.useState("");

  const css = `
    @keyframes pmRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @keyframes pmPop { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: none; } }
    .pm-rise { animation: pmRise .32s ease-out both; }
    .pm-pop { animation: pmPop .3s ease-out both; }
    .pm-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; }
    .pm-field:focus-within { box-shadow: 0 0 0 3px color-mix(in srgb, ${brand.primaryColor} 18%, transparent); border-color: ${brand.primaryColor}; }
    @media (prefers-reduced-motion: reduce) {
      .pm-rise, .pm-pop { animation: none !important; }
      * { transition: none !important; }
    }
  `;

  const busy = status === "submitting";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || status === "done") return;

    const u = username.trim();
    const errs: FieldErrors = {};
    if (!u) errs.username = "Choose a username -- it's how you'll sign in.";
    if (!password) errs.password = "Enter a password to protect your account.";
    setFieldErrors(errs);

    if (Object.keys(errs).length > 0) {
      setFormError(null);
      const first = errs.username ? "username" : "password";
      const el = document.getElementById(first);
      if (el) el.focus();
      return;
    }

    setFormError(null);
    setStatus("submitting");

    try {
      const result = await apiFetch<TokenResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username: u, password }),
      });
      setToken(result.access_token);
      setCreatedName(u);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      if (err instanceof ApiError && err.status === 409) {
        setFieldErrors({ username: `Someone already chats as @${u}.` });
        setFormError({
          title: `"${u}" is already taken`,
          body: "Pick another name -- your password is still typed in below.",
        });
        const el = document.getElementById("username");
        if (el) el.focus();
      } else {
        setFormError({
          title: "We can't reach the server",
          body: "Nothing you typed is lost -- press Create account again once you're back.",
        });
      }
    }
  }

  const inputShell = (invalid: boolean): React.CSSProperties => ({
    borderRadius: brand.radius,
    border: `1px solid ${invalid ? dangerInk : hairline}`,
    backgroundColor: "#fff",
    transition: "border-color .15s ease, box-shadow .15s ease",
  });

  return (
    <div
      className="min-h-screen w-full px-4 py-6 sm:px-8 sm:py-12"
      style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: ink }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-5xl lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <aside
          className="hidden lg:flex lg:flex-col lg:justify-between p-8"
          style={{
            backgroundColor: brand.primaryColor,
            borderRadius: `calc(${brand.radius} * 2.5)`,
            color: "#fff",
          }}
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
                style={{
                  backgroundColor: brand.accentColor,
                  color: ink,
                  borderRadius: brand.radius,
                }}
              >
                the whole thread
              </span>
              in mind.
            </p>
          </div>
        </aside>

        <main className="flex flex-col justify-center">
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <span
              className="inline-block h-7 w-7"
              style={{
                backgroundColor: brand.primaryColor,
                borderRadius: `calc(${brand.radius} * 1.4)`,
              }}
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
              boxShadow: "0 18px 40px -28px rgba(27,20,63,0.45)",
            }}
          >
            {status === "done" ? (
              <div className="pm-rise text-center">
                <span
                  className="pm-pop mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: accentSoft }}
                >
                  <CheckCircle
                    className="h-7 w-7"
                    style={{ color: brand.primaryColor }}
                    aria-hidden="true"
                  />
                </span>
                <h1
                  className="mt-5 text-2xl font-semibold"
                  style={{ fontFamily: brand.fontHeading, color: ink }}
                >
                  You're in, @{createdName}
                </h1>
                <p
                  className="mx-auto mt-2 max-w-sm text-sm leading-relaxed"
                  style={{ color: muted }}
                >
                  Your account is saved and you're signed in. Your first chat starts the moment you
                  type.
                </p>
                <Button
                  type="button"
                  onClick={() => navigate("chat")}
                  className="pm-focus mt-6 w-full justify-center px-4 py-3 text-base font-semibold"
                  style={{
                    backgroundColor: brand.primaryColor,
                    color: "#fff",
                    borderRadius: brand.radius,
                  }}
                >
                  Open my chats
                </Button>
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
                  A username and a password is all it takes -- no email, no invitation, no waiting
                  for approval.
                </p>

                {formError && (
                  <div
                    role="alert"
                    className="pm-rise mt-5 flex items-start gap-2.5 px-3.5 py-3"
                    style={{
                      backgroundColor: dangerSoft,
                      borderRadius: brand.radius,
                      border: `1px solid ${hairline}`,
                    }}
                  >
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: dangerInk }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: ink }}>
                        {formError.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed" style={{ color: muted }}>
                        {formError.body}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <Label
                        htmlFor="username"
                        className="text-sm font-semibold"
                        style={{ color: ink }}
                      >
                        Username
                      </Label>
                    </div>
                    <div
                      className="pm-field mt-2"
                      style={inputShell(Boolean(fieldErrors.username))}
                    >
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        autoComplete="username"
                        spellCheck={false}
                        disabled={busy}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (fieldErrors.username)
                            setFieldErrors((p) => ({ ...p, username: undefined }));
                          if (formError) setFormError(null);
                        }}
                        aria-invalid={fieldErrors.username ? "true" : "false"}
                        aria-describedby={fieldErrors.username ? "username-error" : "username-hint"}
                        className="w-full border-0 bg-transparent px-3.5 py-3 text-base outline-none"
                        style={{ color: ink, borderRadius: brand.radius }}
                      />
                    </div>
                    {fieldErrors.username ? (
                      <p
                        id="username-error"
                        className="mt-2 flex items-center gap-1.5 text-sm font-medium"
                        style={{ color: dangerInk }}
                      >
                        <X className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {fieldErrors.username}
                      </p>
                    ) : (
                      <p id="username-hint" className="mt-2 text-sm" style={{ color: muted }}>
                        Pick anything -- it's how you'll sign in.
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold"
                      style={{ color: ink }}
                    >
                      Password
                    </Label>
                    <div
                      className="pm-field relative mt-2"
                      style={inputShell(Boolean(fieldErrors.password))}
                    >
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        autoComplete="new-password"
                        disabled={busy}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password)
                            setFieldErrors((p) => ({ ...p, password: undefined }));
                        }}
                        aria-invalid={fieldErrors.password ? "true" : "false"}
                        aria-describedby={fieldErrors.password ? "password-error" : undefined}
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
                    {fieldErrors.password && (
                      <p
                        id="password-error"
                        className="mt-2 flex items-center gap-1.5 text-sm font-medium"
                        style={{ color: dangerInk }}
                      >
                        <X className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={busy}
                    className="pm-focus flex w-full items-center justify-center gap-2 px-4 py-3 text-base font-semibold"
                    style={{
                      backgroundColor: brand.primaryColor,
                      color: "#fff",
                      borderRadius: brand.radius,
                      opacity: busy ? 0.85 : 1,
                    }}
                  >
                    {busy ? (
                      <span>Creating your account…</span>
                    ) : (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>Create account</span>
                      </>
                    )}
                  </Button>
                </form>
              </React.Fragment>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
