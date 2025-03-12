"use client";

import { formatDistanceToNow } from "date-fns";
import type { INotification } from "@/lib/models/notification.model";
import getNotificationIcon from "./getNotificationIcon";

interface NotificationItemProps {
  notification: INotification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div
      onClick={() => {
        if (notification.isRead) return;
        onMarkAsRead(notification._id);
      }}
      className={`px-4 py-3 border-b border-[#333333] hover:bg-[#252525] transition-colors ${
        !notification.isRead ? "bg-[#1e2734] cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm ${!notification.isRead ? "font-medium text-white" : "text-gray-300"}`}
          >
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatTime(notification.createdAt)}
          </p>
        </div>
        {!notification.isRead && (
          <div className="flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-[#2e82ff] notification-dot" />
          </div>
        )}
      </div>
    </div>
  );
}
