import type { CollectionConfig } from "payload";

export const Offers: CollectionConfig = {
  slug: "offers",
  admin: { useAsTitle: "text", defaultColumns: ["text", "active", "order"] },
  access: { read: () => true },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Small thumbnail shown on the left of the banner strip (square works best, e.g. 120×120)." },
    },
    { name: "icon", type: "text", required: true, admin: { description: "Emoji fallback shown when no image is uploaded" } },
    { name: "text", type: "text", required: true },
    { name: "ctaLabel", type: "text", required: true },
    { name: "ctaUrl", type: "text", defaultValue: "#products" },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower = earlier" } },
    { name: "active", type: "checkbox", defaultValue: true },
    { name: "startsAt", type: "date" },
    { name: "endsAt", type: "date" },
  ],
};
