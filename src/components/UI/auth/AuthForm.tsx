"use client";

import Input from "../Input";
import CircularProgress from "@mui/material/CircularProgress";

import AuthButton from "./AuthButton";
import { signup, login } from "@/actions/auth.actions";

import { useActionState } from "react";

import { usePathname } from "next/navigation";

const initialState = {
  errors: {},
};

export default function AuthForm() {
  const isLogin = usePathname() === "/auth/login";
  const authMode = isLogin ? login : signup;
  const [formState, formAction, isPending] = useActionState(
    authMode,
    initialState
  );
  return (
    <form action={formAction} className="flex flex-col gap-6 w-1/6">
      {!isLogin && <Input label="username" type="text" disabled={isPending} />}
      <Input label="email" type="text" disabled={isPending} />
      <Input label="password" type="password" disabled={isPending} />
      {formState?.errors && (
        <ul className="flex flex-col gap-2 text-red-500">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>
              {formState.errors[error as keyof typeof formState.errors]}
            </li>
          ))}
        </ul>
      )}
      <AuthButton disabled={isPending} type="submit">
        {isPending ? null : isLogin ? "Log in" : "Sign up"}
        {isPending && <CircularProgress size={25} />}
      </AuthButton>
    </form>
  );
}
