/**
 * Transactional email via Brevo (https://www.brevo.com).
 *
 * No custom domain yet, so we use Brevo single-sender: verify
 * EMAIL_FROM (e.g. kanaafoods@gmail.com) once in the Brevo dashboard,
 * then send through their REST API.
 *
 * All sends are BEST-EFFORT: if BREVO_API_KEY is unset, or the call fails,
 * we log and return false. Callers must never let an email failure break
 * checkout or an admin save.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

const FROM_EMAIL = process.env.EMAIL_FROM ?? "kanaafoods@gmail.com";
const FROM_NAME = process.env.EMAIL_FROM_NAME ?? "Kanaa";

/** Public base URL for building links (track page, etc.). */
export function serverUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

export type SendEmailArgs = {
  to: string;
  toName?: string;
  subject: string;
  html: string;
};

export async function sendEmail({
  to,
  toName,
  subject,
  html,
}: SendEmailArgs): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn(
      `[email] BREVO_API_KEY not set — skipping email "${subject}" to ${redactEmail(to)}`,
    );
    return false;
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email: to, name: toName || to }],
        subject,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[email] Brevo ${res.status} sending "${subject}":`, detail);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[email] failed sending "${subject}" to ${redactEmail(to)}:`, err);
    return false;
  }
}

/** Redact an email for logs: keep first 2 chars + domain (PII-safe). */
function redactEmail(email: string): string {
  const at = email.indexOf("@");
  if (at < 1) return "***";
  return `${email.slice(0, 2)}***${email.slice(at)}`;
}

// ──────────────────────────────────────────────────────────────────────────
// Templates
// ──────────────────────────────────────────────────────────────────────────

const INK = "#1F4A33";
const CLAY = "#C0301F";
const PAGE = "#FAF7F2";

type OrderItem = {
  productName: string;
  variantLabel?: string | null;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderEmailData = {
  orderNumber: string;
  status?: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  currency?: string;
  shippingAddress?: {
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    pincode: string;
    country?: string | null;
  };
};

function rupees(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function trackLink(orderNumber: string): string {
  return `${serverUrl()}/track?order=${encodeURIComponent(orderNumber)}`;
}

function shell(inner: string): string {
  return `<div style="background:${PAGE};padding:32px 0;font-family:Arial,Helvetica,sans-serif;color:${INK};">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #ece6db;">
    <div style="background:${INK};padding:20px 28px;">
      <span style="color:#FFF4D8;font-size:20px;font-weight:700;letter-spacing:1px;">Kanaa</span>
    </div>
    <div style="padding:28px;">${inner}</div>
    <div style="padding:18px 28px;border-top:1px solid #f0eadf;color:#8a8a7e;font-size:12px;">
      Homemade healthy food, made with love. • This is a transactional message about your order.
    </div>
  </div>
</div>`;
}

function itemsTable(items: OrderItem[]): string {
  const rows = items
    .map(
      (it) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #f0eadf;">
          <strong>${escapeHtml(it.productName)}</strong>${
            it.variantLabel ? ` <span style="color:#8a8a7e;">(${escapeHtml(it.variantLabel)})</span>` : ""
          }<br/><span style="color:#8a8a7e;font-size:13px;">Qty ${it.qty} × ${rupees(it.unitPrice)}</span>
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #f0eadf;text-align:right;white-space:nowrap;">${rupees(it.lineTotal)}</td>
      </tr>`,
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>`;
}

function totals(o: OrderEmailData): string {
  const line = (label: string, val: string, bold = false) =>
    `<tr><td style="padding:4px 0;${bold ? "font-weight:700;" : "color:#8a8a7e;"}">${label}</td><td style="padding:4px 0;text-align:right;${bold ? "font-weight:700;" : ""}">${val}</td></tr>`;
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:12px;">
    ${line("Subtotal", rupees(o.subtotal))}
    ${line("Shipping", o.shipping > 0 ? rupees(o.shipping) : "Free")}
    ${o.discount && o.discount > 0 ? line("Discount", `−${rupees(o.discount)}`) : ""}
    ${line("Total", rupees(o.total), true)}
  </table>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${CLAY};color:#fff;text-decoration:none;padding:12px 26px;border-radius:100px;font-weight:700;font-size:14px;">${label}</a>`;
}

export function orderConfirmationEmail(o: OrderEmailData): {
  subject: string;
  html: string;
} {
  const addr = o.shippingAddress;
  const inner = `
    <h1 style="font-size:22px;margin:0 0 6px;">Thank you, ${escapeHtml(o.customerName.split(" ")[0] || o.customerName)}! 🌿</h1>
    <p style="color:#5a5a50;font-size:15px;line-height:1.6;margin:0 0 20px;">
      We've received your order <strong>${escapeHtml(o.orderNumber)}</strong>. We'll verify your
      payment and start preparing it. You'll get an update as it moves along.
    </p>
    ${itemsTable(o.items)}
    ${totals(o)}
    ${
      addr
        ? `<p style="color:#8a8a7e;font-size:13px;line-height:1.6;margin:18px 0 0;">
            <strong style="color:${INK};">Shipping to</strong><br/>
            ${escapeHtml(addr.line1)}${addr.line2 ? `, ${escapeHtml(addr.line2)}` : ""}<br/>
            ${escapeHtml(addr.city)}, ${escapeHtml(addr.state)} ${escapeHtml(addr.pincode)}<br/>
            ${escapeHtml(addr.country || "India")}
          </p>`
        : ""
    }
    <div style="margin-top:24px;">${button(trackLink(o.orderNumber), "Track your order")}</div>
  `;
  return {
    subject: `Order ${o.orderNumber} confirmed — Kanaa`,
    html: shell(inner),
  };
}

const STATUS_COPY: Record<string, { subject: string; line: string }> = {
  paid: {
    subject: "Payment verified",
    line: "We've verified your payment — your order is confirmed and being prepared. 🎉",
  },
  shipped: {
    subject: "Your order is on the way",
    line: "Good news! Your order has shipped and is on its way to you. 🚚",
  },
  delivered: {
    subject: "Your order was delivered",
    line: "Your order has been delivered. We hope you love it! 🌿",
  },
  rejected: {
    subject: "Payment needs another look",
    line: "We couldn't verify the payment for your order. Please reply to this email or reach out on WhatsApp so we can sort it out.",
  },
};

/** Returns null if the status isn't one we notify customers about. */
export function orderStatusEmail(
  o: OrderEmailData,
): { subject: string; html: string } | null {
  const copy = o.status ? STATUS_COPY[o.status] : undefined;
  if (!copy) return null;
  const inner = `
    <h1 style="font-size:22px;margin:0 0 6px;">${copy.subject}</h1>
    <p style="color:#5a5a50;font-size:15px;line-height:1.6;margin:0 0 8px;">
      Hi ${escapeHtml(o.customerName.split(" ")[0] || o.customerName)},
    </p>
    <p style="color:#5a5a50;font-size:15px;line-height:1.6;margin:0 0 20px;">
      ${copy.line}
    </p>
    <p style="font-size:14px;margin:0 0 20px;">Order <strong>${escapeHtml(o.orderNumber)}</strong> — ${rupees(o.total)}</p>
    <div>${button(trackLink(o.orderNumber), "View order")}</div>
  `;
  return {
    subject: `Order ${o.orderNumber}: ${copy.subject} — Kanaa`,
    html: shell(inner),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
