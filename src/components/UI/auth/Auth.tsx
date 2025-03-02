import Link from "next/link";
import type { ComponentProps } from "react";
import AuthForm from "./AuthForm";
import OAuthButtons from "./OAuthButtons";

interface AuthProps extends ComponentProps<"div"> {
  isLogin: boolean;
}

export default function Auth({ isLogin }: AuthProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-400 mt-2">
            {isLogin
              ? "Log in to access your training programs"
              : "Join the community of fitness professionals"}
          </p>
        </div>

        <OAuthButtons isLogin={isLogin} />

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <p className="mx-4 text-sm text-gray-400">or continue with email</p>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <AuthForm />

        <div className="mt-8 text-center text-sm">
          {isLogin && (
            <Link
              href="/auth/password-reset"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 block mb-4"
            >
              Forgot your password?
            </Link>
          )}
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={`/auth/${isLogin ? "signup" : "login"}`}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
            >
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
