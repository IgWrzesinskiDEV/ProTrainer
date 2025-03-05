"use client";

import type React from "react";

import saveProfileUnits from "@/actions/profile.actions";
import { verifyAuth } from "@/lib/lucia/auth";
import { useActionState, useEffect, useState } from "react";

import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
const initialState = {
  error: "",
};

export default function ProfileUnitsForm() {
  const [units, setUnits] = useState({
    height: "cm",
    weight: "kg",
    bodyMeasurement: "cm",
    distance: "km",
  });
  const [formState, formAction, isPending] = useActionState(
    saveProfileUnits,
    initialState
  );

  useEffect(() => {
    const getData = async () => {
      const data = await verifyAuth();
      if (data.user) {
        setUnits(data.user.units);
      }
    };
    getData().catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnits({ ...units, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#252220] rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
        Measurement Units
      </h2>
      <form
        action={formAction}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        {["weight", "bodyMeasurement", "height", "distance"].map((unit) => (
          <div key={unit} className="bg-[#1d3a5f] rounded-lg p-3 sm:p-5">
            <label
              htmlFor={unit}
              className="text-base sm:text-lg font-semibold block mb-2"
            >
              {unit === "bodyMeasurement"
                ? "Body Measurement"
                : unit.charAt(0).toUpperCase() + unit.slice(1)}{" "}
              Unit
            </label>
            <div className="relative">
              <select
                id={unit}
                name={unit}
                value={units[unit as keyof typeof units]}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2a4a75] border border-[#3a5a85] rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#2673e8] text-white text-sm sm:text-base cursor-pointer"
              >
                {unit === "weight" ? (
                  <>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                  </>
                ) : unit === "height" ? (
                  <>
                    <option value="cm">Centimeters (cm)</option>
                    <option value="ft">Feet (ft)</option>
                  </>
                ) : unit === "bodyMeasurement" ? (
                  <>
                    <option value="cm">Centimeters (cm)</option>
                    <option value="in">Inches (in)</option>
                  </>
                ) : (
                  <>
                    <option value="km">Kilometers (km)</option>
                    <option value="mi">Miles (mi)</option>
                  </>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 sm:mt-8 col-span-1 sm:col-span-2">
          <ButtonWithLoading
            type="submit"
            className="w-full bg-[#2673e8] hover:bg-blue-600 active:bg-blue-700 text-white py-2.5 sm:py-3 rounded-md transition-colors duration-200 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#252220]"
            isLoading={isPending}
          >
            Save Changes
          </ButtonWithLoading>
        </div>
      </form>
      {formState.error && (
        <p className="mt-3 text-red-400 text-xs sm:text-sm text-center">
          {formState.error}
        </p>
      )}
    </div>
  );
}
