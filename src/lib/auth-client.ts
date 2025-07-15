import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // The base URL of your auth server
});

export const requestGoogleCalenderEventAccess = async () => {
  await authClient.linkSocial({
    provider: "google",
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });
};

export const { signUp, signIn, signOut, useSession } = authClient;
