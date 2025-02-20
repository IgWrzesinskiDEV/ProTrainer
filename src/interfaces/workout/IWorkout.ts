export interface Exercise {
  number: number;
  name: string;
  tempo: string;
  weekData: WeekData[];
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
  week: number;
  coachData: string;
  userData?: string;
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
