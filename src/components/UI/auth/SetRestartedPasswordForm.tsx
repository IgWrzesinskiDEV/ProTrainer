"use client";

import Input from "../Input";
import { useCallback, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { CreateNewPassword } from "@/actions/passwordReset.action";
import AuthButton from "./AuthButton";
import { RiLockPasswordFill } from "react-icons/ri";
import { redirect } from "next/navigation";
import SnackBarToast from "../SnackBarToast";
const initialState = { error: "" };

export default function SetRestartedPasswordForm() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [formState, formAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      CreateNewPassword(prevState, formData, token),
    initialState
  );

  const handleClose = useCallback(function handleClose() {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (formState?.success) {
      setOpen(true);
      setTimeout(() => {
        redirect("/profile");
      }, 3000);
    }
  }, [formState?.success]);

  return (
    <>
      <form className="flex flex-col gap-6 w-1/6" action={formAction}>
        <Input
          label="Old password"
          name="oldPassword"
          type="password"
          disabled={isPending}
        />
        <Input label="password" type="password" disabled={isPending} />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={isPending}
        />

        {formState?.error && (
          <p className=" text-red-500">{formState?.error}</p>
        )}
        <AuthButton disabled={isPending} type="submit">
          {!isPending ? "Set new password" : <CircularProgress size={25} />}
        </AuthButton>
      </form>
      <SnackBarToast
        icon={<RiLockPasswordFill className="text-lime-400 mr-2 text-3xl" />}
        message={
          <>
            <h2 className="text-2xl">New password set successfully</h2>
            <p className="text-base">
              You will be redirected to profile page in{" "}
              <strong className="font-bold">3s</strong>
            </p>
          </>
        }
        className="px-5"
        closeTime={3000}
        isOpen={open}
        onCloseHandler={handleClose}
      />
    </>
  );
}
