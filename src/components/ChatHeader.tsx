"use client";
import { useState } from "react";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
const ChatHeader = () => {
  const [goal, setGoal] = useState(350);

  return (
    <div className="flex items-center justify-between  p-4  backdrop-blur-md   bg-white/10  border-gray-200 shadow-sm">
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
        <div className=" flex gap-3 items-center justify-center">
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
          <div className="flex flex-col">
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
              <Avatar className="w-10 h-10">
                <AvatarFallback className=" text-gray-600 text-sm font-medium">
                  You
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

export default ChatHeader;
