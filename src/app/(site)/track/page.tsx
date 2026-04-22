import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusTimeline, { StatusIcons } from "@/components/StatusTimeline";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

export const metadata = { title: "Track your order — Kanaa" };
export const dynamic = "force-dynamic";

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";
const CLAY = "#C0301F";

const HAND = "var(--font-caveat), cursive";
const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";
const DISPLAY = "var(--font-dm-serif), Georgia, serif";

/* ------------------------- status timeline config ------------------------- */

type StatusKey =
  | "awaiting_verification"
  | "pending"
  | "paid"
  | "rejected"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

const STAGES = [
  { icon: StatusIcons.receipt, label: "Order",    sub: "Received" },
  { icon: StatusIcons.shield,  label: "Payment",  sub: "Verified" },
  { icon: StatusIcons.box,     label: "Order",    sub: "Processed" },
  { icon: StatusIcons.truck,   label: "Package",  sub: "Shipped" },
  { icon: StatusIcons.home,    label: "Package",  sub: "Arrived" },
];

/** How far along the timeline is the order? */
function stageIndexFor(status: StatusKey): number {
  switch (status) {
    case "awaiting_verification":
    case "pending":
      return 0;
    case "paid":
      return 2; // paid + packed happen together for this small-batch kitchen
    case "shipped":
      return 3;
    case "delivered":
      return 4;
    default:
      return -1;
  }
}

/* ----------------------------- lookup order ------------------------------- */

type Order = {
  id: string;
  orderNumber: string;
  status: StatusKey;
  total: number;
  customer: { name: string; email: string };
  items: { productName: string; variantLabel?: string; qty: number }[];
  shippingAddress: { city: string; state: string; pincode: string };
  createdAt: string;
  verifiedAt?: string;
  upiTransactionRef?: string;
};

async function lookup(
  orderNumber: string,
  email: string,
): Promise<Order | { error: string } | null> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "orders",
      where: { orderNumber: { equals: orderNumber.trim().toUpperCase() } },
      limit: 1,
      depth: 0,
    });
    const o = docs[0];
    if (!o) return { error: "We couldn't find that order number." };
    const customerEmail = (o.customer as { email?: string })?.email ?? "";
    if (customerEmail.trim().toLowerCase() !== email.trim().toLowerCase()) {
      return { error: "Order number and email don't match." };
    }
    return {
      id: String(o.id),
      orderNumber: o.orderNumber as string,
      status: o.status as StatusKey,
      total: o.total as number,
      customer: o.customer as Order["customer"],
      items: (o.items as Order["items"]) ?? [],
      shippingAddress: o.shippingAddress as Order["shippingAddress"],
      createdAt: o.createdAt as string,
      verifiedAt: (o.verifiedAt as string) ?? undefined,
      upiTransactionRef: (o.upiTransactionRef as string) ?? undefined,
    };
  } catch (err) {
    console.error("[track/lookup]", err);
    return { error: "Something went wrong. Try again in a moment." };
  }
}

