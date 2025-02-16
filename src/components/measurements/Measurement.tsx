"use client";

import type React from "react";

import { useState, useRef } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import ProfileWrapper from "../profile/ProfileWrapper";
import ModalUnstyled from "../UI/Modal";
import TablePaginationComponent from "@/components/measurements/TablePagination";
import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import CustomPopper from "../UI/Popper";
import { deleteMeasurement } from "@/actions/measurements.action";
import type { ISingleMeasurement } from "@/lib/models/measurement.model";
import { cn } from "@/lib/twMergeUtill";
import camelize from "@/utils/camelizeString";

export default function Measurement({
  measurementsData,
  units,
}: {
  measurementsData: string;
  units: string;
}) {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    keyToSort: "date",
    order: "asc",
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);

  const getSortedArray = (array: ISingleMeasurement[]) => {
    if (sort.order === "asc") {
      return array.sort((a: ISingleMeasurement, b: ISingleMeasurement) =>
        a[sort.keyToSort as keyof ISingleMeasurement] >
        b[sort.keyToSort as keyof ISingleMeasurement]
          ? 1
          : -1
      );
    }
    return array.sort((a: ISingleMeasurement, b: ISingleMeasurement) =>
      a[sort.keyToSort as keyof ISingleMeasurement] >
      b[sort.keyToSort as keyof ISingleMeasurement]
        ? -1
        : 1
    );
  };

  const rawTableRows = JSON.parse(measurementsData);
  const sortedArray = getSortedArray(rawTableRows);
  const userUnits = JSON.parse(units);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedArray.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortClick = (head: string) => {
    const camelizedHead = camelize(head);
    setSort((prevState) => ({
      keyToSort: camelizedHead,
      order:
        prevState.keyToSort === camelizedHead
          ? prevState.order === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick(head)}
                  >
                    <div className="flex items-center">
                      {head}
                      {sort.keyToSort === camelize(head) && (
                        <IoMdArrowDropup
                          className={cn(
                            "ml-1",
                            sort.order === "desc" && "rotate-180"
                          )}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {(rowsPerPage > 0
                ? sortedArray.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : sortedArray
              ).map((data: ISingleMeasurement) => (
                <CustomPopper
                  isDelete
                  onPopperClickHandler={deleteMeasurement}
                  trClassName="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  key={data._id}
                  id={data._id}
                >
                  {Object.keys(data)
                    .filter((measurementData) => measurementData !== "_id")
                    .map((key) => (
                      <td
                        className="p-3 text-sm text-gray-700 dark:text-gray-300"
                        key={key}
                      >
                        {data[key as keyof typeof data]}{" "}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {key === "weight" && userUnits.weight}
                          {key !== "weight" &&
                            key !== "date" &&
                            userUnits.bodyMeasurement}
                        </span>
                      </td>
                    ))}
                </CustomPopper>
              ))}
              {emptyRows > 0 && (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-3" />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <TablePaginationComponent
            TABLE_HEAD={TABLE_HEAD}
            TABLE_ROWS={sortedArray}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <ModalUnstyled ref={modalRef}>
        <MeasurementsForm TABLE_HEAD={TABLE_HEAD} units={userUnits} />
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
