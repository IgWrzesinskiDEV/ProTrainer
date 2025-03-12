"use client";

import { motion } from "framer-motion";

interface NotificationHeaderProps {
  unreadCount: number;
  notificationsCount: number;
  onMarkAllAsRead: () => void;
  onClose: () => void;
  isMobile: boolean;
}

export function NotificationHeader({
  unreadCount,
  notificationsCount,
  onMarkAllAsRead,
  onClose,
  isMobile,
}: NotificationHeaderProps) {
  return (
    <motion.div
      className="px-4 py-3 border-b border-[#333333] flex items-center justify-between top-0 bg-[#1a1a1a] z-10"
      initial={{ opacity: 0, y: -5 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.1, duration: 0.2 },
      }}
    >
      <div>
        <h3 className="text-base sm:text-lg font-medium text-white">
          Notifications
        </h3>
        <p className="text-xs text-gray-400">
          {unreadCount === 0
            ? "No new notifications"
            : `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {unreadCount > 0 && notificationsCount > 0 && (
          <motion.button
            onClick={onMarkAllAsRead}
            className="text-xs text-[#2e82ff] hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-[#2a2522]/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mark all as read
          </motion.button>
        )}
        {isMobile && (
          <motion.button
            className="text-gray-400 hover:text-white p-1"
            onClick={onClose}
            aria-label="Close notifications"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
