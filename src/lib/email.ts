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

/** Public base URL for building links (track page, logo, etc.). */
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
// Brand + building blocks
// ──────────────────────────────────────────────────────────────────────────

const INK = "#1F4A33"; // forest green
const CLAY = "#C0301F"; // brand red
const ACCENT = "#4FB83A"; // leaf green
const GOLD = "#E5B43A";
const CREAM = "#FFF4D8";
const PAGE = "#FAF7F2";
const MUTED = "#8a8a7e";
const LOGO_URL = `${serverUrl()}/labels/Logo.png`;

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

/** Coloured status pill. */
function badge(label: string, color: string): string {
  return `<span style="display:inline-block;background:${color};color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.4px;padding:6px 14px;border-radius:100px;text-transform:uppercase;">${escapeHtml(label)}</span>`;
}

/** Pill-shaped CTA button (table-based for Outlook). */
function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td style="border-radius:100px;background:${CLAY};">
    <a href="${href}" style="display:inline-block;padding:13px 30px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;font-family:Arial,Helvetica,sans-serif;border-radius:100px;">${escapeHtml(label)} &nbsp;&rarr;</a>
  </td></tr></table>`;
}

/** Outer wrapper with logo header + footer. */
function shell(inner: string, preheader = ""): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${PAGE};">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>` : ""}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE};padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ece6db;box-shadow:0 8px 28px rgba(31,74,51,0.07);">
        <!-- header -->
        <tr><td align="center" style="background:${INK};padding:22px 28px;">
          <img src="${LOGO_URL}" alt="Kanaa" height="38" style="height:38px;width:auto;display:block;filter:brightness(0) invert(1);" />
          <div style="color:${CREAM};font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:2px;margin-top:8px;opacity:0.85;">HOMEMADE • HEALTHY • SOUTH INDIAN</div>
        </td></tr>
        <!-- body -->
        <tr><td style="padding:30px 30px 8px;font-family:Arial,Helvetica,sans-serif;color:${INK};">${inner}</td></tr>
        <!-- footer -->
        <tr><td style="padding:22px 30px;background:#FBF7EE;border-top:1px solid #f0eadf;font-family:Arial,Helvetica,sans-serif;">
          <div style="color:${INK};font-weight:700;font-size:14px;">Kanaa</div>
          <div style="color:${MUTED};font-size:12px;line-height:1.7;margin-top:4px;">
            Homemade healthy food, made with love. 🌿<br/>
            Questions? Just reply to this email — we're happy to help.
          </div>
          <div style="color:#b3b0a6;font-size:11px;margin-top:10px;">
            This is a transactional message about your order.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

