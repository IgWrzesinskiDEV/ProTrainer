import { cn } from "@/lib/twMergeUtill";
import Link from "next/link";
import { ReactNode } from "react";

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
      className={cn(
        " flex items-center gap-2 px-4 py-2    rounded-lg  transition-all duration-150",
        className
      )}
    >
      {children}
    </Link>
  );
}
