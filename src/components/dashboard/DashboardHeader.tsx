"use client";

import Link from "next/link";

import type { profileDetailsInterface } from "@/interfaces/user/IUser";
import ProfileAvatar from "../UI/ProfileAvatar";
import { cn } from "@/lib/twMergeUtill";
import { IUserRole } from "@/lib/models/user.model";
import LogoutButton from "../UI/Buttons/LogoutButton";
import ProTrainerLogo from "../UI/logo/ProTrainerLogo";
import { logout } from "@/actions/auth.actions";
import NotificationsPopup from "../notifications/NotificationPopup";
import { INotification } from "@/lib/models/notification.model";

export default function DashboardHeader({
  profileDetails,
  userName,
  currentTrainer,
  role,
  notifications,
}: {
  profileDetails?: profileDetailsInterface;
  userName: string;
  currentTrainer?: string;
  role: string;
  notifications: INotification[];
}) {
  return (
    <header className="bg-[#1e1b19] shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section with logo and user info */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
            {/* Logo - hidden on smallest screens */}
            <Link href="/" className="flex-shrink-0 hidden sm:block">
              <ProTrainerLogo className="w-auto h-8 sm:h-10" />
            </Link>
            {/* Mobile logo - smaller version for mobile */}
            <Link href="/" className="flex-shrink-0 sm:hidden">
              <ProTrainerLogo className="w-auto h-7" />
            </Link>
            <div className="h-8 w-px bg-gray-700 hidden sm:block" />{" "}
            {/* Vertical divider - hidden on mobile */}
            {/* User info */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-gray-600">
                <ProfileAvatar
                  fileName={profileDetails?.avatarFileName}
                  className="h-full w-full bg-gray-500 flex items-center justify-center"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm sm:text-base font-semibold leading-tight truncate max-w-[150px] sm:max-w-full">
                  {profileDetails?.fullName || userName}
                </h1>
                <p className="text-xs sm:text-sm font-thin text-gray-400">
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationsPopup notificationsData={notifications} />

            {role === IUserRole.CLIENT && (
              <Link
                href={
                  currentTrainer ? `/dashboard/trainers/${currentTrainer}` : "#"
                }
                title={currentTrainer ? "View Details" : "No Trainer Assigned"}
                className={cn(
                  "bg-[#c27c3d] hover:bg-[#d68c4d] text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md transition-colors duration-200 flex items-center text-xs sm:text-sm",
                  !currentTrainer && "pointer-events-none opacity-50"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5   sm:mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:block">My Trainer</span>
              </Link>
            )}

            {/* Mobile-optimized logout button */}

            <LogoutButton className="hidden sm:flex" />

            {/* Mobile logout icon only */}
            <button
              className="sm:hidden p-1.5 rounded-md bg-transparent border border-gray-700 hover:border-red-500 text-gray-300 hover:text-white transition-all duration-200"
              title="Logout"
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
