"use server";

import { PDFDocument, rgb } from "pdf-lib";
import { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import fs from "fs/promises";

import fontkit from "@pdf-lib/fontkit";

import path from "path";
export async function exportWorkoutPlanToPDF(plan: WorkoutPlan) {
  const pdfDoc = await PDFDocument.create();

  pdfDoc.registerFontkit(fontkit);

  const fontPath = path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf");
  const fontBytes = await fs.readFile(fontPath);
  const font = await pdfDoc.embedFont(fontBytes);
  let page = pdfDoc.addPage();
  const { height } = page.getSize();
  let y = height - 40;

  page.drawText(`Workout Plan: ${plan.planName}`, {
    x: 50,
    y,
    size: 20,
    font,
    color: rgb(0, 0, 0),
  });

  y -= 30;

  for (const day of plan.days) {
    if (y < 100) {
      //page.drawText("...continued on next page", { x: 50, y, font, size: 12 });
      page = pdfDoc.addPage();
      y = page.getHeight() - 40;
    }

    page.drawText(
      `${day.weekDay} (${day.isRestDay ? "Rest Day" : "Workout"})`,
      {
        x: 50,
        y,
        size: 14,
        font,
      }
    );
    y -= 20;

    for (const ex of day.exercises) {
      page.drawText(`  ${ex.number}. ${ex.name} | Tempo: ${ex.tempo}`, {
        x: 60,
        y,
        size: 12,
        font,
      });
      y -= 15;

      for (const week of ex.weekData) {
        page.drawText(
          `    Week ${week.weekNumber}: Trainer - ${
            week.trainerData || "....."
          }, Client - ${week.clientData || "....."}`,
          { x: 70, y, size: 10, font }
        );
        y -= 15;
      }

      y -= 5;
    }

    y -= 10;
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
