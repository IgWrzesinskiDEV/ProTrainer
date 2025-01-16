import { Schema, model, models } from "mongoose";

interface IEmail_Verification {
  email: string;
  token: string;
  expires_at: Date;
}

const EmailVerificationSchema = new Schema<IEmail_Verification>(
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
