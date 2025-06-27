import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
const ProfileDropDown = () => {
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
        <DropdownMenuItem className="cursor-pointer hover:text-black !hover:bg-white/20 focus:bg-white/20 rounded ps-5">
          <Link href="#">
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </div>
  );
};
export default ProfileDropDown;
