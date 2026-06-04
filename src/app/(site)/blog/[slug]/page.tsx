import { getPayload } from "payload";
import config from "@/payload/payload.config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichTextRenderer from "@/components/RichTextRenderer";

export const revalidate = 300;

const INK = "#1F4A33";
const BG = "#F5F0E8";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
  });
  if (!docs.length) return {};
  const post = docs[0];
  return {
    title: `${post.title as string} — Kanna Blog`,
    description: (post.excerpt as string) ?? undefined,
  };
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 200,
    });
    return docs.map((post) => ({ slug: post.slug as string }));
  } catch (err) {
    // DB unreachable at build time — don't fail the whole build; pages will
    // render on-demand instead.
    console.error("[blog/slug] generateStaticParams failed:", err instanceof Error ? err.message : err);
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
    depth: 1,
  });

  if (!docs.length) notFound();
  const post = docs[0];

  const image = post.featuredImage as { url?: string; alt?: string } | null;
  const tags = post.tags as { tag: string }[] | undefined;

  return (
    <>
      <Navbar />
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          paddingTop: "calc(56px + clamp(32px, 5vw, 64px))",
          paddingBottom: "clamp(60px, 8vw, 110px)",
        }}
      >
        {image?.url && (
          <div style={{ maxWidth: 900, margin: "0 auto clamp(28px,5vw,48px)", padding: "0 clamp(20px,5vw,48px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.alt ?? (post.title as string)}
              style={{ width: "100%", maxHeight: 460, objectFit: "cover", borderRadius: 16, display: "block" }}
            />
          </div>
        )}

        <article style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px, 5vw, 48px)" }}>
          {tags && tags.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {tags.map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "1.5px",
                    textTransform: "uppercase", color: "#C0301F",
                    background: "#fef2f2", padding: "3px 8px", borderRadius: 4,
                  }}
                >
                  {t.tag}
                </span>
              ))}
            </div>
          )}

          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic", fontWeight: 500,
              fontSize: "clamp(36px, 6vw, 64px)",
              color: INK, margin: "0 0 16px", lineHeight: 1.1,
            }}
          >
            {post.title as string}
          </h1>

          <div
            style={{
              display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
              marginBottom: 40, borderBottom: `1px solid ${INK}1A`, paddingBottom: 20,
            }}
          >
            {post.author && (
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: INK, opacity: 0.55 }}>
                By {post.author as string}
              </span>
            )}
            {post.publishedAt && (
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: INK, opacity: 0.4 }}>
                {new Date(post.publishedAt as string).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
            {post.readTime && (
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: INK, opacity: 0.4 }}>
                {post.readTime as number} min read
              </span>
            )}
          </div>

          <div
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(15px, 1.2vw, 17px)",
              color: INK,
              lineHeight: 1.8,
            }}
          >
            <RichTextRenderer content={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
