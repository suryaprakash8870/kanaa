"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import {
  getFirebaseAuth,
  isFirebaseConfigured,
} from "@/lib/firebase.client";

const BG = "#DFF0D8";
const INK = "#1F4A33";
const CLAY = "#C0301F";
const CREAM = "#FFF4D8";
const PAGE = "#FAF7F2";
const ACCENT = "#4FB83A";
const ORANGE = "#1F4A33"; // field colour — project theme green (INK)
const ORANGE_DK = "#A9C99A"; // light sage for line-art doodle
const CREAMBG = "#FAF1E3";

const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";
const DISPLAY = "var(--font-dm-serif), Georgia, serif";

type ReorderLine = {
  variantId: string;
  productId: string;
  name: string;
  weight: string;
  price: number;
  mrp?: number;
  image?: string;
  stock: number;
  qty: number;
};
type OrderItem = {
  productName: string;
  variantLabel?: string | null;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  reorderable: ReorderLine | null;
};
type Order = {
  id: string | number;
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  items: OrderItem[];
};

const STATUS_LABEL: Record<string, string> = {
  awaiting_verification: "Awaiting verification",
  pending: "Pending",
  paid: "Paid",
  rejected: "Payment rejected",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

function rupees(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function AccountPage() {
  const router = useRouter();
  const addToCart = useCart((s) => s.add);
  const openCart = useCart((s) => s.openDrawer);

  const [booting, setBooting] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const configured = isFirebaseConfigured();

  /* On load, see if we already have a customer session. */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/account/orders");
        if (res.ok) {
          const data = await res.json();
          setLoggedIn(true);
          setOrders(data.orders ?? []);
        }
      } catch {
        /* not logged in */
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  async function loadOrders() {
    const res = await fetch("/api/account/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders ?? []);
    }
  }

  async function signInWithGoogle() {
    setError("");
    setBusy(true);
    try {
      const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
      const auth = getFirebaseAuth();
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      const idToken = await cred.user.getIdToken();
      const res = await fetch("/api/account/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Login failed.");
      }
      setLoggedIn(true);
      await loadOrders();
    } catch (err) {
      console.error(err);
      // User closing the Google popup is not an error worth shouting about.
      const msg = err instanceof Error ? err.message : "Sign-in failed.";
      if (!/popup-closed|cancelled-popup/i.test(msg)) setError(msg);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/account/session", { method: "DELETE" });
    setLoggedIn(false);
    setOrders([]);
  }

  function reorder(order: Order) {
    let added = 0;
    for (const it of order.items) {
      const r = it.reorderable;
      if (!r) continue;
      addToCart(
        {
          variantId: r.variantId,
          productId: r.productId,
          name: r.name,
          weight: r.weight,
          price: r.price,
          mrp: r.mrp,
          image: r.image,
          stock: r.stock,
        },
        r.qty,
      );
      added += 1;
    }
    if (added > 0) openCart();
    else setError("None of those items are available to reorder right now.");
  }

  return (
    <>
      <Navbar />
      {!booting && !loggedIn ? (
        <LoginScreen
          configured={configured}
          busy={busy}
          error={error}
          onGoogle={signInWithGoogle}
          onTrack={() => router.push("/track")}
        />
      ) : (
      <main
        style={{
          background: PAGE,
          minHeight: "100vh",
          paddingTop: "calc(96px + clamp(28px, 5vw, 56px))",
          paddingBottom: "clamp(60px, 8vw, 110px)",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)" }}>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: CLAY,
              margin: 0,
            }}
          >
            Your Account
          </p>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(34px, 6vw, 54px)",
              color: INK,
              margin: "6px 0 0",
              lineHeight: 1.05,
            }}
          >
            {loggedIn ? "Your orders" : "Your account"}
          </h1>

          {booting ? (
            <p style={{ fontFamily: SANS, color: INK, opacity: 0.6, marginTop: 28 }}>
              Loading…
            </p>
          ) : loggedIn ? (
            /* ----------------------------- order history ----------------------------- */
            <div style={{ marginTop: 28 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                <button
                  onClick={logout}
                  style={{
                    background: "none",
                    border: "none",
                    color: INK,
                    opacity: 0.6,
                    fontFamily: SANS,
                    fontSize: 13,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Log out
                </button>
              </div>

              {orders.length === 0 ? (
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #ece6db",
                    borderRadius: 16,
                    padding: "40px 28px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontFamily: SERIF, fontSize: 20, color: INK, margin: 0 }}>
                    No orders yet
                  </p>
                  <p style={{ fontFamily: SANS, color: INK, opacity: 0.6, margin: "8px 0 20px" }}>
                    When you place an order, it&apos;ll show up here.
                  </p>
                  <button
                    onClick={() => router.push("/products")}
                    style={primaryBtn}
                  >
                    Browse products
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        background: "#fff",
                        border: "1px solid #ece6db",
                        borderRadius: 16,
                        padding: "20px 22px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 12,
                          flexWrap: "wrap",
                        }}
                      >
                        <div>
                          <p style={{ fontFamily: SANS, fontWeight: 700, color: INK, margin: 0 }}>
                            {o.orderNumber}
                          </p>
                          <p style={{ fontFamily: SANS, fontSize: 13, color: INK, opacity: 0.55, margin: "2px 0 0" }}>
                            {new Date(o.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}{" "}
                            • {rupees(o.total)}
                          </p>
                        </div>
                        <span
                          style={{
                            fontFamily: SANS,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            color: INK,
                            background: BG,
                            padding: "5px 10px",
                            borderRadius: 100,
                          }}
                        >
                          {STATUS_LABEL[o.status] ?? o.status}
                        </span>
                      </div>

                      <div style={{ marginTop: 14, borderTop: "1px solid #f0eadf", paddingTop: 12 }}>
                        {o.items.map((it, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontFamily: SANS,
                              fontSize: 14,
                              color: INK,
                              padding: "4px 0",
                            }}
                          >
                            <span>
                              {it.productName}
                              {it.variantLabel ? ` (${it.variantLabel})` : ""}{" "}
                              <span style={{ opacity: 0.5 }}>× {it.qty}</span>
                            </span>
                            <span>{rupees(it.lineTotal)}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                        <button onClick={() => reorder(o)} style={primaryBtn}>
                          Reorder
                        </button>
                        <button
                          onClick={() => router.push(`/track?order=${encodeURIComponent(o.orderNumber)}`)}
                          style={ghostBtn}
                        >
                          Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </main>
      )}
      <Footer />
    </>
  );
}

/* ------------------------- split-screen login ------------------------- */

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

function Zig({ className, stroke = INK }: { className: string; stroke?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <path d="M6 5 L17 12 L11 15 L22 24" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoginScreen({
  configured,
  busy,
  error,
  onGoogle,
  onTrack,
}: {
  configured: boolean;
  busy: boolean;
  error: string;
  onGoogle: () => void;
  onTrack: () => void;
}) {
  const hideBroken = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  };
  return (
    <section className="lg-wrap">
      {/* Illustrated background: green field + cream curve, blobs, doodles */}
      <div className="lg-bg" aria-hidden>
        <svg className="lg-curve" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M42,0 C20,28 20,72 30,100 L100,100 L100,0 Z" fill={CREAMBG} />
        </svg>
        <span className="lg-blob lg-blob-1" />
        <span className="lg-blob lg-blob-2" />
        <span className="lg-blob lg-blob-3" />
        <span className="lg-dots lg-dots-1" />
        <span className="lg-dots lg-dots-2" />
        <span className="lg-dots lg-dots-3" />
        <Zig className="lg-zig lg-zig-1" stroke="#FBF1E3" />
        <Zig className="lg-zig lg-zig-2" stroke="#ffffff" />
        <Zig className="lg-zig lg-zig-3" stroke="#FBF1E3" />
        <Zig className="lg-zig lg-zig-4" stroke={ORANGE} />
        {/* faint mango + leaf line-art, bottom-left */}
        <svg className="lg-mango" viewBox="0 0 120 120" fill="none" aria-hidden>
          <path d="M58 40 C40 36 27 50 30 70 C33 92 54 104 72 95 C90 86 93 60 79 48 C73 43 66 41 58 40 Z" stroke={ORANGE_DK} strokeWidth="1.6" />
          <path d="M61 40 C62 27 73 18 88 19 C84 32 75 40 62 41" stroke={ORANGE_DK} strokeWidth="1.6" />
          <path d="M88 19 C85 28 80 34 73 38" stroke={ORANGE_DK} strokeWidth="1.3" />
          <path d="M40 86 C36 96 40 104 50 106" stroke={ORANGE_DK} strokeWidth="1.3" />
        </svg>
      </div>

      {/* Centered content flanked by your left/right images */}
      <div className="lg-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lg-side lg-side-l" src="/login/left.png" alt="" aria-hidden onError={hideBroken} />

        <div className="lg-card">
          <p className="lg-eyebrow">Your Account</p>
          <h1 className="lg-title">Welcome back!</h1>
          <p className="lg-sub">
            {configured
              ? "Continue with Google to see your order history and reorder your favourites in one tap."
              : "Customer sign-in is coming soon. You can still check out as a guest and track any order with your order number and email."}
          </p>

          {configured && (
            <>
              <button type="button" className="lg-google" onClick={onGoogle} disabled={busy}>
                <GoogleMark />
                {busy ? "Signing in…" : "Continue with Google"}
              </button>
              {error && <p className="lg-err">{error}</p>}
            </>
          )}

          <div className="lg-or"><span>or</span></div>

          <button type="button" className="lg-track" onClick={onTrack}>
            Track an order instead →
          </button>

          <p className="lg-foot">No account needed to order — guest checkout is always available.</p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lg-side lg-side-r" src="/login/right.png" alt="" aria-hidden onError={hideBroken} />
      </div>

      <style>{`
        .lg-wrap {
          margin-top: 96px;
          min-height: calc(100vh - 96px);
          position: relative;
          overflow: hidden;
          background: ${ORANGE};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lg-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .lg-curve { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .lg-blob { position: absolute; border-radius: 46% 54% 60% 40% / 48% 42% 58% 52%; }
        .lg-blob-1 { top: -6%; left: -7%; width: 30%; height: 38%; background: rgba(255,255,255,0.16); }
        .lg-blob-2 { top: 3%; right: 7%; width: 26%; height: 30%; background: #CFE7B4; opacity: 0.5; }
        .lg-blob-3 { bottom: -9%; right: 15%; width: 30%; height: 34%; background: #CFE7B4; opacity: 0.45; }
        .lg-dots {
          position: absolute; width: 56px; height: 56px;
          background-image: radial-gradient(currentColor 1.7px, transparent 1.9px);
          background-size: 13px 13px;
        }
        .lg-dots-1 { top: 13%; left: 4%; color: rgba(255,255,255,0.34); }
        .lg-dots-2 { bottom: 9%; left: 19%; color: rgba(255,255,255,0.3); }
        .lg-dots-3 { bottom: 22%; right: 8%; color: rgba(60,115,39,0.5); }
        .lg-zig { position: absolute; opacity: 0.85; }
        .lg-zig-1 { top: 9%; left: 27%; transform: rotate(6deg); }
        .lg-zig-2 { bottom: 13%; left: 4%; transform: rotate(-8deg); }
        .lg-zig-3 { top: 80%; left: 19%; transform: rotate(10deg) scale(0.8); }
        .lg-zig-4 { bottom: 9%; right: 22%; transform: rotate(-12deg) scale(0.8); }
        .lg-mango { position: absolute; bottom: 5%; left: 1.5%; width: clamp(120px, 13vw, 200px); opacity: 0.4; }

        .lg-row {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1440px;
          padding: 40px clamp(20px, 4vw, 56px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lg-side {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(260px, 36vw, 580px);
          height: auto;
          object-fit: contain;
          z-index: 0;
          pointer-events: none;
        }
        .lg-side-l { left: clamp(-40px, -2vw, 0px); }
        .lg-side-r { right: clamp(-40px, -2vw, 0px); }
        .lg-card { position: relative; z-index: 1; flex: 0 0 auto; width: clamp(320px, 36vw, 440px); text-align: center; }
        .lg-eyebrow { font-family: ${SANS}; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${CLAY}; margin: 0 0 10px; }
        .lg-title { font-family: ${DISPLAY}; font-weight: 400; font-size: clamp(36px, 5vw, 58px); line-height: 1; color: ${INK}; margin: 0 0 14px; letter-spacing: -0.5px; }
        .lg-sub { font-family: ${SANS}; font-size: 15px; line-height: 1.65; color: ${INK}; opacity: 0.72; margin: 0 auto 26px; max-width: 380px; }
        .lg-google { width: 100%; max-width: 340px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; gap: 12px; background: #fff; color: #3c4043; border: 1.5px solid #dadce0; border-radius: 100px; padding: 14px 24px; font-family: ${SANS}; font-weight: 600; font-size: 15px; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.08); transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .lg-google:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,0.14); }
        .lg-google:disabled { opacity: 0.6; cursor: default; }
        .lg-err { font-family: ${SANS}; font-size: 13px; color: ${CLAY}; margin: 12px 0 0; }
        .lg-or { display: flex; align-items: center; gap: 14px; margin: 22px auto; max-width: 340px; color: ${INK}; opacity: 0.45; }
        .lg-or::before, .lg-or::after { content: ""; flex: 1; height: 1px; background: ${INK}40; }
        .lg-or span { font-family: ${SANS}; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
        .lg-track { width: 100%; max-width: 340px; margin: 0 auto; background: transparent; color: ${INK}; border: 1.5px solid ${INK}40; border-radius: 100px; padding: 13px 24px; font-family: ${SANS}; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s ease, border-color 0.2s ease; }
        .lg-track:hover { background: ${INK}12; border-color: ${INK}; }
        .lg-foot { font-family: ${SANS}; font-size: 12.5px; line-height: 1.6; color: ${INK}; opacity: 0.55; margin: 22px auto 0; max-width: 340px; }

        @media (max-width: 880px) {
          .lg-side { display: none; }
          .lg-card { width: auto; max-width: 420px; }
          .lg-mango { width: 110px; opacity: 0.32; }
        }
      `}</style>
    </section>
  );
}

const primaryBtn: React.CSSProperties = {
  background: INK,
  color: CREAM,
  border: "none",
  borderRadius: 100,
  padding: "11px 24px",
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};
const ghostBtn: React.CSSProperties = {
  background: "transparent",
  color: INK,
  border: `1.5px solid ${INK}`,
  borderRadius: 100,
  padding: "11px 24px",
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};
const errStyle: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 13,
  color: CLAY,
  margin: "12px 0 0",
};
