import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userSessions, users } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/auth/login",
    "/auth/sign-up",
    "/",
    "/api/auth/login",
    "/api/auth/register",
  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for session token
  const sessionToken = request.cookies.get("session-token")?.value;

  if (!sessionToken) {
    // Redirect to login if no session token
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/tasks")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    // Verify session token
    const session = await db
      .select({
        id: userSessions.id,
        userId: userSessions.userId,
        expiresAt: userSessions.expiresAt,
      })
      .from(userSessions)
      .where(
        and(
          eq(userSessions.token, sessionToken),
          gt(userSessions.expiresAt, new Date())
        )
      )
      .limit(1);

    if (session.length === 0) {
      // Invalid or expired session
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      response.cookies.set("session-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
      });
      return response;
    }

    // Add user info to request headers for API routes
    if (pathname.startsWith("/api/")) {
      const user = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
        })
        .from(users)
        .where(eq(users.id, session[0].userId))
        .limit(1);

      if (user.length > 0) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", user[0].id);
        requestHeaders.set("x-user-email", user[0].email);
        requestHeaders.set("x-user-name", user[0].name);

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
