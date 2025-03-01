"use client";

import type React from "react";

import { useRef } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import ModalUnstyled from "../UI/Modal";

import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import { deleteMeasurement } from "@/actions/measurements.action";
import MeasurementsTable from "./MeasurementsTable";
import { LuRuler } from "react-icons/lu";

export default function Measurement({
  measurementsData,
  units,
}: {
  measurementsData: string;
  units: string;
}) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const formatedUnits = JSON.parse(units);

  return (
    <>
      <div className=" bg-gray-800 shadow-md rounded-lg p-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <LuRuler className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Body Measurements
              </h1>
              <p className="text-gray-400">
                Track your progress and body changes over time
              </p>
            </div>
          </div>
          <button
            onClick={() => modalRef.current?.open()}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MdAddCircleOutline className="mr-2 text-lg" />
            Add Measurement
          </button>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 shadow-inner">
          <MeasurementsTable
            measurementsData={measurementsData}
            TABLE_HEAD={TABLE_HEAD}
            units={units}
            role={{ roleName: "client", deleteHandler: deleteMeasurement }}
          />
        </div>
      </div>
      <ModalUnstyled ref={modalRef}>
        <MeasurementsForm TABLE_HEAD={TABLE_HEAD} units={formatedUnits} />
      </ModalUnstyled>
    </>
  );
}

const TABLE_HEAD = [
  "Date",
  "Weight",
  "Chest",
  "Waist",
  "Left calf",
  "Right calf",
  "Left thigh",
  "Right thigh",
  "Buttocks",
  "Left biceps",
  "Right biceps",
];
