"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PickleJar from "./PickleJar";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    variant: "mango" as const,
    name: "Wild Mango Pickle",
    tagline: "The crown jewel of Indian pickles",
    desc: "Sun-ripened wild mangoes from Kongu Nadu, slow-brewed in cold-pressed gingelly oil with 11 hand-ground spices.",
    price: "₹199",
    weight: "300g",
    spice: "Medium",
    tags: ["Bestseller", "Classic"],
    accent: "#C9A24A",
    bg: "linear-gradient(135deg, #FFF8EC 0%, #F5EDD4 100%)",
  },
  {
    variant: "veg" as const,
    name: "Wild Mixed Veg",
    tagline: "A garden in every bite",
    desc: "Seasonal vegetables — carrot, raw banana, drumstick — fermented in turmeric brine and cold-pressed coconut oil.",
    price: "₹199",
    weight: "300g",
    spice: "Mild",
    tags: ["New", "Seasonal"],
    accent: "#7AA33C",
    bg: "linear-gradient(135deg, #F0F7E8 0%, #E2EFD4 100%)",
  },
  {
    variant: "lime" as const,
    name: "Lime & Ginger",
    tagline: "Tangy, fiery, unforgettable",
    desc: "Country limes split and packed with fresh ginger, green chilli, and rock salt. Aged for 30 days in terracotta.",
    price: "₹199",
    weight: "300g",
    spice: "Spicy",
    tags: ["Fermented", "Aged 30 days"],
    accent: "#7A3E1D",
    bg: "linear-gradient(135deg, #FBF5EC 0%, #F0E8D8 100%)",
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children ?? [], {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
        background: "#F0EBE0",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "3px",
              color: "#C9A24A",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Our Collection
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              color: "#214D34",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
            }}
          >
            Every jar, a story.
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.variant} product={p} />
          ))}
        </div>

        {/* CTA note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 48,
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 14,
            color: "#5A3E2B",
            opacity: 0.65,
          }}
        >
          Free delivery on orders above ₹499 · Dispatched within 2 business days
        </p>
      </div>
    </section>
  );
}

function ProductCard({ product: p }: { product: (typeof products)[number] }) {
  return (
    <div
      style={{
        background: p.bg,
        borderRadius: 24,
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        border: "1px solid rgba(33,77,52,0.08)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(33,77,52,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Tags */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {p.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: p.accent,
              color: p.variant === "veg" ? "#214D34" : "#FAF7F2",
              borderRadius: 100,
              padding: "4px 12px",
              fontSize: 11,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Jar */}
      <div
        style={{
          width: "clamp(100px, 14vw, 160px)",
          height: 200,
          margin: "0 auto 28px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          filter: "drop-shadow(0 12px 28px rgba(33,77,52,0.15))",
        }}
      >
        <PickleJar variant={p.variant} />
      </div>

      {/* Info */}
      <h3
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 700,
          fontSize: 22,
          color: "#214D34",
          marginBottom: 4,
        }}
      >
        {p.name}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 12,
          color: p.accent,
          fontStyle: "italic",
          marginBottom: 14,
          opacity: 0.9,
        }}
      >
        {p.tagline}
      </p>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 14,
          lineHeight: 1.65,
          color: "#4A3728",
          opacity: 0.75,
          marginBottom: 24,
          flexGrow: 1,
        }}
      >
        {p.desc}
      </p>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {[
          { icon: "⚖️", label: p.weight },
          { icon: "🌶️", label: `${p.spice} Heat` },
          { icon: "🌿", label: "Cold Pressed" },
        ].map((m) => (
          <span
            key={m.label}
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              color: "#214D34",
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>{m.icon}</span> {m.label}
          </span>
        ))}
      </div>

      {/* Price + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 800,
            fontSize: 28,
            color: "#214D34",
          }}
        >
          {p.price}
        </span>
        <button
          style={{
            background: "#214D34",
            color: "#FAF7F2",
            border: "none",
            borderRadius: 100,
            padding: "12px 26px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = p.accent;
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#214D34";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
