import Image from "next/image";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MessagesSquare,
  CheckSquare,
  FileBarChart2,
  ChevronUp,
  User2,
  ChevronDown,
  PlusCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileDropDown from "@/components/ProfileDropDown";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient, useSession } from "@/lib/auth-client";

// Menu items.
export const items = [
  {
    title: "Chat",
    url: "/dashboard",
    icon: MessagesSquare,
  },

  {
    title: "Reports",
    url: "#",
    icon: FileBarChart2,
  },

  {
    title: "Api Key",
    url: "/manage-api-key",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { data: currentUser } = useSession();

  return (
    <Sidebar className="  border-r-1 border-primary/70 ">
      <SidebarContent className="  bg-primary ">
        <SidebarGroup className="   border-0    h-full flex flex-col justify-between">
          <div>
            <SidebarGroupLabel>
              {" "}
              <div className="flex items-center gap-4 mt-20 mb-10 border-0 ">
                <div className=" flex items-center justify-center">
                  <Image
                    src="/HeaderLogo.png"
                    width="35"
                    height="35"
                    style={{ borderRadius: "20%" }}
                    alt="logo"
                    className="gradient-icon "
                  />{" "}
                </div>
                <span className="text-white font-semibold text-2xl ">
                  AIAssist
                </span>
              </div>
            </SidebarGroupLabel>

            <SidebarGroupContent className="mt-15 text-white/90 text-md">
              <SidebarMenu className="gap-y-1 ms-0">
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="hover:bg-white/30  py-3 px-3 me-2 hover:rounded-2xl  "
                  >
                    <SidebarMenuButton
                      asChild
                      className="  hover:text-white  !bg-transparent "
                    >
                      <a
                        href={item.url}
                        className="hover:bg-transparent   focus:text-white "
                      >
                        <item.icon className=" hover:text-white  !bg-transparent focus:text-white" />
                        <span className="  hover:text-white  focus:text-white">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
          <SidebarFooter
            className="mx-2  border-0 backdrop-blur-md mb-2    bg-white/5  rounded-2xl "
            // style={{ backgroundColor: "red" }}
          >
            <SidebarMenu
              className="   text-white   py-2 "
              // style={{ backgroundColor: "yellow" }}
            >
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="">
                    <SidebarMenuButton className="cursor-pointer  hover:bg-transparent hover:text-white focus:bg-transparent  ">
                      <Avatar className="mr-2 h-6 w-6 hover:text-white">
                        <AvatarImage
                          src={currentUser?.user.image || undefined}
                          alt={currentUser?.user.name}
                        />
                        <AvatarFallback className="hover:text-white">
                          {currentUser?.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {currentUser?.user.name}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <ProfileDropDown />
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
