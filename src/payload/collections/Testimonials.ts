import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", defaultColumns: ["name", "rating", "approved", "createdAt"] },
  access: {
    // Public visitors only ever see APPROVED reviews — pending/hidden ones are
    // invisible to them through the REST API too (not just the storefront
    // query). Logged-in admins see everything.
    read: ({ req }) => (req.user ? true : { approved: { equals: true } }),
    // Customers submit reviews through the /api/reviews route (Local API,
    // overrideAccess), so the public REST create stays admin-only and can't be
    // used to forge an already-approved review.
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "location", type: "text" },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
    { name: "text", type: "textarea", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "product", type: "relationship", relationTo: "products" },
    {
      name: "email",
      type: "email",
      admin: {
        description: "Customer's email (if they left one) — for your reference only, never shown publicly.",
      },
    },
    {
      name: "approved",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Untick to HIDE this review from the website. Customer-submitted reviews arrive unticked (pending) until you approve them.",
      },
    },
    {
      name: "source",
      type: "select",
      defaultValue: "admin",
      options: [
        { label: "Added by admin", value: "admin" },
        { label: "Submitted by customer", value: "customer" },
      ],
      admin: { readOnly: true, description: "Where this review came from." },
    },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower = earlier in the carousel." } },
  ],
  timestamps: true,
};
