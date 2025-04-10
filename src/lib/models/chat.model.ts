// models/Chat.js
// import mongoose from "mongoose";

// const ChatSchema = new mongoose.Schema({
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // trainer & client
// }, { timestamps: true });

// export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

import { Schema, model, models } from "mongoose";

export interface IChat {
  _id: string; // chatId
  participants: string[]; // trainer & client
}

const ChatSchema = new Schema<IChat>(
  {
    _id: { type: String, required: true }, // chatId
    participants: [{ type: String, ref: "User", required: true }], // trainer & client
  },
  { timestamps: true, _id: false }
);

export const Chat = models?.Chat || model("Chat", ChatSchema);
