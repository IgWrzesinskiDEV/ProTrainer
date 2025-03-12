"use client";

import { motion } from "framer-motion";

export function EmptyNotifications() {
  return (
    <motion.div
      className="py-12 px-4 text-center overflow-hidden"
      // initial={{ opacity: 0, scale: 0.9 }}
      // animate={{
      //   opacity: 1,
      //   scale: 1,
      //   transition: {
      //     delay: 0.3,
      //     type: "spring",
      //     stiffness: 300,
      //     damping: 20,
      //   },
      // }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mx-auto text-gray-500 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { delay: 0.3, duration: 0.3 },
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </motion.svg>
      <motion.p
        className="text-gray-400 font-medium "
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.3, duration: 0.3 },
        }}
      >
        No notifications yet
      </motion.p>
      <motion.p
        className="text-gray-500 text-sm mt-1"
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.3, duration: 0.3 },
        }}
      >
        We&apos;ll notify you when something happens
      </motion.p>
    </motion.div>
  );
}
