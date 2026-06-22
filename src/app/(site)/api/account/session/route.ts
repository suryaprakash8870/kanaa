import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyIdToken, isAdminConfigured } from "@/lib/firebase.admin";
import { normalizeEmail } from "@/lib/identity";
import { createSessionToken } from "@/lib/session";

export const runtime = "nodejs";

export const CUSTOMER_COOKIE = "kanaa-customer";

/**
 * POST { idToken } — verifies the Firebase (Google Sign-In) token and, on
 * success, stores the verified email (normalized) in an httpOnly cookie. That
 * cookie is the customer "session" — there is no password account.
 */
export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Login is not available yet — Firebase is not configured." },
      { status: 503 },
    );
  }
  try {
    const { idToken } = (await req.json()) as { idToken?: string };
    if (!idToken)
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });

    const decoded = await verifyIdToken(idToken);
    const email = normalizeEmail(decoded.email);
    // Fail closed: require an explicitly verified email (=== true), so other
    // providers with a missing claim can never slip through.
    if (!email || decoded.email_verified !== true)
      return NextResponse.json(
        { error: "No verified email on this login." },
        { status: 400 },
      );

    const store = await cookies();
    // Store a SIGNED token, never the raw email — the cookie must not be forgeable.
    store.set(CUSTOMER_COOKIE, createSessionToken(email), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({ ok: true, email });
  } catch (err) {
    console.error("[account/session]", err);
    return NextResponse.json(
      { error: "Could not verify login. Please try again." },
      { status: 401 },
    );
  }
}

/** DELETE — log out (clear the cookie). */
export async function DELETE() {
  const store = await cookies();
  store.delete(CUSTOMER_COOKIE);
  return NextResponse.json({ ok: true });
}
