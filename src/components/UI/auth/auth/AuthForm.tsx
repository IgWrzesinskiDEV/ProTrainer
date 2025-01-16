"use client";

import Input from "../Input";

import { signup, login } from "@/actions/auth.actions";

import { useActionState } from "react";

import { usePathname } from "next/navigation";

const initialState = {
  errors: {},
};

export default function AuthForm() {
  const isLogin = usePathname() === "/login";
  const authMode = isLogin ? login : signup;
  const [formState, formAction] = useActionState(authMode, initialState);
  return (
    <form action={formAction} className="flex flex-col gap-6 w-1/6">
      {!isLogin && <Input label="username" type="text" />}
      <Input label="email" type="text" />
      <Input label="password" type="password" />
      {formState?.errors && (
        <ul className="flex flex-col gap-2 text-red-500">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>
              {formState.errors[error as keyof typeof formState.errors]}
            </li>
          ))}
        </ul>
      )}
      <button className=" py-2 text-xl bg-blue-500 rounded-lg w-full mx-auto mt-4">
        {isLogin ? "Log in" : "Sign up"}
      </button>
    </form>
  );
}
