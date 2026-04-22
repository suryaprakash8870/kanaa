import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", defaultColumns: ["name", "rating", "approved"] },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "location", type: "text" },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
    { name: "text", type: "textarea", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "product", type: "relationship", relationTo: "products" },
    { name: "approved", type: "checkbox", defaultValue: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
