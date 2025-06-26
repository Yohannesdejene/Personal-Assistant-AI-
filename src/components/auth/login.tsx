"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, Github, Chrome } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assuming you have a Form component

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // Social sign-in handlers (stub)
  function handleGoogleSignIn() {
    // TODO: Integrate with better-auth or your auth provider
    alert("Google sign-in not yet implemented");
  }
  function handleGithubSignIn() {
    // TODO: Integrate with better-auth or your auth provider
    alert("GitHub sign-in not yet implemented");
  }
  function handleSignUp() {
    // TODO: Route to sign up page
    alert("Sign up not yet implemented");
  }

  return (
    <div className="max-w-sm mx-auto  p-6 mt-80  rounded-2xl  flex flex-col  items-center justify-center   space-y-4">
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
      <div className="mt-5 flex flex-col justify-center   backdrop-blur-md bg-white/10 border-1 min-w-[100px] md:min-w-md border-white/20  p-10 rounded-2xl">
        <div className="flex flex-col gap-2 mb-10">
          <h2 className="font-bold text-center  text-3xl">Welcome Back</h2>

          <h6 className="text-white/80 text-md text-center">
            Sign in to continue your AI journey{" "}
          </h6>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        className="placeholder:text-white py-5 pl-10 rounded-2xl bg-white/20 border-none border-0 focus:border-0 hover-border-0 "
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="placeholder:text-white py-5 pl-10 pr-10 rounded-2xl bg-white/20 border-none border-0 focus:border-0 hover-border-0 "
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 cursor-pointer " />
                        ) : (
                          <Eye className="w-5 h-5  cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="cursor-pointer w-full py-6 rounded-2xl bg-white hover:bg-white  text-primary"
            >
              Log in
            </Button>
          </form>
        </Form>
        {/* Divider with OR */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-gray-400 font-medium">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>
        {/* Social login buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 rounded-2xl border-white/20 text-white cursor-pointer hover:bg-white/20  bg-white/20 flex items-center justify-center gap-2  "
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="w-5 h-5 text-white " /> Sign in with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 rounded-2xl border-white/20 text-white cursor-pointer hover:bg-white/20  bg-white/20 flex items-center justify-center gap-2  "
            onClick={handleGithubSignIn}
          >
            <Github className="w-5 h-5 text-white" /> Sign in with GitHub
          </Button>
        </div>
        <div className="mt-5 mb-1 text-center items-center justify-center flex flex-row gap-2">
          {" "}
          <h6> Don't you have account? </h6>
          <Link
            className="  text-white font-bold   text-md"
            href="/auth/sign-up"
          >
            Sign Up
          </Link>
        </div>
        {/* Sign up button */}
      </div>
    </div>
  );
}
