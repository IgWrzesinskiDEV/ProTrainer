import { Schema, model, models } from "mongoose";

interface IEmailVerification {
  email: string;
  token: string;
  expires_at: Date;
}

const EmailVerificationSchema = new Schema<IEmailVerification>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const EmailVerification =
  models?.EmailVerification ||
  model("EmailVerification", EmailVerificationSchema);
