"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { IoMdArrowDropup } from "react-icons/io";

import type { ISingleMeasurement } from "@/lib/models/measurement.model";
import type { unitsInterface } from "@/interfaces/user/IUser";
import CustomPopper from "../UI/Popper";
import TablePaginationComponent from "./TablePagination";
import camelize from "@/utils/camelizeString";
import { cn } from "@/lib/twMergeUtill";

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
    order: "desc",
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd.MM.yyyy");
    } catch {
      return dateString;
    }
  };

  const rawTableRows = measurementsData ? JSON.parse(measurementsData) : [];
  const sortedArray = getSortedArray(rawTableRows);
  const userUnits: unitsInterface = JSON.parse(units);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedArray.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    //setIsLoading(true);
    setPage(newPage);
    //setTimeout(() => setIsLoading(false), 300); // Simulate loading
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //setIsLoading(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    //setTimeout(() => setIsLoading(false), 300); // Simulate loading
  };

  const handleSortClick = (head: string) => {
    //setIsLoading(true);
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
    //setTimeout(() => setIsLoading(false), 300); // Simulate loading
  };

  return (
    <div className="space-y-6 ">
      <div className="relative overflow-hidden  rounded-xl border border-gray-700/50">
        <div className="overflow-x-auto planScrollbar">
          <table className="w-full border-collapse  overflow-hidden">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-blue-900/30 to-blue-800/20">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    onClick={() => handleSortClick(head)}
                    className="p-4 text-left"
                  >
                    <button className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider hover:text-blue-200 transition-colors">
                      {head}
                      <motion.div
                        animate={{
                          rotate:
                            sort.keyToSort === camelize(head)
                              ? sort.order === "desc"
                                ? 180
                                : 0
                              : 0,
                        }}
                        transition={{ type: "spring", bounce: 0.3 }}
                      >
                        <IoMdArrowDropup
                          className={cn(
                            "text-blue-400 opacity-0 transition-opacity duration-200",
                            sort.keyToSort === camelize(head) && "opacity-100"
                          )}
                        />
                      </motion.div>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y  divide-gray-700/50">
              <AnimatePresence mode="wait">
                {(rowsPerPage > 0
                  ? sortedArray.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : sortedArray
                ).map((data: ISingleMeasurement, index) => {
                  const TableRow = ({
                    children,
                  }: {
                    children: React.ReactNode;
                  }) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-blue-900/10 transition-all duration-200"
                    >
                      {children}
                    </motion.tr>
                  );

                  const cells = Object.keys(data)
                    .filter((key) => key !== "_id")
                    .map((key) => (
                      <td key={key} className="p-4 text-sm first:font-medium">
                        <div className="flex items-baseline gap-2">
                          <span className="text-gray-200 group-hover:text-white transition-colors">
                            {key === "date"
                              ? formatDate(data[key])
                              : data[key as keyof typeof data]}
                          </span>
                          {key !== "date" && (
                            <span className="text-xs text-gray-400">
                              {key === "weight"
                                ? userUnits.weight
                                : userUnits.bodyMeasurement}
                            </span>
                          )}
                        </div>
                      </td>
                    ));

                  return role.roleName === "client" ? (
                    <CustomPopper
                      key={data._id}
                      isDelete
                      onPopperClickHandler={role.deleteHandler}
                      trClassName="group hover:bg-blue-900/10 transition-all duration-200"
                      id={data._id}
                    >
                      {cells}
                    </CustomPopper>
                  ) : (
                    <TableRow key={data._id}>{cells}</TableRow>
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
                      className="py-16 text-center"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="p-3 rounded-full bg-blue-500/10">
                            <svg
                              className="w-6 h-6 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 font-medium">
                            No measurements found
                          </p>
                          <p className="text-sm text-gray-500">
                            {role.roleName === "client"
                              ? "Add your first measurement to start tracking progress"
                              : " No measurements recorded yet"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Table overlay gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Pagination */}
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
    </div>
  );
}
