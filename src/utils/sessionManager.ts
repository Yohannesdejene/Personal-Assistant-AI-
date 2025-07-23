import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { account } from "@/db/schema";
import { user as userTable } from "@/db/schema";

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
    .select({ access_token: account.accessToken })
    .from(account)
    .where(
      and(eq(account.userId, session.user.id), eq(account.providerId, "google"))
    );

  return accounts[0]?.access_token || null;
}

export async function getApiKey() {
  // 1. Get user ID from session/auth
  const session = await getSession();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Fetch user from DB
  const user = await db
    .select({ apiKey: userTable })
    .from(userTable)
    .where(eq(userTable.id, session.user.id))
    .then((rows) => rows[0]);

  return user?.apiKey || null;
}
