import type { CollectionConfig } from "payload";

export const Offers: CollectionConfig = {
  slug: "offers",
  admin: { useAsTitle: "text", defaultColumns: ["text", "active", "order"] },
  access: { read: () => true },
  fields: [
    { name: "icon", type: "text", required: true, admin: { description: "Emoji or short icon string" } },
    { name: "text", type: "text", required: true },
    { name: "ctaLabel", type: "text", required: true },
    { name: "ctaUrl", type: "text", defaultValue: "#products" },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower = earlier" } },
    { name: "active", type: "checkbox", defaultValue: true },
    { name: "startsAt", type: "date" },
    { name: "endsAt", type: "date" },
  ],
};
