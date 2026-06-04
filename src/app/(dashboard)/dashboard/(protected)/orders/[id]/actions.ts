"use server";
import { getPayload } from "payload";
import config from "@/payload/payload.config";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, status: string) {
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
