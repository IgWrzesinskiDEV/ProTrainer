"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { Avatar } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import ProfileAvatar from "../UI/ProfileAvatar";

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
  const { userName, profileDetails, _id } = JSON.parse(
    currentTrainer
  ) as TrainerData;

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
          }  transition-all duration-300 
       `}
          onClick={() => setIsVisible(!isVisible)}
        >
          My trainer
        </button>

        <div className="absolute right-0 h-[250%] -z-20 bg-orange-500 w-[170%]  shadow-xl  ">
          <div className="flex flex-wrap justify-center items-center gap-2 pt-5">
            <ProfileAvatar
              fileName={profileDetails?.avatarFileName}
              className="w-8 h-8 "
            />
            <p className="w-1/2 text-center font-thin  ">
              {profileDetails?.fullName || userName}
            </p>
            <Link href={`/dashboard/trainers/${_id}`}>Details</Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
