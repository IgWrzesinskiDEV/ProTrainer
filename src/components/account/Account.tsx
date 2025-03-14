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
      {/* Password Change Section */}
      {!isGoogleUser && <PasswordChangeForm />}

      {/* Account Deletion Section */}
      <DeleteAccountSection />
    </div>
  );
}
