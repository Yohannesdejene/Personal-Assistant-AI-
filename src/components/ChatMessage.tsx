"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient, useSession } from "@/lib/auth-client";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
  type?: "text" | "component";
  component?: React.ReactNode; // Optional, for custom component
}

const ChatMessage = ({
  message,
  isUser,
  timestamp,
  isTyping = false,
  type,
  component,
}: ChatMessageProps) => {
  const { data: currentUser } = useSession();
  return (
    <div
      className={`flex gap-3 mb-6 animate-fade-in-up ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback
          className={`text-xs font-medium ${
            isUser ? "bg-white text-black" : "bg-white text-gray-600 border-0"
          }`}
        >
          {isUser ? (
            <>
              <div style={{ backgroundColor: "green" }}>
                <img
                  src={currentUser?.user.image || ""}
                  alt=""
                  // style={{ width: "30px", height: "40px" }}
                />{" "}
              </div>
            </>
          ) : (
            <Image
              src="/HeaderLogo.png"
              width="35"
              height="35"
              style={{ borderRadius: "20%" }}
              alt="logo"
              className="gradient-icon "
            />
          )}
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
              ? " text-white   backdrop-blur-md bg-white/5 border-1 border-white/10 rounded-br-md "
              : " backdrop-blur-md   bg-white/10  text-white rounded-bl-md  border-1 border-white/10"
          }`}
        >
          {isTyping ? (
            <div className="typing-indicator py-1">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          ) : type == "component" && (
              <div className="">{/* {component} hey this is component5 */}</div>
            ) ? (
            <>
              <div className=" p-3 rounded-2xl"> {component}</div>
            </>
          ) : (
            // component
            <p className="text-sm leading-relaxed">{message}</p>
          )}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
