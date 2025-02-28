"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ProfileLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const path = usePathname();

  return (
    // <Link
    //   href={`/dashboard/${tab.toLowerCase()}`}
    //   key={tab}
    //   className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
    //     "activeTab" === tab.toLowerCase()
    //       ? "bg-[#2673e8] text-white"
    //       : "text-gray-300 hover:bg-[#3a3633] hover:text-white"
    //   }`}
    // >
    //   {tab}
    // </Link>
    <Link
      href={href}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
        path.includes(href)
          ? "bg-[#2673e8] text-white"
          : "text-gray-300 hover:bg-[#3a3633] hover:text-white"
      }`}
    >
      {text}
    </Link>
  );
}
