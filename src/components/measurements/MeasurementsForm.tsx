"use client";

import { useActionState } from "react";
import { saveMessurement } from "@/actions/measurements.action";
import DatePickerMeasurements from "./DatePickerMeasurements";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
import camelize from "@/utils/camelizeString";
import type { unitsInterface } from "@/interfaces/user/IUser";

const initialState = {
  error: "",
};

export default function MeasurementsForm({
  TABLE_HEAD,
  units,
}: {
  TABLE_HEAD: string[];
  units: unitsInterface;
}) {
  const [formState, formAction, isPending] = useActionState(
    saveMessurement,
    initialState
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl text-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">
        Add Your Measurements
      </h1>
      <form action={formAction} className="space-y-6">
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          <DatePickerMeasurements />
          {TABLE_HEAD.map((field) => {
            if (field === "Date") return null;
            return (
              <div
                key={field}
                className="flex items-center border-b border-gray-700 last:border-b-0"
              >
                <label
                  htmlFor={field}
                  className="w-1/3 bg-gray-700 text-blue-300 font-medium py-3 px-4"
                >
                  {field}
                </label>
                <div className="w-2/3 flex items-center space-x-4 py-3 px-4">
                  <input
                    type={field === "Date" ? "date" : "number"}
                    min={0}
                    step={0.1}
                    name={camelize(field)}
                    className="w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors py-1 px-2 text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="text-sm text-blue-400 font-medium">
                    {field === "Weight" ? units.weight : units.bodyMeasurement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {formState.error && (
          <p className="text-red-400 text-center">{formState.error}</p>
        )}
        <div className="flex justify-center">
          <ButtonWithLoading
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="submit"
            isLoading={isPending}
          >
            Save Measurements
          </ButtonWithLoading>
        </div>
      </form>
    </div>
  );
}
