"use client";
import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { requestGoogleCalenderEventAccess } from "@/lib/auth-client";
import { ImSpinner2 } from "react-icons/im"; // Spinner icon
import { useGoogleCalendarAccess } from "@/hooks/useGoogleCalendarAccess";

interface Message {
  id: string;
  text: any;
  isUser: boolean;
  timestamp: string;
  type?: "text" | "component";
  component?: React.ReactNode; // Optional, for custom component
}

const ChatInterface = () => {
  const { loading, handleCalendarAccess } = useGoogleCalendarAccess();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: "10:00 AM",
      type: "text",
    },
    {
      id: "1",
      text: "",
      isUser: false,
      timestamp: "10:00 AM",
      type: "component",
      component: (
        <div className="rounded-2xl bg-white/10 border border-white/20  p-4 flex flex-col md:flex-row items-center gap-4 shadow-md">
          <div className="flex-shrink-0">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <rect
                width="24"
                height="24"
                rx="6"
                fill="#2563eb"
                opacity="0.15"
              />
              <path
                d="M8 7V5m8 2V5m-9 4h10M5 9.5A2.5 2.5 0 0 1 7.5 7h9A2.5 2.5 0 0 1 19 9.5v7A2.5 2.5 0 0 1 16.5 19h-9A2.5 2.5 0 0 1 5 16.5v-7Z"
                stroke="#2563eb"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-base text-white mb-1">
              Calendar Permission Needed
            </h6>
            <p className="text-sm text-gray-200 mb-2">
              To make appointments or add events, please grant calendar access.
              You can revoke this permission at any time.
            </p>
            <div>
              {loading ? (
                <>
                  {" "}
                  Loading...
                  <ImSpinner2 className="animate-spin w-5 h-5 text-white" />
                </>
              ) : (
                <button
                  onClick={handleCalendarAccess}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Grant Google Calendar Access
                </button>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question! Let me think about that.",
      "I understand what you're asking. Here's what I think...",
      "Great point! I'd be happy to help you with that.",
      "Thank you for sharing that with me. Here's my response:",
      "I see what you mean. Let me provide some insight on this.",
      "That's a thoughtful question. Based on what you've told me...",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} You mentioned: "${userMessage}". How else can I assist you?`;
  };

  const handleSendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: getCurrentTime(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(messageText),
        isUser: false,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
  };

  return (
    <div className="relative flex flex-col h-screen w-full gap-0 bg-primary  mx-auto shadow-lg">
      <div className="absolute top-0 w-full bg-primary border-b-1 border-primary/70 z-10">
        <ChatHeader />
      </div>

      <div className="flex-1 bottom-18   pt-40  overflow-y-auto bg-primary relative border-0 ">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="p-4 space-y-4">
            {messages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
                type={message.type}
                component={message?.component}
              />
            ))}

            {isTyping && (
              <ChatMessage
                message=""
                isUser={false}
                timestamp="typing..."
                isTyping={true}
                type={"text"}
              />
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="absolute bottom-5 w-full  bg-primary border-t-1 border-primary/10  ">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatInterface;
