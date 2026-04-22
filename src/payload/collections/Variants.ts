import type { CollectionConfig } from "payload";

export const Variants: CollectionConfig = {
  slug: "variants",
  admin: { useAsTitle: "sku", defaultColumns: ["sku", "product", "price", "stock"] },
  access: { read: () => true },
  fields: [
    { name: "product", type: "relationship", relationTo: "products", required: true },
    { name: "sku", type: "text", required: true, unique: true, index: true },
    { name: "weightGrams", type: "number", required: true },
    { name: "price", type: "number", required: true, admin: { description: "Selling price in INR" } },
    { name: "mrp", type: "number", admin: { description: "MRP in INR (for strike-through)" } },
    { name: "stock", type: "number", defaultValue: 0 },
    { name: "lowStockThreshold", type: "number", defaultValue: 5 },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
};
