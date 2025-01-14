import mongoose, { Schema } from "mongoose";

export interface IUser {
  userName: string;
  email: string;
  password: string;
  role: "user" | "coach" | "admin";
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    default: "user",
    enum: ["user", "coach", "admin"],
    required: true,
  },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
