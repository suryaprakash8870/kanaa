import "server-only";
import crypto from "crypto";

/**
 * Tamper-proof customer session token.
 *
 * The customer "session" is just a verified email, but it must NOT be stored
 * as a raw cookie value — cookies are client-controlled, so a raw email could
 * be forged to read someone else's orders. Instead we store an HMAC-signed
 * token `base64url(email|exp).signature`, signed with PAYLOAD_SECRET, and
 * verify the signature + expiry on every request.
 */

function secret(): string {
  const s = process.env.PAYLOAD_SECRET;
  if (!s) {
    // Fail closed: without a secret we cannot issue trustworthy sessions.
    throw new Error("PAYLOAD_SECRET is not set — cannot sign customer sessions.");
  }
  return s;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

const DEFAULT_TTL = 60 * 60 * 24 * 30; // 30 days

export function createSessionToken(email: string, ttlSeconds = DEFAULT_TTL): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = Buffer.from(`${email}|${exp}`).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** Returns the email if the token is valid and unexpired, else null. */
export function verifySessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let expected: string;
  try {
    expected = sign(body);
  } catch {
    return null;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  const decoded = Buffer.from(body, "base64url").toString("utf8");
  const sep = decoded.lastIndexOf("|");
  if (sep <= 0) return null;
  const email = decoded.slice(0, sep);
  const exp = Number(decoded.slice(sep + 1));
  if (!email || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  return email;
}
