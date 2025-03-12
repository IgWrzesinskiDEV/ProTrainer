import mongoose, { Schema } from "mongoose";

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
  createdAt: { type: Date, default: Date.now },
});

export const Notification =
  mongoose.models?.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);
