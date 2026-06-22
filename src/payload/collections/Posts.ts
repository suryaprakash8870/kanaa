import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "excerpt", type: "textarea" },
    { name: "content", type: "richText" },
    { name: "featuredImage", type: "upload", relationTo: "media" },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    { name: "publishedAt", type: "date" },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    { name: "author", type: "text" },
    {
      name: "readTime",
      type: "number",
      admin: { description: "Estimated read time in minutes" },
    },
  ],
  timestamps: true,
};
