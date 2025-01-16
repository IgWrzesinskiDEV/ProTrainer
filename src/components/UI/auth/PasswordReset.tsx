import Link from "next/link";

import ResetPasswordForm from "./PasswordResetForm";

export default function PasswordReset() {
  return (
    <div className="flex h-[60vh] items-center justify-center flex-col  gap-10">
      <div className="flex items-center flex-col gap-2 ">
        <h1 className="text-4xl">Forgot your password</h1>
        <p className="text-stone-400 text-sm ">
          Send password reset link to your email
        </p>
      </div>

      {/* <AuthForm /> */}
      <ResetPasswordForm />

      <Link href="/auth/login" className="text-blue-400 font-normal underline">
        Back to login
      </Link>
    </div>
  );
}
