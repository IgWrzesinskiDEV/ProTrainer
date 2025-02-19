"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuDumbbell, LuRuler, LuUser } from "react-icons/lu";

export default function ClientNav({ clientId }: { clientId: string }) {
  const activeTab = usePathname().split("/").pop();
  return (
    <nav className="flex mb-8">
      <Link
        href={`/dashboard/clients/${clientId}/info`}
        className={`flex items-center px-4 py-2 rounded-tl-lg ${
          activeTab === "info"
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        <LuUser className="w-5 h-5 mr-2" />
        Basic Info
      </Link>
      <Link
        href={`/dashboard/clients/${clientId}/measurements`}
        className={`flex items-center px-4 py-2 ${
          activeTab === "measurements"
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        <LuRuler className="w-5 h-5 mr-2" />
        Measurements
      </Link>
      <Link
        href={`/dashboard/clients/${clientId}/plans`}
        className={`flex items-center px-4 py-2 rounded-tr-lg ${
          activeTab === "plans"
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        <LuDumbbell className="w-5 h-5 mr-2" />
        Workout Plans
      </Link>
    </nav>
  );
}
