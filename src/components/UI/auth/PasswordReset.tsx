import Link from "next/link";
import ResetPasswordForm from "./PasswordResetForm";

export default function PasswordReset() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-400 mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        <ResetPasswordForm />

        <div className="mt-8 text-center text-sm">
          <Link
            href="/auth/login"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
