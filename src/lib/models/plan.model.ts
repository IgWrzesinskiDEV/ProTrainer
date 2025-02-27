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
    weekNumber: { type: Number, required: true },
    trainerData: { type: String },
    clientData: { type: String },
  },
  { _id: false }
);

const ExerciseSchema = new Schema<Exercise>(
  {
    number: { type: Number, required: true },
    name: { type: String, required: true },
    exerciseDetailsId: { type: String },
    tempo: { type: String, required: true },
    weekData: { type: [WeekDataSchema], required: true },
  },
  { _id: false }
);

export const WorkoutDaySchema = new Schema<WorkoutDay>(
  {
    weekDay: { type: String, enum: Object.values(WeekDays), required: true },
    isRestDay: { type: Boolean, required: true },
    exercises: { type: [ExerciseSchema], required: true },
  },
  { _id: false }
);

const PlanModel = new Schema<IPlan>(
  {
    _id: { type: String, required: true },
    planName: { type: String, required: true },
    days: { type: [WorkoutDaySchema], required: true },
    weekCount: { type: Number, required: true },
  },
  { _id: false }
);

export const Plan = models?.Plan || model("Plan", PlanModel);
