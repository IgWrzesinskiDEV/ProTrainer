"use client";

import { useState } from "react";
import {
  LuDumbbell,
  LuClock,
  LuChevronLeft,
  LuChevronRight,
  LuCalendarDays,
} from "react-icons/lu";
import type { WorkoutPlan as IWorkoutPlan } from "@/interfaces/workout/IWorkout";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkoutPlan({
  selectedPlan,
}: {
  selectedPlan: IWorkoutPlan | undefined;
}) {
  const [activeDay, setActiveDay] = useState<number>(0);
  //const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!selectedPlan) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full bg-[#1a1a1a] rounded-xl border border-gray-800">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
          <LuDumbbell className="w-8 h-8 text-blue-500 animate-pulse" />
        </div>
        <p className="text-gray-400">No workout plan selected</p>
      </div>
    );
  }

  // Get the weekCount from the first exercise's weekData length
  const weekCount = selectedPlan.days[0]?.exercises[0]?.weekData?.length || 0;
  const trainingDaysCount = selectedPlan.days.reduce(
    (acc, currentVal) => (!currentVal.isRestDay ? acc + 1 : acc),
    0
  );

  const handleNextDay = () => {
    setActiveDay((prev) =>
      prev === selectedPlan.days.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevDay = () => {
    setActiveDay((prev) =>
      prev === 0 ? selectedPlan.days.length - 1 : prev - 1
    );
  };

  const currentDay = selectedPlan.days[activeDay];

  return (
    <div className="w-full space-y-4">
      {/* Plan Header - Responsive for all devices */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] rounded-xl p-4 border border-gray-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <LuCalendarDays className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {selectedPlan.planName || "Workout Plan"}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <LuClock className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-blue-400">
                    {weekCount} weeks
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <LuDumbbell className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-blue-400">
                    {trainingDaysCount} training days/week
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend - Hidden on mobile, visible on larger screens */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Training Day
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Rest Day
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Day Selector */}
      <div className="sm:hidden bg-gradient-to-br from-[#1a1a1a] to-[#262626] rounded-xl border border-gray-800 shadow-lg  overflow-hidden">
        <div className="flex items-center justify-center p-3 gap-1 border-b border-gray-800/50">
          <button
            onClick={handlePrevDay}
            className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors"
            aria-label="Previous day"
          >
            <LuChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {selectedPlan.days.map((day, index) => (
              <button
                key={day.weekDay}
                onClick={() => setActiveDay(index)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  activeDay === index
                    ? day.isRestDay
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-blue-500/20 text-blue-400"
                    : "bg-gray-800/30 text-gray-500 hover:bg-gray-800/50"
                }`}
                aria-label={`View ${day.weekDay}`}
                aria-current={activeDay === index ? "true" : "false"}
              >
                {index === 3 || index === 6
                  ? day.weekDay.slice(0, 2).toUpperCase()
                  : day.weekDay.charAt(0)}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextDay}
            className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors"
            aria-label="Next day"
          >
            <LuChevronRight className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    currentDay.isRestDay ? "bg-amber-500" : "bg-blue-500"
                  }`}
                ></span>
                <h3 className="font-medium text-lg text-white">
                  {currentDay.weekDay}
                </h3>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  currentDay.isRestDay
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {currentDay.isRestDay
                  ? "Rest Day"
                  : `${currentDay.exercises.length} Exercises`}
              </span>
            </div>

            {currentDay.isRestDay ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <div className="w-16 h-16 mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <span className="text-3xl cursor-default">🌙</span>
                </div>
                <span className="text-lg font-medium mb-2 text-gray-300">
                  Rest Day
                </span>
                <span className="text-sm text-gray-500 text-center">
                  Recovery & Regeneration
                </span>
              </div>
            ) : (
              <Link
                href={`plans/${selectedPlan._id}/${currentDay.weekDay}`}
                className="block"
              >
                <div className="space-y-3 text-gray-300">
                  {currentDay.exercises.map((exercise) => (
                    <div
                      key={exercise.number}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                        {exercise.number}
                      </span>
                      <span className="text-base font-medium flex-1 truncate">
                        {exercise.name.at(0)!.toUpperCase() +
                          exercise.name.slice(1)}
                      </span>
                      <LuChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                  ))}
                </div>
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Weekly View - Hidden on mobile */}
      <div className="hidden sm:block bg-gradient-to-br from-[#1a1a1a] to-[#262626] rounded-xl overflow-hidden border border-gray-800 shadow-xl">
        <div className="p-4 border-b border-gray-800/50 bg-[#1a1a1a]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <LuDumbbell className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="font-medium text-gray-300">Weekly Schedule</h3>
            </div>

            {/* Expand/Collapse button for medium screens */}
            {/* <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden px-3 py-1 rounded-lg bg-gray-800/50 text-gray-300 text-sm hover:bg-gray-800 transition-colors"
            >
              {isExpanded ? "Collapse" : "Expand All"}
            </button> */}
          </div>
        </div>

        {/* Responsive table for medium and large screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse overflow-hidden h-full table-fixed">
            <thead>
              <tr className="border-b border-gray-800/50">
                {selectedPlan.days.map((day) => (
                  <th
                    key={day.weekDay}
                    className="bg-[#1a1a1a]/50 backdrop-blur-sm  text-gray-300 font-medium p-4 text-left whitespace-nowrap"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          day?.isRestDay ? "bg-amber-500" : "bg-blue-500"
                        }`}
                      ></span>
                      {day.weekDay}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {selectedPlan.days.map((day) => {
                  if (day.isRestDay) {
                    return (
                      <td
                        key={day.weekDay}
                        className="relative bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-4 border-r border-gray-800/90 last:border-r-0 align-top"
                      >
                        <div className="flex flex-col items-center justify-center h-full min-h-[250px] text-gray-400 group">
                          <div className="w-12 h-12 mb-4 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-200">
                            <span className="text-2xl cursor-default">🌙</span>
                          </div>
                          <span className="text-lg font-medium mb-2 text-gray-300">
                            Rest Day
                          </span>
                          <span className="text-sm text-gray-500 text-center">
                            Recovery & Regeneration
                          </span>
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={day.weekDay}
                      className="border-r h-full  border-gray-800/90 last:border-r-0 group relative overflow-hidden align-top"
                    >
                      <Link
                        href={`plans/${selectedPlan._id}/${day.weekDay}`}
                        className="inline-block w-full h-full px-4 py-3 hover:bg-blue-500/10 transition-all duration-300"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                              <LuDumbbell className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-blue-400 font-medium text-base">
                              {day.exercises.length} Exercises
                            </span>
                          </div>
                          <ol className="space-y-3 text-gray-300">
                            {day.exercises
                              //.slice(0, isExpanded ? day.exercises.length : 3)
                              .map((exercise) => (
                                <li
                                  key={exercise.number}
                                  className="flex items-start gap-3 transition-colors duration-200"
                                >
                                  <span className="flex items-center text-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium flex-shrink-0">
                                    {exercise.number}
                                  </span>
                                  <span className="text-base font-medium truncate">
                                    {exercise.name.at(0)!.toUpperCase() +
                                      exercise.name.slice(1)}
                                  </span>
                                </li>
                              ))}
                            {/* {!isExpanded && day.exercises.length > 3 && (
                              <li className="text-sm text-blue-400 pl-9">
                                +{day.exercises.length - 3} more exercises
                              </li>
                            )} */}
                          </ol>
                        </div>
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// <div className="w-full p-4 space-y-3">
//       <div className="flex items-center justify-between ">
//         <div className="flex items-center gap-3 ml-5">

//           <div className="space-y-1">
//             <h2 className="text-2xl font-bold text-white">
//               {selectedPlan.planName || "Workout Plan"}
//             </h2>
//             <div className="flex items-center gap-2 text-sm text-gray-400">
//               <LuClock className="w-4 h-4 text-blue-500" />

//               <span className="font-medium text-blue-400">
//                 {weekCount} weeks
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] rounded-xl overflow-hidden border border-gray-800 shadow-xl">
//         <div className="p-4 border-b border-gray-800/50 bg-[#1a1a1a]/50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
//                 <LuDumbbell className="w-4 h-4 text-blue-500" />
//               </div>
//               <div className="space-y-1">
//                 <h3 className="font-medium text-gray-300">Weekly Schedule</h3>
//                 <p className="text-sm text-gray-500">
//                   {selectedPlan.days.reduce(
//                     (acc, currentVal) =>
//                       !currentVal.isRestDay ? acc + 1 : acc,
//                     0
//                   )}{" "}
//                   training days per week
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
//                 <span className="w-2 h-2 rounded-full bg-blue-500"></span>
//                 Training Day
//               </span>
//               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm">
//                 <span className="w-2 h-2 rounded-full bg-amber-500"></span>
//                 Rest Day
//               </span>
//             </div>
//           </div>
//         </div>

//         <table className="w-full text-sm border-collapse h-full table-fixed">
//           <thead>
//             <tr className="border-b border-gray-800/50">
//               {selectedPlan.days.map((day) => (
//                 <th
//                   key={day.weekDay}
//                   className="bg-[#1a1a1a]/50 backdrop-blur-sm text-gray-300 font-medium p-4 text-left first:rounded-tl-xl last:rounded-tr-xl"
//                 >
//                   <span className="flex items-center gap-2">
//                     <span
//                       className={`w-2 h-2 rounded-full ${
//                         day?.isRestDay ? "bg-amber-500" : "bg-blue-500"
//                       }`}
//                     ></span>
//                     {day.weekDay}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {selectedPlan.days.map((day) => {
//                 if (day.isRestDay) {
//                   return (
//                     <td
//                       key={day.weekDay}
//                       className="relative bg-gradient-to-br w-44 from-blue-500/5 to-purple-500/5 p-6 border-r border-gray-800/90 last:border-r-0"
//                     >
//                       <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-gray-400 group">
//                         <div className="w-12 h-12 mb-4 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-200">
//                           <span className="text-2xl cursor-default">🌙</span>
//                         </div>
//                         <span className="text-lg font-medium mb-2 text-gray-300">
//                           Rest Day
//                         </span>
//                         <span className="text-sm text-gray-500 text-center">
//                           Recovery & Regeneration
//                         </span>
//                       </div>
//                     </td>
//                   );
//                 }

//                 return (
//                   <td
//                     key={day.weekDay}
//                     className="border-r h-full border-gray-800/90 last:border-r-0 group relative overflow-hidden"
//                   >
//                     <Link
//                       href={`plans/${selectedPlan._id}/${day.weekDay}`}
//                       className="inline-block h-full w-full px-6 py-3 my-auto hover:bg-blue-500/10 transition-all duration-300"
//                     >
//                       <div className="flex flex-col h-full z-10">
//                         <div className="flex items-center gap-3 mb-4">
//                           <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
//                             <LuDumbbell className="w-4 h-4 text-white" />
//                           </div>
//                           <span className="text-blue-400 font-medium text-base">
//                             {day.exercises.length} Exercises
//                           </span>
//                         </div>
//                         <ol className="space-y-3 text-gray-300">
//                           {day.exercises.map((exercise) => (
//                             <li
//                               key={exercise.number}
//                               className="flex items-start gap-3 group/item  transition-colors duration-200"
//                             >
//                               <span className="flex items-center text-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
//                                 {exercise.number}
//                               </span>
//                               <span className="text-base font-medium w-3/4">
//                                 {exercise.name.at(0)!.toUpperCase() +
//                                   exercise.name.slice(1)}
//                               </span>
//                             </li>
//                           ))}
//                         </ol>
//                       </div>
//                     </Link>
//                   </td>
//                 );
//               })}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
