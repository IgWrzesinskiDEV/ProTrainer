"use client";

import type React from "react";

import MeasurementsTable from "@/components/measurements/MeasurementsTable";
import { TABLE_HEAD } from "@/utils/data/measurements";
import { LuRuler, LuCalendarDays } from "react-icons/lu";
import { BiLineChart } from "react-icons/bi";
import type { ISingleMeasurement } from "@/lib/models/measurement.model";
import ClientSectionWraper from "../ClientSectionWraper";
import { MdAddCircleOutline } from "react-icons/md";
import { useRef } from "react";
import ModalUnstyled from "@/components/UI/Modal";
import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import { deleteMeasurement } from "@/actions/measurements.action";
import type {
  profileInformationInterface,
  unitsInterface,
} from "@/interfaces/user/IUser";
import { FaWeight, FaRulerVertical } from "react-icons/fa";
import { TbMathFunction } from "react-icons/tb";
import { GiBodyHeight } from "react-icons/gi";
import StatCard from "@/components/measurements/StatCard";
import ProfileModal from "@/components/measurements/ProfileModal";
import {
  calculateBMI,
  calculateBodyFat,
  getBMICategory,
  getBMIColor,
} from "@/utils/fitenssCalculations";

// Extended interface to include height and other measurements
interface ExtendedMeasurement extends ISingleMeasurement {
  height?: number;
  sex?: "male" | "female";
  age?: number;
}

