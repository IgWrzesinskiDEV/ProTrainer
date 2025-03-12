"use client";

import { motion, PanInfo } from "framer-motion";

interface DragHandleProps {
  onDrag: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
}

export function DragHandle({ onDrag, onDragEnd }: DragHandleProps) {
  return (
    <motion.div
      className="h-1.5 w-16 bg-gray-600 rounded-full mx-auto mt-2 mb-1 sm:hidden cursor-grab active:cursor-grabbing"
      initial={{ width: 16 }}
      animate={{ width: 64 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.7}
      dragMomentum={false}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    />
  );
}
