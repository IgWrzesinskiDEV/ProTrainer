"use server";
import {
  MeasurementModel,
  ISingleMeasurement,
} from "@/lib/models/measurement.model";
import { MeasurementSchema } from "@/schemas/zSchemas";
import { generateIdFromEntropySize } from "lucia";
import { verifyAuth } from "@/lib/lucia/auth";
import { revalidatePath } from "next/cache";

export async function saveMessurement(prevState: unknown, formData: FormData) {
  const measurementObject = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      isNaN(Number(value)) ? value : Number(value),
    ])
  );

  const validatedData = MeasurementSchema.safeParse(measurementObject);

  if (!validatedData.success) {
    return { error: "All fields are required" };
  }
  const { user } = await verifyAuth();
  const userId = user?.id;
  console.log(user);
  const exisitingMeasurements = await MeasurementModel.findOne({ userId });
  //const SingleMeasurementId=generateIdFromEntropySize(24);
  const currentMeasurements = {
    _id: generateIdFromEntropySize(24),
    ...validatedData.data,
  };
  if (!exisitingMeasurements) {
    await MeasurementModel.create({
      _id: generateIdFromEntropySize(24),
      userId: userId,
      measurements: [currentMeasurements],
    });
    revalidatePath("/dashboard/measurement");
    return { success: "Measurements created and saved" };
  }

  exisitingMeasurements.measurements.push(currentMeasurements);
  await exisitingMeasurements.save();
  revalidatePath("/dashboard/measurement");
  return { success: "Measurement saved" };
}

export async function deleteMeasurement(id: string) {
  try {
    const { user } = await verifyAuth();
    const userId = user?.id;
    const exisitingMeasurements = await MeasurementModel.findOne({ userId });
    if (!exisitingMeasurements) {
      throw new Error("No measurements found");
    }
    exisitingMeasurements.measurements =
      exisitingMeasurements.measurements.filter(
        (measurement: ISingleMeasurement) => measurement._id !== id
      );
    exisitingMeasurements.save();
    revalidatePath("/dashboard/measurement");
  } catch {
    throw new Error("Something went wrong");
  }
}
