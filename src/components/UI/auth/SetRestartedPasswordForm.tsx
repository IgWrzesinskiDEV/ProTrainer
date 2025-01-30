"use client";

import Input from "../Input";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { CreateNewPassword } from "@/actions/passwordReset.action";
import AuthButton from "./AuthButton";
import { RiLockPasswordFill } from "react-icons/ri";
import { redirect } from "next/navigation";
import { toastify } from "../Toastify";

const initialState = { error: [] };

export default function SetRestartedPasswordForm() {
  //const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [formState, formAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      CreateNewPassword(prevState, formData, token),
    initialState
  );

  useEffect(() => {
    if (formState?.success) {
      toastify(
        <div className="flex items-center gap-2">
          <RiLockPasswordFill className="text-blue-500  text-7xl" />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl">
              Your password has been successfully updated
            </h2>
            <p className="text-sm text-stone-400 font-normal">
              You will be redirected to profile page in{" "}
              <strong className="font-bold">3s</strong>
            </p>
          </div>
        </div>,
        3000
      );
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

        {formState?.errors && (
          <ul className="flex flex-col gap-2 text-red-500">
            {formState.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <AuthButton disabled={isPending} type="submit">
          {!isPending ? "Set new password" : <CircularProgress size={25} />}
        </AuthButton>
      </form>
    </>
  );
}
