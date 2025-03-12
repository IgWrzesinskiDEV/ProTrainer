import { Notification } from "@/lib/models/notification.model";
import { User } from "@/lib/models/user.model";

export default async function getNotificationsByUserId(userId?: string) {
  try {
    if (!userId) {
      console.log("User ID is required");
      throw new Error("User ID is required");
    }
    const notificationsIds = await User.findById(userId, "notifications");
    if (!notificationsIds) {
      console.log("Notifications not found");
      throw new Error("Notifications not found");
    }
    const notifications = await Notification.find({
      _id: { $in: notificationsIds.notifications },
    });

    return notifications;
  } catch {
    return [];
  }
}
