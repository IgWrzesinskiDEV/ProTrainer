"use client";

import type React from "react";

import { useState, useEffect, useRef, useTransition } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { INotification } from "@/lib/models/notification.model";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/actions/notification.action";
import { useClickOutside } from "@/hooks/useClickOutside";
import {
  backdropVariants,
  popupVariants,
  mobilePopupVariants,
  DRAG_THRESHOLD,
} from "./animationVariants";
import { NotificationButton } from "./NotificationButton";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationList } from "./NotificationList";
import { DragHandle } from "./DragHandle";

export default function NotificationPopup({
  notificationsData,
}: {
  notificationsData: INotification[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [notifications, setNotifications] =
    useState<INotification[]>(notificationsData);
  const [isMobile, setIsMobile] = useState(false);
  const [dragYProgress, setDragYProgress] = useState(0);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use custom hook for better click outside handling
  useClickOutside(popupRef, () => setIsOpen(false), [
    "button[aria-label='Notifications']",
  ]);

  //Prevent body scrolling when popup is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    startTransition(async () => {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      if (notifications.length > 0) {
        await markAllNotificationsAsRead(notifications[0].userId);
      }
    });
  };

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    startTransition(async () => {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
      await markNotificationAsRead(id);
    });
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 0) {
      const draggedPercentage =
        info.offset.y / (popupRef.current?.clientHeight || 1);
      setDragYProgress(draggedPercentage);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const draggedDistance = info.offset.y;
    const draggedPercentage =
      draggedDistance / (popupRef.current?.clientHeight || 1);

    if (draggedPercentage > DRAG_THRESHOLD) {
      setIsOpen(false);
    }

    setDragYProgress(0);
  };

  return (
    <div className="relative">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[2999] sm:hidden"
            onClick={() => setIsOpen(false)}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {/* Notification Button with Badge */}
      <NotificationButton
        isOpen={isOpen}
        unreadCount={unreadCount}
        onClick={handleButtonClick}
      />

      {/* Notifications Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            className={`
              sm:absolute sm:right-0 sm:mt-2 sm:w-80 md:w-96 
              fixed bottom-0 left-0 right-0 sm:left-auto sm:bottom-auto 
              bg-[#1a1a1a] shadow-xl z-[5000] 
              border border-[#333333] overflow-hidden
              ${isMobile ? "rounded-t-xl" : "rounded-lg"}
            `}
            variants={isMobile ? mobilePopupVariants : popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              y: isMobile ? dragYProgress * 100 : 0,
              opacity: isMobile ? 1 - dragYProgress * 0.5 : 1,
            }}
          >
            {/* Header */}
            <NotificationHeader
              unreadCount={unreadCount}
              notificationsCount={notifications.length}
              onMarkAllAsRead={markAllAsRead}
              onClose={() => setIsOpen(false)}
              isMobile={isMobile}
            />

            {/* Notification List */}
            <NotificationList
              notifications={notifications}
              onMarkAsRead={markAsRead}
            />

            {/* Mobile handle for dragging */}
            <DragHandle onDrag={handleDrag} onDragEnd={handleDragEnd} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
