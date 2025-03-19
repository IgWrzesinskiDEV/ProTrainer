import Link from "next/link";
import { Avatar } from "@mui/material";
import type { ITrainer } from "@/interfaces/trainers/ITrainer";
import { LuUser, LuBriefcase, LuArrowRight } from "react-icons/lu";

export default function TrainerPreview({ trainer }: { trainer: ITrainer }) {
  let shortTrainerBio = undefined;
  if (trainer?.trainerDetails?.socialAndExpiriance?.experience) {
    shortTrainerBio =
      trainer?.trainerDetails?.socialAndExpiriance?.experience
        ?.split(" ")
        .slice(0, 10)
        .join(" ") + "..." || "";
  }

  return (
    <Link
      href={`/dashboard/trainers/${trainer._id}`}
      key={trainer._id}
      className="group relative bg-gradient-to-b from-gray-800/80 to-gray-900/80 
                 rounded-2xl overflow-hidden shadow-lg border border-gray-800/50
                 hover:border-blue-500/30 hover:shadow-blue-500/20 hover:-translate-y-1
                 transition-all duration-300 flex flex-col"
    >
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-8 flex flex-col h-full relative z-10">
        <div className="flex items-start space-x-5 mb-6">
          <div className="relative flex-shrink-0">
            {trainer?.profileDetails?.avatarFileName ? (
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-gray-700 group-hover:ring-blue-500/50 transition-all duration-300">
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_AWS_BASE_UR}/${trainer.profileDetails.avatarFileName}`}
                  alt={trainer?.profileDetails?.fullName || trainer.userName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl 
                            flex items-center justify-center ring-2 ring-gray-700 
                            group-hover:ring-blue-500/50 transition-all duration-300"
              >
                <LuUser size={36} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
              {trainer?.profileDetails?.fullName || trainer.userName}
            </h2>
            <p className="flex items-center mt-2 text-blue-400/80 text-sm font-medium">
              <LuBriefcase className="flex-shrink-0 mr-2" />
              <span className="truncate">
                {trainer?.trainerDetails?.socialAndExpiriance?.specialization ||
                  "No specialization"}
              </span>
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {shortTrainerBio || "No bio available"}
        </p>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-700/50">
          <span className="text-sm text-gray-500">View Full Profile</span>
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full 
                        bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 
                        group-hover:text-white transform group-hover:translate-x-1
                        transition-all duration-300"
          >
            <LuArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
