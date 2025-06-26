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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Chat",
    url: "#",
    icon: MessagesSquare,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "#",
    icon: CheckSquare,
  },
  {
    title: "Reports",
    url: "#",
    icon: FileBarChart2,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-0 border-white/10 ">
      <SidebarContent className=" gradient-primary  ">
        <SidebarGroup className="  backdrop-blur-md    bg-white/10 border-0    h-full flex flex-col justify-between">
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
                    <SidebarMenuButton className=" hover:bg-transparent focus:bg-transparent  ">
                      <User2 /> Username
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[200px] cursor-pointer backdrop-blur-md px-5 py-6  text-white rounded-2xl border-none    bg-white/10"
                  >
                    <DropdownMenuItem className="cursor-pointer !hover:bg-white/20 focus:bg-white/20 rounded ps-5">
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer !hover:bg-white/20 focus:bg-white/20 rounded ps-5">
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:text-black !hover:bg-white/20 focus:bg-white/20 rounded ps-5">
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
