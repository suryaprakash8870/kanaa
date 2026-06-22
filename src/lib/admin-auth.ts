import "server-only";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

/**
 * Validate the Payload session for the custom /dashboard.
 *
 * The middleware only checks that a `payload-token` cookie is PRESENT, which a
 * forged cookie satisfies. Real validation must happen server-side: payload.auth
 * verifies the token's signature/expiry against PAYLOAD_SECRET and returns the
 * user (or null). Protected pages and mutating server actions must call this —
 * never trust cookie presence alone.
 */
export async function getAdminUser() {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({
      headers: await nextHeaders(),
    });
    return user ?? null;
  } catch {
    return null;
  }
}

/** For server components/layouts: redirect to login if not a valid admin. */
export async function requireAdminUser() {
  const user = await getAdminUser();
  if (!user) redirect("/dashboard/login");
  return user;
}

/** For server actions: throw if not a valid admin (don't silently redirect a POST). */
export async function assertAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
