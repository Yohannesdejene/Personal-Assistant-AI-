"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

const ChatMessage = ({
  message,
  isUser,
  timestamp,
  isTyping = false,
}: ChatMessageProps) => {
  return (
    <div
      className={`flex gap-3 mb-6 animate-fade-in-up ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback
          className={`text-xs font-medium ${
            isUser
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
        >
          {isUser ? "You" : "AI"}
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex flex-col max-w-xs sm:max-w-sm md:max-w-md ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? "bg-white text-gray-900 rounded-br-md"
              : "bg-purple-50 text-gray-900 rounded-bl-md border border-purple-100"
          }`}
        >
          {isTyping ? (
            <div className="typing-indicator py-1">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message}</p>
          )}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
