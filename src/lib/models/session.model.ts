import { Schema, model, models } from "mongoose";

interface ISession {
  user_id: Schema.Types.ObjectId;
  expires_at: Date;
}

const sessionSchema = new Schema<ISession>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

export const Session = models.Session || model("Session", sessionSchema);
