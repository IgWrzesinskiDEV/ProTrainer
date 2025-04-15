"use client";
import { IUserRole } from "@/lib/models/user.model";
import ProfileLink from "../profile/ProfileLink";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

export default function DashboardNav({
  role,
  hasActiveTrainer,
}: {
  role: IUserRole;
  hasActiveTrainer?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const path = usePathname();
  const NavLinks =
    role === IUserRole.CLIENT
      ? [
          "Profile",
          "Account",
          "Plans",
          "Measurement",
          "Trainers",
          "Exercises",
          "Chat",
        ]
      : [
          "Profile",
          "Account",
          "Clients",
          "Trainer profile",
          "Invites",
          "Exercises",
          "My exercises",
        ];

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#252220] shadow-inner relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 py-2">
          {NavLinks.map((tab) => {
            if (tab === "Chat" && role === IUserRole.CLIENT) {
              return (
                <ProfileLink
                  href={`/dashboard/${tab.split(" ").join("-").toLowerCase()}`}
                  key={tab}
                  text={tab}
                  isDisabled={!hasActiveTrainer}

                  // onClick={() => setActiveTab(tab)}
                />
              );
            }

            return (
              <ProfileLink
                href={`/dashboard/${tab.split(" ").join("-").toLowerCase()}`}
                key={tab}
                text={tab}

                // onClick={() => setActiveTab(tab)}
              />
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden z-50 relative">
          {/* Current Tab Display with Dropdown Toggle */}
          <div
            className="flex  items-center justify-between py-3 cursor-pointer"
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span className="text-white font-medium">
                {NavLinks.find((tab) => {
                  return (
                    path.split("/")[2] ===
                    tab.split(" ").join("-").toLowerCase()
                  );
                })}
              </span>
              <LuChevronDown
                className={`ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Visual indicator for more options */}
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            // <div className="absolute z-10 w-full bg-[#1e1b19] border-t border-gray-700 shadow-lg rounded-b-lg max-h-[70vh] overflow-y-auto">
            //   <div className="py-2 px-1">
            //     {NavLinks.map((tab) => (
            //       <div
            //         key={tab}
            //         className="mb-1 last:mb-0"
            //         onClick={() => {
            //           setActiveTab(tab);
            //           setIsMenuOpen(false);
            //         }}
            //       >
            //         <ProfileLink
            //           href={`/dashboard/${tab
            //             .split(" ")
            //             .join("-")
            //             .toLowerCase()}`}
            //           text={tab}
            //           fullWidth
            //         />
            //       </div>
            //     ))}
            //   </div>
            // </div>
            <MobileNav NavLinks={NavLinks} setIsMenuOpen={setIsMenuOpen} />
          )}
        </div>
      </div>
    </nav>
  );
}
