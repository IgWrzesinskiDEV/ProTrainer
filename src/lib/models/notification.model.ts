import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";

export enum NotificationType {
  INVITATION_ACCEPTED = "invitation_accepted",
  INVITATION_REJECTED = "invitation_rejected",
  INVITATION_SENT = "invitation_sent",
  NEW_PLAN = "new_plan",
  NEW_WEEK = "new_week",
}
export interface INotification {
  _id: string;
  userId: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
  message: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: NotificationType,
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: "120s" },
});

notificationSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await User.findByIdAndUpdate(doc.userId, {
        $pull: { notifications: doc._id }, // Remove notification ID from user's array
      });
      console.log(`Notification ${doc._id} removed from user ${doc.userId}`);
    } catch (error) {
      console.error("Error removing notification from user:", error);
    }
  }
});

export const Notification =
  mongoose.models?.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);
