"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PanelLeftIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProfileDropDown from "@/components/ProfileDropDown";
import { AppSidebar } from "@/components/Sidebar/index";
import MobileSideBar from "@/components/Sidebar/MobileNav";
import { authClient, useSession } from "@/lib/auth-client";

const NormalHeader = () => {
  const { data: currentUser } = useSession();

  const [goal, setGoal] = useState(350);

  return (
    <div className="flex sm:hidden items-center justify-between  p-4 m-0 backdrop-blur-md   bg-white/10  border-gray-200 shadow-sm">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <button className="flex md:hidden">
            {" "}
            <PanelLeftIcon className="text-white" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="w-[80vw] max-w-xs p-0">
          <MobileSideBar />
        </DrawerContent>
      </Drawer>
      <div className="flex items-center gap-3">
        <div className=" flex  md:hidden gap-3 items-center justify-center">
          <div>
            <Image
              src="/HeaderLogo.png"
              width="35"
              height="35"
              style={{ borderRadius: "20%" }}
              alt="logo"
              className="gradient-icon "
            />{" "}
          </div>

          <div className="flex flex-col  ">
            <span className="text-white font-semibold text-lg ">AIAssist</span>
            <span className="text-white/70 font-semibold text-sm hidden md:block ">
              Ready to help with your productivity
            </span>
          </div>
        </div>
      </div>
      <div className="relative md:hidden me-2">
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          {/* <span className="text-xs text-white font-bold">3</span> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Avatar className="mr-2 h-6 w-6 hover:text-white">
                <AvatarImage
                  src={currentUser?.user.image || undefined}
                  alt={currentUser?.user.name}
                />
                <AvatarFallback className="hover:text-white">
                  {currentUser?.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* <ChevronUp className="ml-auto" /> */}
            </DropdownMenuTrigger>
            <ProfileDropDown />
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NormalHeader;