export default function MeasurementWrapper({
  measurements,
  units,
  isClientSide,
  clientUnits,
  profileInfo,
}: {
  measurements: string;
  units: string;
  isClientSide?: boolean;
  clientUnits?: string;
  profileInfo?: string;
}) {
  const measurementsData: ExtendedMeasurement[] = measurements
    ? JSON.parse(measurements)
    : [];
  const userInfo: profileInformationInterface | null = profileInfo
    ? JSON.parse(profileInfo)
    : null;
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const heightModalRef = useRef<{ open: () => void; close: () => void } | null>(
    null
  );

  const hasData = measurementsData && measurementsData.length > 0;
  const sortedMeasurmentsByDate = measurementsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const closeModal = () => {
    modalRef.current?.close();
  };

  const closeHeightModal = () => {
    heightModalRef.current?.close();
  };

  const formatedUnits = JSON.parse(units) as unitsInterface;
  const formatedClientUnits = clientUnits
    ? (JSON.parse(clientUnits) as unitsInterface)
    : null;

  const role = isClientSide
    ? { roleName: "client" as const, deleteHandler: deleteMeasurement }
    : { roleName: "trainer" as const };

  // Unit conversion logic
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

    // Height unit conversion if needed
    if (formatedUnits.height === "cm" && formatedClientUnits.height === "ft") {
      measurementsData.forEach((measurement) => {
        if (measurement.height) {
          measurement.height = +(measurement.height * 0.0328084).toFixed(2); // cm to feet
        }
      });
    } else if (
      formatedUnits.height === "ft" &&
      formatedClientUnits.height === "cm"
    ) {
      measurementsData.forEach((measurement) => {
        if (measurement.height) {
          measurement.height = +(measurement.height * 30.48).toFixed(1); // feet to cm
        }
      });
    }

    // Other body measurements conversion
    if (
      formatedUnits.bodyMeasurement === "cm" &&
      formatedClientUnits.bodyMeasurement === "in"
    ) {
      measurementsData.forEach((measurement) => {
        Object.keys(measurement).forEach((key) => {
          if (
            key !== "date" &&
            key !== "weight" &&
            key !== "height" &&
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
            key !== "height" &&
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

  const latestMeasurement = hasData ? sortedMeasurmentsByDate[0] : null;
  const previousMeasurement =
    hasData && sortedMeasurmentsByDate.length > 1
      ? sortedMeasurmentsByDate[1]
      : null;

  // Use either stored height or user input height
  const currentHeight = latestMeasurement?.height || userInfo?.height;
  const currentSex = userInfo?.sex;
  const currentAge = userInfo?.age;

  // Calculate metrics if we have the necessary data
  const currentWeight = latestMeasurement?.weight || 0;
  const bmi = calculateBMI(formatedUnits, currentWeight, currentHeight);
  const bodyFat = calculateBodyFat(bmi, currentAge, currentSex);

  // Calculate changes if previous data exists
  const previousWeight = previousMeasurement?.weight || null;
  const weightChange =
    previousWeight !== null ? currentWeight - previousWeight : null;

  const previousHeight = previousMeasurement?.height || null;
  const previousBMI =
    previousWeight && previousHeight
      ? calculateBMI(formatedUnits, previousWeight, previousHeight)
      : null;
  const bmiChange = previousBMI !== null ? bmi - previousBMI : null;

  return (
    <>
      <ClientSectionWraper
        title="Body Measurements"
        Icon={<LuRuler className="w-6 h-6 text-blue-400" />}
        additionaTitleComponent={
          hasData && (
            <div className="flex flex-col justify-between items-start sm:items-end gap-3 sm:gap-4 mb-6 sm:mb-8">
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
              {isClientSide && (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => modalRef.current?.open()}
                    className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MdAddCircleOutline className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
                    Add Measurement
                  </button>
                  <button
                    onClick={() => heightModalRef.current?.open()}
                    className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm sm:text-base rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <GiBodyHeight className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
                    Update Profile
                  </button>
                </div>
              )}
            </div>
          )
        }
      >
        {/* Stats Cards */}
        {hasData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Weight Card */}
            <StatCard
              title="Weight"
              value={currentWeight}
              icon={<FaWeight />}
              unit={formatedUnits?.weight || ""}
              change={weightChange}
              iconColor="text-blue-400"
            />

            {/* Height Card */}
            <StatCard
              title="Height"
              value={currentHeight || "N/A"}
              icon={<FaRulerVertical />}
              unit={
                currentHeight && currentHeight > 0
                  ? formatedUnits?.height || ""
                  : ""
              }
              iconColor="text-purple-400"
            />

            {/* BMI Card */}
            <StatCard
              title="BMI"
              value={bmi || "N/A"}
              icon={<TbMathFunction />}
              change={bmiChange}
              iconColor="text-green-400"
              additionalContent={
                bmi > 0 ? (
                  <span
                    className={`text-xs px-2 py-1 rounded-full mt-1 inline-block w-fit ${getBMIColor(bmi)}`}
                  >
                    {getBMICategory(bmi)}
                  </span>
                ) : null
              }
            />

            {/* Body Fat Card */}
            <StatCard
              title="Body Fat"
              value={bodyFat || "N/A"}
              icon={<BiLineChart />}
              unit={bodyFat > 0 ? "%" : ""}
              iconColor="text-yellow-400"
            />
          </div>
        )}

        {/* Table Section */}
        {hasData && (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden mt-6">
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
                ? "Add your first measurement! "
                : "This client hasn't recorded any body measurements yet. Measurements will appear here once they're added."}
            </p>
            {isClientSide && (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => modalRef.current?.open()}
                  className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MdAddCircleOutline className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
                  Add Measurement
                </button>
                <button
                  onClick={() => heightModalRef.current?.open()}
                  className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm sm:text-base rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <GiBodyHeight className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
                  Update Profile
                </button>
              </div>
            )}
          </div>
        )}
      </ClientSectionWraper>

      {/* Measurement Modal */}
      {isClientSide && (
        <ModalUnstyled ref={modalRef} isBackDropClickClose={false}>
          <div className="w-[95%] sm:w-auto mx-auto">
            <MeasurementsForm
              TABLE_HEAD={TABLE_HEAD}
              units={formatedUnits}
              closeModal={closeModal}
            />
          </div>
        </ModalUnstyled>
      )}

      {/* Height & Profile Modal */}
      {isClientSide && (
        <ModalUnstyled ref={heightModalRef} isBackDropClickClose={false}>
          <ProfileModal
            userInfo={userInfo}
            formatedUnits={formatedUnits}
            onClose={closeHeightModal}
          />
        </ModalUnstyled>
      )}
    </>
  );
}
