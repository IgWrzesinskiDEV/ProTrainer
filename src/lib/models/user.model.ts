import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  emailVerified?: boolean;
  password: string;
  role: "user" | "coach" | "admin";
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      default: "user",
      enum: ["user", "coach", "admin"],
      required: true,
    },
  } as const,
  { _id: false }
);

export const User =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
