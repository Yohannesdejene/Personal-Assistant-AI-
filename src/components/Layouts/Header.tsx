import Image from "next/image";
import { Ellipsis } from "lucide-react";

const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mt-20 mb-10 border-0 ">
        <div className=" flex gap-1 items-center justify-center">
          <Image
            src="/HeaderLogo.png"
            width="35"
            height="35"
            style={{ borderRadius: "20%" }}
            alt="logo"
            className="gradient-icon "
          />{" "}
          <div className="flex flex-col">
            <span className="text-white font-semibold text-2xl ">AIAssist</span>
            <span className="text-white/30 font-semibold text-2xl ">
              Ready to help with your productivity
            </span>
          </div>
        </div>
        <div>
          <Ellipsis />
        </div>
      </div>
    </div>
  );
};

export default Header;
