import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanna Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif", background: "#f4f4f0" }}>
        {children}
      </body>
    </html>
  );
}
