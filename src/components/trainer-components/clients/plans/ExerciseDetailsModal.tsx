"use client";

import ExerciseDetailsView from "@/components/exerciseDetails/ExerciseDetailsView";
import ModalUnstyled from "@/components/UI/Modal";
import { ExerciseDetails as IExerciseDetails } from "@/interfaces/workout/IWorkout";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
// interface ExerciseDetails {
//   id: number;
//   name: string;
//   description: string;
//   videoUrl: string;
//   muscleGroups: string[];
//   muscleModelImage: string;
//   instructions: string[];
// }

// interface ExerciseDetailsModalProps {
//   exercise: ExerciseDetails;
//   isOpen: boolean;
//   onClose: () => void;
// }

export default function ExerciseDetailsModal({
  exerciseDetailsJSON,
}: {
  exerciseDetailsJSON: string;
}) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  // if (!isOpen) return null;
  const router = useRouter();
  //const exercise = JSON.parse(exerciseDetailsJSON) as ExerciseDetails;
  useEffect(() => {
    modalRef.current?.open();
  }, []);
  function closeHandler() {
    //router.back();
    modalRef.current?.close();
  }
  return (
    <ModalUnstyled ref={modalRef} isIntercepted isBackDropClickClose={false}>
      {/* Modal */}

      <ExerciseDetailsView
        exerciseDetailJSON={exerciseDetailsJSON}
        modalCloseHandler={closeHandler}
      />
    </ModalUnstyled>
  );
}

// {
//   /* <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-lg shadow-xl mx-4">
//         {/* Header */
// }
// <div className="flex items-center justify-between p-4 border-b border-slate-700">
//   <h2 className="text-xl font-semibold text-white">{exercise.name}</h2>
//   <button
//     onClick={closeHandler}
//     className="p-1 hover:bg-slate-700 rounded-full transition-colors"
//   >
//     <LuX className="h-5 w-5 text-gray-400" />
//   </button>
// </div>;

// {
//   /* Content */
// }
// <div className="p-6 space-y-6">
//   {/* Video Section */}
//   <div className="space-y-2">
//     <h3 className="text-lg font-medium text-white">Exercise Demo</h3>
//     <div className="relative pb-[56.25%] h-0">
//       <iframe
//         src={exercise.videoUrl}
//         className="absolute top-0 left-0 w-full h-full rounded-lg"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       />
//     </div>
//   </div>

//   {/* Muscle Groups and Model */}
//   <div className="grid md:grid-cols-2 gap-6">
//     <div className="space-y-2">
//       <h3 className="text-lg font-medium text-white">Target Muscles</h3>
//       <div className="bg-slate-800 rounded-lg p-4">
//         {/* <ul className="list-disc list-inside space-y-1 text-gray-300">
//                   {exercise.muscleGroups.map((muscle, index) => (
//                     <li key={index}>{muscle}</li>
//                   ))}
//                 </ul> */}
//       </div>
//     </div>
//     <div className="space-y-2">
//       <h3 className="text-lg font-medium text-white">Muscle Model</h3>
//       {/* <div className="bg-slate-800 rounded-lg p-4">
//                 <img
//                   src={exercise.muscleModelImage || "/placeholder.svg"}
//                   alt="Muscle activation model"
//                   className="w-full rounded-lg"
//                 />
//               </div> */}
//     </div>
//   </div>

//   {/* Instructions */}
//   <div className="space-y-2">
//     <h3 className="text-lg font-medium text-white">Instructions</h3>
//     <div className="bg-slate-800 rounded-lg p-4">
//       {/* <ol className="list-decimal list-inside space-y-2 text-gray-300">
//                 {exercise.instructions.map((instruction, index) => (
//                   <li key={index}>{instruction}</li>
//                 ))}
//               </ol> */}
//     </div>
//   </div>
// </div>;
// {
//   /* /  </div> */
// }
