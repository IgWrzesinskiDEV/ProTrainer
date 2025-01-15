import { Schema, model, models } from "mongoose";

interface ISession {
  _id: string;
  user_id: string;
  expires_at: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    _id: { type: String, required: true },
    user_id: {
      type: String,

      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  } as const,
  { _id: false }
);

export const Session = models.Session || model("Session", sessionSchema);
