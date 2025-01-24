"use client";

import clsx from "clsx";

import {
  TablePagination,
  TablePaginationProps,
} from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { MdAddCircleOutline } from "react-icons/md";

import { useState, forwardRef } from "react";
import ProfileWrapper from "./ProfileWrapper";

export default function Measurement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
              <tr key={data.id}>
                {Object.keys(data)
                  .filter((measurementData) => measurementData !== "id")
                  .map((key) => (
                    <td
                      className="p-4 border-b border-r border-[#aaaabc]/50"
                      key={key}
                    >
                      {data[key as keyof typeof data]}
                    </td>
                  ))}
              </tr>
            ))}
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
            {/* {TABLE_ROWS.map((data) => {
              const classes = "p-4 border-b border-r border-[#aaaabc]/50";

              return (
                <tr key={data.id}>
                  {Object.keys(data)
                    .filter((measurementData) => measurementData !== "id")
                    .map((key) => (
                      <td className={classes} key={key}>
                        {data[key as keyof typeof data]}
                      </td>
                    ))}
                </tr>
              );
            })} */}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={TABLE_HEAD.length}
                count={TABLE_ROWS.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                    slots: {
                      firstPageIcon: FirstPageRoundedIcon,
                      lastPageIcon: LastPageRoundedIcon,
                      nextPageIcon: ChevronRightRoundedIcon,
                      backPageIcon: ChevronLeftRoundedIcon,
                    },
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
        <button className="w-10 ">
          <MdAddCircleOutline className="text-4xl text-blue-500" />
        </button>
      </div>
    </ProfileWrapper>
  );
}
const resolveSlotProps = (fn: unknown, args: unknown) =>
  typeof fn === "function" ? fn(args) : fn;

const CustomTablePagination = forwardRef<
  HTMLTableCellElement,
  TablePaginationProps
>((props, ref) => {
  CustomTablePagination.displayName = "CustomTablePagination";
  return (
    <TablePagination
      ref={ref}
      {...props}
      className={clsx("CustomTablePagination p-4 ", props.className)}
      slotProps={{
        ...props.slotProps,
        select: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.select,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "font-sans py-[2px] pl-[4px] pr-[2px]  border border-solid border-zinc-200 dark:border-[#303740] rounded-[6px] bg-transparent hover:bg-zinc-20 hover:dark:bg-backgroundLite focus:outline-0 [&>button:focus]:ring-[3px] focus:border-blue-500 focus:dark:border-blue-500 focus:hover:border-blue-500 focus:hover:dark:border-blue-500 transition",
              resolvedSlotProps?.className
            ),
          };
        },
        actions: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.actions,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "flex gap-[6px] text-center [&>button]:my-0 [&>button]:p-0 [&>button]:flex [&>button]:items-center [&>button]:rounded-full [&>button]:bg-transparent [&>button]:border [&>button]:border-solid [&>button]:border-zinc-300 [&>button]:dark:border-[#303740] [&>button:hover]:dark:border-zinc-700 [&>button:hover]:bg-zinc-100 [&>button:hover]:border-zinc-400 [&>button:hover]:dark:bg-zinc-800 [&>button:focus]:outline-0 [&>button:focus]:ring-[2px] [&>button:focus]:border-blue-500 [&>button:focus]:dark:border-blue-500 [&>button:focus:hover]:border-blue-500 [&>button:focus:hover]:dark:border-blue-500 [&>button>svg]:text-[22px] [&>button:disabled]:opacity-[0.3] [&>button:disabled:hover]:bg-transparent [&>button:disabled:hover]:border-zinc-300 [&>button:disabled:hover]:dark:border-zinc-700",
              resolvedSlotProps?.className
            ),
          };
        },
        spacer: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.spacer,
            ownerState
          );

          return {
            ...resolvedSlotProps,
            className: clsx("hidden", resolvedSlotProps?.className),
          };
        },
        toolbar: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.toolbar,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "flex flex-col items-end gap-[8px] md:flex-row md:items-center ml-auto",
              resolvedSlotProps?.className
            ),
          };
        },
        selectLabel: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.selectLabel,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(" ml-auto m-0", resolvedSlotProps?.className),
          };
        },
        displayedRows: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.displayedRows,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx("m-0 ", resolvedSlotProps?.className),
          };
        },
      }}
    />
  );
});

const TABLE_ROWS = [
  {
    id: "1",
    week: "T1",
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
    week: "T2",
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
    week: "T3",
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
    week: "T4",
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
    week: "T5",
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
    week: "T5",
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
    week: "T5",
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
    week: "T5",
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
    week: "T5",
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
    week: "T5",
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
    week: "T5",
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
    week: "T5",
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
    week: "T5",
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

const TABLE_HEAD = [
  "Week",
  "Date",
  "Weight",
  "Chest",
  "Waist",
  "Left calf",
  "Right calf",
  "Left thigh",
  "Right thigh",
  "Buttocks",
  "Left bicep",
  "Right bicep",
];
