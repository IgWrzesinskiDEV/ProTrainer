"use client";

import type React from "react";

import saveProfileUnits from "@/actions/profile.actions";
import { verifyAuth } from "@/lib/lucia/auth";
import { useActionState, useEffect, useState } from "react";

import { FiCheckCircle } from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";
const initialState = {
  error: "",
};

export default function ProfileUnitsForm() {
  const [units, setUnits] = useState({
    height: "cm",
    weight: "kg",
    bodyMeasurement: "cm",
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
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Measurement Units
      </h2>
      <form action={formAction} className="space-y-6">
        {["weight", "bodyMeasurement", "height"].map((unit) => (
          <div key={unit} className="space-y-2">
            <label
              htmlFor={unit}
              className="text-white text-sm font-medium block"
            >
              {unit.charAt(0).toUpperCase() + unit.slice(1)} Unit
            </label>
            <select
              id={unit}
              name={unit}
              value={units[unit as keyof typeof units]}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-stone-700 text-white border border-stone-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
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
              ) : (
                <>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                </>
              )}
            </select>
          </div>
        ))}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition duration-150 ease-in-out ${
            isPending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-stone-800"
          }`}
        >
          {isPending ? (
            <LuLoaderCircle className="animate-spin mx-auto h-5 w-5" />
          ) : formState.success ? (
            <div className="flex items-center justify-center">
              <FiCheckCircle className="mr-2 h-5 w-5" />
              Saved
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
      {formState.error && (
        <p className="mt-4 text-red-400 text-sm text-center">
          {formState.error}
        </p>
      )}
    </div>
  );
}
