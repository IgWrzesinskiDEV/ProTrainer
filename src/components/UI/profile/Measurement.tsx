"use client";

import { MdAddCircleOutline } from "react-icons/md";

import { useState, useRef } from "react";
import ProfileWrapper from "./ProfileWrapper";
import ModalUnstyled from "../Modal";
import TablePaginationComponent from "@/components/measurements/TablePagination";
import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import TableRowPopper from "@/components/measurements/TableRowPopper";
import { ISingleMeasurement } from "@/lib/models/measurement.model";
export default function Measurement({
  measurementsData,
  units,
}: {
  measurementsData: string;
  units: string;
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);

  const TABLE_ROWS = JSON.parse(measurementsData);
  const userUnits = JSON.parse(units);
  console.log(userUnits);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TABLE_ROWS.length) : 0;

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
  return (
    <ProfileWrapper title="Measurement">
      <div className="flex flex-col gap-3 w-full items-center justify-center">
        <table className="w-full  table-auto text-left border-2 border-collapse border-[#aaaabc]/50  ">
          <thead>
            <tr className="text-background bg-blue-500/70   text-stone-100 text-lg">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-r  border-[#aaaabc]/50  p-4"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? TABLE_ROWS.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : TABLE_ROWS
            ).map((data: ISingleMeasurement) => (
              <TableRowPopper key={data._id} id={data._id}>
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
                          key !== "mesurementDate" &&
                          userUnits.bodyMeasurement}
                      </span>
                    </td>
                  ))}
              </TableRowPopper>
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
                TABLE_ROWS={TABLE_ROWS}
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
