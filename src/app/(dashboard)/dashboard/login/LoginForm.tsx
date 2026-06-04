"use client";
import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {state?.error && (
        <p style={{ color: "#dc2626", fontSize: 14, margin: 0, padding: "10px 12px", background: "#fef2f2", borderRadius: 8 }}>
          {state.error}
        </p>
      )}
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box" }}
        />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box" }}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        style={{ padding: "11px", background: "#1a1209", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.7 : 1, marginTop: 4 }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
