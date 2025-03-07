"use client";

import { useActionState } from "react";
import { saveMessurement } from "@/actions/measurements.action";
import DatePickerMeasurements from "./DatePickerMeasurements";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
import camelize from "@/utils/camelizeString";
import type { unitsInterface } from "@/interfaces/user/IUser";
import { LuX } from "react-icons/lu";

const initialState = {
  error: "",
};

export default function MeasurementsForm({
  TABLE_HEAD,
  units,
  closeModal,
}: {
  TABLE_HEAD: string[];
  units: unitsInterface;
  closeModal: (() => void) | undefined;
}) {
  const [formState, formAction, isPending] = useActionState(
    saveMessurement,
    initialState
  );

  return (
    <div className="w-full max-w-3xl  mx-auto p-4 sm:p-6 outline-none bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl planScrollbar trainerDataSquareScrollbar text-gray-100 max-h-[92vh] overflow-y-auto relative">
      {/* Close button */}
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white p-1.5 hover:bg-gray-700/50 rounded-full transition-colors"
        aria-label="Close modal"
      >
        <LuX className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-400 mb-4 sm:mb-6 md:mb-8 pr-8">
        Add Your Measurements
      </h1>
      <form action={formAction} className="space-y-4 sm:space-y-3">
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          <DatePickerMeasurements />

          {/* Mobile view - stacked layout */}
          <div className="sm:hidden">
            {TABLE_HEAD.map((field) => {
              if (field === "Date") return null;
              return (
                <div
                  key={field}
                  className="border-b border-gray-700 last:border-b-0 p-3"
                >
                  <label
                    htmlFor={`mobile-${camelize(field)}`}
                    className="block text-blue-300 font-medium mb-2"
                  >
                    {field}
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      id={`mobile-${camelize(field)}`}
                      type="number"
                      min={0}
                      step={0.1}
                      name={camelize(field)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors py-2 px-3 text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="text-sm text-blue-400 font-medium whitespace-nowrap">
                      {field === "Weight"
                        ? units.weight
                        : units.bodyMeasurement}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tablet and desktop view - side-by-side layout */}
          <div className="hidden sm:block">
            {TABLE_HEAD.map((field) => {
              if (field === "Date") return null;
              return (
                <div
                  key={field}
                  className="flex flex-wrap sm:flex-nowrap items-center border-b border-gray-700 last:border-b-0"
                >
                  <label
                    htmlFor={field}
                    className="w-full sm:w-1/3 bg-gray-700 text-blue-300 font-medium py-3 px-4"
                  >
                    {field}
                  </label>
                  <div className="w-full sm:w-2/3 flex items-center space-x-4 py-3 px-4">
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      id={field}
                      name={camelize(field)}
                      className="w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors py-1 px-2 text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="text-sm text-blue-400 font-medium whitespace-nowrap">
                      {field === "Weight"
                        ? units.weight
                        : units.bodyMeasurement}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {formState.error && (
          <p className="text-red-400 text-center text-sm sm:text-base">
            {formState.error}
          </p>
        )}

        <div className="flex justify-center gap-3 sm:gap-4 pt-2">
          <ButtonWithLoading
            className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="submit"
            isLoading={isPending}
          >
            Save Measurements
          </ButtonWithLoading>

          <button
            type="button"
            onClick={closeModal}
            className="flex-1 sm:flex-initial bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2.5 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
