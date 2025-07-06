// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/db";
// import { users, userSessions } from "@/db/schema";
// import {
//   comparePassword,
//   generateToken,
//   generateSessionToken,
// } from "@/lib/auth";
// import { eq } from "drizzle-orm";

// export async function POST(request: NextRequest) {
//   try {
//     const { email, password } = await request.json();

//     // Validation
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Find user by email
//     const userResult = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, email))
//       .limit(1);

//     if (userResult.length === 0) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     const user = userResult[0];

//     // Check if user is active
//     if (!user.isActive) {
//       return NextResponse.json(
//         { error: "Account is deactivated" },
//         { status: 401 }
//       );
//     }

//     // Verify password
//     const isPasswordValid = await comparePassword(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = generateToken({
//       userId: user.id,
//       email: user.email,
//     });

//     // Create session
//     const sessionToken = generateSessionToken();
//     const expiresAt = new Date();
//     expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

//     await db.insert(userSessions).values({
//       userId: user.id,
//       token: sessionToken,
//       expiresAt,
//     });

//     // Set HTTP-only cookie
//     const response = NextResponse.json(
//       {
//         message: "Login successful",
//         user: {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           apiKey: user.apiKey,
//         },
//       },
//       { status: 200 }
//     );

//     response.cookies.set("session-token", sessionToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       expires: expiresAt,
//     });

//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