/* -------------------------------- page ------------------------------------ */

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; email?: string }>;
}) {
  const { order, email } = await searchParams;
  const hasQuery = Boolean(order && email);
  const result = hasQuery ? await lookup(order!, email!) : null;
  const found = result && !("error" in result) ? (result as Order) : null;
  const err = result && "error" in result ? result.error : null;
  const stage = found ? stageIndexFor(found.status) : -1;
  const isRejected = found?.status === "rejected";
  const isCancelled = found?.status === "cancelled";

  return (
    <>
      <Navbar />
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          paddingTop: "calc(56px + clamp(40px, 6vw, 80px))",
          paddingBottom: "clamp(60px, 8vw, 110px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Doodle backdrop */}
        <svg
          aria-hidden
          viewBox="0 0 1600 1200"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.12,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <path
            d="M -120 220 C 140 80, 360 340, 260 500 C 140 680, 440 720, 640 560 C 840 400, 1020 620, 900 800 C 760 980, 1100 1040, 1320 880 C 1520 740, 1700 960, 1760 820"
            fill="none"
            stroke={INK}
            strokeOpacity="0.4"
            strokeWidth="56"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 60px)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                fontFamily: HAND,
                fontSize: "clamp(22px, 2.4vw, 28px)",
                color: CLAY,
                transform: "rotate(-2deg)",
                marginBottom: 2,
                display: "inline-block",
              }}
            >
              where&apos;s my jar? —
            </div>
            <h1
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(38px, 5.8vw, 76px)",
                letterSpacing: "-1.5px",
                color: INK,
                margin: 0,
                lineHeight: 1.0,
              }}
            >
              track your order.
            </h1>
            <p
              style={{
                fontFamily: SANS,
                color: INK,
                opacity: 0.72,
                fontSize: "clamp(13px, 1.1vw, 15px)",
                marginTop: 12,
                maxWidth: 520,
                marginInline: "auto",
              }}
            >
              Pop in your order number and the email you checked out with. We&apos;ll
              show you the journey from kitchen to kitchen shelf.
            </p>
          </div>

          {/* Lookup form */}
          <form
            method="get"
            action="/track"
            style={{
              background: "#fff",
              border: `1px solid ${INK}14`,
              borderRadius: 16,
              padding: "clamp(22px, 3vw, 32px)",
              boxShadow: "0 10px 26px rgba(31,74,51,0.08)",
              marginBottom: found || err ? 24 : 0,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr auto",
                gap: 16,
                alignItems: "end",
              }}
              className="tr-grid"
            >
              <Field
                label="Order number"
                name="order"
                defaultValue={order ?? ""}
                placeholder="KNA-XXXXXX"
                required
              />
              <Field
                label="Email at checkout"
                name="email"
                type="email"
                defaultValue={email ?? ""}
                placeholder="you@home.com"
                required
              />
              <button
                type="submit"
                style={{
                  background: INK,
                  color: CREAM,
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: 999,
                  fontFamily: SANS,
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  height: "fit-content",
                  boxShadow: "0 10px 22px rgba(31,74,51,0.22)",
                }}
              >
                Track →
              </button>
            </div>
          </form>

          {err && (
            <div
              style={{
                padding: "18px 22px",
                background: "#fff",
                border: `1px solid ${CLAY}55`,
                borderLeft: `4px solid ${CLAY}`,
                borderRadius: 12,
                fontFamily: SANS,
                color: CLAY,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {err}
            </div>
          )}

          {found && (
            <div>
              {/* Order card */}
              <div
                style={{
                  background: "#fff",
                  border: `1px solid ${INK}14`,
                  borderRadius: 16,
                  padding: "clamp(22px, 3vw, 30px)",
                  boxShadow: "0 10px 26px rgba(31,74,51,0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Barcode strip */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 5,
                    background: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 6px, ${INK} 6px 7px, transparent 7px 12px)`,
                    opacity: 0.8,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    flexWrap: "wrap",
                    paddingTop: 6,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "2.4px",
                        textTransform: "uppercase",
                        color: INK,
                        opacity: 0.55,
                        margin: 0,
                      }}
                    >
                      Order
                    </p>
                    <p
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: 24,
                        color: INK,
                        margin: 0,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {found.orderNumber}
                    </p>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 12,
                        color: INK,
                        opacity: 0.65,
                        margin: "4px 0 0",
                      }}
                    >
                      Placed{" "}
                      {new Date(found.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "2.4px",
                        textTransform: "uppercase",
                        color: INK,
                        opacity: 0.55,
                        margin: 0,
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: 24,
                        color: INK,
                        margin: 0,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      ₹{found.total}
                    </p>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 12,
                        color: INK,
                        opacity: 0.65,
                        margin: "4px 0 0",
                      }}
                    >
                      to {found.shippingAddress.city}, {found.shippingAddress.state}
                    </p>
                  </div>
                </div>

                {/* Problem banners */}
                {isRejected && (
                  <div
                    style={{
                      marginTop: 18,
                      padding: "14px 18px",
                      borderRadius: 12,
                      background: `${CLAY}14`,
                      border: `1px solid ${CLAY}55`,
                      fontFamily: SANS,
                      fontSize: 13,
                      color: CLAY,
                      fontWeight: 600,
                    }}
                  >
                    We couldn&apos;t verify your screenshot — please WhatsApp us the
                    UTR ref and we&apos;ll sort it out.
                  </div>
                )}
                {isCancelled && (
                  <div
                    style={{
                      marginTop: 18,
                      padding: "14px 18px",
                      borderRadius: 12,
                      background: `${INK}0F`,
                      border: `1px solid ${INK}33`,
                      fontFamily: SANS,
                      fontSize: 13,
                      color: INK,
                      fontWeight: 600,
                    }}
                  >
                    This order was cancelled.
                  </div>
                )}

                {/* Timeline */}
                {!isRejected && !isCancelled && (
                  <div style={{ marginTop: 22 }}>
                    <StatusTimeline
                      heading="ORDER STATUS"
                      currentIndex={stage}
                      stages={STAGES}
                    />
                  </div>
                )}

                {/* Item list */}
                {found.items.length > 0 && (
                  <div
                    style={{
                      marginTop: 22,
                      paddingTop: 16,
                      borderTop: `1px dashed ${INK}33`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "2.4px",
                        textTransform: "uppercase",
                        color: INK,
                        opacity: 0.55,
                        margin: 0,
                        marginBottom: 10,
                      }}
                    >
                      In your box
                    </p>
                    {found.items.map((it, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: SANS,
                          fontSize: 13,
                          color: INK,
                          padding: "6px 0",
                        }}
                      >
                        <span>
                          <span
                            style={{
                              fontFamily: SERIF,
                              fontStyle: "italic",
                              fontWeight: 600,
                              fontSize: 16,
                            }}
                          >
                            {it.productName}
                          </span>
                          {it.variantLabel && (
                            <span
                              style={{
                                marginLeft: 8,
                                fontSize: 11,
                                letterSpacing: "1.4px",
                                textTransform: "uppercase",
                                color: INK,
                                opacity: 0.55,
                              }}
                            >
                              {it.variantLabel}
                            </span>
                          )}
                        </span>
                        <span style={{ opacity: 0.7 }}>× {it.qty}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p
                style={{
                  marginTop: 20,
                  fontFamily: HAND,
                  fontSize: 20,
                  color: INK,
                  opacity: 0.75,
                  textAlign: "center",
                  transform: "rotate(-1deg)",
                }}
              >
                question? whatsapp us — we&apos;re just around the corner ✦
              </p>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 640px) {
            .tr-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}

/* --------------------------------- field ---------------------------------- */

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontFamily: SANS,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "2.2px",
          textTransform: "uppercase",
          color: INK,
          opacity: 0.55,
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      <input
        {...rest}
        style={{
          width: "100%",
          padding: "10px 0 10px",
          borderRadius: 0,
          border: "none",
          borderBottom: `1.5px dashed ${INK}55`,
          background: "transparent",
          fontFamily: HAND,
          fontWeight: 500,
          fontSize: 20,
          color: INK,
          outline: "none",
        }}
      />
    </label>
  );
}
