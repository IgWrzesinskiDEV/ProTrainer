"use client";

import type React from "react";

import type { ISingleMeasurement } from "@/lib/models/measurement.model";
import CustomPopper from "../UI/Popper";
import TablePaginationComponent from "./TablePagination";
import { IoMdArrowDropup } from "react-icons/io";
import camelize from "@/utils/camelizeString";
import { cn } from "@/lib/twMergeUtill";
import { useState } from "react";
import type { unitsInterface } from "@/interfaces/user/IUser";

export default function MeasurementsTable({
  TABLE_HEAD,
  measurementsData,
  units,
  role,
}: {
  TABLE_HEAD: string[];
  measurementsData: string;
  units: string;
  role:
    | { roleName: "trainer" }
    | { roleName: "client"; deleteHandler: (id: string) => void };
}) {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    keyToSort: "date",
    order: "asc",
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const userUnits: unitsInterface = JSON.parse(units);

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
    <>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-900/30">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider cursor-pointer border-b border-blue-800 transition-colors duration-200 hover:bg-blue-800/30"
                  onClick={() => handleSortClick(head)}
                >
                  <div className="flex items-center">
                    {head}
                    {sort.keyToSort === camelize(head) && (
                      <IoMdArrowDropup
                        className={cn(
                          "ml-1 text-blue-400 transition-transform duration-200",
                          sort.order === "desc" && "rotate-180"
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {(rowsPerPage > 0
              ? sortedArray.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : sortedArray
            ).map((data: ISingleMeasurement) => {
              return role.roleName === "client" ? (
                <CustomPopper
                  isDelete
                  onPopperClickHandler={role.deleteHandler}
                  trClassName="hover:bg-blue-900/10 transition-all duration-200"
                  key={data._id}
                  id={data._id}
                >
                  {Object.keys(data)
                    .filter((measurementData) => measurementData !== "_id")
                    .map((key) => (
                      <td className="p-4 text-sm text-gray-300" key={key}>
                        <div className="flex items-baseline">
                          <span className="font-medium">
                            {data[key as keyof typeof data]}
                          </span>{" "}
                          <span className="ml-1 text-xs text-gray-400">
                            {key === "weight" && userUnits.weight}
                            {key !== "weight" &&
                              key !== "date" &&
                              userUnits.bodyMeasurement}
                          </span>
                        </div>
                      </td>
                    ))}
                </CustomPopper>
              ) : (
                <tr
                  key={data._id}
                  className="hover:bg-blue-900/10 transition-all duration-200"
                >
                  {Object.keys(data)
                    .filter((measurementData) => measurementData !== "_id")
                    .map((key) => (
                      <td className="p-4 text-sm text-gray-300" key={key}>
                        <div className="flex items-baseline">
                          <span className="font-medium">
                            {data[key as keyof typeof data]}
                          </span>{" "}
                          <span className="ml-1 text-xs text-gray-400">
                            {key === "weight" && userUnits.weight}
                            {key !== "weight" &&
                              key !== "date" &&
                              userUnits.bodyMeasurement}
                          </span>
                        </div>
                      </td>
                    ))}
                </tr>
              );
            })}
            {emptyRows > 0 && (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4" />
              </tr>
            )}
            {sortedArray.length === 0 && (
              <tr>
                <td
                  colSpan={TABLE_HEAD.length}
                  className="p-8 text-center text-gray-400"
                >
                  No measurements found. Add your first measurement to start
                  tracking your progress.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <TablePaginationComponent
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={sortedArray}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
