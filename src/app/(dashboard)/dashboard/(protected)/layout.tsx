import Link from "next/link";
import DashboardNav from "./DashboardNav";
import LogoutButton from "./LogoutButton";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220, flexShrink: 0, background: "#1a1209",
          display: "flex", flexDirection: "column", padding: "24px 12px",
          position: "fixed", top: 0, bottom: 0, left: 0,
          overflowY: "auto", zIndex: 10,
        }}
      >
        <div style={{ padding: "0 2px 28px" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>
            Kanna
          </span>
          <span style={{ display: "block", fontSize: 10, color: "#6b7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: 2 }}>
            Admin Dashboard
          </span>
        </div>

        <DashboardNav />

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12, marginTop: 12 }}>
          <Link
            href="/admin"
            target="_blank"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 14px", color: "#6b7280", fontSize: 13,
              textDecoration: "none", borderRadius: 8,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Payload Admin
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, marginLeft: 220, minHeight: "100vh", padding: "32px 36px" }}>
        {children}
      </main>
    </div>
  );
}
