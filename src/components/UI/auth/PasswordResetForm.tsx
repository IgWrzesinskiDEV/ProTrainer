"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { sendPasswordReset } from "@/actions/passwordReset.action";
import { toastify } from "../Toastify";
import AuthInput from "../input/AuthInput";
import AuthButton from "./AuthButton";

const initialState = { errors: [] };

export default function ResetPasswordForm() {
  const [formState, formAction, isPending] = useActionState(
    sendPasswordReset,
    initialState
  );

  useEffect(() => {
    if (formState?.success) {
      toastify(
        <div className="flex items-center gap-3">
          <MdMarkEmailRead className="text-blue-400 text-3xl flex-shrink-0" />
          <h2 className="text-lg font-medium">Email sent, check your inbox</h2>
        </div>,
        3000
      );
    }
  }, [formState?.success]);

  return (
    <form className="w-full max-w-md space-y-4" action={formAction}>
      <AuthInput label="email" name="email" type="email" disabled={isPending} />

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
          "Send reset link"
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Sending...</span>
          </div>
        )}
      </AuthButton>
    </form>
  );
}
