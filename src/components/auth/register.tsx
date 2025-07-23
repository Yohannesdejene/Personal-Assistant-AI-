"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaGoogle } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im"; // Spinner icon

import { Button } from "@/components/ui/button";
import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export default function RegisterFrom() {
  const [loading, setLoading] = useState(false);

  // Social sign-in handlers (stub)
  async function handleGoogleSignIn() {
    await authClient.signIn.social(
      {
        provider: "google", // or any other provider id
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          // toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <div className="max-w-sm mx-auto  p-6 mt-10  rounded-2xl  flex flex-col  items-center justify-center   space-y-4">
      <div className="flex flex-col gap-1">
        <Image
          src="/HeaderLogo.png"
          width="40"
          height="40"
          style={{ borderRadius: "50%" }}
          alt="logo"
          className="gradient-icon "
        />{" "}
      </div>
      <h2 className="font-bold  text-3xl">AI Assistant</h2>

      <h6 className="text-white/60 text-md ">Your intelligent companion</h6>
      <div className="mt-3 flex flex-col justify-center   backdrop-blur-md bg-white/10 border-1 min-w-[100px] md:min-w-md border-white/20  p-10 rounded-2xl">
        <div className="flex flex-col gap-2 mb-">
          <h2 className="font-bold text-center  text-3xl">Welcome,</h2>

          <h6 className="text-white/80 text-md text-center">
            Register to AIASSIST{" "}
          </h6>
        </div>

        {/* Divider with OR */}
        <div className="flex items-center my-6"></div>
        {/* Social login buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 rounded-2xl border-white/20 text-white cursor-pointer hover:bg-white/20  bg-white/20 flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin w-5 h-5 text-white" />
            ) : (
              <FaGoogle className="w-5 h-5 text-white" />
            )}
            {loading ? "Signup in progress..." : " Sign Up with Google"}
          </Button>
        </div>
        <div className="mt-5 mb-1 text-center items-center justify-center flex flex-row gap-2">
          {" "}
          <h6> Don't you have account? </h6>
          <Link className="  text-white font-bold   text-md" href="/auth/login">
            Login{" "}
          </Link>
        </div>
        {/* Sign up button */}
      </div>
    </div>
  );
}
