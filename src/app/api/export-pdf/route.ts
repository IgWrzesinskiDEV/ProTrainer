// app/export-pdf/route.ts
import { exportWorkoutPlanToPDF } from "@/actions/pdf/exportPdfPlan.action";

export async function POST(req: Request) {
  const body = await req.json();
  return exportWorkoutPlanToPDF(body);
}
