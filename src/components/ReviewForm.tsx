"use client";

import { useState } from "react";

const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";
const STAR_EMPTY = "#D6D6D6";
const GOLD = "#E5B43A";
const SANS = "var(--font-dm-sans), sans-serif";
const SERIF = "var(--font-cormorant), Georgia, serif";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="30" height="30" viewBox="0 0 14 14" fill={filled ? GOLD : STAR_EMPTY}>
      <path d="M7 1l1.5 4H13l-3.6 2.6 1.4 4.4L7 9.5 3.2 12 4.6 7.6 1 5h4.5L7 1z" />
    </svg>
  );
}

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, location, email, text, rating }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ece6db",
          borderRadius: 18,
          padding: "36px 28px",
          textAlign: "center",
          boxShadow: "0 14px 40px rgba(31,74,51,0.08)",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌿</div>
        <h3 style={{ fontFamily: SERIF, fontSize: 26, color: INK, margin: "0 0 8px" }}>Thank you!</h3>
        <p style={{ fontFamily: SANS, color: "#5a5a50", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
          Your review has been submitted and will appear here once we&apos;ve approved it.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: SANS,
    fontSize: 15,
    color: INK,
    background: "#fff",
    border: "1.5px solid #e3ddd0",
    borderRadius: 12,
    padding: "12px 14px",
    outline: "none",
  };

  return (
    <form
      onSubmit={submit}
      style={{
        background: "#fff",
        border: "1px solid #ece6db",
        borderRadius: 18,
        padding: "28px 24px",
        boxShadow: "0 14px 40px rgba(31,74,51,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <h3 style={{ fontFamily: SERIF, fontSize: 26, color: INK, margin: 0 }}>Share your experience</h3>

      {/* Stars */}
      <div>
        <div style={{ fontFamily: SANS, fontSize: 13, color: "#8a8a7e", marginBottom: 6 }}>Your rating</div>
        <div style={{ display: "flex", gap: 4 }} onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
            >
              <Star filled={n <= (hover || rating)} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input style={{ ...inputStyle, flex: "1 1 160px" }} placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
        <input style={{ ...inputStyle, flex: "1 1 160px" }} placeholder="City (optional)" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={80} />
      </div>
      <input style={inputStyle} type="email" placeholder="Email (optional, not shown publicly)" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} />
      <textarea style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} placeholder="Tell us what you loved… *" value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} required />

      {error && <p style={{ fontFamily: SANS, color: "#C0301F", fontSize: 14, margin: 0 }}>{error}</p>}

      <button
        type="submit"
        disabled={busy}
        style={{
          background: busy ? "#9bbf8e" : INK,
          color: CREAM,
          border: "none",
          borderRadius: 999,
          padding: "13px 30px",
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          cursor: busy ? "default" : "pointer",
          alignSelf: "flex-start",
          boxShadow: "0 12px 24px rgba(31,74,51,0.22)",
        }}
      >
        {busy ? "Submitting…" : "Submit review"}
      </button>
      <p style={{ fontFamily: SANS, color: "#a8a496", fontSize: 12, margin: 0 }}>
        Reviews are checked before they appear, to keep things genuine. <span style={{ color: ACCENT }}>🌿</span>
      </p>
    </form>
  );
}
