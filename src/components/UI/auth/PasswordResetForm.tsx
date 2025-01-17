"use client";

import Input from "../Input";
import { useCallback, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { useActionState } from "react";
import { sendPasswordReset } from "@/actions/passwordReset.action";
import AuthButton from "./AuthButton";
import SnackBarToast from "../SnackBarToast";
const initialState = { error: "" };

export default function ResetPasswordForm() {
  const [open, setOpen] = useState(false);
  const [formState, formAction, isPending] = useActionState(
    sendPasswordReset,
    initialState
  );

  const handleClose = useCallback(function handleClose() {
    setOpen(false);
  }, []);

  if (formState?.success) {
    setOpen(true);
  }

  return (
    <>
      <form className="flex flex-col gap-6 w-1/6" action={formAction}>
        <Input label="email" type="text" disabled={isPending} />

        {formState?.error && <p></p>}
        <AuthButton disabled={isPending} type="submit">
          {!isPending ? "Send reset link" : <CircularProgress size={25} />}
        </AuthButton>
      </form>
      <SnackBarToast
        message="Email sent!"
        closeTime={5000}
        isOpen={open}
        onCloseHandler={handleClose}
      />
    </>
  );
}
