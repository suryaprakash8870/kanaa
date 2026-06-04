"use client";
import { useTransition } from "react";
import { logoutAction } from "./actions";

export default function LogoutButton() {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => start(() => logoutAction())}
      disabled={pending}
      style={{
        display: "flex", alignItems: "center", gap: 8, width: "100%",
        padding: "10px 14px", background: "transparent", border: "none",
        borderRadius: 8, color: "#9ca3af", fontSize: 14, fontWeight: 500,
        cursor: "pointer", textAlign: "left", opacity: pending ? 0.6 : 1,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
