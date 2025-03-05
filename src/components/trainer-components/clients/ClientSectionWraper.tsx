"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function ClientSectionWraper({
  children,
  title,
  Icon,
  additionaTitleComponent,
}: {
  children: ReactNode;
  title: string;
  Icon: ReactNode;
  additionaTitleComponent?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 sm:space-y-4 md:space-y-6"
    >
      {/* Header Section - Stacked on mobile, side by side on larger screens */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 ">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-blue-500/10">
            {Icon}
          </div>
          <h2 className="text-xl sm:text-xl  md:text-3xl font-bold text-white">
            {title}
          </h2>
        </div>
        {additionaTitleComponent && (
          <div className="mt-2 sm:mt-0">{additionaTitleComponent}</div>
        )}
      </div>
      {children}
    </motion.div>
  );
}
