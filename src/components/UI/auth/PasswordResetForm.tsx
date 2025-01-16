"use client";

import Input from "../Input";
import CircularProgress from "@mui/material/CircularProgress";

import { useActionState } from "react";

const initialState = {
  errors: {},
};

export default function ResetPasswordForm() {
  //   const [formState, formAction, isPending] = useActionState(
  //     authMode,
  //     initialState
  //   );
  return (
    <form className="flex flex-col gap-6 w-1/6">
      <Input
        label="email"
        type="text"
        // disabled={isPending}
      />

      {/* {formState?.errors && (
        <ul className="flex flex-col gap-2 text-red-500">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>
              {formState.errors[error as keyof typeof formState.errors]}
            </li>
          ))}
        </ul>
      )} */}
      <button
        // disabled={isPending}
        className=" py-2 text-xl bg-blue-500 rounded-lg flex items-center justify-center w-full mx-auto mt-4 disabled:bg-opacity-0 disabled:border-stone-700 disabled:border-2"
      >
        {/* {!isPending ? "Send reset link" : <CircularProgress size={25} />} */}
        Send reset link
      </button>
    </form>
  );
}
