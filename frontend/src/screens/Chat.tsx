// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { clearToken } from "@/lib/auth";

const NOW = Date.now();
const ago = (mins) => new Date(NOW - mins * 60000).toISOString();

const CURRENT_USER = { id: 1, username: "maya" };

const SEED_CONVERSATIONS = [
  {
    id: "c-914",
    title: "Why is my FastAPI route returning 422?",
    created_at: ago(38),
    updated_at: ago(24),
    messages: [
      {
        id: "m-5001",
        role: "user",
        content: "Why is my FastAPI login route returning 422 when I post from React?",
        created_at: ago(38),
      },
      {
        id: "m-5002",
        role: "assistant",
        content:
          "A 422 from FastAPI means the request body didn't match the Pydantic model on that route — it never reached your handler.\n\nOpen the response JSON: the `detail` array names the exact field and what it expected. Nine times out of ten it's a field name mismatch or a value arriving as a string when the model wants an int.",
        created_at: ago(37),
      },
      {
        id: "m-5003",
        role: "user",
        content: "The detail says body.username is a missing field. I'm sending form-encoded data.",
        created_at: ago(25),
      },
      {
        id: "m-5004",
        role: "assistant",
        content:
          "That's the mismatch. A Pydantic model parameter makes FastAPI read JSON, but your fetch is sending `application/x-www-form-urlencoded`.\n\nTwo fixes: either send JSON from React (`JSON.stringify({ username, password })` with a JSON content-type), or declare the parameter as `OAuth2PasswordRequestForm = Depends()` on the backend and keep the form encoding. For a JWT login route the second one is the conventional choice.",
        created_at: ago(24),
      },
    ],
  },
  {
    id: "c-908",
    title: "Three days in Lisbon in March",
    created_at: ago(136),
    updated_at: ago(124),
    messages: [
      {
        id: "m-4801",
        role: "user",
        content: "Plan a 3-day Lisbon trip in March. We walk a lot and we're not museum people.",
        created_at: ago(136),
      },
      {
        id: "m-4802",
        role: "assistant",
        content:
          "Day 1 — Alfama on foot: start at Miradouro das Portas do Sol, wander down to Campo de Ourique for lunch, finish with sunset at Graça.\n\nDay 2 — Belém in the morning (pastéis at the original bakery, skip the queue by eating standing at the counter), then the riverside walk back toward Cais do Sodré.\n\nDay 3 — Day trip to Sintra. Leave by 08:30 from Rossio; March crowds are thin but the hill buses still fill up.",
        created_at: ago(134),
      },
      {
        id: "m-4803",
        role: "user",
        content: "Is a car worth it for the Sintra day?",
        created_at: ago(125),
      },
      {
        id: "m-4804",
        role: "assistant",
        content:
          "No — parking near the palaces is genuinely painful and the village road is one lane in places. The train plus the 434 loop bus will cost you about €12 each and saves the stress.",
        created_at: ago(124),
      },
    ],
  },
  {
    id: "c-902",
    title: "Explain bcrypt salting like I'm five",
    created_at: ago(1010),
    updated_at: ago(1004),
    messages: [
      {
        id: "m-4601",
        role: "user",
        content: "Explain bcrypt salting like I'm five.",
        created_at: ago(1010),
      },
      {
        id: "m-4602",
        role: "assistant",
        content:
          "Imagine everyone's password is a biscuit. If you bake them plain, two people who chose the same password get two identical biscuits — and anyone who recognises one recognises the other.\n\nA salt is a sprinkle of random crumbs mixed into each biscuit before baking. Same password, different sprinkle, completely different biscuit. bcrypt does the sprinkling for you and stores the sprinkle inside the hash, so you never manage it yourself.",
        created_at: ago(1008),
      },
      {
        id: "m-4603",
        role: "user",
        content: "So I don't need a salt column in the users table?",
        created_at: ago(1005),
      },
      {
        id: "m-4604",
        role: "assistant",
        content:
          "Correct. The salt and the cost factor both live inside the `$2b$12$...` string, so one `password_hash` column is all your users table needs.",
        created_at: ago(1004),
      },
    ],
  },
  {
    id: "c-897",
    title: "Deploying FastAPI to Fly.io",
    created_at: ago(1190),
    updated_at: ago(1142),
    messages: [
      {
        id: "m-4401",
        role: "user",
        content: "What's the smallest Dockerfile that runs FastAPI with uvicorn on Fly.io?",
        created_at: ago(1190),
      },
      {
        id: "m-4402",
        role: "assistant",
        content:
          'Start from `python:3.12-slim`, copy requirements, `pip install --no-cache-dir -r requirements.txt`, copy the app, then `CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]`.\n\nFly expects the process to bind 0.0.0.0 and to match `internal_port` in fly.toml — 8080 is the default there.',
        created_at: ago(1188),
      },
      {
        id: "m-4403",
        role: "user",
        content:
          "And how do I give it the DATABASE_URL and OPENAI_API_KEY without baking them into the image?",
        created_at: ago(1143),
      },
      {
        id: "m-4404",
        role: "error",
        content:
          "The assistant couldn't finish this reply — the model request timed out after 30 seconds. Your message was saved; nothing partial was written to your history.",
        created_at: ago(1142),
      },
    ],
  },
  {
    id: "c-884",
    title: "Name ideas for a dog-walking app",
    created_at: ago(2890),
    updated_at: ago(2880),
    messages: [
      {
        id: "m-4201",
        role: "user",
        content: "Give me name ideas for a neighbourhood dog-walking app. Friendly, not cutesy.",
        created_at: ago(2890),
      },
      {
        id: "m-4202",
        role: "assistant",
        content:
          'Warm but grown-up: Leash, Longway, Rove, Pavement, Goodwalk, Barkly, Halfhour, Streetside.\n\nMy pick is Goodwalk — it says the product and the promise in one word, and the domain language writes itself ("book a good walk").',
        created_at: ago(2888),
      },
      {
        id: "m-4203",
        role: "user",
        content: "Goodwalk is taken. What's close?",
        created_at: ago(2881),
      },
      {
        id: "m-4204",
        role: "assistant",
        content:
          "Walkwell, Goodloop, Wellwalk, Roundblock. Walkwell keeps the same cadence and is far less contested.",
        created_at: ago(2880),
      },
    ],
  },
  {
    id: "c-871",
    title: "Index for the messages table",
    created_at: ago(4330),
    updated_at: ago(4322),
    messages: [
      {
        id: "m-4001",
        role: "user",
        content: "Loading a conversation does a seq scan on messages. What index should I add?",
        created_at: ago(4330),
      },
      {
        id: "m-4002",
        role: "assistant",
        content:
          "You're always filtering by conversation and ordering by time, so make one composite index do both:\n\nCREATE INDEX idx_messages_conv_created ON messages (conversation_id, created_at);\n\nThat turns the replay query into an index scan with no sort step. Run EXPLAIN ANALYZE before and after — on a few thousand rows you should see the sort node disappear entirely.",
        created_at: ago(4327),
      },
      {
        id: "m-4003",
        role: "user",
        content: "Worth indexing conversations.user_id too?",
        created_at: ago(4323),
      },
      {
        id: "m-4004",
        role: "assistant",
        content:
          "Yes — the sidebar query filters on user_id and orders by updated_at, so `(user_id, updated_at DESC)` is the matching pair.",
        created_at: ago(4322),
      },
    ],
  },
  {
    id: "c-860",
    title: "Vegetarian meals under 20 minutes",
    created_at: ago(5790),
    updated_at: ago(5784),
    messages: [
      {
        id: "m-3801",
        role: "user",
        content: "Five vegetarian dinners I can cook in under 20 minutes on a weeknight.",
        created_at: ago(5790),
      },
      {
        id: "m-3802",
        role: "assistant",
        content:
          "1. Gigantes beans with feta and dill, straight from the tin.\n2. Miso butter udon with spring onion.\n3. Halloumi, chickpea and lemon traybake (grill setting).\n4. Cacio e pepe with a handful of frozen peas.\n5. Black bean quesadillas with pickled red onion.\n\nAll five lean on a tin or a freezer bag, which is where the time actually goes.",
        created_at: ago(5784),
      },
    ],
  },
];

