"use client";
import { useState, useRef, useEffect } from "react";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImSpinner2 } from "react-icons/im"; // Spinner icon
import { useGoogleCalendarAccess } from "@/hooks/useGoogleCalendarAccess";
import { useCompletion } from "@ai-sdk/react";
import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { ConsoleLogWriter } from "drizzle-orm";
const starterMessage = {
  content: "How can I help you today?",
  parts: [{ type: "text", text: "How can I help you today" }],

  role: "assistant",
  createdAt: new Date(), // or a fixed date if you want
};

const ChatInterface = () => {
  const { handleCalendarAccess, loading, setLoading } =
    useGoogleCalendarAccess();

  const [error, setError] = useState(null);
  const errorAppendedRef = useRef(false);
  const { completion, complete } = useCompletion({
    api: "/api/ai/completion",
  });
  const { messages, input, setInput, append, status } = useChat({
    api: "/api/ai/chat",
    onError: async (error?: any) => {
      console.log("error", error);
      // let errorMessage = "❌ Something went wrong.";
      let errorMessage = "";
      try {
        if (error?.response) {
          errorMessage = `❌ ${error}`;
        } else if (error?.message) {
          // const data = JSON.parse(error?.message);
          errorMessage = `❌ ${error?.message?.toString()}`;
        }
      } catch (e) {
        console.log("e", e);
        errorMessage = "❌ Failed to read error message.";
      }

      // Optional: show toast, alert, or append to chat
      if (!errorAppendedRef.current) {
        append({
          id: Date.now().toString(),
          role: "assistant",
          content: errorMessage,
        });
        errorAppendedRef.current = true;
      }
    },
    onFinish: (data) => {
      errorAppendedRef.current = false; // reset on success so next errors can show again
    },
  });

  console.log("messages-messages", messages);

  console.log("status", status);

  useEffect(() => {
    // Fetch the check-api-key API on mount
    const fetchCheckApiKey = async () => {
      try {
        const response = await fetch("/api/api-key/check-api-key");
        const data = await response.json();
        // Check the status code
        if (response.status === 200 && data.valid) {
          // API key is valid
          console.log("API key is valid!");
        } else {
          setError(data?.error);
        }
      } catch (error) {
        console.error("Failed to fetch check-api-key", error);
      }
    };
    fetchCheckApiKey();
  }, []);

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

  console.log("message-message", messages);

  return (
    <div className="relative flex flex-col h-screen w-full gap-0 bg-primary  mx-auto shadow-lg">
      <div className="absolute top-0 w-full bg-primary border-b-1 border-primary/70 z-10">
        <ChatHeader />
      </div>

      <div className="flex-1 bottom-18   pt-40  overflow-y-auto bg-primary relative border-0 ">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="p-4 space-y-4">
            <div style={{ color: "white" }}>
              {[starterMessage, ...messages].map((message: any, index) => (
                <div key={index}>
                  <ChatMessage
                    message={message}
                    isUser={message?.role === "user"}
                    timestamp={message?.createdAt}
                    isTyping={isTyping}
                  />
                </div>
              ))}
              {/* <button onClick={handleCalendarAccess}>
                Give google calender access
              </button> */}
            </div>
          </div>

          {error && (
            <h6 className="ms-5 text-red-500">
              {error} go to{" "}
              <Link href="/manage-api-key" className="text-blue-500 ">
                {" "}
                Manage api key
              </Link>
            </h6>
          )}
        </ScrollArea>
      </div>

      <div className="absolute bottom-5 w-full  bg-primary border-t-1 border-primary/10  ">
        {/* <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} /> */}
        <ChatInput
          onSendMessage={async (message) => {
            setInput(message);
            await append({ content: message, role: "user" });
            // await append({ content: "thinking", role: "assistant" });
          }}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
