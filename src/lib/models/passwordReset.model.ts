import { Schema, model, models } from "mongoose";

interface IPassowordReset {
  email: string;
  token: string;
  expires_at: Date;
}

const IPassowordResetSchema = new Schema<IPassowordReset>(
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

export const PassowordReset =
  models?.PassowordReset || model("PassowordReset", IPassowordResetSchema);
