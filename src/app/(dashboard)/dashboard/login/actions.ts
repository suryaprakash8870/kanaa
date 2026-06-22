"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload/payload.config";

export async function loginAction(
  _prev: { error: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const payload = await getPayload({ config });
    const result = await payload.login({
      collection: "users",
      data: { email, password },
    });

    if (!result.token) {
      return { error: "Login failed — no token returned" };
    }

    const cookieStore = await cookies();
    cookieStore.set("payload-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (err) {
    console.error("[dashboard/login]", err);
    return { error: err instanceof Error ? err.message : "Invalid email or password" };
  }

  redirect("/dashboard/overview");
}
