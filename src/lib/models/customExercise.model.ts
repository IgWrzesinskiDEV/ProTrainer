import { Schema, model, models } from "mongoose";
import { CustomExerciseDetails } from "@/interfaces/workout/IWorkout";

const CustomExerciseSchema = new Schema<CustomExerciseDetails>(
  {
    _id: { type: String, required: true },
    trainerId: { type: String, required: true, ref: "User" },
    name: { type: String, required: true, default: null },
    instructions: { type: String, default: null },
    category: { type: String, default: null },
    equipment: { type: String },
    muscleGroup: { type: [String], default: [] },
    videoUrl: { type: String, default: null },
  },
  { _id: false }
);

export const CustomExercise =
  models?.CustomExercise ||
  model<CustomExerciseDetails>("CustomExercise", CustomExerciseSchema);
