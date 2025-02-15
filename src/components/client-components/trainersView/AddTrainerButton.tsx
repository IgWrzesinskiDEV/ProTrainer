"use client";
import { addTrainer } from "@/actions/trainers.actions";
export default function AddTrainerButton({ trainerId }: { trainerId: string }) {
  return (
    <button
      onClick={() => addTrainer(trainerId)}
      className="bg-[#3b82f6] text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Hire me!
    </button>
  );
}
