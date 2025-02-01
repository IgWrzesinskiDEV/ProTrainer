import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  role: "user" | "coach" | "admin";
  profileDetails: {
    fullName?: string;
    bio?: string;
    avatarFileName?: string;
  };
  units: {
    weight: "kg" | "lbs";
    height: "cm" | "ft";
    bodyMeasurement: "cm" | "in";
  };
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
    password: { type: String, minlength: 6 },
    role: {
      type: String,
      default: "user",
      enum: ["user", "coach", "admin"],
      required: true,
    },
    profileDetails: {
      fullName: { type: String },
      bio: { type: String },
      avatarFileName: { type: String },
    },
    units: {
      weight: { type: String, default: "kg" },
      height: { type: String, default: "cm" },
      bodyMeasurement: { type: String, default: "cm" },
    },
  } as const,
  { _id: false }
);

export const User =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
