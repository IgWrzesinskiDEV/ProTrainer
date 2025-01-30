"use server";
import { MeasurementModel } from "@/lib/models/measurement.model";
export async function saveMessurement(prevState: unknown, formData: FormData) {
  console.log("formData", formData);

  if (!formData) {
    return { error: "No data found" };
  }
  return { success: "Measurement saved" };
}
