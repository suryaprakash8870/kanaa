"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCart } from "@/hooks/useCart";

const BG = "#DFF0D8";
const INK = "#1F4A33";
const ACCENT = "#4FB83A";
const CREAM = "#FFF4D8";
const CLAY = "#C0301F";
const MUSTARD = "#F5C03A";
const KRAFT = "#E8D5A3";
const KRAFT_DEEP = "#C8A969";

const HAND = "var(--font-caveat), cursive";
const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-dm-sans), sans-serif";
const DISPLAY = "var(--font-dm-serif), Georgia, serif";

// --- CHANGE THESE FOR YOUR REAL UPI DETAILS ---
const UPI_ID = "kanaa@upi"; // swap with your actual UPI VPA
const UPI_PAYEE = "Kanaa Foods";
const QR_IMAGE_SRC = "/upi-qr.svg"; // drop your real /upi-qr.png (or .svg) here

export default function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [upiRef, setUpiRef] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const sub = subtotal();
  const shipping = sub >= 499 ? 0 : 60;
  const total = sub + shipping;
  const freeShipProgress = Math.min(1, sub / 499);
  const freeShipGap = Math.max(0, 499 - sub);

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const isAddressValid = () =>
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.line1.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    /^\d{6}$/.test(form.pincode);

  // deep-link that GPay / PhonePe / Paytm handle
  const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_PAYEE)}&am=${total}&cu=INR&tn=${encodeURIComponent("Kanaa order")}`;

  const handleFile = (f: File | null) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (lines.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!file) {
      setError("Please attach your payment screenshot.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append(
        "payload",
        JSON.stringify({
          items: lines.map((l) => ({ variantId: l.variantId, qty: l.qty })),
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
          },
          shippingAddress: {
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            country: "India",
          },
          upiRef: upiRef.trim(),
        }),
      );
      fd.append("screenshot", file);

      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");

      clear();
      router.push(`/order-success?order=${data.order.orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const manifestNo = `MF-${new Date().getFullYear()}-${lines
    .reduce((a, l) => a + l.qty, 0)
    .toString()
    .padStart(3, "0")}`;

  return (
    <>
      <form
        onSubmit={submit}
        className="co-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.25fr 1fr",
          gap: "clamp(28px, 4vw, 56px)",
          alignItems: "start",
        }}
      >
        {/* ── LEFT: Address (step 1) → Pay (step 2) ── */}
        <div
          style={{
            position: "relative",
            background: "#fff",
            borderRadius: 14,
            padding: "clamp(28px, 3.2vw, 40px)",
            border: `1px solid ${INK}14`,
            boxShadow:
              "0 24px 50px rgba(31,74,51,0.12), 0 6px 16px rgba(31,74,51,0.06)",
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
              height: 6,
              background: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 6px, ${INK} 6px 7px, transparent 7px 12px, ${INK} 12px 14px, transparent 14px 20px)`,
              opacity: 0.8,
            }}
          />

          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 22,
              paddingTop: 4,
            }}
          >
            <div>
              <p style={tinyLabel}>Shipping manifest</p>
              <p
                className="co-manifest"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 22,
                  color: INK,
                  margin: 0,
                }}
              >
                {manifestNo}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={tinyLabel}>Step</p>
              <p
                className="co-step-heading"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: 18,
                  color: INK,
                  margin: 0,
                }}
              >
                {step === 1 ? "01 · Address" : "02 · Pay & attach"}
              </p>
            </div>
          </div>

          {step === 1 ? (
            <AddressStep
              form={form}
              onChange={onChange}
              onNext={() => {
                if (!isAddressValid()) {
                  setError("Please fill all address fields (valid 6-digit pincode).");
                  return;
                }
                setError(null);
                setStep(2);
              }}
              error={error}
              cartEmpty={lines.length === 0}
            />
          ) : (
            <PayStep
              total={total}
              upiLink={upiLink}
              upiId={UPI_ID}
              upiRef={upiRef}
              setUpiRef={setUpiRef}
              file={file}
              preview={preview}
              onPickFile={() => fileInputRef.current?.click()}
              onFile={handleFile}
              onBack={() => {
                setError(null);
                setStep(1);
              }}
              submitting={submitting}
              error={error}
            />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* ── RIGHT: Kraft luggage-tag order slip ── */}
        <aside
          className="co-aside"
          style={{
            position: "sticky",
            top: "calc(56px + 24px)",
            height: "fit-content",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "relative",
              height: 36,
              display: "flex",
              justifyContent: "center",
              marginBottom: -6,
            }}
          >
            <div
              style={{
                width: 2,
                height: 30,
                background: `repeating-linear-gradient(0deg, ${INK}aa 0 3px, transparent 3px 6px)`,
              }}
            />
          </div>

          <div
            className="co-tag"
            style={{
              position: "relative",
              background: `linear-gradient(180deg, ${KRAFT} 0%, ${KRAFT_DEEP} 100%)`,
              color: INK,
              borderRadius: "14px 14px 18px 18px",
              padding: "clamp(24px, 3vw, 34px)",
              boxShadow:
                "0 20px 40px rgba(31,74,51,0.18), inset 0 0 0 1px rgba(31,74,51,0.08)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: BG,
                boxShadow: `inset 0 0 0 2px ${INK}33, 0 2px 4px rgba(0,0,0,0.15)`,
              }}
            />

            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "14px 14px 18px 18px",
                background:
                  "radial-gradient(600px 200px at 20% 0%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(400px 200px at 100% 100%, rgba(0,0,0,0.08), transparent 60%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", paddingTop: 16 }}>
              <p
                className="co-hand-heading"
                style={{
                  fontFamily: HAND,
                  fontSize: 28,
                  color: CLAY,
                  margin: 0,
                  marginBottom: 2,
                  transform: "rotate(-2deg)",
                  display: "inline-block",
                }}
              >
                your jar-box
              </p>
              <p style={tinyLabel}>
                Order slip ·{" "}
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {lines.length === 0 && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "18px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.5)",
                    fontFamily: SANS,
                    fontSize: 13,
                    color: INK,
                  }}
                >
                  Your cart is empty —{" "}
                  <a href="/products" style={{ color: INK, fontWeight: 700 }}>
                    browse pickles →
                  </a>
                </div>
              )}

              {lines.map((l) => (
                <div
                  key={l.variantId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "12px 0",
                    borderBottom: `1px dashed ${INK}33`,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontWeight: 600,
                        fontSize: 17,
                        color: INK,
                        margin: 0,
                      }}
                    >
                      {l.name}
                    </p>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 11,
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                        color: INK,
                        opacity: 0.6,
                        margin: 0,
                        marginTop: 2,
                      }}
                    >
                      {l.weight} · qty {l.qty}
                    </p>
                  </div>
                  <span style={{ fontFamily: DISPLAY, fontSize: 18, color: INK }}>
                    ₹{l.price * l.qty}
                  </span>
                </div>
              ))}

              <div style={{ marginTop: 14 }}>
                <TotalRow label="Subtotal" value={`₹${sub}`} />
                <TotalRow
                  label="Shipping"
                  value={shipping === 0 ? "FREE" : `₹${shipping}`}
                  accent={shipping === 0 ? ACCENT : undefined}
                />
              </div>

              {lines.length > 0 && shipping > 0 && (
                <div style={{ marginTop: 10 }}>
                  <p
                    style={{
                      fontFamily: HAND,
                      fontSize: 15,
                      color: INK,
                      margin: 0,
                      marginBottom: 4,
                      opacity: 0.85,
                    }}
                  >
                    add ₹{freeShipGap} more for free shipping →
                  </p>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: `${INK}22`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${freeShipProgress * 100}%`,
                        height: "100%",
                        background: ACCENT,
                        borderRadius: 999,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              )}

              <div
                aria-hidden
                style={{
                  marginTop: 18,
                  marginBottom: 14,
                  height: 1,
                  background: `repeating-linear-gradient(90deg, ${INK}88 0 6px, transparent 6px 12px)`,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  className="co-grand-label"
                  style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "2.4px",
                    textTransform: "uppercase",
                    color: INK,
                    opacity: 0.7,
                  }}
                >
                  Grand total
                </span>
                <span
                  className="co-grand-value"
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 34,
                    color: INK,
                    letterSpacing: "-0.5px",
                  }}
                >
                  ₹{total}
                </span>
              </div>

              <div
                className="co-trio"
                style={{
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: `1px dashed ${INK}33`,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                  textAlign: "center",
                }}
              >
                {[
                  { k: "Hand-packed", c: ACCENT },
                  { k: "48 hr dispatch", c: MUSTARD },
                  { k: "30-day love", c: CLAY },
                ].map((t) => (
                  <div key={t.k}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: t.c,
                        marginBottom: 4,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                        color: INK,
                        opacity: 0.75,
                        margin: 0,
                      }}
                    >
                      {t.k}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p
            className="co-packed"
            style={{
              marginTop: 16,
              fontFamily: HAND,
              fontSize: 20,
              color: INK,
              opacity: 0.75,
              textAlign: "center",
              transform: "rotate(-1deg)",
            }}
          >
            packed with love from erode ✦
          </p>
        </aside>
      </form>

      <style>{`
        @media (max-width: 900px) {
          .co-grid { grid-template-columns: 1fr !important; }
          .co-aside { position: static !important; }
        }
        @media (max-width: 520px) {
          .co-two, .co-three { grid-template-columns: 1fr !important; }
          .pay-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
            justify-items: center;
            text-align: center;
          }
          .pay-grid > div:nth-child(2) p { text-align: left; }
          /* Shrink rotated headlines so they don't clip narrow screens */
          .co-hand-heading { font-size: 22px !important; }
          .co-grand-label { font-size: 10px !important; letter-spacing: 1.8px !important; }
          .co-grand-value { font-size: 28px !important; }
          .co-step-heading { font-size: 14px !important; }
          .co-manifest { font-size: 18px !important; }
          /* Give the tag stem/trio more breathing room */
          .co-trio { gap: 4px !important; }
          .co-trio p { font-size: 9px !important; letter-spacing: 1px !important; }
          /* Tighten kraft-tag padding so rotated text doesn't clip */
          .co-tag { padding: 20px 18px !important; }
          .co-packed { font-size: 17px !important; }
        }
      `}</style>
    </>
  );
}

