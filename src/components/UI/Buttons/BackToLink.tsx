import { cn } from "@/lib/twMergeUtill";
import Link from "next/link";
import { ReactNode } from "react";
import { AiOutlineRollback } from "react-icons/ai";

export default function BackToLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode | string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 text-blue-500 ", className)}
    >
      {children} <AiOutlineRollback className="text-2xl text-yellow-500" />
    </Link>
  );
}
