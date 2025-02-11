"use client";

import { MdAddCircleOutline } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";

import { useState, useRef } from "react";
import ProfileWrapper from "../profile/ProfileWrapper";
import ModalUnstyled from "../UI/Modal";
import TablePaginationComponent from "@/components/measurements/TablePagination";
import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import CustomPopper from "../UI/Popper";
import { deleteMeasurement } from "@/actions/measurements.action";
import { ISingleMeasurement } from "@/lib/models/measurement.model";
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
      console.log("asc sorting");
      return array.sort((a: ISingleMeasurement, b: ISingleMeasurement) =>
        a[sort.keyToSort as keyof ISingleMeasurement] >
        b[sort.keyToSort as keyof ISingleMeasurement]
          ? 1
          : -1
      );
    }
    console.log("desc sorting");
    return array.sort((a: ISingleMeasurement, b: ISingleMeasurement) =>
      a[sort.keyToSort as keyof ISingleMeasurement] >
      b[sort.keyToSort as keyof ISingleMeasurement]
        ? -1
        : 1
    );
  };
  const rawTableRows = JSON.parse(measurementsData);
  const sortedArray = getSortedArray(rawTableRows);
  console.log(sortedArray);
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
    setRowsPerPage(parseInt(event.target.value, 10));
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
  console.log(sort);
  return (
    <ProfileWrapper title="Measurement">
      <div className="flex flex-col gap-3 w-full items-center justify-center">
        <table className="w-full  table-fixed text-left border-2 border-collapse border-[#aaaabc]/50  ">
          <thead>
            <tr className="text-background bg-blue-500/70   text-stone-100 text-lg">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-r  border-[#aaaabc]/50 cursor-pointer select-none  p-4"
                  onClick={() => handleSortClick(head)}
                >
                  <div className="flex items-center justify-between w-full ">
                    {head}
                    {sort.keyToSort === camelize(head) && (
                      <IoMdArrowDropup
                        className={cn(
                          "text-2xl",
                          sort.order === "desc" && "rotate-180"
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
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
                trClassName="hover:bg-blue-500/20 transition-colors relative duration-75 cursor-pointer "
                key={data._id}
                id={data._id}
              >
                {Object.keys(data)
                  .filter((measurementData) => measurementData !== "_id")
                  .map((key) => (
                    <td
                      className="p-4 border-b border-r text-lg border-[#aaaabc]/50 "
                      key={key}
                    >
                      {data[key as keyof typeof data]}{" "}
                      <span className="text-xs  ">
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
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <TablePaginationComponent
                TABLE_HEAD={TABLE_HEAD}
                TABLE_ROWS={sortedArray}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>

        <button className="w-10 " onClick={() => modalRef.current?.open()}>
          <MdAddCircleOutline className="text-4xl text-blue-500" />
        </button>
        <ModalUnstyled ref={modalRef}>
          <MeasurementsForm TABLE_HEAD={TABLE_HEAD} units={userUnits} />
        </ModalUnstyled>
      </div>
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
