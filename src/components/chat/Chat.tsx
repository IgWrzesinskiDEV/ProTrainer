"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import ProfileAvatar from "../UI/ProfileAvatar";

interface Message {
  id?: string;
  sender: string;
  text: string;
  createdAt?: Date | string;
}

interface ChatProps {
  chatId: string;
  userId: string;
  messagesData: string;
  sessionId: string;
  trainerName?: string;
  clientName?: string;
  otherPersonAvatarFileName?: string;
  isTrainer?: boolean;
}

export default function Chat({
  chatId,
  userId,
  messagesData,
  sessionId,
  trainerName = "Trainer",
  clientName = "Client",
  otherPersonAvatarFileName,
  isTrainer = false,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const parsed = JSON.parse(messagesData);
    return parsed.map((msg: Message) => ({
      ...msg,
      id:
        msg.id ||
        `${msg.sender}-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}`,
      createdAt: msg.createdAt ? new Date(msg.createdAt) : new Date(),
    }));
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [localMessageIds, setLocalMessageIds] = useState<Set<string>>(
    new Set()
  );

  // The other person's name (if you're the trainer, it's the client, and vice versa)
  const otherPersonName = isTrainer ? clientName : trainerName;

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
      auth: { headers: { Authorization: `Bearer ${sessionId}` } },
    });

    const channel = pusher.subscribe(`private-chat-${chatId}`);
    channel.bind("new-message", (data: Message) => {
      // Only add the message if it's from another user
      // or if we don't have it in our local tracking set
      const messageId = data.id || `${data.sender}-${Date.now()}`;

      if (data.sender !== userId && data.sender !== undefined) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            ...data,
            id: messageId,
            createdAt: data.createdAt || new Date(),
          },
        ]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chatId, sessionId, userId, localMessageIds]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      // Generate a unique ID for this message
      const messageId = `${userId}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      // Add to tracking set to prevent duplicates
      setLocalMessageIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(messageId);
        return newSet;
      });

      // Create a new message object
      const newMessage = {
        id: messageId,
        sender: userId,
        text: input,
        createdAt: new Date(),
      };

      // Add message to local state immediately
      setMessages((prev) => [...prev, newMessage]);

      // Send to API
      await fetch("/api/messages/send", {
        method: "POST",
        body: JSON.stringify({
          chatId,
          senderId: userId,
          text: input,
          messageId, // Include the ID so the server can use it
        }),
      });
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full  h-[calc(100vh-180px)]  sm:landscape:h-[calc(150vh-180px)] lg:landscape:h-[calc(100vh-180px)] flex flex-col bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-[#252525] border-b border-[#333] py-3 sm:py-4 px-3 sm:px-4">
        <div className="text-white flex items-center gap-2">
          <div className="bg-blue-600 rounded-full flex items-center justify-center text-white">
            <ProfileAvatar size="small" fileName={otherPersonAvatarFileName} />
          </div>
          <span className="font-semibold text-sm sm:text-base">
            {otherPersonName}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollAreaRef}
        className="flex-1 p-2 sm:p-4 overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#444 #1e1e1e" }}
      >
        <div className="space-y-3 sm:space-y-4">
          {messages.map((msg, i) => {
            const isUser = msg.sender === userId;
            console.log("msg.sender", msg.sender, "userId", userId);
            const senderName = isUser
              ? isTrainer
                ? trainerName
                : clientName
              : isTrainer
              ? clientName
              : trainerName;

            return (
              <div
                key={msg.id || i}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 sm:px-4 py-2 ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-[#333] text-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="font-semibold text-xs sm:text-sm">
                      {isUser ? "You" : senderName}
                    </span>
                    {msg.createdAt && (
                      <span className="text-[10px] sm:text-xs opacity-70">
                        {formatTime(msg.createdAt)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm break-words">{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input Area */}
      <div className="p-2 sm:p-4 border-t border-[#333] bg-[#252525]">
        <div className="flex gap-1.5 sm:gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-[#1a1a1a] border border-[#444] rounded-md px-2 sm:px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className={`px-2 sm:px-4 py-2 rounded-md bg-blue-600 text-white flex items-center justify-center ${
              isLoading || !input.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
