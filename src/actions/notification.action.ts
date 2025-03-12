"use server";

import {
  Notification,
  NotificationType,
} from "@/lib/models/notification.model";
import { User } from "@/lib/models/user.model";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";

async function createNotification(
  userId: string,
  message: string,
  type: NotificationType
) {
  const notification = new Notification({
    _id: generateIdFromEntropySize(24),
    userId,
    message,
    type,
  });
  await notification.save();
  await User.findByIdAndUpdate(userId, {
    $push: { notifications: notification._id },
  });
}

export async function sentNotification(
  userId: string,
  senderName: string,
  type: NotificationType
) {
  let message = "";

  switch (type) {
    case NotificationType.INVITATION_ACCEPTED:
      message = `${senderName} has accepted your invitation.`;
      break;
    case NotificationType.INVITATION_REJECTED:
      message = `${senderName} has rejected your invitation.`;
      break;
    case NotificationType.INVITATION_SENT:
      message = `${senderName} has sent you an invitation.`;
      break;
    case NotificationType.NEW_PLAN:
      message = `Your trainer has assigned you a new workout plan.`;
      break;
    case NotificationType.NEW_WEEK:
      message = `Your new training week is ready.`;
      break;
    default:
      throw new Error("Invalid notification type");
  }

  await createNotification(userId, message, type);
}

export async function markNotificationAsRead(notificationId: string) {
  await Notification.findByIdAndUpdate(notificationId, { isRead: true });
  revalidatePath(`/dashboard`, "layout");
}

export async function markAllNotificationsAsRead(userId: string) {
  await Notification.updateMany({ userId }, { isRead: true });
  revalidatePath(`/dashboard`, "layout");
}
