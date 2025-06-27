"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-5 md:px-30 py-5  border-b border-white/20 bg-white/15">
      <div className="flex items-center gap-3">
        <div className=" flex items-center justify-center">
          <Image
            src="/HeaderLogo.png"
            width="35"
            height="35"
            style={{ borderRadius: "50%" }}
            alt="logo"
            className="gradient-icon "
          />{" "}
        </div>
        <span className="text-white font-semibold text-lg ">AIAssist</span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a
          href="#"
          className="text-white/90 hover:text-white transition-colors text-sm"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("features")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-white/90 hover:text-white transition-colors text-sm"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("how-it-works")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          How It Works
        </a>
        {/* <a
          href="#"
          className="text-white/90 hover:text-white transition-colors text-sm"
        >
          Pricing
        </a> */}
        <button className="cursor-pointer  rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 text-white px-5 py-2  text-sm transition-all hover:scale-105">
          Get Started
        </button>
      </nav>
      <button className="flex md:hidden cursor-pointer rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 text-white px-5 py-2 text-sm transition-all hover:scale-105">
        Get Started
      </button>
    </header>
  );
};

export default Header;
