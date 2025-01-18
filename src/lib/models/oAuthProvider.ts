import { Schema, model, models } from "mongoose";

export interface IoAuthAccount {
  userId: string;
  provider: string;
  email: string;
  providerUserId: string;
  accessToken: string;
  refreshToken?: string | null;
  expires_at?: Date;
}

const OAuthAccountSchema = new Schema<IoAuthAccount>(
  {
    userId: { type: String, required: true, ref: "User" },
    email: { type: String, required: true },
    provider: { type: String, required: true },
    providerUserId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    expires_at: { type: Date },
  },
  { timestamps: true }
);

export const OAuthAccount =
  models?.OAuthAccount || model("OAuthAccount", OAuthAccountSchema);
