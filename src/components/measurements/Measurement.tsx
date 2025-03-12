"use client";

import type React from "react";

import { useRef } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import ModalUnstyled from "../UI/Modal";

import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import { deleteMeasurement } from "@/actions/measurements.action";
import MeasurementsTable from "./MeasurementsTable";
import { LuRuler } from "react-icons/lu";
import { motion } from "motion/react";
export default function Measurement({
  measurementsData,
  units,
}: {
  measurementsData: string;
  units: string;
}) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const formatedUnits = JSON.parse(units);

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 w-full"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <LuRuler className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                Body Measurements
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                Track your progress and body changes over time
              </p>
            </div>
          </div>
          <button
            onClick={() => modalRef.current?.open()}
            className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MdAddCircleOutline className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
            Add Measurement
          </button>
        </div>
        <div className="bg-gray-800 rounded-xl p-3 sm:p-5 shadow-inner overflow-hidden">
          <MeasurementsTable
            measurementsData={JSON.parse(measurementsData)}
            TABLE_HEAD={TABLE_HEAD}
            units={units}
            role={{ roleName: "client", deleteHandler: deleteMeasurement }}
          />
        </div>
      </motion.div>
      <ModalUnstyled ref={modalRef}>
        <div className="w-[95%] sm:w-auto mx-auto ">
          <MeasurementsForm
            TABLE_HEAD={TABLE_HEAD}
            units={formatedUnits}
            closeModal={closeModal}
          />
        </div>
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
