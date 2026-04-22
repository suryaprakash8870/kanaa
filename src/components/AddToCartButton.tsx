"use client";

import { useCart } from "@/hooks/useCart";

type Props = {
  productId: string;
  variantId: string;
  name: string;
  weight: string;
  price: number;
  mrp?: number;
  stock: number;
  image?: string;
  color?: string;
};

export default function AddToCartButton(p: Props) {
  const add = useCart((s) => s.add);
  const low = p.stock > 0 && p.stock <= 5;
  const outOfStock = p.stock <= 0;

  return (
    <button
      disabled={outOfStock}
      onClick={() =>
        add({
          productId: p.productId,
          variantId: p.variantId,
          name: p.name,
          weight: p.weight,
          price: p.price,
          mrp: p.mrp,
          image: p.image,
          color: p.color,
          stock: p.stock,
        })
      }
      style={{
        background: outOfStock ? "#E0DAD1" : p.color ?? "#214D34",
        color: outOfStock ? "#9A8472" : "#FFF4D8",
        border: "none",
        borderRadius: 14,
        padding: "14px 22px",
        minWidth: 180,
        cursor: outOfStock ? "not-allowed" : "pointer",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontWeight: 600,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        transition: "transform 0.2s ease, filter 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!outOfStock) (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)";
      }}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "none")}
    >
      <span style={{ fontSize: 15 }}>
        {outOfStock ? "Out of stock" : `Add ${p.weight} · ₹${p.price}`}
      </span>
      {p.mrp && p.mrp > p.price && (
        <span style={{ fontSize: 11, opacity: 0.8, textDecoration: "line-through" }}>₹{p.mrp}</span>
      )}
      {low && !outOfStock && <span style={{ fontSize: 11, opacity: 0.85 }}>Only {p.stock} left</span>}
    </button>
  );
}
