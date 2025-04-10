import { Schema, model, models } from "mongoose";

export interface IMessage {
  _id: string; // messageId
  chatId: string; // reference to the chat
  sender: string; // reference to the user who sent the message
  text: string; // message content
}

const MessageSchema = new Schema<IMessage>(
  {
    _id: { type: String, required: true }, // chatId
    chatId: { type: String, required: true, ref: "Chat" },
    sender: { type: String, required: true, ref: "User" },
    text: String,
  },
  { timestamps: true, _id: false } // Disable automatic _id generation
);

export const Message = models?.Message || model("Message", MessageSchema);
