import { Schema, model, models } from "mongoose";
import { ExerciseDetails } from "@/interfaces/workout/IWorkout";

const ExerciseSchema = new Schema<ExerciseDetails>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    instructions: { type: String },
    category: { type: String },
    equipment: { type: String },
    muscleGroup: { type: [String], default: undefined },
    videoUrl: { type: String },
  },
  { _id: false }
);

export const Exercise = models?.Exercise || model("Exercise", ExerciseSchema);
