import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: { useAsTitle: "orderNumber", defaultColumns: ["orderNumber", "status", "total", "createdAt"] },
  access: {
    // Admins can see everything. Storefront writes via server actions / Razorpay webhook.
    read: ({ req }) => Boolean(req.user),
    create: () => true,
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
  },
  timestamps: true,
};
