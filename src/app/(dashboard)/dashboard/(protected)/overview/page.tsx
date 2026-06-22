import { getPayload } from "payload";
import config from "@/payload/payload.config";
import Link from "next/link";

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

export default async function OverviewPage() {
  const payload = await getPayload({ config });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayOrders, pendingUPI, recentOrders, allVariants] = await Promise.all([
    payload.find({
      collection: "orders",
      where: { createdAt: { greater_than: today.toISOString() } },
      overrideAccess: true,
      limit: 200,
    }),
    payload.count({
      collection: "orders",
      where: { status: { equals: "awaiting_verification" } },
      overrideAccess: true,
    }),
    payload.find({
      collection: "orders",
      sort: "-createdAt",
      limit: 5,
      overrideAccess: true,
    }),
    payload.find({
      collection: "variants",
      where: { active: { equals: true } },
      limit: 500,
      overrideAccess: true,
    }),
  ]);

  const todayRevenue = todayOrders.docs
    .filter((o) => ["paid", "shipped", "delivered"].includes(o.status as string))
    .reduce((sum, o) => sum + (o.total as number), 0);

  const lowStockCount = allVariants.docs.filter(
    (v) => (v.stock as number) <= (v.lowStockThreshold as number),
  ).length;

  const stats = [
    {
      label: "Orders Today",
      value: todayOrders.totalDocs,
      sub: `₹${todayRevenue.toLocaleString("en-IN")} confirmed revenue`,
      urgent: false,
    },
    {
      label: "Awaiting Verification",
      value: pendingUPI.totalDocs,
      sub: "UPI screenshots pending review",
      urgent: pendingUPI.totalDocs > 0,
    },
    {
      label: "Low Stock Variants",
      value: lowStockCount,
      sub: "at or below threshold",
      urgent: lowStockCount > 0,
    },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>Overview</h1>
      <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 32px" }}>
        {today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff", borderRadius: 12, padding: "20px 24px",
              border: s.urgent ? "1px solid #fbbf24" : "1px solid #e5e7eb",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px" }}>
              {s.label}
            </p>
            <p style={{ fontSize: 40, fontWeight: 700, color: s.urgent ? "#d97706" : "#111", margin: "0 0 4px", lineHeight: 1 }}>
              {s.value}
            </p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111", margin: 0 }}>Recent Orders</h2>
          <Link href="/dashboard/orders" style={{ fontSize: 13, color: "#C0301F", textDecoration: "none", fontWeight: 500 }}>
            View all →
          </Link>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Order #", "Customer", "Status", "Total", "Date"].map((h) => (
                <th key={h} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.docs.map((order) => {
              const customer = order.customer as { name?: string } | undefined;
              const statusColor = STATUS_COLORS[order.status as string] ?? "#6b7280";
              return (
                <tr key={order.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 24px" }}>
                    <Link href={`/dashboard/orders/${order.id}`} style={{ fontSize: 13, fontWeight: 600, color: "#111", textDecoration: "none" }}>
                      {order.orderNumber as string}
                    </Link>
                  </td>
                  <td style={{ padding: "12px 24px", fontSize: 13, color: "#374151" }}>{customer?.name ?? "—"}</td>
                  <td style={{ padding: "12px 24px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: statusColor, background: `${statusColor}18`, padding: "3px 10px", borderRadius: 999 }}>
                      {STATUS_LABELS[order.status as string] ?? order.status as string}
                    </span>
                  </td>
                  <td style={{ padding: "12px 24px", fontSize: 13, fontWeight: 500, color: "#111" }}>
                    ₹{(order.total as number).toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "12px 24px", fontSize: 12, color: "#9ca3af" }}>
                    {new Date(order.createdAt as string).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              );
            })}
            {recentOrders.docs.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "40px 24px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
