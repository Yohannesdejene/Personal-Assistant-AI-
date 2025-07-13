import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import getSession from "@/utils/sessionManager";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const keys = await db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.userId, session.user.id));
  return NextResponse.json(
    keys.map((k) => ({
      id: k.id,
      keyPrefix: k.keyPrefix,
      isActive: k.isActive,
      lastUsedAt: k.lastUsedAt,
      expiresAt: k.expiresAt,
      createdAt: k.createdAt,
    }))
  );
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { key } = await req.json();
  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }
  // Remove old keys for this user
  await db.delete(apiKeys).where(eq(apiKeys.userId, session.user.id));
  // Hash and store the provided key
  const hashedKey = await bcrypt.hash(key, 10);
  const keyPrefix = key.slice(0, 6);
  const id = nanoid();
  await db.insert(apiKeys).values({
    id,
    name: "API Key",
    hashedKey,
    keyPrefix,
    userId: session.user.id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "API key id is required" },
      { status: 400 }
    );
  }
  await db
    .delete(apiKeys)
    .where(and(eq(apiKeys.id, id), eq(apiKeys.userId, session.user.id)));
  return NextResponse.json({ success: true });
}
