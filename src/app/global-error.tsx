"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error occurred:", error);
  }, [error]);

  return (
    <html lang="en" className="bg-[#1C1C1C]">
      <body className="bg-[#1C1C1C]">
        <div className="min-h-screen flex items-center justify-center p-5">
          <div className="w-full max-w-lg">
            <div className="bg-[#242424] rounded-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-[#2E7BF6]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-semibold text-white mb-3">
                  Application Error
                </h1>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  We&apos;re sorry, but there was a critical error loading the
                  application. Our team has been notified and is working to fix
                  the issue.
                  {error.digest && (
                    <span className="block mt-3 text-sm text-gray-500">
                      Error Reference: {error.digest}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded bg-[#2E7BF6] text-white font-medium hover:bg-[#2E7BF6]/90 focus:outline-none focus:ring-2 focus:ring-[#2E7BF6]/50 focus:ring-offset-2 focus:ring-offset-[#242424] transition-colors"
                  aria-label="Try to recover the application"
                >
                  Reload Application
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 rounded bg-[#363636] text-white font-medium hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#242424] transition-colors"
                  aria-label="Go to the home page"
                >
                  Go to Homepage
                </Link>
              </div>

              <div className="mt-8 text-sm text-gray-500 text-center">
                <p>
                  If the problem persists, please contact support or try again
                  later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
