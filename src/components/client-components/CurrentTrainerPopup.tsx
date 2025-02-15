"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from "react";
import Link from "next/link";
import ProfileAvatar from "../UI/ProfileAvatar";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";

interface TrainerData {
  _id: string;
  userName: string;
  profileDetails?: {
    avatarFileName?: string;
    fullName?: string;
    bio?: string;
  };
}

export default function CurrentTrainerPopUp({
  currentTrainer,
}: {
  currentTrainer: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const trainerData = JSON.parse(currentTrainer) as TrainerData;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="relative"
        animate={
          isVisible ? { y: "-250%", opacity: 1 } : { y: 0, opacity: "60%" }
        }
        transition={{ duration: 0.3, type: "keyframes" }}
      >
        <button
          className={` px-2 py-2 bg-orange-500  rounded-t-xl text-nowrap    block ${
            !isVisible && "opacity-60 hover:bg-orange-600"
          }  transition-all duration-300 flex items-center justify-center
       `}
          onClick={() => setIsVisible(!isVisible)}
        >
          My trainer
          {isVisible ? (
            <LuChevronDown className="h-4 w-4" />
          ) : (
            <LuChevronUp className="h-4 w-4" />
          )}
        </button>

        <div className="absolute right-0 h-[250%] -z-20 bg-gradient-to-tr from-orange-50 to-orange-400 w-[175%]  shadow-xl  ">
          <div className="flex flex-wrap justify-center items-center gap-2 pt-5">
            {trainerData ? (
              <div className="p-3 flex items-center gap-3">
                <ProfileAvatar
                  fileName={trainerData.profileDetails?.avatarFileName}
                  className="w-12 h-12 rounded-full border-2 border-orange-300 shadow-md"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">
                    {trainerData.profileDetails?.fullName ||
                      trainerData.userName}
                  </p>
                  <Link
                    href={`/dashboard/trainers/${trainerData._id}`}
                    className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 transition-colors duration-200"
                  >
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="p-3 text-sm text-gray-500">Not available</p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

{
  /* <div className="relative">
      <button
        className={`px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2`}
        onClick={() => setIsVisible(!isVisible)}
      >
        My Trainer
        {isVisible ? (
          <LuChevronDown className="h-4 w-4" />
        ) : (
          <LuChevronUp className="h-4 w-4" />
        )}
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={
              isVisible ? { y: "-170%", opacity: 1 } : { y: 0, opacity: "60%" }
            }
            transition={{ duration: 0.3, type: "keyframes" }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10"
          >
            {trainerData ? (
              <div className="p-3 flex items-center gap-3">
                <ProfileAvatar
                  fileName={trainerData.profileDetails?.avatarFileName}
                  className="w-8 h-8 "
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {trainerData.profileDetails?.fullName ||
                      trainerData.userName}
                  </p>
                  <Link
                    href={`/dashboard/trainers/${trainerData._id}`}
                    className="text-xs text-orange-500 hover:text-orange-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ) : (
              <p className="p-3 text-sm text-gray-500">Not available</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div> */
}
