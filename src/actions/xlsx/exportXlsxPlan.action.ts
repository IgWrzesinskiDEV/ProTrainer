"use server";

import ExcelJS from "exceljs";
import { WorkoutPlan } from "@/interfaces/workout/IWorkout";

export async function exportWorkoutPlanToXLSX(plan: WorkoutPlan) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Plan");

  const weekCount = plan.weekCount;

  // First header row
  const firstHeader = ["Day", "Exercise name", "Tempo"];
  for (let i = 1; i <= weekCount; i++) {
    firstHeader.push(`W${i}`, ""); // Placeholder for merged cell
  }

  const secondHeader = ["", "", ""];
  for (let i = 1; i <= weekCount; i++) {
    secondHeader.push("Trainer", "Client");
  }

  const headerStyle = {
    font: { bold: true, color: { argb: "FFFFFFFF" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "ff1b1b1b" } },
    alignment: { vertical: "middle", horizontal: "center" },
    border: {
      top: {
        style: "thin" as ExcelJS.BorderStyle,
        color: { argb: "FFCCCCCC" },
      },
      left: {
        style: "thin" as ExcelJS.BorderStyle,
        color: { argb: "FFCCCCCC" },
      },
      bottom: {
        style: "thin" as ExcelJS.BorderStyle,
        color: { argb: "FFCCCCCC" },
      },
      right: {
        style: "thin" as ExcelJS.BorderStyle,
        color: { argb: "FFCCCCCC" },
      },
    },
  };

  const dayTitleStyle: Partial<ExcelJS.Style> = {
    font: { bold: true },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff252c38" },
    } as ExcelJS.FillPattern,
  };

  const trainerFill: ExcelJS.FillPattern = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ff3b82f6" },
  };

  const cellBorder = {
    top: { style: "thin" as ExcelJS.BorderStyle, color: { argb: "FFCCCCCC" } },
    left: { style: "thin" as ExcelJS.BorderStyle, color: { argb: "FFCCCCCC" } },
    bottom: {
      style: "thin" as ExcelJS.BorderStyle,
      color: { argb: "FFCCCCCC" },
    },
    right: {
      style: "thin" as ExcelJS.BorderStyle,
      color: { argb: "FFCCCCCC" },
    },
  };

  // Add header rows
  sheet.addRow(firstHeader);
  sheet.addRow(secondHeader);

  // Merge cells for W1, W2, etc.
  for (let i = 0; i < weekCount; i++) {
    const colStart = 4 + i * 2;
    const colEnd = colStart + 1;
    sheet.mergeCells(1, colStart, 1, colEnd);
  }

  // Style header cells
  sheet.getRow(1).eachCell((cell) => Object.assign(cell, headerStyle));
  sheet.getRow(2).eachCell((cell) => Object.assign(cell, headerStyle));

  let currentRow = 3;

  for (const day of plan.days) {
    const dayRow = sheet.insertRow(currentRow, [day.weekDay]);
    dayRow.getCell(1).style = {
      ...dayTitleStyle,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" },
      },
    };
    sheet.mergeCells(
      `A${currentRow}:${String.fromCharCode(
        65 + 3 + weekCount * 2 - 1
      )}${currentRow}`
    );
    currentRow++;

    for (const exercise of day.exercises) {
      const row: (string | number)[] = [];
      row.push(exercise.number);
      row.push(exercise.name);
      row.push(exercise.tempo ?? "-");

      const rowData: (string | number)[] = [...row];

      for (const week of exercise.weekData) {
        rowData.push(week.trainerData || "-");
        rowData.push(week.clientData || "-");
      }

      const ExcelRow = sheet.insertRow(currentRow, rowData);
      ExcelRow.eachCell((cell) => {
        cell.fill = trainerFill;
        cell.border = cellBorder;
        cell.font = { color: { argb: "FFFFFFFF" } };
      });

      currentRow += 1;
    }
  }

  // Auto-fit columns
  sheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
      const value = cell.value?.toString() || "";
      maxLength = Math.max(maxLength, value.length);
    });
    column.width = maxLength + 2;
  });

  return await workbook.xlsx.writeBuffer();
}

// "use server";

// import ExcelJS from "exceljs";
// import { WorkoutPlan } from "@/interfaces/workout/IWorkout";

// export async function exportWorkoutPlanToXLSX(plan: WorkoutPlan) {
//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("Plan");

//   const weekCount = plan.weekCount;

//   // Headers
//   const firstHeader = ["Day", "Exercise name", "Tempo"];
//   for (let i = 1; i <= weekCount; i++) {
//     firstHeader.push(`W${i}`, "");
//   }

