import "server-only";

/**
 * Server-side Firebase Admin, used to verify the phone-OTP ID token the
 * client sends after a successful Firebase sign-in.
 *
 * Service-account credentials come from env:
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY   (paste the PEM; literal "\n" sequences are
 *                           converted back to newlines)
 */
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";

function privateKey(): string {
  return (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}

let app: App | undefined;

function adminApp(): App {
  if (!isAdminConfigured()) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }
  if (getApps().length) return getApps()[0]!;
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey(),
    }),
  });
  return app;
}

/** Verifies a Firebase ID token and returns its decoded claims. */
export async function verifyIdToken(idToken: string): Promise<DecodedIdToken> {
  return getAuth(adminApp()).verifyIdToken(idToken);
}
