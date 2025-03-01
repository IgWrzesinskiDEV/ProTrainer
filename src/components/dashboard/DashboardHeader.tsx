import Link from "next/link";

import { profileDetailsInterface } from "@/interfaces/user/IUser";
import ProfileAvatar from "../UI/ProfileAvatar";
import { cn } from "@/lib/twMergeUtill";
import { IUserRole } from "@/lib/models/user.model";
import LogoutButton from "../UI/Buttons/LogoutButton";
import ProTrainerLogo from "../UI/logo/ProTrainerLogo";
export default function DashboardHeader({
  profileDetails,
  userName,
  currentTrainer,
  role,
}: {
  profileDetails?: profileDetailsInterface;
  userName: string;
  currentTrainer?: string;
  role: string;
}) {
  return (
    <header className="bg-[#1e1b19] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section with logo and user info */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <ProTrainerLogo className="w-auto h-10" />
            </Link>
            <div className="h-8 w-px bg-gray-700" /> {/* Vertical divider */}
            {/* User info */}
            <div className="flex items-center space-x-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-600">
                <ProfileAvatar
                  fileName={profileDetails?.avatarFileName}
                  className="h-full w-full bg-gray-500 flex items-center justify-center"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-semibold leading-tight">
                  {profileDetails?.fullName || userName}
                </h1>
                <p className="text-sm font-thin text-gray-400">
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-[#2a2522] transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {role === IUserRole.CLIENT && (
              <Link
                href={
                  currentTrainer ? `/dashboard/trainers/${currentTrainer}` : "#"
                }
                title={currentTrainer ? "View Details" : "No Trainer Assigned"}
                className={cn(
                  "bg-[#c27c3d] hover:bg-[#d68c4d] text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center",
                  !currentTrainer && "pointer-events-none opacity-50"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                My Trainer
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
