import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import getSession from "@/utils/sessionManager";
import { user } from "@/db/schema";
import { encrypt, decrypt } from "@/utils/encryptionDecription";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user with decrypted API key
  let data: any = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  if (!data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    apiKey: data[0].apiKey ? decrypt(data[0].apiKey) : null,
    isActive: !!data.apiKey,
    createdAt: data.createdAt,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { apiKey } = await req.json();
  if (!apiKey) {
    return NextResponse.json({ error: "Api key is required" }, { status: 400 });
  }

  // Generate a new API key (you might want to integrate with Gemini API here)
  const hashedKey = encrypt(apiKey);
  // Update existing API key
  const data = await db
    .update(user)
    .set({
      apiKey: hashedKey,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.user.id));

  // Return the generated key only once (it's hashed in DB)
  return NextResponse.json({
    success: true,
    data: hashedKey,
    message:
      "API key created successfully. Please copy it now as it won't be shown again.",
  });
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
  await db.delete(user).where(and(eq(user.id, id), eq(id, session.user.id)));
  return NextResponse.json({ success: true });
}
