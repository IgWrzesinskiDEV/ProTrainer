import { useActionState, useEffect } from "react";
import PasswordChangeInput from "./PasswordChangeInput";
import { toastify } from "../UI/Toastify";
import { LuCircleCheck } from "react-icons/lu";
import { changePassword } from "@/actions/passwordReset.action";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
const initialState = {
  errors: [],
};
export default function PasswordChangeForm() {
  const [formState, formAction, isPending] = useActionState(
    changePassword,
    initialState
  );

  // Handle account deletion
  useEffect(() => {
    if (formState.success) {
      toastify(
        <p className="flex gap-3 items-center justify-center">
          <LuCircleCheck className="text-green-500 text-xl" />
          Password updated successfully!
        </p>,
        3000
      );
    }
  }, [formState.success]);
  return (
    <div className="bg-gradient-to-br from-[#1E3A5F] to-[#162C48] rounded-xl p-8 mb-8 shadow-xl border border-blue-900/30 ">
      <div className="flex items-center mb-6">
        <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Change Password</h3>
          <p className="text-blue-200/70">
            Update your password to maintain account security
          </p>
        </div>
      </div>

      <form action={formAction} className="space-y-6">
        <PasswordChangeInput
          text="Current Password"
          passwordError={formState?.errors?.find((val) =>
            val.includes("Current")
          )}
        />
        <PasswordChangeInput
          text="New password"
          passwordError={formState?.errors?.find((val) =>
            val.includes("least")
          )}
          passwordRequirments
        />
        <PasswordChangeInput
          text="Confirm password"
          passwordError={formState?.errors?.find((val) =>
            val.includes("match")
          )}
        />

        <div className="pt-2">
          <ButtonWithLoading
            type="submit"
            isDisabled={isPending}
            isLoading={isPending}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#2E7DF7] to-[#38A3FF] text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#162C48] disabled:opacity-40  disabled:hover:-translate-y-0 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Update Password
          </ButtonWithLoading>
        </div>
      </form>
    </div>
  );
}
