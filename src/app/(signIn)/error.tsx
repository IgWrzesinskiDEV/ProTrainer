"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-[500px] flex items-center justify-center p-5 bg-[#1C1C1C]">
      <div className="w-full max-w-md">
        <div className="bg-[#242424] rounded-lg p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#2E7BF6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-400 mb-6">
              We apologize for the inconvenience. An unexpected error has
              occurred.
              {error.digest && (
                <span className="block mt-2 text-sm text-gray-500">
                  Error ID: {error.digest}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-5 py-2.5 rounded bg-[#2E7BF6] text-white font-medium hover:bg-[#2E7BF6]/90 focus:outline-none focus:ring-2 focus:ring-[#2E7BF6]/50 focus:ring-offset-2 focus:ring-offset-[#242424] transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded bg-[#363636] text-white font-medium hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#242424] transition-colors"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
