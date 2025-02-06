"use client";

import { useSearchParams } from "next/navigation";
import { verifyToken } from "@/actions/emailVerification.action";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function EmailVerificationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verify = useCallback(async () => {
    setIsLoading(true);
    if (!token) {
      setError("Token not found");
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
  }, []);

  if (success) {
    setTimeout(() => {
      redirect("/dashboard/profile");
    }, 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading && <p>Verifying your email...</p>}
      {!isLoading && success && (
        <>
          <h1>Your email has been verified.</h1>
          <p>You will be redirected in 3s.</p>
        </>
      )}
      {!isLoading && !success && <p>{error}</p>}
    </div>
  );
}
