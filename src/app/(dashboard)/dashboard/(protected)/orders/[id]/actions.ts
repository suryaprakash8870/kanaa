"use server";
import { getPayload } from "payload";
import config from "@/payload/payload.config";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/admin-auth";

export async function updateOrderStatus(orderId: string, status: string) {
  // Server actions are directly invocable — verify the caller is a real admin,
  // never trust that the dashboard UI gated this.
  await assertAdmin();
  const payload = await getPayload({ config });
  await payload.update({
    collection: "orders",
    id: orderId,
    data: { status },
    overrideAccess: true,
  });
  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard/overview");
}
