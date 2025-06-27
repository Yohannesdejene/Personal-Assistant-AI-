"use client";
import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: "10:00 AM",
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
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}

            {isTyping && (
              <ChatMessage
                message=""
                isUser={false}
                timestamp="typing..."
                isTyping={true}
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
