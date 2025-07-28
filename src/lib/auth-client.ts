import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://aiassit.vercel.app/", // The base URL of your auth server
});



export const { signUp, signIn, signOut, useSession } = authClient;
