"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Calendar,
  MessageCircle,
  Clock,
  CheckCircle,
  Play,
  Star,
  ClipboardCheck,
} from "lucide-react";

const HeroSection = () => {
  return (
    <div className="  flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-12 lg:py-20  max-w-7xl gap-6 mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Your Smart AI Assistant, Always Ready.{" "}
        </h1>
        <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
          <Star className="w-4 h-4 fill-current" />
          <span>AI-Powered personal assistant</span>
        </div>

        <p className="text-white/90 text-md md:text-lg leading-relaxed mb-8">
          Manage tasks, book appointments, and stay organized — all through a
          smart conversation.{" "}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className=" cursor-pointer gradient-icon px-8 py-4 rounded-2xl font-semibold  ">
            Try the Assistant
          </button>
          <button className="cursor-pointer flex items-center gap-2 rounded-2xl  text-white border border-white/30 px-8 py-4 font-semibold bg-white/10 hover:bg-white/10 transition-all">
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </div>
      </div>

      {/* Right Section - Chat Interface */}
      <div
        className="w-full md:w-1/2"
        //    style={{ backgroundColor: "green" }}
      >
        <img src="/homepage.png" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
