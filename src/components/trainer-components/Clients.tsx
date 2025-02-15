"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import ProfileWrapper from "../profile/ProfileWrapper";
import { Avatar } from "@mui/material";
export default function ClientsList() {
  const [searachValue, setSearchValue] = useState("");
  const searchedClients = clients.filter((client) =>
    client.userName.toLocaleLowerCase().includes(searachValue.toLowerCase())
  );

  return (
    <ProfileWrapper title="Clients">
      {" "}
      <div className="flex flex-col items-center  gap-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 text-sm text-white  bg-gray-800 border border-gray-700 rounded-full focus:outline-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
            value={searachValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="Search trainers..."
          />
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <div className="flex flex-wrap gap-5 flex-1">
          {searchedClients.map((client, i) => (
            <div
              key={i}
              className=" p-2  bg-blue-500/60 hover:bg-blue-500 rounded flex flex-col gap-2"
            >
              <div className="flex items-center gap-5">
                <Avatar
                  src={`https://pro-trainer-app.s3.eu-north-1.amazonaws.com/t2cd6mw4uu3ux4rznx7liq3grlsaorlscvfoxvq.png`}
                  alt="The image selected by the user."
                  className="w-14 h-14 p-1"
                />
                <div>
                  <p className="text-xl">{client.userName}</p>
                  <p className="text-xs font-normal opacity-50">
                    Latest weight: 50kg
                  </p>
                  <p className="text-xs font-normal opacity-50">Sex: male</p>
                </div>
              </div>
              <p className="text-slate-400 font-normal text-sm mx-5 italic">
                {client.description}
              </p>
            </div>
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
