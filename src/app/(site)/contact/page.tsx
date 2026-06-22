"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";
const CLAY = "#C0301F";
const TERRA = "#C0552F";
const PAGE = "#FAF7F2";
const CARD = "#F3EBE0";

const HAND = "var(--font-caveat), 'Comic Sans MS', cursive";
const SERIF = "var(--font-cormorant), Georgia, serif";
const DISPLAY = "var(--font-fraunces), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";

const cards = [
  {
    key: "phone",
    title: "Phone",
    value: "+91 89398 74391",
    href: "tel:+918939874391",
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
    ),
  },
  {
    key: "whatsapp",
    title: "WhatsApp",
    value: "+91 89398 74391",
    href: "https://wa.me/918939874391",
    icon: (
      <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm5.4 14.2c-.2.6-1.4 1.2-1.9 1.2-.5 0-1.2.1-4-1.5-3.3-1.9-5.4-5.2-5.5-5.4-.2-.2-1.3-1.8-1.3-3.4 0-1.6.9-2.4 1.2-2.7.3-.3.7-.4.9-.4h.6c.2 0 .5 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.4.5c-.2.2-.4.4-.2.7.3.5.9 1.4 1.9 2.2 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.2.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4.1.1.1 1-.1 1.7z" />
    ),
    filled: true,
  },
  {
    key: "email",
    title: "Email",
    value: "kanaafoods@gmail.com",
    href: "mailto:kanaafoods@gmail.com",
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  },
  {
    key: "instagram",
    title: "Instagram",
    value: "@kanaa.foods",
    href: "https://instagram.com/kanaa.foods",
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill={TERRA} stroke="none" /></>,
  },
];

