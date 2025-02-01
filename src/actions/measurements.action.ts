"use server";
import { MeasurementModel } from "@/lib/models/measurement.model";
import { MeasurementSchema } from "@/schemas/zSchemas";
export async function saveMessurement(prevState: unknown, formData: FormData) {
  const measurementObject = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      isNaN(Number(value)) ? value : Number(value),
    ])
  );
  console.log(measurementObject);

  const validatedData = MeasurementSchema.safeParse(measurementObject);

  if (!validatedData.success) {
    return { error: "All fields are required" };
  }

  return { success: "Measurement saved" };
}
