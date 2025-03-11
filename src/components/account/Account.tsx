"use client";

import type React from "react";

import { AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
        {/* {true && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-600/30  shadow-lg"
            role="alert"
          >
            <div className="flex items-center">
              <LuCircleCheck className="text-green-500 text-xl" />
              Password updated successfully!
            </div>
          </motion.div>
        )} */}

        {/* {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-600/30 shadow-lg"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errorMessage}
            </div>
          </motion.div>
        )} */}
      </AnimatePresence>

      {/* Password Change Section */}
      {!isGoogleUser && <PasswordChangeForm />}

      {/* Account Deletion Section */}
      <DeleteAccountSection />
    </div>
  );
}
