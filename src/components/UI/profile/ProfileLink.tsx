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
  console.log(path);
  return (
    <Link
      href={href}
      className={`px-2 py-2 bg-blue-500  rounded-t-xl     block hover:bg-blue-600 shadow-xl transition-colors duration-300 ${
        path === href ? "opacity-100" : "opacity-60"
      }`}
    >
      {text}
    </Link>
  );
}
