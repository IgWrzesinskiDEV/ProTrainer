import { LuDumbbell, LuCalendar } from "react-icons/lu";

import { WorkoutPlan as IWorkoutPlan } from "@/interfaces/workout/IWorkout";

import Link from "next/link";

export default function WorkoutPlan({
  selectedPlan,
}: {
  selectedPlan: IWorkoutPlan | undefined;
}) {
  if (!selectedPlan) {
    return null;
  }

  return (
    <div className="w-4/5  p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <LuCalendar className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {selectedPlan.planName || "Workout Plan"}
          </h2>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] rounded-xl overflow-hidden border border-gray-800 shadow-xl">
        <table className="w-full text-sm border-collapse h-full table-fixed">
          <thead>
            <tr className="border-b border-gray-800/50">
              {selectedPlan.days.map((day) => (
                <th
                  key={day.weekDay}
                  className="bg-[#1a1a1a]/50 backdrop-blur-sm text-gray-300 font-medium p-4 text-left first:rounded-tl-xl last:rounded-tr-xl"
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
                      className="relative bg-gradient-to-br w-44  from-blue-500/5 to-purple-500/5 p-6 border-r border-gray-800/90 last:border-r-0"
                    >
                      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-gray-400 group">
                        <div className="w-12 h-12 mb-4 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                          <span className="text-2xl cursor-default">🌙</span>
                        </div>
                        <span className="text-lg font-medium mb-2 text-gray-300">
                          Rest Day
                        </span>
                        <span className="text-sm text-gray-500">
                          Recovery & Regeneration
                        </span>
                      </div>
                    </td>
                  );
                }

                return (
                  <td
                    key={day.weekDay}
                    className="border-r h-full  border-gray-800/90 last:border-r-0 group relative overflow-hidden"
                  >
                    <Link
                      href={`plans/${selectedPlan._id}/${day.weekDay}`}
                      className="inline-block h-full w-full  px-6 py-3 my-auto hover:bg-blue-500/10 transition-all duration-300 "
                    >
                      <div className="flex flex-col h-full  z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                            <LuDumbbell className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-blue-400 font-medium">
                            {day.exercises.length} Exercises
                          </span>
                        </div>
                        <ol className="space-y-3 text-gray-300">
                          {day.exercises.map((exercise) => (
                            <li
                              key={exercise.number}
                              className="flex items-center gap-3 group/item hover:text-blue-400 transition-colors duration-200"
                            >
                              <span className="flex items-center text-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium">
                                {exercise.number}
                              </span>
                              <span className="text-sm font-medium w-3/4">
                                {exercise.name}
                              </span>
                            </li>
                          ))}
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
  );
}

// import { WorkoutPlan as IWorkoutPlan } from "@/interfaces/workout/IWorkout";
// import Link from "next/link";

// export default function WorkoutPlan({
//   selectedPlan,
// }: {
//   selectedPlan: IWorkoutPlan | undefined;
// }) {
//   if (!selectedPlan) {
//     return null;
//   }
//   console.log(selectedPlan);
//   return (
//     <div className="flex flex-col w-full items-center justify-center  rounded-lg  overflow-hidden shadow-lg">
//       <table className="w-full text-sm border-collapse table-fixed   ">
//         <thead className="text-black">
//           <tr className="">
//             {selectedPlan.days.map((day, index) => (
//               <th
//                 key={day.weekDay}
//                 className={`bg-neutral-900 text-white border-r border-stone-300/20  p-2 ${
//                   index === selectedPlan.days.length - 1 && "border-none"
//                 } `}
//               >
//                 {day.weekDay}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="text-white ">
//           <tr className="h-32 ">
//             {selectedPlan.days.map((day, index) => {
//               if (day.isRestDay) {
//                 return (
//                   <td
//                     className={`bg-foo border-gray-300 border-r ${
//                       index === selectedPlan.days.length - 1 && "border-none"
//                     }`}
//                     key={day.weekDay}
//                   >
//                     <p className="rotate-45 select-none w-full text-center text-nowrap text-xl">
//                       Rest day
//                     </p>
//                   </td>
//                 );
//               }
//               return (
//                 <td
//                   key={day.weekDay}
//                   className={` bg-blue-500 hover:bg-blue-700 transition-colors duration-150 cursor-pointer ${
//                     index === selectedPlan.days.length - 1 && "border-none"
//                   } border-r border-stone-300`}
//                 >
//                   <Link
//                     href={`plans/${selectedPlan._id}/${day.weekDay}`}
//                     passHref
//                     className="block p-4"
//                   >
//                     <ol className="list-decimal list-inside">
//                       {day.exercises.map((exercise) => (
//                         <li key={exercise.number}>{exercise.name}</li>
//                       ))}
//                     </ol>
//                   </Link>
//                 </td>
//               );
//             })}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const workoutPlan = [
//   {
//     id: 6,
//     day: "Saturday",
//     workoutTitle: "Lower",
//     exercises: [
//       {
//         number: 1,
//         name: "Squats",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x10 20kg",
//             userData: "rir1",
//           },
//           {
//             week: 2,
//             coachData: "3x10 20kg",
//             userData: "rir1",
//           },
//           {
//             week: 3,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 4,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 5,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 6,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 7,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 8,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 9,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 10,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 11,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 12,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 13,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//           {
//             week: 14,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//         ],
//       },
//       {
//         number: 2,
//         name: "Lunges",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x12 15kg",
//             userData: "rir2",
//           },
//           {
//             week: 2,
//             coachData: "3x10 20kg",
//             userData: "rir1",
//           },
//           {
//             week: 3,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//         ],
//       },
//       {
//         number: 3,
//         name: "Leg Press",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x15 50kg",
//             userData: "rir1",
//           },
//           {
//             week: 2,
//             coachData: "3x10 20kg",
//             userData: "rir1",
//           },
//           {
//             week: 3,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//         ],
//       },
//       {
//         number: 4,
//         name: "Calf Raises",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x20 10kg",
//             userData: "rir0",
//           },
//           {
//             week: 2,
//             coachData: "3x10 20kg",
//             userData: "rir1",
//           },
//           {
//             week: 3,
//             coachData: "3x10 20kg",
//             userData: "",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 7,
//     day: "Sunday",
//     workoutTitle: "Upper",
//     exercises: [
//       {
//         number: 1,
//         name: "Push Up Plus",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x10 10kg",
//             userData: "rir0",
//           },
//         ],
//       },
//       {
//         number: 2,
//         name: "Pull Ups",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x8 Bodyweight",
//             userData: "rir1",
//           },
//         ],
//       },
//       {
//         number: 3,
//         name: "Shoulder Press",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x12 15kg",
//             userData: "rir2",
//           },
//         ],
//       },
//       {
//         number: 4,
//         name: "Bicep Curls",
//         tempo: "2-0-2",
//         weekData: [
//           {
//             week: 1,
//             coachData: "3x15 10kg",
//             userData: "rir1",
//           },
//         ],
//       },
//     ],
//   },
// ];

// export const ex = {
//   planId: 1,
//   planName: "bench",
//   days: [...workoutPlan],
// };

// import type { WorkoutPlan as IWorkoutPlan } from "@/interfaces/workout/IWorkout";
// import { LuDumbbell } from "react-icons/lu";

// import Link from "next/link";

// export default function WorkoutPlan({
//   selectedPlan,
// }: {
//   selectedPlan: IWorkoutPlan | undefined;
// }) {
//   if (!selectedPlan) {
//     return null;
//   }

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold text-white">
//           {selectedPlan.name || "Workout Plan"}
//         </h2>
//         <div className="flex gap-2">
//           <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
//             Edit Plan
//           </button>
//         </div>
//       </div>

//       <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800">
//         <table className="w-full text-sm border-collapse">
//           <thead>
//             <tr className="border-b border-gray-800">
//               {selectedPlan.days.map((day, index) => (
//                 <th
//                   key={day.weekDay}
//                   className="bg-[#1a1a1a] text-gray-400 font-medium p-4 text-left"
//                 >
//                   {day.weekDay}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {selectedPlan.days.map((day, index) => {
//                 if (day.isRestDay) {
//                   return (
//                     <td
//                       key={day.weekDay}
//                       className="bg-[#262626] p-6 border-r border-gray-800 last:border-r-0"
//                     >
//                       <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-400">
//                         <span className="text-lg font-medium mb-2">
//                           Rest Day
//                         </span>
//                         <span className="text-sm">Recovery & Regeneration</span>
//                       </div>
//                     </td>
//                   );
//                 }

//                 return (
//                   <td
//                     key={day.weekDay}
//                     className="border-r border-gray-800 last:border-r-0 bg-[#1a1a1a] hover:bg-[#262626] transition-colors duration-200"
//                   >
//                     <Link
//                       href={`plans/${selectedPlan._id}/${day.weekDay}`}
//                       className="block p-6 h-full min-h-[200px]"
//                     >
//                       <div className="flex flex-col h-full">
//                         <div className="flex items-center gap-2 mb-4">
//                           <LuDumbbell className="w-5 h-5 text-blue-500" />
//                           <span className="text-blue-500 font-medium">
//                             {day.exercises.length} Exercises
//                           </span>
//                         </div>
//                         <ol className="space-y-2 text-gray-300">
//                           {day.exercises.map((exercise) => (
//                             <li
//                               key={exercise.number}
//                               className="flex items-center gap-2"
//                             >
//                               <span className="text-xs text-gray-500">
//                                 {exercise.number}.
//                               </span>
//                               <span className="text-sm">{exercise.name}</span>
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
//   );
// }
