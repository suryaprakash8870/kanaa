import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "filename" },
  access: { read: () => true },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumb", width: 320, height: 320, position: "centre" },
      { name: "card", width: 720, height: 540, position: "centre" },
      { name: "hero", width: 1600, height: 1200, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    { name: "alt", type: "text", required: true },
  ],
};
