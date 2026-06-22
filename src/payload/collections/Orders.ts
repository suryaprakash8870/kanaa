import type { CollectionConfig } from "payload";
import { sendEmail, orderStatusEmail, type OrderEmailData } from "@/lib/email";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: { useAsTitle: "orderNumber", defaultColumns: ["orderNumber", "status", "total", "createdAt"] },
  access: {
    // Admins only via the public REST/GraphQL API. The storefront checkout
    // creates orders through the Local API (overrideAccess), so it is unaffected
    // by this — but the public POST /api/orders endpoint can no longer be used
    // to forge arbitrary orders (e.g. status=paid, total=0).
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "orderNumber", type: "text", required: true, unique: true, index: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "awaiting_verification",
      options: [
        { label: "Awaiting verification (UPI screenshot uploaded)", value: "awaiting_verification" },
        { label: "Pending",   value: "pending" },
        { label: "Paid (verified)", value: "paid" },
        { label: "Rejected (bad screenshot)", value: "rejected" },
        { label: "Shipped",   value: "shipped" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Refunded",  value: "refunded" },
      ],
    },
    {
      name: "paymentMethod",
      type: "select",
      defaultValue: "upi_qr",
      options: [
        { label: "UPI QR (manual verify)", value: "upi_qr" },
        { label: "Razorpay", value: "razorpay" },
        { label: "Cash on delivery", value: "cod" },
      ],
    },
    {
      name: "paymentProof",
      label: "UPI payment screenshot",
      type: "upload",
      relationTo: "media",
      admin: { description: "Customer-uploaded proof. Verify the UTR / amount before marking Paid." },
    },
    {
      name: "upiTransactionRef",
      label: "UPI transaction / UTR ref",
      type: "text",
      admin: { description: "Optional — the 12-digit UTR the customer types in." },
    },
    {
      name: "verifiedAt",
      type: "date",
      admin: { description: "Auto-set when an admin flips status to Paid.", readOnly: true, date: { displayFormat: "dd MMM yyyy, HH:mm" } },
    },
    {
      name: "customer",
      type: "group",
      fields: [
        { name: "name",  type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text", required: true },
      ],
    },
    {
      name: "shippingAddress",
      type: "group",
      fields: [
        { name: "line1",   type: "text", required: true },
        { name: "line2",   type: "text" },
        { name: "city",    type: "text", required: true },
        { name: "state",   type: "text", required: true },
        { name: "pincode", type: "text", required: true },
        { name: "country", type: "text", defaultValue: "India" },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        { name: "variant", type: "relationship", relationTo: "variants", required: true },
        { name: "productName", type: "text", required: true },
        { name: "variantLabel", type: "text" },
        { name: "qty", type: "number", required: true, min: 1 },
        { name: "unitPrice", type: "number", required: true },
        { name: "lineTotal", type: "number", required: true },
      ],
    },
    { name: "subtotal", type: "number", required: true },
    { name: "shipping", type: "number", defaultValue: 0 },
    { name: "discount", type: "number", defaultValue: 0 },
    { name: "total", type: "number", required: true },
    { name: "currency", type: "text", defaultValue: "INR" },
    { name: "razorpayOrderId", type: "text", index: true },
    { name: "razorpayPaymentId", type: "text", index: true },
    { name: "razorpaySignature", type: "text" },
    { name: "notes", type: "textarea" },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // Stamp verifiedAt when an admin marks the order Paid.
        if (data?.status === "paid" && originalDoc?.status !== "paid" && !data.verifiedAt) {
          data.verifiedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        // Email the customer when an admin moves the order to a status we
        // notify about. Best-effort: never throw out of the hook.
        try {
          if (operation !== "update") return;
          if (!previousDoc || doc.status === previousDoc.status) return;
          const customer = doc.customer as { name?: string; email?: string } | undefined;
          if (!customer?.email) return;

          const data: OrderEmailData = {
            orderNumber: doc.orderNumber as string,
            status: doc.status as string,
            customerName: customer.name || "there",
            customerEmail: customer.email,
            items: [],
            subtotal: (doc.subtotal as number) ?? 0,
            shipping: (doc.shipping as number) ?? 0,
            total: (doc.total as number) ?? 0,
            currency: (doc.currency as string) ?? "INR",
          };
          const mail = orderStatusEmail(data);
          if (!mail) return; // status not one we email about
          await sendEmail({
            to: customer.email,
            toName: customer.name,
            subject: mail.subject,
            html: mail.html,
          });
        } catch (e) {
          console.error("[orders] status email failed:", e);
        }
      },
    ],
  },
  timestamps: true,
};
