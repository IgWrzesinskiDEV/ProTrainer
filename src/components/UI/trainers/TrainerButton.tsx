"use client";
export default function TrainerButton({
  addTrainerHandler,
  trainerId,
}: {
  addTrainerHandler: (trainerId: string) => void;
  trainerId: string;
}) {
  return (
    <button onClick={() => addTrainerHandler(trainerId)}>Add trainer</button>
  );
}
