"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";
const CLAY = "#C0301F";

// Font family shortcuts
const HAND = "var(--font-caveat), 'Comic Sans MS', cursive";
const SERIF = "var(--font-cormorant), Georgia, serif";
const DISPLAY = "var(--font-fraunces), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";

const channels = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
    hint: "Fastest — usually back in an hour",
    tint: "#E7F8EC",
    iconBg: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm5.4 14.2c-.2.6-1.4 1.2-1.9 1.2-.5 0-1.2.1-4-1.5-3.3-1.9-5.4-5.2-5.5-5.4-.2-.2-1.3-1.8-1.3-3.4 0-1.6.9-2.4 1.2-2.7.3-.3.7-.4.9-.4h.6c.2 0 .5 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.4.5c-.2.2-.4.4-.2.7.3.5.9 1.4 1.9 2.2 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.2.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4.1.1.1 1-.1 1.7z" />
      </svg>
    ),
  },
  {
    key: "email",
    label: "Email",
    value: "hello@kanaa.co",
    href: "mailto:hello@kanaa.co",
    hint: "We reply within a working day",
    tint: "#FFF0EB",
    iconBg: "linear-gradient(135deg, #F5C03A 0%, #E8553F 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    value: "@kanaa.foods",
    href: "https://instagram.com/kanaa.foods",
    hint: "DMs are open — especially for recipes",
    tint: "#FCEBF2",
    iconBg:
      "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
      </svg>
    ),
  },
  {
    key: "visit",
    label: "Visit the kitchen",
    value: "Erode, Tamil Nadu",
    href: "#kitchen",
    hint: "Sat mornings · book ahead",
    tint: "#E8F1FA",
    iconBg: "linear-gradient(135deg, #3B82F6 0%, #1F4A8A 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" fill="#fff" stroke="none" />
      </svg>
    ),
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
      <main
        style={{
          position: "relative",
          background: BG,
          paddingTop: "calc(56px + clamp(40px, 6vw, 90px))",
          paddingBottom: "clamp(60px, 8vw, 110px)",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* Outline wordmark backdrop — constrained to the hero area so it
            doesn't bleed into the FAQ at the bottom of the page */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            height: "42vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(120px, 20vw, 300px)",
              lineHeight: 0.86,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: `2px ${ACCENT}44`,
              textTransform: "lowercase",
              userSelect: "none",
            }}
          >
            say&nbsp;hi
          </div>
        </div>

        {/* Background doodle */}
        <svg
          aria-hidden
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.16 }}
        >
          <path
            d="M -60 80 C 180 20, 320 240, 180 380 C 40 520, 280 620, 520 520 C 760 420, 900 640, 760 760"
            fill="none"
            stroke={INK}
            strokeOpacity="0.4"
            strokeWidth="70"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
            zIndex: 2,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 72px)" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                borderRadius: 999,
                background: "#fff",
                border: `1px solid ${INK}1A`,
                marginBottom: 22,
                boxShadow: "0 6px 16px rgba(31,74,51,0.06)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: ACCENT,
                  boxShadow: `0 0 0 4px ${ACCENT}33`,
                }}
              />
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2.4px",
                  color: INK,
                  textTransform: "uppercase",
                }}
              >
                Kitchen is open · Mon–Sat
              </span>
            </div>
            <div
              style={{
                fontFamily: HAND,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                color: CLAY,
                transform: "rotate(-3deg)",
                marginBottom: 4,
              }}
            >
              psst —
            </div>

            <h1
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(52px, 8vw, 112px)",
                lineHeight: 0.96,
                letterSpacing: "-2px",
                color: INK,
                margin: 0,
                marginBottom: 18,
              }}
            >
              pass us a note.
            </h1>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "clamp(14px, 1.2vw, 17px)",
                color: INK,
                opacity: 0.72,
                maxWidth: 540,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Drop a question, a recipe, or just a hello — it lands on the same table where we
              grind the masala every Monday.
            </p>
          </div>

          {/* Split layout */}
          <div
            className="ct-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "clamp(28px, 4vw, 56px)",
              alignItems: "start",
            }}
          >
            {/* ── LEFT: Postcard form ── */}
            <div
              style={{
                position: "relative",
                transform: "rotate(-1.2deg)",
                transformOrigin: "top center",
              }}
            >
              {/* Washi tape */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -14,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-4deg)",
                  width: 120,
                  height: 28,
                  background:
                    "repeating-linear-gradient(45deg, rgba(79,184,58,0.55) 0 8px, rgba(79,184,58,0.35) 8px 16px)",
                  borderRadius: 2,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  zIndex: 3,
                }}
              />

              {/* Red thumbtack pin — sits on top of the washi tape */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 35% 30%, #F27062 0%, #C0301F 55%, #7A1A0E 100%)",
                  boxShadow:
                    "inset -3px -4px 0 rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.28)",
                  zIndex: 5,
                }}
              />

              <form
                onSubmit={handleSubmit}
                style={{
                  position: "relative",
                  background:
                    "linear-gradient(180deg, #FFF8E7 0%, #F4E6C1 100%)",
                  borderRadius: 4,
                  padding: "clamp(36px, 4vw, 52px) clamp(28px, 3.4vw, 48px)",
                  boxShadow:
                    "0 30px 60px rgba(31,74,51,0.22), 0 8px 20px rgba(31,74,51,0.1), inset 0 0 0 1px rgba(31,74,51,0.08)",
                  overflow: "hidden",
                  minHeight: 720,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Paper grain */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(1200px 400px at 20% 0%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(800px 300px at 100% 100%, rgba(0,0,0,0.06), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Postage stamp — asset */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="ct-stamp"
                  src="/contact/stamp.svg"
                  alt=""
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 22,
                    width: "clamp(62px, 9vw, 110px)",
                    height: "auto",
                    transform: "rotate(5deg)",
                    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))",
                    pointerEvents: "none",
                  }}
                />

                {/* Postmark — asset */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="ct-postmark"
                  src="/contact/postmark.svg"
                  alt=""
                  style={{
                    position: "absolute",
                    top: 150,
                    right: 30,
                    width: "clamp(72px, 10vw, 130px)",
                    height: "auto",
                    transform: "rotate(-14deg)",
                    opacity: 0.85,
                    mixBlendMode: "multiply",
                    pointerEvents: "none",
                  }}
                />


                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 10,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: INK,
                    opacity: 0.55,
                    margin: 0,
                    marginBottom: 4,
                    position: "relative",
                  }}
                >
                  To
                </p>
                <p
                  className="ct-to-name"
                  style={{
                    fontFamily: HAND,
                    fontWeight: 600,
                    fontSize: "clamp(26px, 3.4vw, 40px)",
                    lineHeight: 1.05,
                    color: INK,
                    margin: 0,
                    marginBottom: 6,
                    paddingRight: "clamp(80px, 22vw, 140px)",
                    position: "relative",
                  }}
                >
                  The Kanaa Family,
                </p>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    color: INK,
                    opacity: 0.75,
                    margin: 0,
                    marginBottom: 28,
                    position: "relative",
                  }}
                >
                  I wanted to write because…
                </p>

                {!sent ? (
                  <div style={{ position: "relative" }}>
                    {/* Reason chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                      {reasons.map((r) => {
                        const active = r === reason;
                        return (
                          <button
                            type="button"
                            key={r}
                            onClick={() => setReason(r)}
                            style={{
                              padding: "7px 14px",
                              borderRadius: 999,
                              border: `1px solid ${active ? INK : INK + "33"}`,
                              background: active ? INK : "transparent",
                              color: active ? CREAM : INK,
                              fontFamily: SANS,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: "pointer",
                              letterSpacing: "0.3px",
                              transition: "all 0.2s",
                            }}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>

                    <Field label="Your name" name="name" placeholder="e.g. Lakshmi" required />
                    <Field label="Email or phone" name="contact" placeholder="so we can write back" required />
                    <Field
                      label="Your note"
                      name="message"
                      placeholder="Write anything — the longer, the better."
                      required
                      multiline
                    />

                    <button
                      type="submit"
                      style={{
                        marginTop: 18,
                        background: INK,
                        color: CREAM,
                        border: "none",
                        borderRadius: 999,
                        padding: "14px 32px",
                        fontFamily: SANS,
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        boxShadow: "0 12px 24px rgba(31,74,51,0.28)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      Send the note
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "20px 0",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        transform: "rotate(-6deg)",
                        border: `3px solid ${CLAY}`,
                        padding: "10px 22px",
                        borderRadius: 8,
                        color: CLAY,
                        fontFamily: SANS,
                        fontWeight: 800,
                        fontSize: 22,
                        letterSpacing: "4px",
                      }}
                    >
                      DELIVERED
                    </div>
                    <p
                      style={{
                        fontFamily: HAND,
                        fontWeight: 600,
                        fontSize: 32,
                        color: INK,
                        margin: "22px 0 6px",
                      }}
                    >
                      Your note is on the table.
                    </p>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 14,
                        color: INK,
                        opacity: 0.7,
                        lineHeight: 1.6,
                      }}
                    >
                      One of us will read it over chai and write back soon.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      style={{
                        marginTop: 18,
                        background: "transparent",
                        border: `1.5px solid ${INK}`,
                        color: INK,
                        borderRadius: 999,
                        padding: "10px 22px",
                        fontFamily: SANS,
                        fontWeight: 600,
                        fontSize: 12,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                    >
                      Send another
                    </button>
                  </div>
                )}
              </form>

              {/* Wax seal — decorative, sits outside form bottom-right */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/contact/seal.svg"
                alt=""
                className="ct-seal"
                style={{
                  position: "absolute",
                  bottom: -32,
                  right: -28,
                  width: "clamp(84px, 9vw, 110px)",
                  height: "auto",
                  transform: "rotate(8deg)",
                  filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.28))",
                  pointerEvents: "none",
                  zIndex: 4,
                }}
              />

              {/* Handwritten margin note */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: -56,
                  left: 10,
                  fontFamily: HAND,
                  fontSize: 22,
                  color: INK,
                  opacity: 0.7,
                  transform: "rotate(-3deg)",
                }}
              >
                with love, from Erode ✦
              </div>
            </div>

            {/* ── RIGHT: Direct lines + mini map ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p
                className="ct-skip"
                style={{
                  marginTop: "clamp(32px, 5vw, 0px)",
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: 0,
                  marginBottom: 2,
                }}
              >
                Or, skip the stamp —
              </p>

              {channels.map((c, i) => (
                <a
                  key={c.key}
                  href={c.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    padding: "18px 22px",
                    background: `linear-gradient(90deg, ${c.tint} 0%, #fff 55%)`,
                    borderRadius: 14,
                    textDecoration: "none",
                    color: INK,
                    border: `1px solid ${INK}14`,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    boxShadow: "0 2px 6px rgba(31,74,51,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(4px)";
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(31,74,51,0.12)";
                    e.currentTarget.style.borderColor = `${ACCENT}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(31,74,51,0.04)";
                    e.currentTarget.style.borderColor = `${INK}14`;
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: c.iconBg,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 8px 18px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: SANS,
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: INK,
                          opacity: 0.45,
                        }}
                      >
                        0{i + 1} · {c.label}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-serif), Georgia, serif",
                        fontWeight: 400,
                        fontSize: 22,
                        color: INK,
                        lineHeight: 1.15,
                        marginTop: 3,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {c.value}
                    </div>
                    <div
                      style={{
                        fontFamily: SANS,
                        fontSize: 12,
                        color: INK,
                        opacity: 0.6,
                        marginTop: 2,
                      }}
                    >
                      {c.hint}
                    </div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              ))}

              {/* Kitchen card */}
              <div
                id="kitchen"
                style={{
                  marginTop: 12,
                  background: INK,
                  color: CREAM,
                  borderRadius: 18,
                  padding: "clamp(24px, 3vw, 34px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative concentric rings */}
                <div
                  aria-hidden
                  className="ct-ring-lg"
                  style={{
                    position: "absolute",
                    top: "-30%",
                    right: "-20%",
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    border: `1px dashed ${CREAM}22`,
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden
                  className="ct-ring-sm"
                  style={{
                    position: "absolute",
                    top: "-10%",
                    right: "-5%",
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    border: `1px dashed ${CREAM}22`,
                    pointerEvents: "none",
                  }}
                />
                <p
                  className="ct-sayhi"
                  style={{
                    fontFamily: HAND,
                    fontSize: 24,
                    color: ACCENT,
                    margin: 0,
                    marginBottom: 10,
                    transform: "rotate(-2deg)",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  come say hi
                </p>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "clamp(26px, 3.4vw, 38px)",
                    letterSpacing: "-0.6px",
                    margin: 0,
                    marginBottom: 10,
                    lineHeight: 1.05,
                    position: "relative",
                    paddingRight: "clamp(0px, 4vw, 0px)",
                  }}
                >
                  the kitchen,<br />at a glance.
                </h3>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    lineHeight: 1.65,
                    opacity: 0.82,
                    margin: 0,
                    marginBottom: 18,
                  }}
                >
                  Plot 14, Kongu Road<br />
                  Erode, Tamil Nadu 638004<br />
                  Saturdays · 9am–12pm
                </p>
                <a
                  href="https://maps.google.com/?q=Erode+Tamil+Nadu"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: CREAM,
                    textDecoration: "none",
                    fontFamily: SANS,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    borderBottom: `1px solid ${CREAM}55`,
                    paddingBottom: 3,
                  }}
                >
                  Open in maps
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ strip */}
          <div
            style={{
              marginTop: "clamp(80px, 10vw, 120px)",
              borderTop: `1px solid ${INK}22`,
              paddingTop: "clamp(40px, 5vw, 60px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            {[
              { q: "How fast do you ship?", a: "Every batch leaves the kitchen within 48 hours of preparation, pan-India." },
              { q: "Bulk / corporate gifting?", a: "Yes — drop us a note with quantity and we'll tailor a box for you." },
              { q: "Return or refund?", a: "If the jar doesn't delight, we replace it within 30 days. No questions." },
            ].map((f) => (
              <div key={f.q}>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: 20,
                    fontWeight: 600,
                    color: INK,
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  {f.q}
                </p>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 13.5,
                    color: INK,
                    opacity: 0.7,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .ct-grid { grid-template-columns: 1fr !important; }
            .ct-seal { bottom: -20px !important; right: -14px !important; width: 78px !important; }
          }
          @media (max-width: 600px) {
            /* Keep stamp/postmark small so they don't smother "To / Kanaa Family" */
            .ct-stamp { width: 56px !important; top: 14px !important; right: 14px !important; }
            .ct-postmark {
              width: 70px !important;
              top: auto !important;
              bottom: 14px !important;
              right: 14px !important;
              opacity: 0.7 !important;
            }
            .ct-to-name { padding-right: 70px !important; }
            /* Pull the right column away from the letter body */
            .ct-skip { margin-top: 20px !important; }
            /* Shrink the decorative rings so they don't push into text */
            .ct-ring-lg { width: 180px !important; height: 180px !important; top: -25% !important; right: -30% !important; }
            .ct-ring-sm { width: 120px !important; height: 120px !important; top: -12% !important; right: -18% !important; }
          }
        `}</style>
      </main>
      <Footer />
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
      <span
        style={{
          display: "block",
          fontFamily: SANS,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "2.4px",
          textTransform: "uppercase",
          color: INK,
          opacity: 0.55,
          marginBottom: 2,
        }}
      >
        {label}
      </span>
      {multiline ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={3} style={base} />
      ) : (
        <input name={name} placeholder={placeholder} required={required} style={base} />
      )}
    </label>
  );
}
