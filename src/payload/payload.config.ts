import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Offers } from "./collections/Offers";
import { Products } from "./collections/Products";
import { Variants } from "./collections/Variants";
import { Testimonials } from "./collections/Testimonials";
import { Orders } from "./collections/Orders";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Only enable S3/R2 storage in production (or when env vars are set).
// Falls back to local disk for dev so nothing breaks on your laptop.
const s3Enabled =
  !!process.env.S3_BUCKET &&
  !!process.env.S3_ACCESS_KEY_ID &&
  !!process.env.S3_SECRET_ACCESS_KEY &&
  !!process.env.S3_ENDPOINT;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, ".."),
    },
  },
  collections: [Users, Media, Offers, Products, Variants, Testimonials, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),
  sharp,
  upload: {
    limits: { fileSize: 10 * 1024 * 1024 },
  },
  plugins: s3Enabled
    ? [
        s3Storage({
          collections: {
            media: true,
          },
          bucket: process.env.S3_BUCKET!,
          config: {
            endpoint: process.env.S3_ENDPOINT!,
            region: process.env.S3_REGION ?? "auto",
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            // R2 requires path-style addressing
            forcePathStyle: true,
          },
        }),
      ]
    : [],
});
