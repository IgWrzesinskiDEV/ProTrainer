"use client";

import type React from "react";

import DeleteAccountSection from "./DeleteAccountSection";

import PasswordChangeForm from "./PasswordChangeForm";

export default function SecuritySettings({
  isGoogleUser,
}: {
  isGoogleUser: boolean;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* <button
        onClick={() => {
          toastify(
            <p className="flex gap-2 items-center justify-center font-medium">
              <LuCircleCheck className="text-green-500 text-2xl" />
              Password updated successfully!
            </p>,
            3000
          );
        }}
      >
        test
      </button> */}

      {/* Password Change Section */}
      {!isGoogleUser && <PasswordChangeForm />}

      {/* Account Deletion Section */}
      <DeleteAccountSection />
    </div>
  );
}
