"use client";

import { useState } from "react";
import { LuUser, LuRuler, LuDumbbell } from "react-icons/lu";

import WorkoutTab from "./plans/ClientPlans";
interface WorkoutDay {
  id: number;
  day: string;

  exercises: Exercise[];
}
interface Exercise {
  number: number;
  name: string;
  tempo: string;
  weekData: WeekData[];
}
interface WeekData {
  week: number;
  coachData: string;
  userData?: string;
}
interface WorkoutPlan {
  planId: number;
  planName: string;
  days: WorkoutDay[];
  weekCount: number;
}

interface ClientInfo {
  username: string;
  email: string;
  bio: string;
  measurements: {
    height: string;
    weight: string;
    bodyFat: string;
  };
  workoutPlans: WorkoutPlan[];
  fitnessStats: {
    avgHeartRate: number;
    caloriesBurned: number;
    achievements: number;
  };
}

const clientData: ClientInfo = {
  username: "JaneDoe123",
  email: "jane.doe@example.com",
  bio: "Fitness enthusiast, yoga lover, and aspiring marathon runner. Always striving to be the best version of myself!",
  measurements: {
    height: "5'7\"",
    weight: "140 lbs",
    bodyFat: "22%",
  },
  workoutPlans: [
    {
      planId: 1,
      planName: "Summer Shred",
      days: [
        {
          id: 1,
          day: "Monday",
          exercises: [
            {
              number: 1,
              name: "Bench Press",
              tempo: "2-1-2",
              weekData: [{ week: 1, coachData: "3x10 20kg" }],
            },
          ],
        },
      ],
      weekCount: 1,
    },
  ],
  fitnessStats: {
    avgHeartRate: 140,
    caloriesBurned: 2500,
    achievements: 15,
  },
};

export default function ClientProfile() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="w-3/4 mx-auto p-6 bg-gray-800 rounded-xl shadow-lg text-white">
      <div className="flex items-center mb-8">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {clientData.username.charAt(0)}
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-white">
            {clientData.username}
          </h1>
          <p className="text-gray-300">{clientData.email}</p>
        </div>
      </div>

      <nav className="flex mb-8">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex items-center px-4 py-2 rounded-tl-lg ${
            activeTab === "info"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <LuUser className="w-5 h-5 mr-2" />
          Basic Info
        </button>
        <button
          onClick={() => setActiveTab("measurements")}
          className={`flex items-center px-4 py-2 ${
            activeTab === "measurements"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <LuRuler className="w-5 h-5 mr-2" />
          Measurements
        </button>
        <button
          onClick={() => setActiveTab("workouts")}
          className={`flex items-center px-4 py-2 rounded-tr-lg ${
            activeTab === "workouts"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <LuDumbbell className="w-5 h-5 mr-2" />
          Workout Plans
        </button>
      </nav>

      <div className="bg-gray-700 p-6 rounded-lg min-h-[300px]">
        {activeTab === "info" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">About Me</h2>
            <p className="text-gray-300">{clientData.bio}</p>
          </div>
        )}

        {activeTab === "measurements" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Body Measurements
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-600 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Height</p>
                <p className="text-lg font-semibold text-white">
                  {clientData.measurements.height}
                </p>
              </div>
              <div className="bg-gray-600 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Weight</p>
                <p className="text-lg font-semibold text-white">
                  {clientData.measurements.weight}
                </p>
              </div>
              <div className="bg-gray-600 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Body Fat</p>
                <p className="text-lg font-semibold text-white">
                  {clientData.measurements.bodyFat}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "workouts" && <WorkoutTab clientData={clientData} />}
      </div>
    </div>
  );
}
