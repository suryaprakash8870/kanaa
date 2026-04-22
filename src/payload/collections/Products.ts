import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug", "featured"] },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "tamilName", type: "text" },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "tagline", type: "text" },
    { name: "description", type: "textarea" },
    { name: "story", type: "richText" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "color",
      type: "text",
      admin: { description: "Brand accent hex, e.g. #C0301F" },
    },
    {
      name: "ingredients",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
