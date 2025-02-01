"use client";

import { MdAddCircleOutline } from "react-icons/md";

import { useState, useRef } from "react";
import ProfileWrapper from "./ProfileWrapper";
import ModalUnstyled from "../Modal";
import TablePaginationComponent from "@/components/measurements/TablePagination";
import MeasurementsForm from "@/components/measurements/MeasurementsForm";
import TableRowPopper from "@/components/measurements/TableRowPopper";
export default function Measurement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  // Avoid a layout jump when reaching the last page with empty rows.
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
            ).map((data) => (
              <TableRowPopper key={data.id} id={data.id}>
                {Object.keys(data)
                  .filter((measurementData) => measurementData !== "id")
                  .map((key) => (
                    <td
                      className="p-4 border-b border-r border-[#aaaabc]/50 "
                      key={key}
                    >
                      {data[key as keyof typeof data]}
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
          <MeasurementsForm TABLE_HEAD={TABLE_HEAD} />
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

const TABLE_ROWS = [
  {
    id: "1",
    date: "23/04/18",
    weight: "6438",
    chest: "70",
    waist: "70",
    leftCalf: "35",
    rightCalf: "36",
    leftThigh: "50",
    rightThigh: "51",
    buttocks: "95",
    leftBicep: "32",
    rightBicep: "33",
  },
  {
    id: "2",
    date: "23/04/18",
    weight: "78",
    chest: "72",
    waist: "69",
    leftCalf: "35.5",
    rightCalf: "36.5",
    leftThigh: "50.5",
    rightThigh: "51.5",
    buttocks: "96",
    leftBicep: "32.5",
    rightBicep: "33.5",
  },
  {
    id: "3",
    date: "23/04/18",
    weight: "65",
    chest: "74",
    waist: "68",
    leftCalf: "36",
    rightCalf: "37",
    leftThigh: "51",
    rightThigh: "52",
    buttocks: "97",
    leftBicep: "33",
    rightBicep: "34",
  },
  {
    id: "4",
    date: "23/04/18",
    weight: "76",
    chest: "75",
    waist: "67",
    leftCalf: "36.5",
    rightCalf: "37.5",
    leftThigh: "51.5",
    rightThigh: "52.5",
    buttocks: "98",
    leftBicep: "33.5",
    rightBicep: "34.5",
  },
  {
    id: "6",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "7",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "8",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "9",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "10",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "11",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "12",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "13",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
  {
    id: "14",
    date: "23/04/18",
    weight: "76",
    chest: "76",
    waist: "66",
    leftCalf: "37",
    rightCalf: "38",
    leftThigh: "52",
    rightThigh: "53",
    buttocks: "99",
    leftBicep: "34",
    rightBicep: "35",
  },
];
