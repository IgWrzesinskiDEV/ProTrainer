"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLink({
  href,
  text,
  fullWidth = false,
  onClick,
}: {
  href: string;
  text: string;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  const path = usePathname();
  const isActive = path.includes(href);

  return (
    <Link
      href={href}
      className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-md font-medium transition-colors duration-200 ${
        fullWidth ? "block w-full" : "inline-flex"
      } ${
        isActive
          ? "bg-[#2673e8] text-white"
          : "text-gray-300 hover:bg-[#3a3633] hover:text-white"
      }`}
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