//   const secondHeader = ["", "", ""];
//   for (let i = 1; i <= weekCount; i++) {
//     secondHeader.push("Trainer", "Client");
//   }

//   const headerStyle = {
//     font: { bold: true, color: { argb: "FFFFFFFF" } },
//     fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F1F1F" } },
//     alignment: { vertical: "middle", horizontal: "center" },
//     border: {
//       top: {
//         style: "thin" as ExcelJS.BorderStyle,
//         color: { argb: "FFCCCCCC" },
//       },
//       left: {
//         style: "thin" as ExcelJS.BorderStyle,
//         color: { argb: "FFCCCCCC" },
//       },
//       bottom: {
//         style: "thin" as ExcelJS.BorderStyle,
//         color: { argb: "FFCCCCCC" },
//       },
//       right: {
//         style: "thin" as ExcelJS.BorderStyle,
//         color: { argb: "FFCCCCCC" },
//       },
//     },
//   };

//   const dayTitleStyle: Partial<ExcelJS.Style> = {
//     font: { bold: true },
//     fill: {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "FF2E2E2E" },
//     } as ExcelJS.FillPattern,
//   };

//   const trainerFill: ExcelJS.FillPattern = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "FF0040FF" },
//   };

//   const clientFill: ExcelJS.FillPattern = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "FF002EB8" },
//   };

//   const cellBorder = {
//     top: { style: "thin" as ExcelJS.BorderStyle, color: { argb: "FFCCCCCC" } },
//     left: { style: "thin" as ExcelJS.BorderStyle, color: { argb: "FFCCCCCC" } },
//     bottom: {
//       style: "thin" as ExcelJS.BorderStyle,
//       color: { argb: "FFCCCCCC" },
//     },
//     right: {
//       style: "thin" as ExcelJS.BorderStyle,
//       color: { argb: "FFCCCCCC" },
//     },
//   };

//   // Header rows
//   sheet.addRow(firstHeader);
//   sheet.addRow(secondHeader);

//   for (let i = 0; i < weekCount; i++) {
//     const colStart = 4 + i * 2;
//     const colEnd = colStart + 1;
//     sheet.mergeCells(1, colStart, 1, colEnd);
//   }

//   sheet.getRow(1).eachCell((cell) => Object.assign(cell, headerStyle));
//   sheet.getRow(2).eachCell((cell) => Object.assign(cell, headerStyle));

//   let currentRow = 3;

//   for (const day of plan.days) {
//     const dayRow = sheet.insertRow(currentRow, [day.weekDay]);
//     dayRow.getCell(1).style = dayTitleStyle;
//     sheet.mergeCells(
//       `A${currentRow}:${String.fromCharCode(
//         65 + 3 + weekCount * 2 - 1
//       )}${currentRow}`
//     );
//     currentRow++;

//     for (const exercise of day.exercises) {
//       const base = [exercise.number, exercise.name, exercise.tempo ?? "-"];
//       const trainerRow = [...base];
//       const clientRow = ["", "", ""];

//       const weekData = new Map<number, { trainer?: string; client?: string }>();
//       for (const week of exercise.weekData) {
//         weekData.set(week.weekNumber, {
//           trainer: week.trainerData || "-",
//           client: week.clientData || "-",
//         });
//       }

//       for (let i = 1; i <= weekCount; i++) {
//         const entry = weekData.get(i) || {};
//         trainerRow.push(entry.trainer || "-");
//         clientRow.push(entry.client || "-");
//       }

//       const trainerExcelRow = sheet.insertRow(currentRow, trainerRow);
//       trainerExcelRow.eachCell((cell) => {
//         cell.fill = trainerFill;
//         cell.border = cellBorder;
//         cell.font = { color: { argb: "FFFFFFFF" } };
//       });

//       const clientExcelRow = sheet.insertRow(currentRow + 1, clientRow);
//       clientExcelRow.eachCell((cell) => {
//         cell.fill = clientFill;
//         cell.border = cellBorder;
//         cell.font = { color: { argb: "FFFFFFFF" } };
//       });

//       currentRow += 2;
//     }
//   }

//   // Auto-fit
//   sheet.columns.forEach((col) => {
//     let maxLength = 10;
//     col.eachCell?.({ includeEmpty: true }, (cell) => {
//       const val = cell.value?.toString() || "";
//       maxLength = Math.max(maxLength, val.length);
//     });
//     col.width = maxLength + 2;
//   });

//   return await workbook.xlsx.writeBuffer();
// }
