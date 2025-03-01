"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuDumbbell, LuRuler, LuUser } from "react-icons/lu";
import { motion } from "framer-motion";

export default function ClientNav({ clientId }: { clientId: string }) {
  const activeTab = usePathname().split("/").pop();

  const navItems = [
    {
      href: `/dashboard/clients/${clientId}/info`,
      icon: LuUser,
      label: "Basic Info",
      isActive: activeTab === "info",
      className: "rounded-l-xl",
    },
    {
      href: `/dashboard/clients/${clientId}/measurements`,
      icon: LuRuler,
      label: "Measurements",
      isActive: activeTab === "measurements",
    },
    {
      href: `/dashboard/clients/${clientId}/plans`,
      icon: LuDumbbell,
      label: "Workout Plans",
      isActive: activeTab === "plans",
      className: "rounded-r-xl",
    },
  ];

  return (
    <nav className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-0">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            relative flex items-center gap-2 flex-1
            px-4 py-3 sm:py-4 text-sm sm:text-base
            transition-all duration-300
            ${item.className || ""}
            ${
              item.isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
            }
          `}
        >
          <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">{item.label}</span>
          <span className="sm:hidden">{item.label.split(" ")[0]}</span>

          {item.isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-blue-500 -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