const REPLY_RULES = [
  {
    test: /jwt|token|expire|session|auth/i,
    text: "Keep it simple: sign the token with a short expiry (30–60 minutes is plenty for a demo) and store it in memory on the React side, falling back to sessionStorage so a refresh doesn't log you out.\n\nThen add one interceptor: any 401 from a chat endpoint clears the token and sends the user back to the Login page. That single rule covers expired, tampered and missing tokens without special-casing each one.",
  },
  {
    test: /postgres|sql|index|query|migration|database/i,
    text: "For this schema you really only need two indexes: `(conversation_id, created_at)` on messages and `(user_id, updated_at DESC)` on conversations. Everything the dashboard does is one of those two shapes.\n\nAdd them in the same migration that creates the tables so your local and deployed databases never drift.",
  },
  {
    test: /bcrypt|password|hash|salt|security/i,
    text: "bcrypt with a cost of 12 is the right default here — slow enough to matter, fast enough that login still feels instant.\n\nHash on the way in, compare with `checkpw` on the way out, and never log the plain value, not even at debug level. The salt rides inside the hash string, so a single `password_hash` column is all you store.",
  },
  {
    test: /react|component|state|hook|typescript/i,
    text: "Hold the message list in one piece of state keyed by conversation id, and treat the server as the source of truth after each send.\n\nOptimistically append your own message so the thread feels instant, then reconcile when the reply lands. If the call fails, mark that turn as failed rather than removing it — people hate watching their own words vanish.",
  },
  {
    test: /recipe|dinner|meal|cook|eat/i,
    text: "Twenty minutes means one pan and something already cooked in a tin. Try white beans warmed with garlic, lemon and a lot of olive oil, spooned over toast with whatever green is in the fridge.\n\nIt scales to four without taking any longer, which is the real test of a weeknight recipe.",
  },
  {
    test: /trip|travel|flight|holiday|city/i,
    text: "Three days is two neighbourhoods and one day trip — any more and you spend the time in transit.\n\nBook the day trip for the middle day so a weather forecast can still move it, and leave the last morning completely unplanned. That's usually the bit people remember.",
  },
  {
    test: /name|idea|brainstorm|title/i,
    text: 'Here are five, shortest first: Ledge, Hopper, Marlow, Sidecar, Everyday.\n\nSay each one out loud as "open Ledge" or "open Hopper" — the one that doesn\'t make you hesitate is the one that will survive a year of saying it in meetings.',
  },
];

