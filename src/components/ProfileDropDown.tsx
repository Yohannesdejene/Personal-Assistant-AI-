"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im"; // Spinner icon

const ProfileDropDown = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div>
      <DropdownMenuContent
        side="top"
        className="w-[200px] cursor-pointer backdrop-blur-md px-5 py-6  text-white rounded-2xl border-none    bg-white/10"
      >
        <DropdownMenuItem className="cursor-pointer !hover:bg-white/20 focus:bg-white/20 rounded ps-5">
          <Link href="/account">
            <span>Account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer !hover:bg-white/20 focus:bg-white/20 rounded ps-5">
          <Link href="/setting">
            <span>Setting</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:text-black !hover:bg-white/20 focus:bg-white/20 rounded ps-5 m-0  ">
          <Link href="#" className="m-0 p-0">
            <Button
              className="p-0 m-0 h-[20px] cursor-pointer bg-transparent hover:bg-transparent flex justify-start"
              onClick={async () => {
                await authClient.signOut(
                  {
                    fetchOptions: {},
                  },
                  {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      router.push("/auth/sign-in"); // redirect to login page
                      setLoading(false);
                    },
                    onError: (ctx: any) => {
                      // toast.error(ctx.error.message);
                    },
                  }
                );
              }}
            >
              {loading ? (
                <ImSpinner2 className="animate-spin w-5 h-5 text-white" />
              ) : (
                <></>
              )}
              {loading ? "Signing you out..." : "Log out"}
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </div>
  );
};
export default ProfileDropDown;
