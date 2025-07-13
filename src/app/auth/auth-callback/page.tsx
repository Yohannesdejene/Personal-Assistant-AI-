// app/auth-callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth-callback"); // Will hit route.ts (server)
  }, [router]);

  return <p>Signing you in...</p>;
}
