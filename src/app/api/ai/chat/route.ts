import { NextRequest, NextResponse } from "next/server";
import { streamText, UIMessage, tool } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { ConsoleLogWriter, eq } from "drizzle-orm";
import getSession from "@/utils/sessionManager"; // adjust path as needed
import { encrypt, decrypt } from "@/utils/encryptionDecription";
import { cookies } from "next/headers";
import { errorHandler } from "@/utils/errorHandler";
// import { StreamingTextResponse } from "ai/";
import z from "zod";

export async function POST(req: any) {
  const token = req.cookies.get("better-auth.session_token");
  const { messages } = await req.json();

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
    // Stream a system/assistant message as a response
    return new Response(JSON.stringify({ error: "Api key not found" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

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
      system: `You are a helpful personal assistant created by Yohannes Dejene, a senior software developer.

Today's date is ${
        new Date().toISOString().split("T")[0]
      } (yyyy-mm-dd). Use this as a reference when answering calendar-related questions.

If the user asks something like “Do I have any events today?”, check if any event’s date matches today's date. Return only relevant events. If there are no events, say "No events for today."

If the API key is not correct or invalid, show or stream "Invalid API key" message.

Keep answers for calendar queries short and direct.
`,

      tools: {
        calendar: tool({
          description:
            "Get events or add a new event to the user's Google Calendar",
          parameters: z.object({
            action: z.enum(["get", "add"]),
            summary: z.string().optional(),
            start: z.string().optional(),
            end: z.string().optional(),
          }),
          execute: async ({ action, summary, start, end }) => {
            if (action === "get") {
              const res = await fetch("http://localhost:3000/api/calendar", {
                headers: {
                  Cookie: `${token.name}=${token.value}`,
                },
              });
              return await res.json();
            } else {
              const res = await fetch("http://localhost:3000/api/calendar", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Cookie: `${token.name}=${token.value}`,
                },
                body: JSON.stringify({ summary, start, end }),
              });
              return await res.json();
            }
          },
        }),
      },
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