const reasons = ["Ask a question", "Place a bulk order", "Partner with us", "Say hello"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [reason, setReason] = useState(reasons[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />

      {/* ── HEADER BAND ── */}
      <header
        style={{
          position: "relative",
          background: BG,
          paddingTop: "calc(var(--hdr) + clamp(28px, 5vw, 56px))",
          paddingBottom: "clamp(64px, 9vw, 120px)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)", position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(40px, 7vw, 86px)",
              letterSpacing: "-1.5px",
              lineHeight: 1.02,
              color: INK,
              margin: 0,
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: INK,
              opacity: 0.72,
              lineHeight: 1.7,
              margin: "16px auto 0",
              maxWidth: 520,
            }}
          >
            Have a question, a bulk order, or just want to say hello? We&apos;d love to
            hear from you — reach us any way you like.
          </p>
        </div>

        {/* wavy bottom edge into the page */}
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: "clamp(40px, 5vw, 70px)", display: "block" }}>
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={PAGE} />
        </svg>
      </header>

      {/* ── BODY ── */}
      <main style={{ background: PAGE, paddingBottom: "clamp(60px, 8vw, 110px)" }}>
        {/* Centered heading above both columns */}
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: "clamp(28px, 5vw, 56px) clamp(20px, 5vw, 40px) 0" }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(30px, 3.8vw, 50px)", letterSpacing: "-0.6px", color: INK, margin: 0 }}>
            Get In Touch
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "clamp(13px, 1.1vw, 15px)", color: INK, opacity: 0.72, lineHeight: 1.7, margin: "12px auto 0", maxWidth: 480 }}>
            Drop us a note below — questions, feedback, bulk orders, or just a hello.
            It lands on the same table where we cook every morning.
          </p>
        </div>

        <div
          className="ct-grid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "clamp(28px, 4vw, 52px) clamp(20px, 5vw, 60px) 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 4vw, 60px)",
            alignItems: "start",
          }}
        >
          {/* ── RIGHT (visually): contact cards + info ── */}
          <div style={{ order: 2 }}>
            <div className="ct-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.6vw, 20px)" }}>
              {cards.map((c) => (
                <a
                  key={c.key}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="ct-card"
                >
                  <span className="ct-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={c.filled ? TERRA : "none"} stroke={c.filled ? "none" : TERRA} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <span className="ct-card-title">{c.title}</span>
                  <span className="ct-card-value">{c.value}</span>
                </a>
              ))}
            </div>

            {/* Brand info card */}
            <div
              style={{
                marginTop: "clamp(14px, 1.6vw, 20px)",
                background: INK,
                color: CREAM,
                borderRadius: 18,
                padding: "clamp(26px, 3.2vw, 40px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* decorative rings */}
              <div aria-hidden style={{ position: "absolute", top: "-30%", right: "-18%", width: 240, height: 240, borderRadius: "50%", border: `1px dashed ${CREAM}22`, pointerEvents: "none" }} />
              <div aria-hidden style={{ position: "absolute", top: "-8%", right: "-2%", width: 150, height: 150, borderRadius: "50%", border: `1px dashed ${CREAM}22`, pointerEvents: "none" }} />

              <p style={{ fontFamily: HAND, fontSize: 24, color: ACCENT, margin: "0 0 8px", transform: "rotate(-2deg)", display: "inline-block" }}>come say hi</p>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.1, letterSpacing: "-0.4px", margin: "0 0 14px" }}>
                We cook fresh,<br />every single day.
              </h3>
              <p style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.7, opacity: 0.82, margin: "0 0 8px" }}>
                Open <b>Monday – Saturday</b><br />
                9:00 AM – 7:00 PM
              </p>
              <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.6, opacity: 0.68, margin: "0 0 22px" }}>
                We usually reply within a working day — WhatsApp is fastest.
              </p>
              <a
                href="https://wa.me/918939874391"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: ACCENT,
                  color: INK,
                  borderRadius: 999,
                  padding: "12px 24px",
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Chat on WhatsApp
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          </div>

          {/* ── LEFT (visually): paper form ── */}
          <div style={{ order: 1 }}>
            {/* paper postcard form */}
            <div style={{ position: "relative", transform: "rotate(-1.2deg)", transformOrigin: "top center" }}>
              {/* Washi tape */}
              <div aria-hidden style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%) rotate(-4deg)", width: 120, height: 28, background: "repeating-linear-gradient(45deg, rgba(79,184,58,0.55) 0 8px, rgba(79,184,58,0.35) 8px 16px)", borderRadius: 2, boxShadow: "0 4px 8px rgba(0,0,0,0.15)", zIndex: 3 }} />
              {/* Red thumbtack pin */}
              <div aria-hidden style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", width: 20, height: 20, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #F27062 0%, #C0301F 55%, #7A1A0E 100%)", boxShadow: "inset -3px -4px 0 rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.28)", zIndex: 5 }} />

              <form
                onSubmit={handleSubmit}
                style={{
                  position: "relative",
                  background: "linear-gradient(180deg, #FFF8E7 0%, #F4E6C1 100%)",
                  borderRadius: 4,
                  padding: "clamp(36px, 4vw, 52px) clamp(28px, 3.4vw, 48px)",
                  boxShadow: "0 30px 60px rgba(31,74,51,0.22), 0 8px 20px rgba(31,74,51,0.1), inset 0 0 0 1px rgba(31,74,51,0.08)",
                  overflow: "hidden",
                  minHeight: 640,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Paper grain */}
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(1200px 400px at 20% 0%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(800px 300px at 100% 100%, rgba(0,0,0,0.06), transparent 60%)", pointerEvents: "none" }} />

                {/* Postage stamp */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ct-stamp" src="/contact/stamp.svg" alt="" style={{ position: "absolute", top: 20, right: 22, width: "clamp(62px, 9vw, 104px)", height: "auto", transform: "rotate(5deg)", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))", pointerEvents: "none" }} />
                {/* Postmark */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ct-postmark" src="/contact/postmark.svg" alt="" style={{ position: "absolute", top: 148, right: 30, width: "clamp(72px, 10vw, 122px)", height: "auto", transform: "rotate(-14deg)", opacity: 0.85, mixBlendMode: "multiply", pointerEvents: "none" }} />

                <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: INK, opacity: 0.55, margin: "0 0 4px", position: "relative" }}>To</p>
                <p className="ct-to-name" style={{ fontFamily: HAND, fontWeight: 600, fontSize: "clamp(26px, 3.4vw, 40px)", lineHeight: 1.05, color: INK, margin: "0 0 6px", paddingRight: "clamp(80px, 22vw, 140px)", position: "relative" }}>The Kanaa Family,</p>
                <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(18px, 1.8vw, 22px)", color: INK, opacity: 0.75, margin: "0 0 28px", position: "relative" }}>I wanted to write because…</p>

                {!sent ? (
                  <div style={{ position: "relative" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                      {reasons.map((r) => {
                        const active = r === reason;
                        return (
                          <button type="button" key={r} onClick={() => setReason(r)} style={{ padding: "7px 14px", borderRadius: 999, border: `1px solid ${active ? INK : INK + "33"}`, background: active ? INK : "transparent", color: active ? CREAM : INK, fontFamily: SANS, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.3px", transition: "all 0.2s" }}>
                            {r}
                          </button>
                        );
                      })}
                    </div>

                    <Field label="Your name" name="name" placeholder="e.g. Lakshmi" required />
                    <Field label="Email or phone" name="contact" placeholder="so we can write back" required />
                    <Field label="Your note" name="message" placeholder="Write anything — the longer, the better." required multiline />

                    <button type="submit" style={{ marginTop: 18, background: INK, color: CREAM, border: "none", borderRadius: 999, padding: "14px 32px", fontFamily: SANS, fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 12px 24px rgba(31,74,51,0.28)", display: "inline-flex", alignItems: "center", gap: 10 }}>
                      Send the note
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </button>
                  </div>
                ) : (
                  <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "20px 0" }}>
                    <div style={{ display: "inline-block", transform: "rotate(-6deg)", border: `3px solid ${CLAY}`, padding: "10px 22px", borderRadius: 8, color: CLAY, fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: "4px" }}>DELIVERED</div>
                    <p style={{ fontFamily: HAND, fontWeight: 600, fontSize: 32, color: INK, margin: "22px 0 6px" }}>Your note is on the table.</p>
                    <p style={{ fontFamily: SANS, fontSize: 14, color: INK, opacity: 0.7, lineHeight: 1.6 }}>One of us will read it over chai and write back soon.</p>
                    <button type="button" onClick={() => setSent(false)} style={{ marginTop: 18, background: "transparent", border: `1.5px solid ${INK}`, color: INK, borderRadius: 999, padding: "10px 22px", fontFamily: SANS, fontWeight: 600, fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}>Send another</button>
                  </div>
                )}
              </form>

              {/* Wax seal */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/contact/seal.svg" alt="" className="ct-seal" style={{ position: "absolute", bottom: -32, right: -28, width: "clamp(84px, 9vw, 110px)", height: "auto", transform: "rotate(8deg)", filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.28))", pointerEvents: "none", zIndex: 4 }} />
              {/* Handwritten margin note */}
              <div aria-hidden style={{ position: "absolute", bottom: -56, left: 10, fontFamily: HAND, fontSize: 22, color: INK, opacity: 0.7, transform: "rotate(-3deg)" }}>with love, from our kitchen ✦</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .ct-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          background: ${CARD};
          border: 1px solid rgba(31,74,51,0.08);
          border-radius: 16px;
          padding: clamp(20px, 2.4vw, 30px) 14px;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ct-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(31,74,51,0.12); }
        .ct-card-icon {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: #FBEFE3;
          display: inline-flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .ct-card-title {
          font-family: ${SANS};
          font-size: 15px; font-weight: 700; color: ${INK};
        }
        .ct-card-value {
          font-family: ${SANS};
          font-size: 12px; color: ${INK}; opacity: 0.62; word-break: break-word;
        }
        @media (max-width: 860px) {
          .ct-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 380px) {
          .ct-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
  multiline,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px dashed ${INK}55`,
    padding: "10px 0 12px",
    fontFamily: HAND,
    fontWeight: 500,
    fontSize: 22,
    color: INK,
    outline: "none",
    resize: "none" as const,
  };
  return (
    <label style={{ display: "block", marginBottom: 18 }}>
      <span style={{ display: "block", fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: "2.4px", textTransform: "uppercase", color: INK, opacity: 0.55, marginBottom: 2 }}>{label}</span>
      {multiline ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={3} style={base} />
      ) : (
        <input name={name} placeholder={placeholder} required={required} style={base} />
      )}
    </label>
  );
}
