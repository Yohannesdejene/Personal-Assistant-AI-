import Image from "next/image";
import {
  MessagesSquare,
  Calendar,
  CheckSquare,
  FileBarChart2,
  Settings,
  User2,
  ChevronUp,
} from "lucide-react";
import ProfileDropDown from "@/components/ProfileDropDown";
import Link from "next/link";

const items = [
  { title: "Chat", url: "#", icon: MessagesSquare },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Tasks", url: "#", icon: CheckSquare },
  { title: "Reports", url: "#", icon: FileBarChart2 },
  { title: "Settings", url: "#", icon: Settings },
];

const MobileSideBar = () => {
  return (
    <nav className="w-full h-full bg-primary text-white flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-4 mb-8 mt-4">
          <Image
            src="/HeaderLogo.png"
            width={35}
            height={35}
            style={{ borderRadius: "20%" }}
            alt="logo"
            className="gradient-icon"
          />
          <span className="text-white font-semibold text-2xl">AIAssist</span>
        </div>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.url}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 border-t border-white/20 pt-4">
        <div className="flex items-center gap-3 mb-2">
          <User2 />
          <span>Username</span>
          <ChevronUp className="ml-auto" />
        </div>
        <ProfileDropDown />
      </div>
    </nav>
  );
};

export default MobileSideBar;
