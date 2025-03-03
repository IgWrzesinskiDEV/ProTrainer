"use client";

import AuthButton from "./AuthButton";
import { signup, login } from "@/actions/auth.actions";
import { useActionState } from "react";
import { usePathname } from "next/navigation";
import AuthInput from "../input/AuthInput";

const initialState = {
  errors: [],
};

export default function AuthForm() {
  const isLogin = usePathname() === "/auth/login";
  const authMode = isLogin ? login : signup;
  const [formState, formAction, isPending] = useActionState(
    authMode,
    initialState
  );

  return (
    <form action={formAction} className="w-full max-w-md space-y-4">
      {!isLogin && (
        <AuthInput
          label="username"
          name="username"
          type="text"
          disabled={isPending}
        />
      )}
      <AuthInput label="email" name="email" type="text" disabled={isPending} />
      <AuthInput
        label="password"
        name="password"
        type="password"
        disabled={isPending}
      />

      {formState?.errors && formState.errors.length > 0 && (
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-3">
          <ul className="text-red-400 text-sm space-y-1">
            {formState.errors.map((error, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AuthButton disabled={isPending} type="submit">
        {isPending ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>{isLogin ? "Logging in..." : "Signing up..."}</span>
          </div>
        ) : (
          <span>{isLogin ? "Log in" : "Sign up"}</span>
        )}
      </AuthButton>
    </form>
  );
}
