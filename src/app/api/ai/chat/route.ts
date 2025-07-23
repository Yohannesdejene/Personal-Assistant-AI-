import { streamText, UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { ConsoleLogWriter, eq } from "drizzle-orm";
import getSession from "@/utils/sessionManager"; // adjust path as needed
import { encrypt, decrypt } from "@/utils/encryptionDecription";
// import { StreamingTextResponse } from "ai/";

export async function POST(req: Request) {
  // const { messages }: { messages: UIMessage[] } = await req.json();
  const { messages } = await req.json();
  console.log("messages", messages);

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
    .select({ apiKey: userTable.apiKey })
    .from(userTable)
    .where(eq(userTable.id, session.user.id))
    .then((rows) => rows[0]);

  if (!user?.apiKey) {
    console.log("no api key hello");
    // Stream a system/assistant message as a response
    return new Response(JSON.stringify({ error: "Api key not found" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("decrypt(user.apiKey)-111 ", decrypt(user.apiKey));
  let google;
  try {
    google = createGoogleGenerativeAI({ apiKey: decrypt(user.apiKey) });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Invalid or missing API key.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const result: any = streamText({
      model: google("models/gemini-2.0-flash-exp"),
      system:
        "You are a helpful personal assistant created by Yohannes Dejene a senior software developer.",
      messages,
    });

    if (result.error) {
      console.error("Error during streaming:", result.error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    }); // Only on success
  } catch (error) {
    console.log("error", error);
    // handle error
    return new Response(
      JSON.stringify({
        error: "Invalid or missing API key.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export function errorHandler(error: unknown) {
  console.log("error", error);
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
