"use client";

import { useState } from "react";
import Input from "../UI/Input";
import ProfileWrapper from "../UI/profile/ProfileWrapper";
import { Avatar } from "@mui/material";
import { ITrainer } from "@/interfaces/trainers/ITrainer";
import Link from "next/link";

export default function TrainersList({ trainerList }: { trainerList: string }) {
  const [serachValue, setSearchValue] = useState("");
  const avaliableTrainers = JSON.parse(trainerList) as ITrainer[];
  const searchedClients = avaliableTrainers.filter((trainer: ITrainer) =>
    trainer.userName.toLocaleLowerCase().includes(serachValue.toLowerCase())
  );
  console.log(searchedClients, "searchedClients");
  console.log(serachValue, "serachValue");
  return (
    <ProfileWrapper title="Trainers" className="rounded-tr-none relative z-10">
      <div className="flex flex-col items-center  gap-10">
        <input
          type="text"
          className="text-neutral-800"
          value={serachValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />{" "}
        <div className="flex flex-wrap gap-5 flex-1">
          {searchedClients.map((trainer, i) => (
            <Link
              href={`/dashboard/trainers/${trainer._id}`}
              key={i}
              className=" p-2 cursor-pointer   bg-blue-500/60 hover:bg-blue-500 rounded flex flex-col gap-2"
            >
              <div className="flex items-center gap-5">
                <Avatar
                  src={
                    trainer.profileDetails?.avatarFileName
                      ? `https://pro-trainer-app.s3.eu-north-1.amazonaws.com/${trainer.profileDetails.avatarFileName}`
                      : undefined
                  }
                  alt="The image selected by the user."
                  className="w-14 h-14 p-1"
                />
                <div>
                  <p className="text-xl">{trainer.userName}</p>
                  <p>Specialization: powerlifting</p>
                  <p className="text-xs font-normal opacity-50">Sex: male</p>
                </div>
              </div>
              <p className="text-slate-400 font-normal text-sm mx-5 italic">
                {trainer.profileDetails?.bio}
              </p>
            </Link>
          ))}{" "}
        </div>
      </div>
    </ProfileWrapper>
  );
}

const clients = [
  {
    userName: "John Doe",
    avatar: "https://randomuser.me/api/portraits",
    description: "New client, looking to lose weight",
  },
  {
    userName: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits",
    description: "New client, looking to gain weight",
  },
  {
    userName: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits",
    description: "New client, looking to gain weight",
  },
  {
    userName: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits",
    description: "New client, looking to gain weight",
  },
  {
    userName: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits",
    description: "New client, looking to gain weight",
  },
];