/* ----------------------------- STEP 1: ADDRESS ----------------------------- */

function AddressStep({
  form,
  onChange,
  onNext,
  error,
  cartEmpty,
}: {
  form: {
    name: string;
    email: string;
    phone: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
  };
  onChange: (
    k:
      | "name"
      | "email"
      | "phone"
      | "line1"
      | "line2"
      | "city"
      | "state"
      | "pincode",
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  error: string | null;
  cartEmpty: boolean;
}) {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 14,
          padding: "14px 0",
          borderTop: `1px dashed ${INK}33`,
          borderBottom: `1px dashed ${INK}33`,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            background: ACCENT,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: DISPLAY,
            fontSize: 16,
          }}
        >
          K
        </div>
        <div>
          <p style={tinyLabel}>From</p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 600,
              color: INK,
              margin: 0,
            }}
          >
            Kanaa Kitchen · Plot 14, Kongu Road, Erode, TN 638004
          </p>
        </div>
      </div>

      <div style={{ paddingTop: 22 }}>
        <p style={{ ...tinyLabel, marginBottom: 14 }}>Deliver to</p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
          className="co-two"
        >
          <LabelField
            label="Receiver's name"
            value={form.name}
            onChange={onChange("name")}
            required
            placeholder="Lakshmi Iyer"
          />
          <LabelField
            label="Phone"
            value={form.phone}
            onChange={onChange("phone")}
            required
            type="tel"
            pattern="[0-9+\- ]{7,}"
            placeholder="+91 98765 43210"
          />
        </div>
        <LabelField
          label="Email (we send a note here)"
          value={form.email}
          onChange={onChange("email")}
          required
          type="email"
          placeholder="you@home.com"
        />
        <LabelField
          label="House / flat / street"
          value={form.line1}
          onChange={onChange("line1")}
          required
          placeholder="14 Jasmine Street"
        />
        <LabelField
          label="Area, landmark (optional)"
          value={form.line2}
          onChange={onChange("line2")}
          placeholder="Near Ganesha temple"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 0.9fr",
            gap: 18,
          }}
          className="co-three"
        >
          <LabelField
            label="City"
            value={form.city}
            onChange={onChange("city")}
            required
            placeholder="Chennai"
          />
          <LabelField
            label="State"
            value={form.state}
            onChange={onChange("state")}
            required
            placeholder="Tamil Nadu"
          />
          <LabelField
            label="Pincode"
            value={form.pincode}
            onChange={onChange("pincode")}
            required
            pattern="\d{6}"
            placeholder="600001"
          />
        </div>

        {error && (
          <p
            style={{
              color: CLAY,
              marginTop: 14,
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={cartEmpty}
          style={{
            marginTop: 22,
            width: "100%",
            background: INK,
            color: CREAM,
            border: "none",
            padding: "14px 22px",
            borderRadius: 999,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: cartEmpty ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 10px 22px rgba(31,74,51,0.22)",
            opacity: cartEmpty ? 0.5 : 1,
          }}
        >
          Next · scan &amp; pay
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </>
  );
}

/* ----------------------------- STEP 2: PAY --------------------------------- */

function PayStep({
  total,
  upiLink,
  upiId,
  upiRef,
  setUpiRef,
  file,
  preview,
  onPickFile,
  onFile,
  onBack,
  submitting,
  error,
}: {
  total: number;
  upiLink: string;
  upiId: string;
  upiRef: string;
  setUpiRef: (v: string) => void;
  file: File | null;
  preview: string | null;
  onPickFile: () => void;
  onFile: (f: File | null) => void;
  onBack: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const [copied, setCopied] = useState(false);
  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <>
      <div
        className="pay-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 24,
          alignItems: "center",
          padding: "18px 0",
          borderTop: `1px dashed ${INK}33`,
          borderBottom: `1px dashed ${INK}33`,
        }}
      >
        {/* QR */}
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: 12,
            background: "#fff",
            border: `2px dashed ${INK}55`,
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={QR_IMAGE_SRC}
            alt="Kanaa UPI QR"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={(e) => {
              // Fallback if no QR uploaded yet
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const next = (e.currentTarget as HTMLImageElement)
                .nextElementSibling as HTMLElement | null;
              if (next) next.style.display = "flex";
            }}
          />
          <div
            style={{
              display: "none",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              textAlign: "center",
              fontFamily: SANS,
              fontSize: 10,
              color: INK,
              opacity: 0.65,
              padding: 10,
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 20,
                color: INK,
              }}
            >
              QR
            </div>
            Drop your UPI QR at
            <br />
            <code style={{ fontSize: 10 }}>/public/upi-qr.png</code>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <p
            className="co-hand-heading"
            style={{
              fontFamily: HAND,
              fontSize: 26,
              color: CLAY,
              margin: 0,
              marginBottom: 2,
              transform: "rotate(-2deg)",
              display: "inline-block",
            }}
          >
            scan &amp; pay ₹{total}
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 13,
              color: INK,
              lineHeight: 1.55,
              margin: "6px 0 12px",
              opacity: 0.82,
            }}
          >
            Open GPay, PhonePe, Paytm or any UPI app, scan the QR, pay{" "}
            <strong>₹{total}</strong>, then attach the success screenshot
            below. We verify within 2 working hours.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 10px 6px 14px",
              borderRadius: 999,
              background: `${ACCENT}1A`,
              border: `1px solid ${ACCENT}66`,
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: INK,
                opacity: 0.65,
              }}
            >
              UPI ID
            </span>
            <span
              style={{
                fontFamily: DISPLAY,
                fontSize: 14,
                color: INK,
              }}
            >
              {upiId}
            </span>
            <button
              type="button"
              onClick={copyId}
              style={{
                padding: "4px 10px",
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: CREAM,
                background: INK,
                border: "none",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div style={{ marginTop: 10 }}>
            <a
              href={upiLink}
              style={{
                fontFamily: SANS,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: ACCENT,
                textDecoration: "none",
                borderBottom: `1.5px solid ${ACCENT}`,
                paddingBottom: 2,
              }}
            >
              Open in UPI app →
            </a>
          </div>
        </div>
      </div>

      {/* Upload screenshot */}
      <div style={{ marginTop: 22 }}>
        <p style={{ ...tinyLabel, marginBottom: 10 }}>
          Attach payment screenshot
        </p>

        {!preview ? (
          <button
            type="button"
            onClick={onPickFile}
            style={{
              width: "100%",
              padding: "28px 20px",
              background: `${ACCENT}0F`,
              border: `2px dashed ${ACCENT}`,
              borderRadius: 14,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke={INK}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="11" r="2" />
              <path d="M21 17l-5-5-8 8" />
            </svg>
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: 18,
                color: INK,
              }}
            >
              Tap to attach the screenshot
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: INK,
                opacity: 0.6,
              }}
            >
              PNG / JPG · up to 6 MB
            </span>
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "stretch",
              padding: 12,
              background: `${ACCENT}0F`,
              border: `1px solid ${ACCENT}66`,
              borderRadius: 14,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Payment screenshot preview"
              style={{
                width: 96,
                height: 96,
                objectFit: "cover",
                borderRadius: 10,
                border: `1px solid ${INK}33`,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: 16,
                  color: INK,
                  margin: 0,
                  wordBreak: "break-all",
                }}
              >
                {file?.name}
              </p>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  color: INK,
                  opacity: 0.65,
                  margin: "4px 0 10px",
                }}
              >
                {(((file?.size ?? 0) / 1024) | 0)} KB · ready to send
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={onPickFile}
                  style={pillBtn("ghost")}
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => onFile(null)}
                  style={pillBtn("danger")}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* UTR ref (optional) */}
      <LabelField
        label="UPI / UTR ref (optional — speeds up verify)"
        value={upiRef}
        onChange={(e) => setUpiRef(e.target.value)}
        placeholder="12-digit txn number"
      />

      {error && (
        <p
          style={{
            color: CLAY,
            marginTop: 14,
            fontFamily: SANS,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {error}
        </p>
      )}

      {/* Actions */}
      <div
        style={{
          marginTop: 22,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          style={{
            background: "transparent",
            border: `1.5px solid ${INK}44`,
            color: INK,
            padding: "14px 22px",
            borderRadius: 999,
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={submitting || !file}
          style={{
            flex: 1,
            minWidth: 200,
            background: submitting ? `${INK}aa` : INK,
            color: CREAM,
            border: "none",
            padding: "14px 22px",
            borderRadius: 999,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: submitting || !file ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 14px 26px rgba(31,74,51,0.28)",
            opacity: !file ? 0.5 : 1,
          }}
        >
          {submitting ? "Sending to kitchen…" : "Send for verification"}
          {!submitting && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
      </div>

      <p
        style={{
          fontFamily: SANS,
          fontSize: 11,
          color: INK,
          opacity: 0.6,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        Once we match the screenshot with our UPI inbox, your order flips to
        Paid and ships in 48 hrs.
      </p>
    </>
  );
}

/* ------------------------------ shared bits ------------------------------- */

const tinyLabel: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "2.4px",
  textTransform: "uppercase",
  color: INK,
  opacity: 0.55,
  margin: 0,
};

function pillBtn(kind: "ghost" | "danger"): React.CSSProperties {
  return {
    padding: "6px 12px",
    borderRadius: 999,
    fontFamily: SANS,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: "pointer",
    border: `1px solid ${kind === "danger" ? CLAY : `${INK}44`}`,
    background: "transparent",
    color: kind === "danger" ? CLAY : INK,
  };
}

function LabelField({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: "block", marginTop: 14 }}>
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
        onFocus={(e) => {
          e.currentTarget.style.borderBottomColor = ACCENT;
          e.currentTarget.style.borderBottomStyle = "solid";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderBottomColor = `${INK}55`;
          e.currentTarget.style.borderBottomStyle = "dashed";
        }}
      />
    </label>
  );
}

function TotalRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: SANS,
        fontSize: 13,
        color: INK,
        opacity: 0.88,
        marginTop: 8,
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontWeight: 700,
          color: accent ?? INK,
        }}
      >
        {value}
      </span>
    </div>
  );
}
