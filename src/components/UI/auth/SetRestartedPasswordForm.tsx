"use client";

import { useEffect } from "react";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { CreateNewPassword } from "@/actions/passwordReset.action";
import AuthButton from "./AuthButton";
import { RiLockPasswordFill } from "react-icons/ri";
import { redirect } from "next/navigation";
import { toastify } from "../Toastify";
import AuthInput from "../input/AuthInput";

const initialState = { error: [] as string[], success: "" };

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
        <div className="flex items-center gap-3">
          <RiLockPasswordFill className="text-blue-400 text-3xl flex-shrink-0" />
          <div>
            <h2 className="text-lg font-medium">
              Password updated successfully
            </h2>
            <p className="text-sm text-gray-400">
              Redirecting to profile in <span className="font-bold">3s</span>
            </p>
          </div>
        </div>,
        3000
      );
      setTimeout(() => {
        redirect("/dashboard/profile");
      }, 3000);
    }
  }, [formState?.success]);

  return (
    <form className="w-full max-w-md space-y-4" action={formAction}>
      {/* <AuthInput
        label="Current password"
        name="currentPassword"
        type="password"
        disabled={isPending}
      /> */}

      <AuthInput
        label="password"
        name="password"
        type="password"
        disabled={isPending}
      />

      <AuthInput
        label="confirm password"
        name="confirmPassword"
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
        {!isPending ? (
          "Set new password"
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Updating...</span>
          </div>
        )}
      </AuthButton>
    </form>
  );
}

// const [formState, formAction, isPending] = useActionState(
//   (prevState: unknown, formData: FormData) =>
//     CreateNewPassword(prevState, formData, token),
//   initialState
// );
