"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { LuInfo, LuCalendarDays } from "react-icons/lu";

import type { ISingleMeasurement } from "@/lib/models/measurement.model";
import type { unitsInterface } from "@/interfaces/user/IUser";
import CustomPopper from "../UI/Popper";
import TablePaginationComponent from "./TablePagination";
import camelize from "@/utils/camelizeString";
import { cn } from "@/lib/twMergeUtill";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";

export default function MeasurementsTable({
  TABLE_HEAD,
  measurementsData,
  units,
  role,
}: {
  TABLE_HEAD: string[];
  measurementsData: ISingleMeasurement[];
  units: string;
  role:
    | { roleName: "trainer" }
    | { roleName: "client"; deleteHandler: (id: string) => Promise<void> };
}) {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    keyToSort: "date",
    order: "desc",
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  //const rawTableRows = measurementsData ? JSON.parse(measurementsData) : [];
  const rawTableRows = measurementsData || [];
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

  const toggleDateSort = () => {
    setSort((prevState) => ({
      keyToSort: "date",
      order: prevState.order === "asc" ? "desc" : "asc",
    }));
  };

  const toggleExpandRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const paginatedData =
    rowsPerPage > 0
      ? sortedArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : sortedArray;

  return (
    <div className="space-y-4 sm:space-y-6 ">
      {/* Mobile Sort Controls */}
      <div className="md:hidden flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {sortedArray.length}{" "}
          {sortedArray.length === 1 ? "measurement" : "measurements"}
        </div>
        <button
          onClick={toggleDateSort}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            sort.keyToSort === "date"
              ? "bg-blue-500/20 text-blue-300"
              : "bg-gray-700/50 text-gray-300"
          }`}
          aria-label={`Sort by date ${
            sort.order === "asc" ? "ascending" : "descending"
          }`}
        >
          <LuCalendarDays size={16} />
          <span>Date</span>
          {sort.keyToSort === "date" &&
            (sort.order === "asc" ? (
              <IoMdArrowDropup className="text-blue-300" />
            ) : (
              <IoMdArrowDropdown className="text-blue-300" />
            ))}
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="relative overflow-hidden rounded-xl border border-gray-700/50 hidden md:block">
        <div className="overflow-x-auto planScrollbar">
          <table className="w-full border-collapse overflow-hidden">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-blue-900/30 to-blue-800/20">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    onClick={() => handleSortClick(head)}
                    className="p-3 sm:p-4 text-left"
                  >
                    <button className="flex items-center gap-1 sm:gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider hover:text-blue-200 transition-colors">
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
            <tbody className="divide-y divide-gray-700/50 ">
              {paginatedData.map((data: ISingleMeasurement, index) => {
                const TableRow = ({
                  children,
                }: {
                  children: React.ReactNode;
                }) => (
                  <AnimatePresence>
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-blue-900/10 transition-all duration-200 "
                    >
                      {children}
                    </motion.tr>{" "}
                  </AnimatePresence>
                );

                const cells = Object.keys(data)
                  .filter((key) => key !== "_id")
                  .map((key) => (
                    <td
                      key={key}
                      className="p-3 sm:p-4 text-sm first:font-medium"
                    >
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
                  <td colSpan={TABLE_HEAD.length} className="p-3 sm:p-4" />
                </tr>
              )}

              {sortedArray.length === 0 && (
                <tr>
                  <td
                    colSpan={TABLE_HEAD.length}
                    className="py-12 sm:py-16 text-center"
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
            </tbody>
          </table>
        </div>

        {/* Table overlay gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {paginatedData.length > 0 ? (
          paginatedData.map((data: ISingleMeasurement, index) => (
            <motion.div
              key={data._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-900/30 to-blue-800/20 cursor-pointer"
                onClick={() => toggleExpandRow(data._id)}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-blue-300">
                    {formatDate(data.date)}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-white font-medium">
                      {data.weight}
                    </span>
                    <span className="text-xs text-gray-400">
                      {userUnits.weight}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className={`p-1.5 rounded-full ${
                      expandedRow === data._id
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-gray-700/50 text-gray-400"
                    }`}
                    aria-label={
                      expandedRow === data._id ? "Hide details" : "View details"
                    }
                  >
                    <LuInfo size={18} />
                  </button>
                </div>
              </div>

              {expandedRow === data._id && (
                <motion.div
                  className="p-3 border-t border-gray-700/50 z-0"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(data)
                      .filter(
                        (key) =>
                          key !== "_id" && key !== "date" && key !== "weight"
                      )
                      .map((key) => (
                        <div
                          key={key}
                          className="bg-gray-800/80 p-2 rounded-md"
                        >
                          <div className="text-xs text-gray-400 capitalize mb-1">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-white">
                              {data[key as keyof typeof data]}
                            </span>
                            <span className="text-xs text-gray-400">
                              {userUnits.bodyMeasurement}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  {role.roleName === "client" && (
                    <div className="mt-3 flex justify-end">
                      <ButtonWithLoading
                        onClick={() =>
                          startTransition(() => role.deleteHandler(data._id))
                        }
                        isDisabled={isPending}
                        isLoading={isPending}
                        size={18}
                        className="text-xs  text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-md transition-colors"
                      >
                        Delete
                      </ButtonWithLoading>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="py-10 text-center bg-gray-800/50 border border-gray-700/50 rounded-lg">
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
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 sm:mt-6">
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
