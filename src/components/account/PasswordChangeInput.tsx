import camelize from "@/utils/camelizeString";
import { motion } from "framer-motion";

export default function PasswordChangeInput({
  text,
  passwordError,
  passwordRequirments,
}: {
  text: string;
  passwordError: string | undefined;
  passwordRequirments?: boolean;
}) {
  const camelizedText = camelize(text);
  return (
    <div>
      <label
        htmlFor={camelizedText}
        className="block text-sm font-medium text-blue-200 mb-2"
      >
        {text}
      </label>
      <div className="relative">
        <input
          type="password"
          id={camelizedText}
          name={camelizedText}
          className={`w-full px-4 py-3 bg-[#0F1C2E] bg-opacity-50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
            passwordError
              ? "border-red-500/50 focus:ring-red-500/30"
              : "border-blue-800/50 focus:ring-blue-500/30 focus:border-blue-500/50"
          }`}
          aria-invalid={!!passwordError}
        />

        {passwordError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            id={`${camelizedText}-error`}
            className="mt-2 text-sm text-red-400 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {passwordError}
          </motion.p>
        )}
        {passwordRequirments && !passwordError && (
          <p className="mt-2 text-sm text-blue-300/60">
            Password must be at least 8 characters
          </p>
        )}
      </div>
    </div>
  );
}
