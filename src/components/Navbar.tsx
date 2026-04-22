"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";

const links = ["Products", "Our Story", "Process", "Track", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCart((s) => s.count());
  const openCart = useCart((s) => s.openDrawer);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    // Dedicated pages — use Next client-side router so the phone doesn't reload.
    if (id === "Products") return router.push("/products");
    if (id === "Contact")  return router.push("/contact");
    if (id === "Track")    return router.push("/track");

    // In-page anchors (Our Story, Process).
    const targetId = id.toLowerCase().replace(/\s+/g, "-");
    if (pathname !== "/") {
      router.push(`/#${targetId}`);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.4s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled ? "rgba(250,247,242,0.92)" : "rgba(250,247,242,0.75)",
          backdropFilter: "blur(16px)",
          boxShadow: scrolled ? "0 1px 0 rgba(33,77,52,0.08)" : "none",
          padding: "0 clamp(16px, 4vw, 60px)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              if (pathname !== "/") {
                router.push("/");
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/labels/Logo.png" alt="Kanaa" style={{ height: 32, width: "auto", display: "block" }} />
          </button>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 26 }} className="hidden-mobile">
            {links.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => scrollTo(link)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#214D34",
                  letterSpacing: "0.3px",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                {link}
              </button>
            ))}
            <a
              href="/products"
              style={{
                background: "#214D34",
                color: "#FAF7F2",
                border: "none",
                borderRadius: 100,
                padding: "7px 18px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 500,
                fontSize: 12,
                cursor: "pointer",
                letterSpacing: "0.3px",
                transition: "all 0.25s ease",
                textDecoration: "none",
              }}
            >
              Shop
            </a>
            <button
              aria-label="Open cart"
              onClick={openCart}
              style={{
                position: "relative",
                background: "transparent",
                border: "1.5px solid #214D34",
                borderRadius: 999,
                width: 34,
                height: 34,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#214D34",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -6, right: -6, background: "#C0301F", color: "#fff", borderRadius: 999, minWidth: 20, height: 20, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: 5,
              padding: 10,
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
            className="show-mobile"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#214D34",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translateY(7px)"
                      : i === 1
                      ? "scaleX(0)"
                      : "rotate(-45deg) translateY(-7px)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "#FAF7F2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transform: menuOpen ? "none" : "translateY(-12px)",
        }}
      >
        {links.map((link) => (
          <button
            key={link}
            type="button"
            onClick={() => scrollTo(link)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 600,
              fontSize: 32,
              color: "#214D34",
              padding: "8px 20px",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            {link}
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollTo("Products")}
          style={{
            marginTop: 12,
            background: "#214D34",
            color: "#FAF7F2",
            border: "none",
            borderRadius: 100,
            padding: "14px 40px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Order Now
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
