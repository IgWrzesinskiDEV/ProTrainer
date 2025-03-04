"use client";
import { logout } from "@/actions/auth.actions";
export default function LogoutButton() {
  return (
    <button
      className="group relative flex items-center gap-1 sm:gap-2 bg-transparent border border-gray-700 hover:border-red-500 text-gray-300 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-200 overflow-hidden text-sm"
      title="Logout"
      onClick={logout}
    >
      {/* Background animation on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>

      {/* Logout icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span className="font-medium">Logout</span>
    </button>
  );
}
