import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { account } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export default async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

/**
 * Fetches the Google access_token for the current user from the account table.
 * Returns null if not found or not authenticated.
 */
export async function getGoogleAccessToken() {
  const session = await getSession();
  if (!session?.user?.id) return null;

  const accounts = await db
    .select({ accessToken: account.accessToken })
    .from(account)
    .where(
      and(eq(account.id, session.user.id), eq(account.providerId, "google"))
    );

  return accounts[0]?.accessToken || null;
}
