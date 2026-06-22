"use client";
import { useState, useTransition } from "react";
import { updateOrderStatus } from "./actions";

const STATUSES = [
  { value: "awaiting_verification", label: "Awaiting Verification" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "rejected", label: "Rejected" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

export default function StatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    start(async () => {
      await updateOrderStatus(orderId, status);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  };

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <select
        value={status}
        onChange={(e) => { setStatus(e.target.value); setSaved(false); }}
        style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, color: "#111", background: "#fff", cursor: "pointer" }}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <button
        onClick={handleSave}
        disabled={pending || status === currentStatus}
        style={{
          padding: "8px 18px", borderRadius: 8, border: "none",
          background: saved ? "#10b981" : "#1a1209",
          color: "#fff", fontSize: 14, fontWeight: 600,
          cursor: pending || status === currentStatus ? "not-allowed" : "pointer",
          opacity: status === currentStatus && !pending ? 0.5 : 1,
        }}
      >
        {pending ? "Saving…" : saved ? "Saved ✓" : "Update Status"}
      </button>
    </div>
  );
}
