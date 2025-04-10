"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

interface Message {
  sender: string;
  text: string;
}
export default function Chat({
  chatId,
  userId,
  messagesData,
  sessionId,
}: {
  chatId: string;
  userId: string;
  messagesData: string;
  sessionId: string;
}) {
  const [messages, setMessages] = useState<Message[]>(JSON.parse(messagesData));
  const [input, setInput] = useState("");

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
      auth: { headers: { Authorization: `Bearer ${sessionId}` } }, // replace with real auth
    });

    const channel = pusher.subscribe(`private-chat-${chatId}`);
    channel.bind("new-message", (data: Message) => {
      setMessages((prev: Message[]) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chatId, sessionId]);

  const sendMessage = async () => {
    await fetch("/api/messages/send", {
      method: "POST",
      body: JSON.stringify({ chatId, senderId: userId, text: input }),
    });
    setInput("");
  };
  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.sender === userId ? "You" : "Them"}:</strong>{" "}
            {msg.text}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-stone-700"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
