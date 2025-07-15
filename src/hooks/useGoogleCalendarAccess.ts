"use client";
import { useState, useCallback } from "react";
import { authClient } from "@/lib/auth-client";

export function useGoogleCalendarAccess() {
  const [loading, setLoading] = useState(false);

  const handleCalendarAccess = useCallback(async () => {
    await authClient.linkSocial(
      {
        provider: "google",
        scopes: ["https://www.googleapis.com/auth/calendar.events"],
      },
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError: () => setLoading(false),
      }
    );
  }, []);

  return { loading, handleCalendarAccess };
}
