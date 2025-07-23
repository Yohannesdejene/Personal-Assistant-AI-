import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import getSession from "@/utils/sessionManager"; // adjust path as needed
import { encrypt, decrypt } from "@/utils/encryptionDecription";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();
  const session = await getSession();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Fetch user from DB
  const user: any = await db
    .select({ apiKey: userTable.apiKey })
    .from(userTable)
    .where(eq(userTable.id, session.user.id))
    .then((rows) => rows[0]);

  let google = createGoogleGenerativeAI({ apiKey: decrypt(user.apiKey) });

  const result = streamText({
    model: google("models/gemini-2.0-flash-exp"),
    system:
      "You are a helpful personal  assistant created by Yohannes Dejene a senior software developer.",
    prompt,
  });

  return result.toDataStreamResponse();
}
