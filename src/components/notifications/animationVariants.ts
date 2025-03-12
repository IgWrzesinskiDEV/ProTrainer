// Animation variants for the notifications popup
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const popupVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { type: "spring", duration: 0.4 },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export const mobilePopupVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    y: "100%",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
};

export const DRAG_THRESHOLD = 0.5; // 50% of the way down will trigger close
