import type React from "react";
export default function SocialMediaInput({
  Icon,
  error,
  name,
  defaultValue,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 group-hover:text-blue-300 transition-all duration-300">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <label
            htmlFor={name}
            className="block text-xs sm:text-sm font-medium text-slate-300 capitalize mb-0.5 sm:mb-1"
          >
            {name}
          </label>

          <div className="relative">
            <input
              defaultValue={defaultValue}
              type="text"
              id={name}
              name={name}
              placeholder={`Enter your ${name} profile`}
              className={`w-full outline-none bg-slate-800/70 border-b-2 px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base text-white rounded-t-md focus:outline-none focus:ring-0 transition-all duration-200 ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-blue-500/50 focus:border-blue-500"
              }`}
            />

            {error && (
              <p className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-0 text-red-400 text-xs font-medium">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
