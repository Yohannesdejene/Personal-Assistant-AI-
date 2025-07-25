import { NextRequest, NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/utils/sessionManager";
import getSession from "@/utils/sessionManager";
const GOOGLE_CALENDAR_API =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";

async function fetchWithAuth(
  url: string,
  accessToken: string,
  options: RequestInit = {}
) {
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

// GET: List events
export async function GET(req: NextRequest) {
  const session = await getSession();
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized ." }, { status: 401 });
  // }
  const accessToken = await getGoogleAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Unauthorized or no Google account linked." },
      { status: 401 }
    );
  }
  const searchParams = req.nextUrl.searchParams;
  const timeMin = searchParams.get("timeMin");
  const timeMax = searchParams.get("timeMax");
  let url = GOOGLE_CALENDAR_API;
  if (timeMin || timeMax) {
    const params = new URLSearchParams();
    if (timeMin) params.append("timeMin", timeMin);
    if (timeMax) params.append("timeMax", timeMax);
    url += `?${params.toString()}`;
  }
  const res = await fetchWithAuth(url, accessToken);
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error || "Failed to fetch events." },
      { status: res.status }
    );
  }
  return NextResponse.json({ events: data.items || [] });
}

// POST: Add event
export async function POST(req: NextRequest) {
  const accessToken = await getGoogleAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { error: "Unauthorized or no Google account linked." },
      { status: 401 }
    );
  }
  const event = await req.json();
  console.log("event", event);
  const res = await fetchWithAuth(GOOGLE_CALENDAR_API, accessToken, {
    method: "POST",
    body: JSON.stringify(event),
  });
  console.log("resresresresvvres", res);
  const data = await res.json();
  console.log("data-data-data", data);
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error || "Failed to add event." },
      { status: res.status }
    );
  }
  return NextResponse.json({ event: data });
}

// PATCH: Update event (expects ?eventId=... in query)
export async function PATCH(req: NextRequest) {
  const accessToken = await getGoogleAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { error: "Unauthorized or no Google account linked." },
      { status: 401 }
    );
  }
  const searchParams = req.nextUrl.searchParams;
  const eventId = searchParams.get("eventId");
  if (!eventId) {
    return NextResponse.json(
      { error: "Missing eventId in query." },
      { status: 400 }
    );
  }
  const event = await req.json();
  const url = `${GOOGLE_CALENDAR_API}/${eventId}`;
  const res = await fetchWithAuth(url, accessToken, {
    method: "PATCH",
    body: JSON.stringify(event),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error || "Failed to update event." },
      { status: res.status }
    );
  }
  return NextResponse.json({ event: data });
}
