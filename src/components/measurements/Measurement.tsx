"use client";

import type React from "react";

import { useRef } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import ProfileWrapper from "../profile/ProfileWrapper";
import ModalUnstyled from "../UI/Modal";

import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import { deleteMeasurement } from "@/actions/measurements.action";
import MeasurementsTable from "./MeasurementsTable";

export default function Measurement({
  measurementsData,
  units,
}: {
  measurementsData: string;
  units: string;
}) {
  // const [sort, setSort] = useState({
  //   keyToSort: "date",
  //   order: "asc",
  // });
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const formatedUnits = JSON.parse(units);

  //   if (sort.order === "asc") {
  //     return array.sort((a: ISingleMeasurement, b: ISingleMeasurement) =>
  //       a[sort.keyToSort as keyof ISingleMeasurement] >
  //       b[sort.keyToSort as keyof ISingleMeasurement]
  //         ? 1
  //         : -1
  //     );
  //   }
  //   return array.sort((a: ISingleMeasurement, b: ISingleMeasurement) =>
  //     a[sort.keyToSort as keyof ISingleMeasurement] >
  //     b[sort.keyToSort as keyof ISingleMeasurement]
  //       ? -1
  //       : 1
  //   );
  // };

  //const rawTableRows = JSON.parse(measurementsData);
  // const sortedArray = getSortedArray(rawTableRows);
  //const userUnits = JSON.parse(units);

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedArray.length) : 0;

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(Number.parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleSortClick = (head: string) => {
  //   const camelizedHead = camelize(head);
  //   setSort((prevState) => ({
  //     keyToSort: camelizedHead,
  //     order:
  //       prevState.keyToSort === camelizedHead
  //         ? prevState.order === "asc"
  //           ? "desc"
  //           : "asc"
  //         : "asc",
  //   }));
  // };

  return (
    <ProfileWrapper>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Measurements
          </h2>
          <button
            onClick={() => modalRef.current?.open()}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            <MdAddCircleOutline className="mr-2" />
            Add Measurement
          </button>
        </div>

        <MeasurementsTable
          measurementsData={measurementsData}
          TABLE_HEAD={TABLE_HEAD}
          units={units}
          role={{ roleName: "client", deleteHandler: deleteMeasurement }}
        />
      </div>
      <ModalUnstyled ref={modalRef}>
        <MeasurementsForm TABLE_HEAD={TABLE_HEAD} units={formatedUnits} />
      </ModalUnstyled>
    </ProfileWrapper>
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
