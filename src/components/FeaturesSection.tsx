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
  RefreshCcw,
  Bell,
  ChartLine,
  Settings,
  MessagesSquare,
  Brain,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <div id="features" className="w-full px-6 md:px-10 py-0 text-center">
      {" "}
      <h3 className="text-2xl font-bold text-white mb-2">
        Powerful Features
      </h3>{" "}
      <h6 className="text-lg  mb-8 ">
        Everything you need to stay organized and productive, powered by
        advanced AI.{" "}
      </h6>
      <div className="grid  md:grid-cols-3 gap-8 px-2 ">
        {" "}
        <div className="text-center   bg-white/10   p-8  rounded-2xl">
          {" "}
          <div className="w-12 h-12   gradient-icon 0 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {" "}
            <MessagesSquare className="w-6 h-6 text-white" />{" "}
          </div>{" "}
          <h4 className="text-white font-semibold mb-2">
            Chat-First Management
          </h4>{" "}
          <p className="text-white/80 text-sm">
            Manage all your tasks through natural conversation. No complex
            interfaces, just talk
          </p>{" "}
        </div>{" "}
        <div className="text-center  backdrop-blur-md bg-white/10   p-8  rounded-2xl">
          {" "}
          <div className="w-12 h-12  gradient-icon  rounded-2xl flex items-center justify-center mx-auto mb-4">
            {" "}
            <Calendar className="w-6 h-6 text-white" />{" "}
          </div>{" "}
          <h4 className="text-white font-semibold mb-2">
            Google Calendar Sync
          </h4>{" "}
          <p className="text-white/80 text-sm">
            Seamlessly integrate with Google Calendar for perfect scheduling and
            organization
          </p>{" "}
        </div>{" "}
        <div className="text-center backdrop-blur-md bg-white/10   p-8 rounded-2xl">
          {" "}
          <div className="w-12 h-12  gradient-icon  rounded-2xl flex items-center justify-center mx-auto mb-4">
            {" "}
            <Bell className="w-6 h-6 text-white" />{" "}
          </div>{" "}
          <h4 className="text-white font-semibold mb-2">Smart Reminders</h4>{" "}
          <p className="text-white/80 text-sm">
            Get intelligent reminders at the perfect time, tailored to your
            schedule and preferences{" "}
          </p>{" "}
        </div>{" "}
        <div className="text-center backdrop-blur-md bg-white/10   p-8 rounded-2xl">
          {" "}
          <div className="w-12 h-12  gradient-icon  rounded-2xl flex items-center justify-center mx-auto mb-4">
            {" "}
            <ChartLine className="w-6 h-6 text-white" />{" "}
          </div>{" "}
          <h4 className="text-white font-semibold mb-2"> Daily AI Reports</h4>{" "}
          <p className="text-white/80 text-sm">
            Receive personalized daily insights and productivity reports powered
            by AI.{" "}
          </p>{" "}
        </div>{" "}
        <div className="text-center backdrop-blur-md bg-white/10   p-8 rounded-2xl">
          {" "}
          <div className="w-12 h-12  gradient-icon rounded-2xl flex items-center justify-center mx-auto mb-4">
            {" "}
            <ChartLine className="w-6 h-6 text-white" />{" "}
          </div>{" "}
          <h4 className="text-white font-semibold mb-2"> Secure Cloud Sync</h4>{" "}
          <p className="text-white/80 text-sm">
            Your data is safely synced across all devices with enterprise-grade
            security.
          </p>{" "}
        </div>{" "}
        <div className="text-center backdrop-blur-md bg-white/10   p-8 rounded-2xl">
          {" "}
          <div className="w-12 h-12  gradient-icon  rounded-2xl flex items-center justify-center mx-auto mb-4">
            {" "}
            <Brain className="w-6 h-6 text-white" />{" "}
          </div>{" "}
          <h4 className="text-white font-semibold mb-2">AI Learning</h4>{" "}
          <p className="text-white/80 text-sm">
            The assistant learns your patterns and preferences to serve you
            better over time.
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default FeaturesSection;
