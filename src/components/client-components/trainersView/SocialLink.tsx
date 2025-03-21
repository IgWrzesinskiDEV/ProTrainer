import type React from "react";
import { LuExternalLink } from "react-icons/lu";

export default function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label?: string;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl 
                bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 
                transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
      aria-label={label || "Social media link"}
    >
      <span className="text-lg sm:text-xl">{icon}</span>
      <LuExternalLink
        size={14}
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 
                   transition-transform duration-300"
      />
    </a>
  );
}