function craftReply(text) {
  const rule = REPLY_RULES.find((r) => r.test.test(text));
  if (rule) return rule.text;
  const topic = text.trim().replace(/\s+/g, " ").slice(0, 60);
  return (
    "Here's how I'd approach \"" +
    topic +
    (text.trim().length > 60 ? "…" : "") +
    "\":\n\nStart by writing down the one outcome that would make this a success — not the steps, the outcome. Then work backwards and keep only the steps that move you toward it.\n\nIf you tell me which part you're stuck on, I can go deeper on just that piece."
  );
}

function titleFrom(text) {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > 42 ? clean.slice(0, 42).trimEnd() + "…" : clean;
}

function clockOf(iso) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayLabel(iso) {
  const d = new Date(iso);
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000);
  if (isSameDay(d, now)) return "Today";
  if (isSameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}

function shortStamp(iso) {
  const d = new Date(iso);
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000);
  if (isSameDay(d, now)) return clockOf(iso);
  if (isSameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function previewOf(conv) {
  const last = conv.messages[conv.messages.length - 1];
  if (!last) return "No messages yet";
  if (last.role === "error") return "Reply failed — tap to retry";
  const who = last.role === "user" ? "You: " : "";
  return who + last.content.replace(/\s+/g, " ").slice(0, 70);
}

const STARTERS = [
  "Explain JWT expiry in plain English",
  "Draft a standup update from these notes",
  "Why is my Postgres query slow?",
];

export default function Screen() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("login");
  };

  const T = {
    ink: `color-mix(in srgb, ${brand.neutralColor} 35%, black)`,
    body: `color-mix(in srgb, ${brand.neutralColor} 75%, black)`,
    muted: brand.neutralColor,
    line: `color-mix(in srgb, ${brand.neutralColor} 24%, white)`,
    softLine: `color-mix(in srgb, ${brand.neutralColor} 14%, white)`,
    tint: `color-mix(in srgb, ${brand.primaryColor} 9%, white)`,
    tintStrong: `color-mix(in srgb, ${brand.primaryColor} 14%, white)`,
    accentTint: `color-mix(in srgb, ${brand.accentColor} 20%, white)`,
    accentInk: `color-mix(in srgb, ${brand.accentColor} 65%, black)`,
  };

  const [conversations, setConversations] = React.useState(SEED_CONVERSATIONS);
  const [selectedId, setSelectedId] = React.useState("c-914");
  const [draft, setDraft] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [loadingThread, setLoadingThread] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [confirmId, setConfirmId] = React.useState(null);
  const [pane, setPane] = React.useState("list");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [sessionEnded, setSessionEnded] = React.useState(false);
  const [sync, setSync] = React.useState("saved");

  const timers = React.useRef([]);
  const idRef = React.useRef(9000);
  const scrollRef = React.useRef(null);
  const composerRef = React.useRef(null);
  const menuBtnRef = React.useRef(null);
  const confirmBtnRef = React.useRef(null);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => clearTimeout(t));
  }, []);

  const after = (ms, fn) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const active = conversations.find((c) => c.id === selectedId) || null;
  const messages = active ? active.messages : [];

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, pending, selectedId, loadingThread]);

  React.useEffect(() => {
    if (confirmId && confirmBtnRef.current) confirmBtnRef.current.focus();
  }, [confirmId]);

  const sorted = [...conversations].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  const q = query.trim().toLowerCase();
  const visible = q
    ? sorted.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.messages.some((m) => m.content.toLowerCase().includes(q)),
      )
    : sorted;

  const nextId = (prefix) => {
    idRef.current += 1;
    return prefix + idRef.current;
  };

  const openConversation = (id) => {
    setConfirmId(null);
    setPane("thread");
    if (id === selectedId) return;
    setSelectedId(id);
    setLoadingThread(true);
    after(420, () => setLoadingThread(false));
  };

  const startNewChat = () => {
    setConfirmId(null);
    setSelectedId(null);
    setDraft("");
    setPane("thread");
    setLoadingThread(false);
    after(40, () => composerRef.current && composerRef.current.focus());
  };

  const deliverReply = (convId, prompt) => {
    setPending(true);
    setSync("saving");
    after(1250, () => {
      const stamp = new Date().toISOString();
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                updated_at: stamp,
                messages: [
                  ...c.messages,
                  {
                    id: nextId("m-"),
                    role: "assistant",
                    content: craftReply(prompt),
                    created_at: stamp,
                  },
                ],
              }
            : c,
        ),
      );
      setPending(false);
      setSync("saved");
    });
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const text = draft.trim();
    if (!text || pending) return;
    const stamp = new Date().toISOString();
    const userMsg = { id: nextId("m-"), role: "user", content: text, created_at: stamp };
    let convId = selectedId;
    if (!convId) {
      convId = nextId("c-");
      setConversations((prev) => [
        {
          id: convId,
          title: titleFrom(text),
          created_at: stamp,
          updated_at: stamp,
          messages: [userMsg],
        },
        ...prev,
      ]);
      setSelectedId(convId);
    } else {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId ? { ...c, updated_at: stamp, messages: [...c.messages, userMsg] } : c,
        ),
      );
    }
    setDraft("");
    deliverReply(convId, text);
  };

  const retryReply = (convId, errorId) => {
    const conv = conversations.find((c) => c.id === convId);
    if (!conv || pending) return;
    const idx = conv.messages.findIndex((m) => m.id === errorId);
    const lastUser = [...conv.messages.slice(0, idx)].reverse().find((m) => m.role === "user");
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId ? { ...c, messages: c.messages.filter((m) => m.id !== errorId) } : c,
      ),
    );
    deliverReply(convId, lastUser ? lastUser.content : "");
  };

  const confirmDelete = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setConfirmId(null);
    if (id === selectedId) {
      setSelectedId(null);
      setPane("list");
    }
  };

  const onComposerKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const css = `
    .pm-focus:focus-visible { outline: 2px solid var(--pm-primary); outline-offset: 2px; border-radius: ${brand.radius}; }
    @keyframes pm-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes pm-dot { 0%, 80%, 100% { opacity: .25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
    @keyframes pm-pulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
    .pm-rise { animation: pm-rise .24s ease-out both; }
    .pm-dot { animation: pm-dot 1.1s infinite; }
    .pm-skel { animation: pm-pulse 1.4s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      .pm-rise, .pm-dot, .pm-skel { animation: none !important; }
    }
  `;

  if (sessionEnded) {
    return (
      <div
        className="min-h-[70vh] flex items-start justify-center px-4 py-12"
        style={{ "--pm-primary": brand.primaryColor, fontFamily: brand.fontBody }}
      >
        <style>{css}</style>
        <div
          className="w-full max-w-md p-8 text-center"
          style={{
            backgroundColor: "white",
            borderRadius: `calc(${brand.radius} * 2)`,
            border: `1px solid ${T.softLine}`,
          }}
        >
          <div
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: T.tintStrong, color: brand.primaryColor }}
          >
            <Icons.Check className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1
            className="text-xl font-semibold"
            style={{ fontFamily: brand.fontHeading, color: T.ink }}
          >
            Signed out everywhere
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: T.body }}>
            Your access token was discarded on every device. All {conversations.length}{" "}
            conversations are still saved to{" "}
            <strong style={{ color: T.ink }}>@{CURRENT_USER.username}</strong> — sign in again to
            pick up where you left off.
          </p>
          <UI.Button
            onClick={handleLogout}
            className="pm-focus mt-6 w-full justify-center px-5 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: brand.primaryColor,
              color: "white",
              borderRadius: brand.radius,
            }}
          >
            Back to sign in
          </UI.Button>
        </div>
      </div>
    );
  }

  const renderThreadBody = () => {
    if (loadingThread) {
      return (
        <div className="space-y-4 px-4 py-6 sm:px-6">
          <p className="sr-only" role="status">
            Loading conversation from your history
          </p>
          {[0, 1, 2].map((i) => (
            <div key={i} className={i % 2 === 0 ? "flex" : "flex justify-end"}>
              <div
                className="pm-skel h-16"
                style={{
                  width: i === 1 ? "48%" : "66%",
                  backgroundColor: i % 2 === 0 ? T.softLine : T.tint,
                  borderRadius: `calc(${brand.radius} * 2)`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            </div>
          ))}
        </div>
      );
    }

    if (!active) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <div
            className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: T.accentTint, color: T.accentInk }}
          >
            <Icons.Plus className="h-7 w-7" aria-hidden="true" />
          </div>
          <h3
            className="text-lg font-semibold"
            style={{ fontFamily: brand.fontHeading, color: T.ink }}
          >
            New chat
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: T.body }}>
            Type your first message below and the assistant will reply here. The chat gets its name
            from whatever you say first.
          </p>
          <ul className="mt-6 flex w-full max-w-md flex-col gap-2" role="list">
            {STARTERS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    setDraft(s);
                    if (composerRef.current) composerRef.current.focus();
                  }}
                  className="pm-focus w-full px-4 py-2.5 text-left text-sm transition-colors"
                  style={{
                    border: `1px solid ${T.line}`,
                    borderRadius: `calc(${brand.radius} * 1.6)`,
                    color: T.body,
                    backgroundColor: "white",
                  }}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    let lastDay = null;
    return (
      <ol
        className="space-y-3 px-4 py-6 sm:px-6"
        role="log"
        aria-live="polite"
        aria-label="Conversation messages"
      >
        {messages.map((m) => {
          const label = dayLabel(m.created_at);
          const showDay = label !== lastDay;
          lastDay = label;

          if (m.role === "error") {
            return (
              <li key={m.id} className="pm-rise">
                <div
                  className="max-w-[88%] p-4 sm:max-w-[72%]"
                  style={{
                    backgroundColor: T.accentTint,
                    borderRadius: `calc(${brand.radius} * 2)`,
                    borderBottomLeftRadius: brand.radius,
                  }}
                >
                  <p
                    className="flex items-start gap-2 text-sm font-semibold"
                    style={{ color: T.accentInk }}
                  >
                    <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Reply didn't come through
                  </p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: T.body }}>
                    {m.content}
                  </p>
                  <button
                    type="button"
                    onClick={() => retryReply(active.id, m.id)}
                    disabled={pending}
                    className="pm-focus mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
                    style={{
                      backgroundColor: "white",
                      color: T.ink,
                      borderRadius: brand.radius,
                      border: `1px solid ${T.line}`,
                    }}
                  >
                    <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    Try that message again
                  </button>
                </div>
              </li>
            );
          }

          const mine = m.role === "user";
          return (
            <React.Fragment key={m.id}>
              {showDay && (
                <li className="flex justify-center py-2" aria-hidden="false">
                  <span
                    className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                    style={{ backgroundColor: T.tint, color: T.muted, borderRadius: "999px" }}
                  >
                    {label}
                  </span>
                </li>
              )}
              <li className={"pm-rise flex " + (mine ? "justify-end" : "justify-start")}>
                <div
                  className={"max-w-[88%] sm:max-w-[72%] " + (mine ? "text-right" : "text-left")}
                >
                  <div
                    className="whitespace-pre-line px-4 py-3 text-left text-[15px] leading-relaxed"
                    style={{
                      backgroundColor: mine ? brand.primaryColor : "white",
                      color: mine ? "white" : T.body,
                      border: mine ? "none" : `1px solid ${T.softLine}`,
                      borderRadius: `calc(${brand.radius} * 2)`,
                      borderBottomRightRadius: mine ? brand.radius : undefined,
                      borderBottomLeftRadius: mine ? undefined : brand.radius,
                    }}
                  >
                    {m.content}
                  </div>
                  <p className="mt-1 px-1 text-[11px] tabular-nums" style={{ color: T.muted }}>
                    {mine ? "You" : "Assistant"} · {clockOf(m.created_at)}
                  </p>
                </div>
              </li>
            </React.Fragment>
          );
        })}
        {pending && (
          <li className="pm-rise flex justify-start">
            <div
              className="flex items-center gap-2 px-4 py-3.5"
              style={{
                backgroundColor: "white",
                border: `1px solid ${T.softLine}`,
                borderRadius: `calc(${brand.radius} * 2)`,
                borderBottomLeftRadius: brand.radius,
              }}
            >
              <span className="sr-only">The assistant is writing a reply</span>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="pm-dot inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: brand.accentColor, animationDelay: `${i * 0.16}s` }}
                  aria-hidden="true"
                />
              ))}
              <span className="ml-1 text-xs" style={{ color: T.muted }} aria-hidden="true">
                Assistant is typing
              </span>
            </div>
          </li>
        )}
      </ol>
    );
  };

  return (
    <div
      className="px-4 py-6 sm:px-6"
      style={{ "--pm-primary": brand.primaryColor, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <header className="mx-auto mb-5 flex max-w-6xl flex-wrap items-end justify-between gap-3">
        <div>
          <h1
            className="text-[26px] font-semibold leading-tight sm:text-3xl"
            style={{ fontFamily: brand.fontHeading, color: T.ink }}
          >
            Chats
          </h1>
          <p className="mt-1 text-sm" style={{ color: T.muted }}>
            Signed in as{" "}
            <span style={{ color: T.body, fontWeight: 600 }}>@{CURRENT_USER.username}</span> ·{" "}
            <span className="tabular-nums">{conversations.length}</span>{" "}
            {conversations.length === 1 ? "conversation" : "conversations"} saved
          </p>
        </div>
        <UI.Button
          onClick={handleLogout}
          className="pm-focus px-4 py-2 text-sm font-semibold"
          style={{
            backgroundColor: "white",
            color: T.body,
            border: `1px solid ${T.line}`,
            borderRadius: brand.radius,
          }}
        >
          Log out
        </UI.Button>
      </header>

      <div
        className="mx-auto flex h-[calc(100dvh-13rem)] min-h-[520px] max-w-6xl overflow-hidden"
        style={{
          backgroundColor: "white",
          border: `1px solid ${T.softLine}`,
          borderRadius: `calc(${brand.radius} * 2)`,
        }}
      >
        {/* Sidebar */}
        <section
          aria-label="Your conversations"
          className={
            (pane === "thread" ? "hidden md:flex" : "flex") +
            " w-full shrink-0 flex-col md:flex md:w-80 lg:w-[22rem]"
          }
          style={{ borderRight: `1px solid ${T.softLine}`, backgroundColor: brand.backgroundColor }}
        >
          <div className="space-y-3 p-4">
            <h2 className="sr-only">Conversation list</h2>
            <UI.Button
              onClick={startNewChat}
              className="pm-focus flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold"
              style={{
                backgroundColor: brand.primaryColor,
                color: "white",
                borderRadius: brand.radius,
              }}
            >
              <Icons.Plus className="h-4 w-4" aria-hidden="true" />
              New chat
            </UI.Button>
            <div>
              <UI.Label htmlFor="chat-search" className="sr-only">
                Search your chats
              </UI.Label>
              <div className="relative">
                <Icons.Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: T.muted }}
                  aria-hidden="true"
                />
                <UI.Input
                  id="chat-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search chats"
                  className="pm-focus w-full py-2 pl-9 pr-3 text-sm"
                  style={{
                    backgroundColor: "white",
                    border: `1px solid ${T.line}`,
                    borderRadius: brand.radius,
                    color: T.ink,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-4">
            {conversations.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <h3 className="text-sm font-semibold" style={{ color: T.ink }}>
                  No chats yet
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>
                  Start one with “New chat” — it will show up here the moment you send your first
                  message.
                </p>
              </div>
            ) : visible.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <h3 className="text-sm font-semibold" style={{ color: T.ink }}>
                  Nothing matches “{query.trim()}”
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>
                  We searched titles and message text across all{" "}
                  <span className="tabular-nums">{conversations.length}</span> of your chats.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="pm-focus mt-4 text-sm font-semibold underline underline-offset-4"
                  style={{ color: brand.primaryColor }}
                >
                  Clear the search
                </button>
              </div>
            ) : (
              <ul role="list" className="space-y-1">
                {visible.map((c) => {
                  const selected = c.id === selectedId;
                  const failed = c.messages.some((m) => m.role === "error");
                  return (
                    <li
                      key={c.id}
                      className="relative"
                      onKeyDown={(e) => {
                        if (e.key === "Escape" && confirmId === c.id) {
                          e.stopPropagation();
                          setConfirmId(null);
                        }
                      }}
                    >
                      {confirmId === c.id ? (
                        <div
                          className="pm-rise p-3"
                          style={{
                            backgroundColor: "white",
                            border: `1px solid ${T.line}`,
                            borderRadius: `calc(${brand.radius} * 1.4)`,
                          }}
                        >
                          <p className="text-sm font-semibold" style={{ color: T.ink }}>
                            Delete “{c.title}”?
                          </p>
                          <p className="mt-1 text-xs leading-relaxed" style={{ color: T.muted }}>
                            <span className="tabular-nums">{c.messages.length}</span> messages will
                            be removed from your history. This can't be undone.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              ref={confirmBtnRef}
                              onClick={() => confirmDelete(c.id)}
                              className="pm-focus flex-1 px-3 py-1.5 text-xs font-semibold"
                              style={{
                                backgroundColor: brand.primaryColor,
                                color: "white",
                                borderRadius: brand.radius,
                              }}
                            >
                              Delete chat
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmId(null)}
                              className="pm-focus flex-1 px-3 py-1.5 text-xs font-semibold"
                              style={{
                                backgroundColor: "white",
                                color: T.body,
                                border: `1px solid ${T.line}`,
                                borderRadius: brand.radius,
                              }}
                            >
                              Keep it
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="group relative">
                          <button
                            type="button"
                            onClick={() => openConversation(c.id)}
                            aria-current={selected ? "true" : undefined}
                            className="pm-focus w-full py-3 pl-3 pr-11 text-left transition-colors"
                            style={{
                              backgroundColor: selected ? T.tintStrong : "transparent",
                              borderRadius: `calc(${brand.radius} * 1.4)`,
                              boxShadow: selected ? `inset 3px 0 0 ${brand.primaryColor}` : "none",
                            }}
                          >
                            <span className="flex items-baseline justify-between gap-2">
                              <span
                                className="truncate text-sm font-semibold"
                                style={{ color: selected ? brand.primaryColor : T.ink }}
                              >
                                {c.title}
                              </span>
                              <span
                                className="shrink-0 text-[11px] tabular-nums"
                                style={{ color: T.muted }}
                              >
                                {shortStamp(c.updated_at)}
                              </span>
                            </span>
                            <span
                              className="mt-1 block truncate text-xs"
                              style={{ color: T.muted }}
                            >
                              {previewOf(c)}
                            </span>
                            {failed && (
                              <span
                                className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                                style={{
                                  backgroundColor: T.accentTint,
                                  color: T.accentInk,
                                  borderRadius: "999px",
                                }}
                              >
                                <Icons.AlertCircle className="h-3 w-3" aria-hidden="true" />
                                Reply failed
                              </span>
                            )}
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete chat: ${c.title}`}
                            onClick={() => setConfirmId(c.id)}
                            className="pm-focus absolute right-2 top-2.5 flex h-7 w-7 items-center justify-center opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-70 md:group-focus-within:opacity-100"
                            style={{ color: T.muted, borderRadius: brand.radius }}
                          >
                            <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderTop: `1px solid ${T.softLine}` }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold"
              style={{ backgroundColor: brand.primaryColor, color: "white", borderRadius: "999px" }}
              aria-hidden="true"
            >
              {CURRENT_USER.username.slice(0, 2).toUpperCase()}
            </span>
            <span
              className="min-w-0 flex-1 truncate text-sm font-semibold"
              style={{ color: T.ink }}
            >
              @{CURRENT_USER.username}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="pm-focus px-3 py-1.5 text-xs font-semibold"
              style={{
                color: brand.primaryColor,
                borderRadius: brand.radius,
                border: `1px solid ${T.line}`,
              }}
            >
              Log out
            </button>
          </div>
        </section>

        {/* Thread */}
        <section
          aria-label="Chat"
          className={
            (pane === "list" ? "hidden md:flex" : "flex") + " min-w-0 flex-1 flex-col md:flex"
          }
        >
          <div
            className="flex items-center gap-3 px-3 py-3 sm:px-5"
            style={{ borderBottom: `1px solid ${T.softLine}` }}
          >
            <button
              type="button"
              onClick={() => setPane("list")}
              aria-label="Back to all chats"
              className="pm-focus flex h-9 w-9 shrink-0 items-center justify-center md:hidden"
              style={{ color: T.body, borderRadius: brand.radius, border: `1px solid ${T.line}` }}
            >
              <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="min-w-0 flex-1">
              <h2
                className="truncate text-base font-semibold"
                style={{ fontFamily: brand.fontHeading, color: T.ink }}
              >
                {active ? active.title : "New chat"}
              </h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs" style={{ color: T.muted }}>
                {sync === "saving" ? (
                  <>
                    <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Saving to your history…
                  </>
                ) : active ? (
                  <>
                    <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="tabular-nums">{active.messages.length}</span> messages · saved{" "}
                    {shortStamp(active.updated_at)}
                  </>
                ) : (
                  <>
                    <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    Nothing saved yet
                  </>
                )}
              </p>
            </div>

            <div
              className="relative"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setMenuOpen(false);
                  if (menuBtnRef.current) menuBtnRef.current.focus();
                }
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false);
              }}
            >
              <button
                type="button"
                ref={menuBtnRef}
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label="Chat options"
                className="pm-focus flex h-9 w-9 items-center justify-center"
                style={{ color: T.body, borderRadius: brand.radius, border: `1px solid ${T.line}` }}
              >
                <Icons.MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="pm-rise absolute right-0 z-20 mt-2 w-56 overflow-hidden py-1"
                  style={{
                    backgroundColor: "white",
                    border: `1px solid ${T.line}`,
                    borderRadius: `calc(${brand.radius} * 1.4)`,
                    boxShadow: "0 12px 28px -12px rgba(0,0,0,0.3)",
                  }}
                >
                  <button
                    type="button"
                    role="menuitem"
                    disabled={!active}
                    onClick={() => {
                      setMenuOpen(false);
                      if (active) {
                        setConfirmId(active.id);
                        setPane("list");
                      }
                    }}
                    className="pm-focus flex w-full items-center gap-2 px-3 py-2 text-left text-sm disabled:opacity-40"
                    style={{ color: T.body }}
                  >
                    <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                    Delete this chat
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setSessionEnded(true);
                    }}
                    className="pm-focus flex w-full items-center gap-2 px-3 py-2 text-left text-sm"
                    style={{ color: T.body }}
                  >
                    <Icons.X className="h-4 w-4" aria-hidden="true" />
                    Sign out on all devices
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex flex-1 flex-col overflow-y-auto"
            style={{ backgroundColor: brand.backgroundColor }}
          >
            {renderThreadBody()}
          </div>

          <form
            onSubmit={handleSend}
            className="px-3 py-3 sm:px-5 sm:py-4"
            style={{ borderTop: `1px solid ${T.softLine}`, backgroundColor: "white" }}
          >
            <UI.Label htmlFor="message-input" className="sr-only">
              Message the assistant
            </UI.Label>
            <div className="flex items-end gap-2">
              <textarea
                id="message-input"
                ref={composerRef}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onComposerKey}
                placeholder={active ? "Reply to the assistant…" : "Ask the assistant anything…"}
                className="pm-focus max-h-32 min-h-[44px] flex-1 resize-none px-4 py-3 text-[15px] leading-snug"
                style={{
                  border: `1px solid ${T.line}`,
                  borderRadius: `calc(${brand.radius} * 1.6)`,
                  color: T.ink,
                  backgroundColor: "white",
                  fontFamily: brand.fontBody,
                }}
              />
              <UI.Button
                type="submit"
                disabled={pending || draft.trim().length === 0}
                className="pm-focus flex h-[44px] shrink-0 items-center gap-2 px-5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                style={{
                  backgroundColor: brand.primaryColor,
                  color: "white",
                  borderRadius: `calc(${brand.radius} * 1.6)`,
                }}
              >
                {pending ? "Waiting…" : "Send"}
                <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
              </UI.Button>
            </div>
            <p className="mt-2 px-1 text-[11px]" style={{ color: T.muted }}>
              {pending
                ? "Hold on — the assistant is finishing a reply before you send another."
                : "Enter to send · Shift + Enter for a new line"}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
