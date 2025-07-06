// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/db";
// import { users } from "@/db/schema";
// import {
//   hashPassword,
//   validateEmail,
//   validatePassword,
//   generateApiKey,
// } from "@/lib/auth";
// import { eq } from "drizzle-orm";

// export async function POST(request: NextRequest) {
//   try {
//     const { email, name, password } = await request.json();

//     // Validation
//     if (!email || !name || !password) {
//       return NextResponse.json(
//         { error: "Email, name, and password are required" },
//         { status: 400 }
//       );
//     }

//     if (!validateEmail(email)) {
//       return NextResponse.json(
//         { error: "Invalid email format" },
//         { status: 400 }
//       );
//     }

//     if (!validatePassword(password)) {
//       return NextResponse.json(
//         {
//           error:
//             "Password must be at least 8 characters with uppercase, lowercase, and number",
//         },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, email))
//       .limit(1);

//     if (existingUser.length > 0) {
//       return NextResponse.json(
//         { error: "User with this email already exists" },
//         { status: 409 }
//       );
//     }

//     // Hash password and generate API key
//     const hashedPassword = await hashPassword(password);
//     const apiKey = generateApiKey();

//     // Create user
//     const [newUser] = await db
//       .insert(users)
//       .values({
//         email,
//         name,
//         password: hashedPassword,
//         apiKey,
//       })
//       .returning({
//         id: users.id,
//         email: users.email,
//         name: users.name,
//         apiKey: users.apiKey,
//         createdAt: users.createdAt,
//       });

//     return NextResponse.json(
//       {
//         message: "User registered successfully",
//         user: {
//           id: newUser.id,
//           email: newUser.email,
//           name: newUser.name,
//           apiKey: newUser.apiKey,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
