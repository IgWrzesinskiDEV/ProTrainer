import { Schema, model, models } from "mongoose";

interface IKey {
  _id: string;
  user_id: Schema.Types.ObjectId;
  hashed_password: string;
}

const keySchema = new Schema<IKey>({
  _id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  hashed_password: String,
});

export const Key = models.Session || model("Key", keySchema);
