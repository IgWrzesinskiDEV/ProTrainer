"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import AuthButton from "@/components/UI/auth/AuthButton";
import { LuTimer, LuCircleCheck } from "react-icons/lu";
import { resendVerificationEmail } from "@/actions/emailVerification.action";
import { redirect, useSearchParams } from "next/navigation";
import { toastify } from "@/components/UI/Toastify";
import { LuMail } from "react-icons/lu";
export default function VerifyEmailSendPage() {
  const TIMER_DURATION = 3 * 60; // 5 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [emailSent, setEmailSent] = useState(true); // Initially true as email is sent on registration
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const id = searchParams.get("id");

  if (!id) {
    redirect("/auth/login");
  }
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage for the timer
  const progressPercentage = (timeRemaining / TIMER_DURATION) * 100;

  // Handle resend email
  const handleResendEmail = useCallback(() => {
    setIsButtonDisabled(true);
    setTimeRemaining(TIMER_DURATION);
    setEmailSent(true);

    toastify(
      <p className="flex gap-3 items-center justify-center">
        <LuMail className="text-blue-500 text-2xl" />
        Resending verification email...
      </p>,
      3000
    );
  }, [TIMER_DURATION]);

  // Timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining > 0 && isButtonDisabled) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            setIsButtonDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timeRemaining, isButtonDisabled]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/40  border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600/20 p-4 rounded-full">
            <HiOutlineMailOpen className="text-blue-400 text-5xl" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Check Your Email
          </h1>
          <p className="text-gray-400 mt-2">
            We&apos;ve sent a verification link to your email address
          </p>
        </div>

        {emailSent && (
          <div className="mb-6 bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 flex items-center gap-3">
            <LuCircleCheck className="text-blue-400 text-xl flex-shrink-0" />
            <p className="text-blue-200 text-sm">
              Verification email sent! Please check your inbox.
            </p>
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5">
              <LuTimer className="text-gray-400" />
              <span className="text-sm text-gray-400">
                Resend available in:
              </span>
            </div>
            <span className="text-sm font-mono font-medium text-white">
              {formatTime(timeRemaining)}
            </span>
          </div>

          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-400 text-sm">
            Didn&apos;t receive an email? Check your spam folder or
          </p>
          <AuthButton
            onClick={() => {
              startTransition(async () => {
                await resendVerificationEmail(id);
                handleResendEmail();
              });
            }}
            disabled={isButtonDisabled || isPending}
            className={`w-full transition-all duration-300 ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed hover:shadow-none"
                : "hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
            }`}
          >
            {isButtonDisabled
              ? `Wait ${formatTime(timeRemaining)} to resend`
              : "Resend verification email"}
          </AuthButton>
        </div>
      </div>
    </div>
  );
}
