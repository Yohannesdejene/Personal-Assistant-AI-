import { getApiKey } from "@/utils/sessionManager";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/encryptionDecription";

export async function GET() {
  const apiKey: any = await getApiKey();
  console.log("apiKey-apiKey new ", apiKey);
  if (!apiKey?.apiKey) {
    return NextResponse.json(
      {
        error: "API key not found",
        manageApiKeyUrl: "/manage-api-key",
      },
      { status: 404 }
    );
  }
  // Make a test request to Gemini API
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": decrypt(apiKey?.apiKey), // apiKey must be a string!
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Explain how AI works in a few words",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        {
          error: "API key is invalid or not working",
          details: errorData,
          manageApiKeyUrl: "/manage-api-key",
        },
        { status: 400 }
      );
    }

    // If successful, you can return the response or just valid: true
    return NextResponse.json({ valid: true });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json(
      {
        error: "Failed to check API key",
        details: err.message,
        manageApiKeyUrl: "/manage-api-key",
      },
      { status: 500 }
    );
  }
}
