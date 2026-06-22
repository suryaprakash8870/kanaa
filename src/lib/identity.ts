/**
 * Normalize an email for matching: trim + lowercase.
 *
 * Used to link a logged-in customer (verified Google email) to their orders,
 * which store whatever email was typed at checkout.
 */
export function normalizeEmail(input: string | null | undefined): string {
  return (input ?? "").trim().toLowerCase();
}
