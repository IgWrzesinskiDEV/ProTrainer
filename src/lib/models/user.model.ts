import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  role: "USER" | "TRAINER" | "ADMIN";
  currentTrainer?: string;
  profileDetails: {
    fullName?: string;
    bio?: string;
    avatarFileName?: string;
  };
  trainerDetails?: {
    clients?: string[] | undefined;
    specialization?: string;
    experience?: string;
    education?: string;
    languages?: string[] | undefined;
    services?: string[] | undefined;

  };
  units: {
    weight: "kg" | "lbs";
    height: "cm" | "ft";
    bodyMeasurement: "cm" | "in";
  };
}
const trainerDetailsSchema = new Schema({
  clients: {
    type: [String],
    default: undefined
  },
  specialization: { type: String },
  experience: { type: String },
  education: { type: String },
  languages: {
    type: [String],
    default: undefined
  },
  services: {
    type: [String],
    default: undefined
  }
})

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
      default: "USER",
      enum: ["USER", "TRAINER", "ADMIN"],
      required: true,
    },
    currentTrainer: { type: String },
    profileDetails: {
      fullName: { type: String },
      bio: { type: String },
      avatarFileName: { type: String },
    },
    trainerDetails: trainerDetailsSchema,
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
