import { getPayload } from "payload";
import config from "@/payload/payload.config";
import { notFound } from "next/navigation";
import Link from "next/link";
import StatusForm from "./StatusForm";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  awaiting_verification: "#f59e0b",
  pending: "#6366f1",
  paid: "#10b981",
  rejected: "#ef4444",
  shipped: "#3b82f6",
  delivered: "#059669",
  cancelled: "#6b7280",
  refunded: "#8b5cf6",
};

const STATUS_LABELS: Record<string, string> = {
  awaiting_verification: "Awaiting Verification",
  pending: "Pending",
  paid: "Paid",
  rejected: "Rejected",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayload({ config });

  let order;
  try {
    order = await payload.findByID({ collection: "orders", id, depth: 1, overrideAccess: true });
  } catch {
    notFound();
  }

  const customer = order.customer as { name: string; email: string; phone: string };
  const address = order.shippingAddress as { line1: string; line2?: string; city: string; state: string; pincode: string; country: string };
  const items = order.items as { productName: string; variantLabel?: string; qty: number; unitPrice: number; lineTotal: number }[];
  const proof = order.paymentProof as { url?: string } | null;
  const statusColor = STATUS_COLORS[order.status as string] ?? "#6b7280";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <Link href="/dashboard/orders" style={{ color: "#6b7280", textDecoration: "none", fontSize: 14 }}>
          ← Orders
        </Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{order.orderNumber as string}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status + totals */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: statusColor, background: `${statusColor}18`, padding: "4px 12px", borderRadius: 999 }}>
                  {STATUS_LABELS[order.status as string] ?? order.status as string}
                </span>
                {order.verifiedAt && (
                  <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 10 }}>
                    Verified {new Date(order.verifiedAt as string).toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <StatusForm orderId={String(order.id)} currentStatus={order.status as string} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {[
                { label: "Payment", value: (order.paymentMethod as string)?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) },
                { label: "Subtotal", value: `₹${(order.subtotal as number).toLocaleString("en-IN")}` },
                { label: "Shipping", value: `₹${(order.shipping as number).toLocaleString("en-IN")}` },
                { label: "Discount", value: `₹${(order.discount as number).toLocaleString("en-IN")}` },
                { label: "Total", value: `₹${(order.total as number).toLocaleString("en-IN")}` },
                { label: "Placed", value: new Date(order.createdAt as string).toLocaleString("en-IN") },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 2px" }}>{label}</p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#111", margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
            {order.upiTransactionRef && (
              <div style={{ marginTop: 14, padding: "10px 14px", background: "#fefce8", borderRadius: 8, fontSize: 13, color: "#713f12" }}>
                UTR / Ref: <strong>{order.upiTransactionRef as string}</strong>
              </div>
            )}
          </div>

          {/* Items */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <h3 style={{ padding: "14px 20px", borderBottom: "1px solid #f3f4f6", margin: 0, fontSize: 14, fontWeight: 600, color: "#111" }}>
              Items
            </h3>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: i > 0 ? "1px solid #f3f4f6" : undefined }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#111" }}>{item.productName}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>{item.variantLabel} × {item.qty}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111" }}>₹{item.lineTotal.toLocaleString("en-IN")}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>₹{item.unitPrice} each</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment proof */}
          {proof?.url && (
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#111" }}>Payment Screenshot</h3>
              <a href={proof.url} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={proof.url} alt="Payment proof" style={{ maxWidth: "100%", maxHeight: 320, objectFit: "contain", borderRadius: 8, border: "1px solid #e5e7eb" }} />
              </a>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600, color: "#111" }}>Customer</h3>
            <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 500, color: "#111" }}>{customer.name}</p>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>{customer.email}</p>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{customer.phone}</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600, color: "#111" }}>Shipping Address</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
              {address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />
              {address.city}, {address.state} {address.pincode}<br />
              {address.country}
            </p>
          </div>
          {order.notes && (
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "#111" }}>Notes</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{order.notes as string}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
