"use client";

import { motion } from "framer-motion";

interface NotificationButtonProps {
  isOpen: boolean;
  unreadCount: number;
  onClick: (e: React.MouseEvent) => void;
}

export function NotificationButton({
  isOpen,
  unreadCount,
  onClick,
}: NotificationButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative p-1.5 sm:p-2 rounded-full hover:bg-[#2a2522] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2e82ff]/50 active:scale-95"
      aria-label="Notifications"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 sm:h-6 sm:w-6 ${isOpen ? "text-[#2e82ff]" : "text-gray-300"} transition-colors duration-200`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={isOpen ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </motion.svg>

      {unreadCount > 0 && (
        <motion.span
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2e82ff] text-[10px] font-medium text-white ring-2 ring-[#1a1a1a]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 15,
            },
          }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </motion.span>
      )}
    </motion.button>
  );
}
