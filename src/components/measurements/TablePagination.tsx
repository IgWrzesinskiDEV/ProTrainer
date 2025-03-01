import type React from "react";
import { forwardRef } from "react";
import {
  TablePagination as TablePaginationMui,
  type TablePaginationProps,
} from "@mui/base/TablePagination";
import clsx from "clsx";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { ISingleMeasurement } from "@/lib/models/measurement.model";

interface TablePaginationComponentProps {
  TABLE_HEAD: string[];
  TABLE_ROWS: ISingleMeasurement[];
  rowsPerPage: number;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TablePaginationComponent({
  TABLE_HEAD,
  TABLE_ROWS,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: TablePaginationComponentProps) {
  return (
    <CustomTablePagination
      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
      colSpan={TABLE_HEAD.length}
      className="ml-auto"
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
    <TablePaginationMui
      ref={ref}
      {...props}
      slots={{ root: "div" }}
      className={clsx("CustomTablePagination", props.className)}
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
              "font-sans py-2 px-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
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
              "flex items-center gap-2 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:w-9 [&>button]:h-9 [&>button]:rounded-md [&>button]:border  [&>button]:border-gray-700  [&>button]:bg-gray-800  [&>button]:text-gray-300  [&>button:hover]:bg-blue-900/20  [&>button:hover]:border-blue-700 [&>button:focus]:outline-none [&>button:focus]:ring-2 [&>button:focus]:ring-blue-500 [&>button:focus]:border-blue-500 [&>button>svg]:text-[20px] [&>button:disabled]:opacity-40 [&>button:disabled]:cursor-not-allowed  [&>button:disabled:hover]:bg-gray-800  [&>button:disabled:hover]:border-gray-700 [&>button]:transition-all [&>button]:duration-200",
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
              "flex flex-col sm:flex-row items-end sm:items-center justify-end gap-4 ml-auto bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-sm",
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
            className: clsx(
              "text-gray-400 font-medium m-0",
              resolvedSlotProps?.className
            ),
          };
        },
        displayedRows: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.displayedRows,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "text-gray-400 font-medium m-0",
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});
