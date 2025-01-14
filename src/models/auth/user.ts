import { IUser } from "@/interfaces/auth/IUser";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "user",
    enum: ["user", "coach", "admin"],
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
