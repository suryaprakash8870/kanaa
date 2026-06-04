import { getPayload } from "payload";
import config from "@/payload/payload.config";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogDashboardPage() {
  const payload = await getPayload({ config });
  const { docs: posts, totalDocs } = await payload.find({
    collection: "posts",
    sort: "-createdAt",
    limit: 50,
    overrideAccess: true,
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: 0 }}>
          Blog Posts{" "}
          <span style={{ fontSize: 16, color: "#6b7280", fontWeight: 400 }}>({totalDocs})</span>
        </h1>
        <Link
          href="/admin/collections/posts/create"
          target="_blank"
          style={{ padding: "9px 18px", background: "#1a1209", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
        >
          + New Post
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Title", "Status", "Published", "Tags", ""].map((h) => (
                <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const tags = post.tags as { tag: string }[] | undefined;
              const isPublished = post.status === "published";
              return (
                <tr key={post.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 20px" }}>
                    <Link
                      href={`/blog/${post.slug as string}`}
                      target="_blank"
                      style={{ fontSize: 14, fontWeight: 500, color: "#111", textDecoration: "none" }}
                    >
                      {post.title as string}
                    </Link>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: isPublished ? "#10b981" : "#6b7280",
                      background: isPublished ? "#d1fae5" : "#f3f4f6",
                      padding: "3px 10px", borderRadius: 999,
                    }}>
                      {isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: 13, color: "#6b7280" }}>
                    {post.publishedAt ? new Date(post.publishedAt as string).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {tags?.slice(0, 3).map((t, i) => (
                        <span key={i} style={{ fontSize: 11, color: "#6366f1", background: "#eef2ff", padding: "2px 8px", borderRadius: 4 }}>
                          {t.tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <Link
                      href={`/admin/collections/posts/${post.id}`}
                      target="_blank"
                      style={{ fontSize: 13, color: "#C0301F", textDecoration: "none", fontWeight: 500 }}
                    >
                      Edit →
                    </Link>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "48px 24px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                  No blog posts yet.{" "}
                  <Link href="/admin/collections/posts/create" target="_blank" style={{ color: "#C0301F" }}>
                    Create your first post →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
