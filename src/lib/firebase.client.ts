"use client";

/**
 * Client-side Firebase, used only for phone-OTP login on /account.
 * Initialized lazily so the rest of the app never pays for it.
 *
 * Requires the NEXT_PUBLIC_FIREBASE_* env vars (web config from the
 * Firebase console → Project settings → Your apps). If they're missing,
 * getFirebaseAuth() throws a clear error the /account page can surface.
 */
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId);
}

let app: FirebaseApp | undefined;

export function getFirebaseAuth(): Auth {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.",
    );
  }
  app = getApps().length ? getApp() : initializeApp(config);
  return getAuth(app);
}
