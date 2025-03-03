import { HiOutlineMailOpen } from "react-icons/hi";
import AuthButton from "@/components/UI/auth/AuthButton";

export default function VerifyEmailSendPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600/20 p-4 rounded-full">
            <HiOutlineMailOpen className="text-blue-400 text-5xl" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Check Your Email
          </h1>
          <p className="text-gray-400 mt-2">
            We&apos;ve sent a verification link to your email address
          </p>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-400 text-sm">
            Didn&apos;t receive an email? Check your spam folder or
          </p>
          <AuthButton>Resend verification email</AuthButton>
        </div>
      </div>
    </div>
  );
}