function itemsTable(items: OrderItem[]): string {
  const rows = items
    .map(
      (it) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0eadf;font-family:Arial,Helvetica,sans-serif;">
          <strong style="color:${INK};">${escapeHtml(it.productName)}</strong>${
            it.variantLabel ? ` <span style="color:${MUTED};">(${escapeHtml(it.variantLabel)})</span>` : ""
          }<br/><span style="color:${MUTED};font-size:13px;">Qty ${it.qty} × ${rupees(it.unitPrice)}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0eadf;text-align:right;white-space:nowrap;font-family:Arial,Helvetica,sans-serif;color:${INK};font-weight:600;">${rupees(it.lineTotal)}</td>
      </tr>`,
    )
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin-top:4px;">
    <tr><td colspan="2" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;color:${MUTED};text-transform:uppercase;padding-bottom:6px;">🧾 Your items</td></tr>
    ${rows}
  </table>`;
}

function totals(o: OrderEmailData): string {
  const line = (label: string, val: string, bold = false) =>
    `<tr><td style="padding:5px 0;font-family:Arial,Helvetica,sans-serif;${bold ? `font-weight:700;color:${INK};font-size:15px;` : `color:${MUTED};`}">${label}</td><td style="padding:5px 0;text-align:right;font-family:Arial,Helvetica,sans-serif;${bold ? `font-weight:700;color:${INK};font-size:15px;` : `color:${INK};`}">${val}</td></tr>`;
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin-top:14px;">
    ${line("Subtotal", rupees(o.subtotal))}
    ${line("Shipping", o.shipping > 0 ? rupees(o.shipping) : "Free")}
    ${o.discount && o.discount > 0 ? line("Discount", `−${rupees(o.discount)}`) : ""}
    <tr><td colspan="2" style="border-top:2px solid ${INK};padding-top:6px;"></td></tr>
    ${line("Total", rupees(o.total), true)}
  </table>`;
}

function addressBlock(addr: NonNullable<OrderEmailData["shippingAddress"]>): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:${PAGE};border-radius:12px;">
    <tr><td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:12px;font-weight:700;letter-spacing:1px;color:${MUTED};text-transform:uppercase;">📦 Shipping to</div>
      <div style="color:${INK};font-size:14px;line-height:1.6;margin-top:6px;">
        ${escapeHtml(addr.line1)}${addr.line2 ? `, ${escapeHtml(addr.line2)}` : ""}<br/>
        ${escapeHtml(addr.city)}, ${escapeHtml(addr.state)} ${escapeHtml(addr.pincode)}<br/>
        ${escapeHtml(addr.country || "India")}
      </div>
    </td></tr>
  </table>`;
}

// ──────────────────────────────────────────────────────────────────────────
// Templates
// ──────────────────────────────────────────────────────────────────────────

export function orderConfirmationEmail(o: OrderEmailData): {
  subject: string;
  html: string;
} {
  const addr = o.shippingAddress;
  const firstName = escapeHtml(o.customerName.split(" ")[0] || o.customerName);
  const inner = `
    <div align="center" style="margin-bottom:14px;">${badge("Order received", ACCENT)}</div>
    <h1 style="font-size:23px;margin:0 0 8px;text-align:center;color:${INK};font-family:Georgia,'Times New Roman',serif;">Thank you, ${firstName}! 🌿</h1>
    <p style="color:#5a5a50;font-size:15px;line-height:1.6;margin:0 0 22px;text-align:center;">
      We've received your order <strong style="color:${INK};">${escapeHtml(o.orderNumber)}</strong>.<br/>
      We'll verify your payment and start preparing it.
    </p>
    ${itemsTable(o.items)}
    ${totals(o)}
    ${addr ? addressBlock(addr) : ""}
    <div align="center" style="margin:28px 0 8px;">${button(trackLink(o.orderNumber), "Track your order")}</div>
  `;
  return {
    subject: `Order ${o.orderNumber} confirmed — Kanaa`,
    html: shell(inner, `Thanks ${firstName}! Your Kanaa order ${o.orderNumber} is in.`),
  };
}

const STATUS_COPY: Record<
  string,
  { subject: string; line: string; badge: string; color: string }
> = {
  paid: {
    subject: "Payment verified",
    line: "We've verified your payment — your order is confirmed and being prepared. 🎉",
    badge: "Paid",
    color: ACCENT,
  },
  shipped: {
    subject: "Your order is on the way",
    line: "Good news! Your order has shipped and is on its way to you. 🚚",
    badge: "Shipped",
    color: GOLD,
  },
  delivered: {
    subject: "Your order was delivered",
    line: "Your order has been delivered. We hope you love it! 🌿",
    badge: "Delivered",
    color: ACCENT,
  },
  rejected: {
    subject: "Payment needs another look",
    line: "We couldn't verify the payment for your order. Please reply to this email or reach out on WhatsApp so we can sort it out.",
    badge: "Action needed",
    color: CLAY,
  },
  cancelled: {
    subject: "Your order was cancelled",
    line: "Your order has been cancelled. If this wasn't expected or you'd like to reorder, just reply to this email or reach out on WhatsApp — we're happy to help.",
    badge: "Cancelled",
    color: MUTED,
  },
  refunded: {
    subject: "Your refund is on the way",
    line: "We've processed a refund for your order. It can take a few business days to reflect in your account, depending on your bank. Reply to this email if you have any questions.",
    badge: "Refunded",
    color: INK,
  },
};

/** Returns null if the status isn't one we notify customers about. */
export function orderStatusEmail(
  o: OrderEmailData,
): { subject: string; html: string } | null {
  const copy = o.status ? STATUS_COPY[o.status] : undefined;
  if (!copy) return null;
  const firstName = escapeHtml(o.customerName.split(" ")[0] || o.customerName);
  const inner = `
    <div align="center" style="margin-bottom:14px;">${badge(copy.badge, copy.color)}</div>
    <h1 style="font-size:22px;margin:0 0 8px;text-align:center;color:${INK};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(copy.subject)}</h1>
    <p style="color:#5a5a50;font-size:15px;line-height:1.6;margin:0 0 6px;text-align:center;">Hi ${firstName},</p>
    <p style="color:#5a5a50;font-size:15px;line-height:1.6;margin:0 0 22px;text-align:center;">${copy.line}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE};border-radius:12px;margin-bottom:8px;">
      <tr><td style="padding:14px 18px;font-family:Arial,Helvetica,sans-serif;">
        <span style="color:${MUTED};font-size:13px;">Order</span>
        <strong style="color:${INK};"> ${escapeHtml(o.orderNumber)}</strong>
        <span style="float:right;color:${INK};font-weight:700;">${rupees(o.total)}</span>
      </td></tr>
    </table>
    <div align="center" style="margin:24px 0 8px;">${button(trackLink(o.orderNumber), "View order")}</div>
  `;
  return {
    subject: `Order ${o.orderNumber}: ${copy.subject} — Kanaa`,
    html: shell(inner, copy.line),
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
