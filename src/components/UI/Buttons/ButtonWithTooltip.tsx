import type React from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonWithTooltipProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipText: string;
  children: React.ReactNode;
}

export default function ButtonWithTooltip({
  tooltipText,
  children,
  className = "",
  ...props
}: ButtonWithTooltipProps) {
  return (
    <div className="relative group">
      <button className={`${className}`} {...props}>
        {children}
      </button>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          <div className="relative">
            {tooltipText}
            <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-2 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
