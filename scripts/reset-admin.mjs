/**
 * Offline admin password reset (local only — talks straight to the database,
 * no web endpoint, no Payload import). Run from the project root:
 *
 *   List admin emails:
 *     node scripts/reset-admin.mjs
 *
 *   Set a new password (you choose it — it is never stored anywhere):
 *     node scripts/reset-admin.mjs you@email.com "YourNewPassword"
 *
 * Reproduces Payload's password hashing: pbkdf2(pw, salt, 25000, 512, sha256),
 * 32-byte hex salt, stored in users.hash / users.salt.
 */
import { readFileSync } from "node:fs";
import crypto from "node:crypto";
import { createInterface } from "node:readline/promises";
import pg from "pg";

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(question);
  rl.close();
  return answer;
}

function envFromFile(key) {
  try {
    const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    const m = txt.match(new RegExp("^" + key + "=(.*)$", "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
  } catch {
    return undefined;
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Supabase pooler self-signed cert (dev)
const conn = process.env.DATABASE_URL || envFromFile("DATABASE_URL");
if (!conn) {
  console.error("DATABASE_URL not found (set it or add it to .env.local).");
  process.exit(1);
}

const email = process.argv[2];
let password = process.argv[3]; // optional — if omitted you'll be prompted

const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
await client.connect();

try {
  if (!email) {
    const r = await client.query("select email from users order by email");
    console.log("\nAdmin users in the database:");
    if (!r.rows.length) console.log("  (none)");
    r.rows.forEach((u) => console.log("  •", u.email));
    console.log("\nTo reset:  node scripts/reset-admin.mjs <email>");
    console.log("(you'll be prompted for the new password — nothing gets mangled by the shell)\n");
  } else {
    // Prompt for the password so the shell never touches it.
    if (!password) {
      password = (await ask(`New password for ${email} (min 6 chars): `)).trim();
    }
    if (!password || password.length < 6) {
      console.error("Password must be at least 6 characters.");
      process.exitCode = 1;
    } else {
      const salt = crypto.randomBytes(32).toString("hex");
      const hash = crypto.pbkdf2Sync(password, salt, 25000, 512, "sha256").toString("hex");
      const upd = await client.query("update users set hash=$1, salt=$2 where email=$3", [hash, salt, email]);
      if (upd.rowCount === 0) {
        console.error(`No admin user found with email: ${email}`);
        process.exitCode = 1;
      } else {
        console.log(`\n✅ Password updated for ${email}. Log in at /admin\n`);
      }
    }
  }
} finally {
  await client.end();
}
