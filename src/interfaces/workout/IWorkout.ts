export interface Exercise {
  number: number;
  name: string;
  exerciseDetailsId?: string;
  tempo: string;
  weekData: WeekData[];
}

export interface ExerciseDetails {
  _id: string;
  name: string;
  instructions?: string;
  equipment?: string;
  category?: string;
  muscleGroup?: MuscleGroups[];
  videoUrl?: string;
}

export enum MuscleGroups {
  Trapezius = "trapezius",
  UpperBack = "upper-back",
  LowerBack = "lower-back",
  Chest = "chest",
  Biceps = "biceps",
  Triceps = "triceps",
  Forearm = "forearm",
  BackDeltoids = "back-deltoids",
  FrontDeltoids = "front-deltoids",
  Abs = "abs",
  Obliques = "obliques",
  Adductor = "adductor",
  Hamstring = "hamstring",
  Quadriceps = "quadriceps",
  Abductors = "abductors",
  Calves = "calves",
  Gluteal = "gluteal",
  Head = "head",
  Neck = "neck",
}

export interface ExerciseDetailsShort {
  _id: string;
  name: string;
}
export enum WeekDays {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export interface WorkoutDay {
  weekDay: WeekDays;
  isRestDay: boolean;
  exercises: Exercise[];
}

export interface WeekData {
  weekNumber: number;
  trainerData?: string;
  clientData?: string;
}

export interface WorkoutPlan {
  _id: string;
  planName: string;
  days: WorkoutDay[];
  weekCount: number;
}

export interface ClientInfo {
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
