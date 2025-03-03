"use client";

import { useSearchParams } from "next/navigation";
import { verifyToken } from "@/actions/emailVerification.action";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { HiCheckCircle, HiXCircle, HiOutlineClock } from "react-icons/hi";
import AuthButton from "./AuthButton";

export default function EmailVerificationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verify = useCallback(async () => {
    setIsLoading(true);
    if (!token) {
      setError("Verification token not found");
      setIsLoading(false);
      return;
    }

    const data = await verifyToken(token);
    if (data.error) {
      setError(data.error);
    }
    if (data.success) {
      setSuccess(data.success);
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        redirect("/dashboard/profile");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
        {isLoading && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600/20 p-4 rounded-full animate-pulse">
                <HiOutlineClock className="text-blue-400 text-5xl" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Verifying Email
            </h1>
            <p className="text-gray-400">
              Please wait while we verify your email address...
            </p>
          </div>
        )}

        {!isLoading && success && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-green-600/20 p-4 rounded-full">
                <HiCheckCircle className="text-green-400 text-5xl" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Email Verified
            </h1>
            <p className="text-gray-400">
              Your email has been verified. Redirecting to your profile...
            </p>
            <div className="w-full bg-gray-700/50 h-1 rounded-full overflow-hidden mt-4">
              <div className="bg-blue-500 h-full w-0 animate-[progress_3s_linear_forwards]"></div>
            </div>
          </div>
        )}

        {!isLoading && !success && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-red-600/20 p-4 rounded-full">
                <HiXCircle className="text-red-400 text-5xl" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Verification Failed
            </h1>
            <p className="text-red-400">{error}</p>
            <AuthButton onClick={() => (window.location.href = "/auth/login")}>
              Back to login
            </AuthButton>
          </div>
        )}
      </div>
    </div>
  );
}
