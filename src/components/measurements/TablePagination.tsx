import { forwardRef } from "react";
import {
  TablePagination as TablePaginationMui,
  TablePaginationProps,
} from "@mui/base/TablePagination";
import clsx from "clsx";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { ISingleMeasurement } from "@/lib/models/measurement.model";
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
              "font-sans py-[2px] pl-[4px] pr-[2px]  border border-solid border-[#303740] rounded-[6px] bg-backgroundLite  hover:bg-backgroundLite focus:outline-0 [&>button:focus]:ring-[3px]  focus:border-blue-500  focus:hover:border-blue-500 transition",
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
              "flex gap-[6px] text-center [&>button]:my-0 [&>button]:p-0 [&>button]:flex [&>button]:items-center [&>button]:rounded-full [&>button]:bg-transparent [&>button]:border [&>button]:border-solid  [&>button]:border-[#303740] [&>button:hover]:border-zinc-700   [&>button:hover]:bg-zinc-800 [&>button:focus]:outline-0 [&>button:focus]:ring-[2px]  [&>button:focus]:border-blue-500 [&>button:focus:hover]:border-blue-500  [&>button>svg]:text-[22px] [&>button:disabled]:opacity-[0.3] [&>button:disabled:hover]:bg-transparent  [&>button:disabled:hover]:border-zinc-700",
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
