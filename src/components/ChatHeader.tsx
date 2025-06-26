"use client";

import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500 rounded-full">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">ChatBot</h1>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <div className="relative">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
            You
          </AvatarFallback>
        </Avatar>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">3</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
