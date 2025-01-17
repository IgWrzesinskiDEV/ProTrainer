import { Schema, model, models } from "mongoose";

interface IPasswordReset {
  email: string;
  token: string;
  expires_at: Date;
}

const PasswordResetSchema = new Schema<IPasswordReset>(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const PasswordReset =
  models?.PasswordReset || model("PasswordReset", PasswordResetSchema);
