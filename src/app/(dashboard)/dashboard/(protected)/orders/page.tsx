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

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const activeStatus = params.status ?? "";
  const page = Number(params.page ?? 1);

  const payload = await getPayload({ config });
  const { docs: orders, totalDocs, totalPages } = await payload.find({
    collection: "orders",
    where: activeStatus ? { status: { equals: activeStatus } } : {},
    sort: "-createdAt",
    page,
    limit: 20,
    overrideAccess: true,
  });

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: "0 0 24px" }}>
        Orders{" "}
        <span style={{ fontSize: 16, color: "#6b7280", fontWeight: 400 }}>({totalDocs})</span>
      </h1>

      {/* Status filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {[
          { value: "", label: "All" },
          ...Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label })),
        ].map(({ value, label }) => (
          <Link
            key={value}
            href={value ? `/dashboard/orders?status=${value}` : "/dashboard/orders"}
            style={{
              padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500,
              background: activeStatus === value ? "#1a1209" : "#fff",
              color: activeStatus === value ? "#fff" : "#374151",
              border: "1px solid #e5e7eb", textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Order #", "Customer", "Method", "Status", "Total", "Date", ""].map((h) => (
                <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const customer = order.customer as { name?: string; phone?: string } | undefined;
              const statusColor = STATUS_COLORS[order.status as string] ?? "#6b7280";
              return (
                <tr key={order.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 20px", fontWeight: 600, fontSize: 13, color: "#111" }}>
                    {order.orderNumber as string}
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: 13, color: "#374151" }}>
                    <div>{customer?.name}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{customer?.phone}</div>
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {(order.paymentMethod as string)?.replace(/_/g, " ")}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: statusColor, background: `${statusColor}18`, padding: "3px 10px", borderRadius: 999 }}>
                      {STATUS_LABELS[order.status as string] ?? order.status as string}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#111" }}>
                    ₹{(order.total as number).toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#9ca3af" }}>
                    {new Date(order.createdAt as string).toLocaleDateString("en-IN")}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <Link href={`/dashboard/orders/${order.id}`} style={{ fontSize: 13, color: "#C0301F", textDecoration: "none", fontWeight: 500 }}>
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "48px 24px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 8, justifyContent: "flex-end" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/dashboard/orders?${activeStatus ? `status=${activeStatus}&` : ""}page=${p}`}
                style={{
                  width: 32, height: 32, borderRadius: 6, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 500, textDecoration: "none",
                  background: p === page ? "#1a1209" : "#fff",
                  color: p === page ? "#fff" : "#374151",
                  border: "1px solid #e5e7eb",
                }}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
