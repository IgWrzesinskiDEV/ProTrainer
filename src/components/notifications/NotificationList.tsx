"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { INotification } from "@/lib/models/notification.model";
import { NotificationItem } from "./NotificationItem";
import { EmptyNotifications } from "./EmptyNotification";

interface NotificationListProps {
  notifications: INotification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
}: NotificationListProps) {
  // Sort notifications by date
  const sortedNotifications = [...notifications].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <motion.div
      className="overflow-y-auto scrollBarRectangle trainerDataSquareScrollbar"
      style={{ maxHeight: "min(calc(100vh - 180px), 350px)" }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.3 },
      }}
    >
      {notifications.length === 0 ? (
        <EmptyNotifications />
      ) : (
        <AnimatePresence>
          {sortedNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
            />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
