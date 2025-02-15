import Link from "next/link";
import { Avatar } from "@mui/material";
import { ITrainer } from "@/interfaces/trainers/ITrainer";
import { LuUser, LuBriefcase } from "react-icons/lu";
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
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-[30%] hover:shadow-blue-500/20 transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 mr-4">
            {trainer?.profileDetails?.avatarFileName ? (
              <Avatar
                src={
                  trainer?.profileDetails?.avatarFileName
                    ? `https://pro-trainer-app.s3.eu-north-1.amazonaws.com/${trainer.profileDetails.avatarFileName}`
                    : undefined
                }
                alt="The image selected by the user."
                className="w-16 h-16 object-cover "
              />
            ) : (
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <LuUser size={32} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {trainer?.profileDetails?.fullName || trainer.userName}
            </h2>
            <p className="text-blue-300 flex items-center mt-1">
              <LuBriefcase className="mr-2" />
              {trainer?.trainerDetails?.socialAndExpiriance?.specialization ||
                "No specialization"}
            </p>
          </div>
        </div>
        <p className="text-gray-400 text-sm italic flex-grow">
          {shortTrainerBio || "No bio available"}
        </p>
        <div className="mt-4 flex items-center justify-end">
          <span className="text-blue-400 text-sm">View Profile</span>
        </div>
      </div>
    </Link>
  );
}
