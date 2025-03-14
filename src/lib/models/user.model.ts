import mongoose, { Schema } from "mongoose";
import {
  ITrainerDetails,
  TrainerAdditionalDataHeadingType,
} from "@/interfaces/trainers/ITrainer";
import {
  profileDetailsInterface,
  profileInformationInterface,
  unitsInterface,
  userSex,
} from "@/interfaces/user/IUser";
export enum IUserRole {
  CLIENT = "CLIENT",
  TRAINER = "TRAINER",
  ADMIN = "ADMIN",
}

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  role: IUserRole;
  currentTrainer?: string;
  plansIds?: string[];
  profileDetails: profileDetailsInterface;
  profileInformation?: profileInformationInterface;
  trainerDetails?: ITrainerDetails;
  units: unitsInterface;

  notifications: string[];
}

const trainerDetailsSchema = new Schema(
  {
    clients: {
      type: [String],
      default: undefined,
    },
    clientsInvites: {
      type: [String],

      default: undefined,
    },
    socialAndExpiriance: {
      specialization: { type: String },
      experience: { type: String },
      workingModes: {
        onSite: { type: Boolean, default: false },
        online: { type: Boolean, default: false },
      },
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        whatsapp: { type: String },
      },
    },

    [TrainerAdditionalDataHeadingType.Certifications]: {
      type: [String],
      default: undefined,
    },
    [TrainerAdditionalDataHeadingType.Services]: {
      type: [String],
      default: undefined,
    },
    [TrainerAdditionalDataHeadingType.Education]: {
      type: [String],
      default: undefined,
    },
    [TrainerAdditionalDataHeadingType.Languages]: {
      type: [String],
      default: undefined,
    },
  } as const,
  { _id: false }
);

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
      default: IUserRole.CLIENT,
      enum: Object.values(IUserRole),
      required: true,
    },
    currentTrainer: { type: String },
    plansIds: { type: [String], default: undefined },
    profileDetails: {
      fullName: { type: String },
      bio: { type: String },
      avatarFileName: { type: String },
    },
    profileInformation: {
      height: { type: Number },
      sex: {
        type: String,
        default: userSex.MALE,
        enum: Object.values(userSex),
      },
      age: { type: Number },
    },
    trainerDetails: trainerDetailsSchema,
    units: {
      weight: { type: String, default: "kg" },
      height: { type: String, default: "cm" },
      bodyMeasurement: { type: String, default: "cm" },
      distance: { type: String, default: "km" },
    },
    notifications: [{ type: String, ref: "Notification" }], // 🔔 Store notification IDs here
  } as const,
  { _id: false }
);

export const User =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
