"use client";
import { ReactNode } from "react";
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
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">{Icon}</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        </div>
        {additionaTitleComponent}
      </div>
      {children}
    </motion.div>
  );
}
