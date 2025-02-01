"use client";

import saveProfileUnits from "@/actions/profile.actions";
import { verifyAuth } from "@/lib/lucia/auth";
import ButtonWithLoading from "../Buttons/ButtonWithLoading";
import { useActionState, useEffect, useState } from "react";

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

      if (!data.user) {
        return;
      }

      setUnits(data.user.units);
    };

    getData().catch(console.error);
  }, [formState]);

  return (
    <form
      action={formAction}
      className="flex items-center justify-center flex-col gap-4 "
    >
      <div className="flex  w-1/2 justify-center  flex-col gap-2">
        <label className="text-white">Weight Unit</label>

        <select
          className="p-2 rounded bg-stone-700  text-white outline-none"
          name="weight"
          value={units.weight || "kg"}
          onChange={(e) => setUnits({ ...units, weight: e.target.value })}
        >
          <option value="kg">Kilograms (kg)</option>
          <option value="lbs">Pounds (lbs)</option>
        </select>
      </div>
      <div className="flex  w-1/2 justify-center  flex-col gap-2">
        <label className="text-white">Body Measurement Unit</label>
        <select
          className="p-2 rounded bg-stone-700 text-white outline-none"
          name="bodyMeasurement"
          value={units.bodyMeasurement || "cm"}
          onChange={(e) =>
            setUnits({ ...units, bodyMeasurement: e.target.value })
          }
        >
          <option value="cm">Centimeters (cm)</option>
          <option value="in">Inches (in)</option>
        </select>
      </div>
      <div className="flex  w-1/2 justify-center  flex-col gap-2">
        <label className="text-white">Height Unit</label>
        <select
          className="p-2 rounded bg-stone-700 text-white outline-none"
          name="height"
          value={units.height || "cm"}
          onChange={(e) => setUnits({ ...units, height: e.target.value })}
        >
          <option value="cm">Centimeters (cm)</option>
          <option value="ft">Feet (ft)</option>
        </select>
      </div>
      <ButtonWithLoading type="submit" className="w-1/5" isLoading={isPending}>
        Save
      </ButtonWithLoading>
    </form>
  );
}
