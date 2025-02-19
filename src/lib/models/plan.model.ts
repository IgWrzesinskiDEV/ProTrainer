import { Schema, model, models } from "mongoose";
import {
  WorkoutDay,
  WorkoutPlan as IPlan,
  Exercise,
  WeekData,
  WeekDays,
} from "@/interfaces/workout/IWorkout";

const WeekDataSchema = new Schema<WeekData>(
  {
    week: { type: Number, required: true },
    coachData: { type: String, required: true },
    userData: { type: String },
  },
  { _id: false }
);

const ExerciseSchema = new Schema<Exercise>(
  {
    number: { type: Number, required: true },
    name: { type: String, required: true },
    tempo: { type: String, required: true },
    weekData: { type: [WeekDataSchema], required: true },
  },
  { _id: false }
);

const WorkoutDaySchema = new Schema<WorkoutDay>(
  {
    day: { type: String, enum: Object.values(WeekDays), required: true },
    exercises: { type: [ExerciseSchema], required: true },
  },
  { _id: false }
);

const PlanSchema = new Schema<IPlan>(
  {
    _id: { type: String, required: true },
    planName: { type: String, required: true },
    days: { type: [WorkoutDaySchema], required: true },
  },
  { _id: false }
);

export const Plan = models?.PlanSchema || model("PlanSchema", PlanSchema);
