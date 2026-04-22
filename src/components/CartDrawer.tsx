"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

const GREEN = "#214D34";
const CREAM = "#FFF4D8";

export default function CartDrawer() {
  const { lines, open, closeDrawer, setQty, remove, subtotal, count } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s",
          zIndex: 80,
        }}
      />
      {/* Panel */}
      <aside
        aria-label="Shopping cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(440px, 100vw)",
          background: "#FAF7F2",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          zIndex: 90,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px", borderBottom: "1px solid rgba(33,77,52,0.12)" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 22, color: GREEN, margin: 0 }}>
            Your Cart <span style={{ fontSize: 14, color: "#9A8472", fontFamily: "var(--font-dm-sans)" }}>({count()})</span>
          </h2>
          <button aria-label="Close cart" onClick={closeDrawer} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: GREEN }}>✕</button>
        </div>

        {/* Lines */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {lines.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 80, fontFamily: "var(--font-dm-sans)" }}>
              <p style={{ color: "#4A3728", marginBottom: 16 }}>Your cart is empty.</p>
              <Link href="/products" onClick={closeDrawer} style={{ background: GREEN, color: CREAM, padding: "12px 24px", borderRadius: 100, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
                Browse pickles
              </Link>
            </div>
          ) : (
            lines.map((l) => (
              <div key={l.variantId} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(33,77,52,0.08)" }}>
                <div style={{ width: 72, height: 72, borderRadius: 10, overflow: "hidden", background: (l.color ?? GREEN) + "22", flexShrink: 0 }}>
                  {l.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={l.image} alt={l.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-playfair)", color: l.color ?? GREEN }}>{l.name[0]}</div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: 14, color: GREEN, margin: 0 }}>{l.name}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "#9A8472", margin: "2px 0 8px" }}>{l.weight}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(33,77,52,0.2)", borderRadius: 100, overflow: "hidden" }}>
                      <button onClick={() => setQty(l.variantId, Math.max(0, l.qty - 1))} style={qtyBtn}>−</button>
                      <span style={{ padding: "0 10px", fontFamily: "var(--font-dm-sans)", fontWeight: 600, color: GREEN, minWidth: 20, textAlign: "center" }}>{l.qty}</span>
                      <button onClick={() => setQty(l.variantId, Math.min(l.stock || 99, l.qty + 1))} style={qtyBtn}>+</button>
                    </div>
                    <button onClick={() => remove(l.variantId)} style={{ background: "none", border: "none", cursor: "pointer", color: "#C0301F", fontSize: 12, fontFamily: "var(--font-dm-sans)" }}>Remove</button>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: GREEN, whiteSpace: "nowrap" }}>₹{l.price * l.qty}</div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div style={{ padding: 24, borderTop: "1px solid rgba(33,77,52,0.12)", background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", color: "#4A3728" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: 22, color: GREEN }}>₹{subtotal()}</span>
            </div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "#9A8472", margin: "0 0 14px" }}>Shipping calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              style={{ display: "block", textAlign: "center", width: "100%", background: GREEN, color: CREAM, border: "none", padding: "16px", borderRadius: 100, fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: 15, cursor: "pointer", textDecoration: "none", boxSizing: "border-box" }}
            >
              Checkout →
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

const qtyBtn: React.CSSProperties = {
  width: 28,
  height: 28,
  background: "none",
  border: "none",
  cursor: "pointer",
  color: GREEN,
  fontSize: 16,
  lineHeight: 1,
};
