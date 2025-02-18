export interface Exercise {
  number: number;
  name: string;
  tempo: string;
  weekData: WeekData[];
}
export enum weekDays {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export interface WorkoutDay {
  id: number;
  day: weekDays;

  exercises: Exercise[];
}

export interface WeekData {
  week: number;
  coachData: string;
  userData?: string;
}

export interface WorkoutPlan {
  planId: number;
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
