"use client";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

import {
  weekDays,
  Exercise,
  WorkoutPlan,
  ClientInfo,
  WorkoutDay,
} from "@/interfaces/workout/IWorkout";
import SingleDay from "./SingleDay";

export default function ClientPlans({
  clientData,
}: {
  clientData: ClientInfo;
}) {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(
    clientData.workoutPlans[0]
  );

  const [newPlanName, setNewPlanName] = useState<string>("");

  //   function addWorkoutDay() {
  //     if (!selectedPlan) return;
  //     const newDay: WorkoutDay = {
  //       id: Date.now(),
  //       day: weekDays.Monday,
  //       workoutTitle: "Workout Title",
  //       exercises: [],
  //     };
  //     const updatedPlan = {
  //       ...selectedPlan,
  //       days: [...selectedPlan.days, newDay],
  //     };
  //     setSelectedPlan(updatedPlan);
  //     clientData.workoutPlans = clientData.workoutPlans.map((p) =>
  //       p.planId === selectedPlan.planId ? updatedPlan : p
  //     );
  //   }

  function updateWeekData(
    dayId: number,
    exerciseIndex: number,
    weekIndex: number,
    value: string
  ) {
    if (!selectedPlan) return;
    const updatedPlan = {
      ...selectedPlan,
      days: selectedPlan.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map((ex, i) => {
              if (i === exerciseIndex) {
                const updatedWeekData = [...ex.weekData];
                updatedWeekData[weekIndex] = {
                  ...updatedWeekData[weekIndex],
                  coachData: value,
                };
                return { ...ex, weekData: updatedWeekData };
              }
              return ex;
            }),
          };
        }
        return day;
      }),
    };
    setSelectedPlan(updatedPlan);
    clientData.workoutPlans = clientData.workoutPlans.map((p) =>
      p.planId === selectedPlan.planId ? updatedPlan : p
    );
  }

  function addExercise(dayId: number) {
    if (!selectedPlan) return;
    const newExercise: Exercise = {
      number: 1,
      name: "",
      tempo: "",
      weekData: Array.from({ length: selectedPlan.weekCount }, (_, i) => ({
        week: i + 1,
        coachData: "",
      })),
    };
    const updatedPlan = {
      ...selectedPlan,
      days: selectedPlan.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: [...day.exercises, newExercise],
          };
        }
        return day;
      }),
    };
    setSelectedPlan(updatedPlan);
    clientData.workoutPlans = clientData.workoutPlans.map((p) =>
      p.planId === selectedPlan.planId ? updatedPlan : p
    );
  }

  function updateExercise(
    dayId: number,
    exerciseIndex: number,
    field: keyof Exercise,
    value: string
  ) {
    if (!selectedPlan) return;
    const updatedPlan = {
      ...selectedPlan,
      days: selectedPlan.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map((ex, i) => {
              if (i === exerciseIndex) {
                return { ...ex, [field]: value };
              }
              return ex;
            }),
          };
        }
        return day;
      }),
    };
    setSelectedPlan(updatedPlan);
    clientData.workoutPlans = clientData.workoutPlans.map((p) =>
      p.planId === selectedPlan.planId ? updatedPlan : p
    );
  }
  function deleteExercise(index: number, day: WorkoutDay) {
    if (!selectedPlan) return;
    const updatedPlan = {
      ...selectedPlan,
      days: selectedPlan?.days.map((d) => {
        if (d.id === day.id) {
          return {
            ...d,
            exercises: d.exercises.filter((_, i) => i !== index),
          };
        }
        return d;
      }),
    };
    setSelectedPlan(updatedPlan);
    clientData.workoutPlans = clientData.workoutPlans.map((p) =>
      p.planId === selectedPlan?.planId ? updatedPlan : p
    );
  }

  function addWeek() {
    if (!selectedPlan) return;
    const updatedPlan = {
      ...selectedPlan,
      weekCount: selectedPlan.weekCount + 1,
      days: selectedPlan.days.map((day) => ({
        ...day,
        exercises: day.exercises.map((ex) => ({
          ...ex,
          weekData: [
            ...ex.weekData,
            { week: selectedPlan.weekCount + 1, coachData: "" },
          ],
        })),
      })),
    };
    setSelectedPlan(updatedPlan);
    clientData.workoutPlans = clientData.workoutPlans.map((p) =>
      p.planId === selectedPlan.planId ? updatedPlan : p
    );
  }

  function addNewPlan() {
    if (newPlanName.trim() === "") return;
    const newPlan: WorkoutPlan = {
      planId: Date.now(),
      planName: newPlanName,
      days: [
        { id: 1, day: weekDays.Monday, exercises: [] },
        { id: 2, day: weekDays.Tuesday, exercises: [] },
        { id: 3, day: weekDays.Wednesday, exercises: [] },
        { id: 4, day: weekDays.Thursday, exercises: [] },
        { id: 5, day: weekDays.Friday, exercises: [] },
        { id: 6, day: weekDays.Saturday, exercises: [] },
        { id: 7, day: weekDays.Sunday, exercises: [] },
      ],
      weekCount: 1,
    };
    clientData.workoutPlans = [...clientData.workoutPlans, newPlan];
    setSelectedPlan(newPlan);
    setNewPlanName("");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-4">Workout Plans</h2>
      <div className="flex items-center gap-4 mb-4">
        <select
          value={selectedPlan?.planId.toString()}
          onChange={(e) =>
            setSelectedPlan(
              clientData.workoutPlans.find(
                (p) => p.planId.toString() === e.target.value
              ) || null
            )
          }
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          <option value="">Select a plan</option>
          {clientData.workoutPlans.map((plan) => (
            <option key={plan.planId} value={plan.planId.toString()}>
              {plan.planName}
            </option>
          ))}
        </select>
        <form action="">
          <input
            type="text"
            name="planName"
            value={newPlanName}
            onChange={(e) => setNewPlanName(e.target.value)}
            placeholder="New plan name"
            className="bg-gray-600 text-white px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <LuPlus className="w-5 h-5" />
            Add New Plan
          </button>
        </form>
        {/* <button
          onClick={addWorkoutDay}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <LuPlus className="w-5 h-5" />
          Add Workout Day
        </button> */}
        {selectedPlan && (
          <>
            <button
              onClick={addWeek}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <LuPlus className="w-5 h-5" />
              Add Week
            </button>
            <button className="flex items-center ml-auto gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              <LuMinus className="w-5 h-5" />
              Remove workout plan
            </button>
          </>
        )}
      </div>

      {selectedPlan &&
        selectedPlan.days.map((day) => (
          <SingleDay
            day={day}
            key={day.id}
            updateWeekData={updateWeekData}
            addExercise={addExercise}
            updateExercise={updateExercise}
            selectedPlan={selectedPlan}
            deleteExercise={deleteExercise}
          />
        ))}
    </div>
  );
}
