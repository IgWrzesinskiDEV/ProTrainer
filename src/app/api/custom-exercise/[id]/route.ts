import { NextResponse } from "next/server";
import { CustomExercise } from "@/lib/models/customExercise.model";
import { verifyAuth } from "@/lib/lucia/auth";
import type { NextRequest } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await verifyAuth();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const currentTrainerId = user.currentTrainer;
  const { id } = await params;
  const isExerciseAssigned = await CustomExercise.exists({
    _id: id,
    trainerId: currentTrainerId,
  });

  if (!isExerciseAssigned) {
    return NextResponse.json(
      { error: "Exercise not found or not assigned to you" },
      { status: 404 }
    );
  }

  const exercise = await CustomExercise.findById(id);
  if (!exercise) {
    return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
  }

  return NextResponse.json(exercise);
}
