"use client";

import Input from "../Input";
import { useCallback, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { MdMarkEmailRead } from "react-icons/md";
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

  useEffect(() => {
    if (formState?.success) {
      setOpen(true);
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
      <SnackBarToast
        message="Email sent"
        icon={<MdMarkEmailRead className="text-lime-400 mr-2 text-3xl" />}
        closeTime={5000}
        isOpen={open}
        onCloseHandler={handleClose}
      />
    </>
  );
}
