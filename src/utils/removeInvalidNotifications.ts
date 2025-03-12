import { User } from "@/lib/models/user.model";
import { Notification } from "@/lib/models/notification.model";

export async function removeInvalidNotificationIds() {
  console.log("Running notification cleanup...");

  const users = await User.find({}); // Fetch all users

  for (const user of users) {
    // Get all valid notifications that still exist
    const validNotifications = await Notification.find({
      _id: { $in: user.notifications },
    });
    const validNotificationIds = validNotifications.map((n) =>
      n._id.toString()
    );

    // If there are invalid (deleted) notifications, update the user
    if (validNotificationIds.length !== user.notifications.length) {
      await User.findByIdAndUpdate(user._id, {
        notifications: validNotificationIds,
      });
      console.log(`Cleaned up notifications for user ${user._id}`);
    }
  }
}
