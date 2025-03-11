import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function DeleteAccountSection() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      // setErrorMessage("Please type DELETE to confirm account deletion");
      return;
    }

    //setIsSubmitting(true);
    //setErrorMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to login page after successful deletion
      //router.push("/login");
    } catch (error) {
      //setErrorMessage("Failed to delete account. Please try again.");
      //setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-[#2A1E2F] to-[#1E1E2F] rounded-xl p-8 shadow-xl border border-red-900/20 ">
      <div className="flex items-center mb-6">
        <div className="bg-red-500/10 p-3 rounded-lg mr-4">
          <svg
            className="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-300">Delete Account</h3>
          <p className="text-gray-400">This action cannot be undone</p>
        </div>
      </div>

      <div className="bg-red-900/10 rounded-lg p-4 mb-6 border border-red-800/20">
        <p className="text-gray-300 text-sm">When you delete your account:</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-400">
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            All your personal data will be permanently deleted
          </li>
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Your client relationships will be lost
          </li>
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            You will lose access to all training programs and resources
          </li>
        </ul>
      </div>

      <AnimatePresence mode="wait">
        {!showDeleteConfirm ? (
          <motion.div
            key="delete-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full sm:w-auto px-6 py-3 bg-transparent text-red-400 border border-red-500/50 rounded-lg font-medium hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 focus:ring-offset-[#1E1E2F] transition-all duration-200"
            >
              Delete Account
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="delete-confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-red-300 font-medium">
              To confirm deletion, please type{" "}
              <span className="font-bold text-white bg-red-900/30 px-2 py-0.5 rounded">
                DELETE
              </span>{" "}
              in the field below:
            </p>
            <div className="relative">
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F1C2E] bg-opacity-50 border border-red-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all duration-200"
                placeholder="Type DELETE to confirm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleDeleteAccount}
                //disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium shadow-lg shadow-red-500/20 hover:shadow-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-[#1E1E2F] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
              >
                confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText("");
                  //setErrorMessage("");
                }}
                className="px-6 py-3 bg-gray-700/50 text-white rounded-lg font-medium hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-2 focus:ring-offset-[#1E1E2F] transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
