"use client";

import MeasurementsTable from "@/components/measurements/MeasurementsTable";

import { TABLE_HEAD } from "@/utils/data/measurements";

import { LuRuler, LuCalendarDays } from "react-icons/lu";
import { BiLineChart } from "react-icons/bi";
import { ISingleMeasurement } from "@/lib/models/measurement.model";
import ClientSectionWraper from "../ClientSectionWraper";
import { MdAddCircleOutline } from "react-icons/md";
import { useRef } from "react";
import ModalUnstyled from "@/components/UI/Modal";
import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import { deleteMeasurement } from "@/actions/measurements.action";
import { unitsInterface } from "@/interfaces/user/IUser";
export default function MeasurementWrapper({
  measurements,
  units,
  isClientSide,
  clientUnits,
}: {
  measurements: string;
  units: string;
  isClientSide?: boolean;
  clientUnits?: string;
}) {
  const measurementsData: ISingleMeasurement[] = measurements
    ? JSON.parse(measurements)
    : [];

  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const hasData = measurementsData && measurementsData.length > 0;
  const sortedMeasurmentsByDate = measurementsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const closeModal = () => {
    modalRef.current?.close();
  };
  const formatedUnits = JSON.parse(units) as unitsInterface;
  const formatedClientUnits = clientUnits
    ? (JSON.parse(clientUnits) as unitsInterface)
    : null;
  const role = isClientSide
    ? { roleName: "client" as const, deleteHandler: deleteMeasurement }
    : { roleName: "trainer" as const };

  if (formatedClientUnits) {
    if (formatedUnits.weight === "kg" && formatedClientUnits.weight === "lbs") {
      measurementsData.forEach((measurement) => {
        measurement.weight = +(measurement.weight * 0.4535).toFixed(1);
      });
    } else if (
      formatedUnits.weight === "lbs" &&
      formatedClientUnits.weight === "kg"
    ) {
      measurementsData.forEach((measurement) => {
        measurement.weight = +(measurement.weight * 2.20462).toFixed(1);
      });
    }
    if (
      formatedUnits.bodyMeasurement === "cm" &&
      formatedClientUnits.bodyMeasurement === "in"
    ) {
      measurementsData.forEach((measurement) => {
        Object.keys(measurement).forEach((key) => {
          if (
            key !== "date" &&
            key !== "weight" &&
            typeof measurement[key as keyof ISingleMeasurement] === "number"
          ) {
            (measurement[key as keyof ISingleMeasurement] as
              | number
              | undefined) = +(
              (measurement[key as keyof ISingleMeasurement] as number) * 2.54
            ).toFixed(1);
          }
        });
      });
    } else if (
      formatedUnits.bodyMeasurement === "in" &&
      formatedClientUnits.bodyMeasurement === "cm"
    ) {
      measurementsData.forEach((measurement) => {
        Object.keys(measurement).forEach((key) => {
          if (
            key !== "date" &&
            key !== "weight" &&
            typeof measurement[key as keyof ISingleMeasurement] === "number"
          ) {
            (measurement[key as keyof ISingleMeasurement] as
              | number
              | undefined) = +(
              (measurement[key as keyof ISingleMeasurement] as number) *
              0.393701
            ).toFixed(1);
          }
        });
      });
    }
  }
  return (
    <>
      <ClientSectionWraper
        title="Body Measurements"
        Icon={<LuRuler className="w-6 h-6 text-blue-400" />}
        additionaTitleComponent={
          hasData && (
            <div className="flex flex-col  justify-between items-start sm:items-end gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <LuCalendarDays className="w-4 h-4" />
                  <span>
                    Last updated:{" "}
                    {new Date(
                      sortedMeasurmentsByDate[0].date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <BiLineChart className="w-4 h-4" />
                  <span>{measurementsData.length} records</span>
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
          )
        }
      >
        {/* Stats Cards */}
        {hasData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Weight"].map((stat) => {
              const latestMeasurement = sortedMeasurmentsByDate[0];
              const previousMeasurement = sortedMeasurmentsByDate[1];

              const currentValue = latestMeasurement.weight;
              const previousValue = previousMeasurement?.weight;
              const change = previousValue
                ? currentValue - previousValue
                : null;

              return (
                <div
                  key={stat}
                  className="bg-gray-800/50  rounded-xl p-4 border border-gray-700/50"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-gray-400 text-sm">{stat}</p>
                    {change !== null && (
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          change > 0
                            ? "bg-green-500/10 text-green-400"
                            : change < 0
                              ? "bg-red-500/10 text-red-400"
                              : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {change > 0 ? "+" : ""}
                        {change.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-white mt-2">
                    {currentValue}
                    <span className="text-sm text-gray-400 ml-1">
                      {JSON.parse(units || "{}")?.[stat.toLowerCase()] || ""}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Table Section */}
        {hasData && (
          <div className="bg-gray-800/50  rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="p-4 sm:p-6">
              <MeasurementsTable
                measurementsData={measurementsData}
                units={units}
                TABLE_HEAD={TABLE_HEAD}
                role={role}
              />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasData && (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
              <LuRuler className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No measurements recorded
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              {isClientSide
                ? " Add your first measurement! "
                : "This client hasn't recorded any body measurements yet. Measurements will appear here once they're added."}
            </p>
            {isClientSide && (
              <button
                onClick={() => modalRef.current?.open()}
                className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MdAddCircleOutline className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
                Add Measurement
              </button>
            )}
          </div>
        )}
      </ClientSectionWraper>
      {isClientSide && (
        <ModalUnstyled ref={modalRef}>
          <div className="w-[95%] sm:w-auto mx-auto">
            <MeasurementsForm
              TABLE_HEAD={TABLE_HEAD}
              units={formatedUnits}
              closeModal={closeModal}
            />
          </div>
        </ModalUnstyled>
      )}
    </>
  );
}
