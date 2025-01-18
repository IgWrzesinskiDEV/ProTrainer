"use client";

import Input from "../Input";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { MdMarkEmailRead } from "react-icons/md";
import { useActionState } from "react";
import { sendPasswordReset } from "@/actions/passwordReset.action";

import AuthButton from "./AuthButton";

import { toastify } from "../Toastify";
const initialState = { error: "" };

export default function ResetPasswordForm() {
  const [formState, formAction, isPending] = useActionState(
    sendPasswordReset,
    initialState
  );

  useEffect(() => {
    if (formState?.success) {
      toastify(
        <div className="flex items-center gap-2">
          <MdMarkEmailRead className="text-blue-500 mr-2 text-3xl" />
          <h2 className="text-xl">Email sent, check your inbox</h2>
        </div>,
        3000
      );
    }
  }, [formState?.success]);

  return (
    <>
      <form className="flex flex-col gap-6 w-1/6" action={formAction}>
        <Input label="email" type="text" disabled={isPending} />

        {formState?.error && (
          <p className=" text-red-500">{formState?.error}</p>
        )}
        <AuthButton disabled={isPending} type="submit">
          {!isPending ? "Send reset link" : <CircularProgress size={25} />}
        </AuthButton>
      </form>
    </>
  );
}
