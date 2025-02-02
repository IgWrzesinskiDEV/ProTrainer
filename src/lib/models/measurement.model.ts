import mongoose, { Schema } from "mongoose";

export interface IMeasurement {
  _id: string;
  userId: string;
  measurements: ISingleMeasurement[];
}

export interface ISingleMeasurement {
  _id: string;
  mesurementDate: string;
  weight: number;
  chest: number;
  waist: number;
  leftCalf: number;
  rightCalf: number;
  leftThigh: number;
  rightThigh: number;
  buttocks: number;
  leftBiceps: number;
  rightBiceps: number;
}
const singleMeasurementSchema = new Schema<ISingleMeasurement>({
  _id: { type: String, required: true },
  mesurementDate: { type: String, required: true },
  weight: { type: Number, required: true },
  chest: { type: Number, required: true },
  waist: { type: Number, required: true },
  leftCalf: { type: Number, required: true },
  rightCalf: { type: Number, required: true },
  leftThigh: { type: Number, required: true },
  rightThigh: { type: Number, required: true },
  buttocks: { type: Number, required: true },
  leftBiceps: { type: Number, required: true },
  rightBiceps: { type: Number, required: true },
});

const MeasurementSchema = new Schema<IMeasurement>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    measurements: [singleMeasurementSchema],
  } as const,
  { _id: false }
);

export const MeasurementModel =
  mongoose.models?.Measurement ||
  mongoose.model<IMeasurement>("Measurement", MeasurementSchema);

// export const SingleMeasurementModel =
//   mongoose.models?.SingleMeasurement ||
//   mongoose.model<ISingleMeasurement>(
//     "SingleMeasurement",
//     singleMeasurementSchema
//   );
