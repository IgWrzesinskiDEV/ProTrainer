"use client";

import { Popper } from "@mui/base/Popper";
import { useState, useTransition } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";

import { CircularProgress } from "@mui/material";
export default function CustomPopper({
  children,
  id,
  onPopperClickHandler,
  isDelete,
  trClassName,
}: {
  children: React.ReactNode;

  id: string;
  isDelete: boolean;
  trClassName: string;
  onPopperClickHandler: (id: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDelete) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    } else if (anchorEl) {
      return;
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const open = isPending || Boolean(anchorEl);
  const color = isDelete ? "red-500" : "green-500";
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <tr
        key={id}
        //aria-describedby={id2}
        className={`${trClassName} ${anchorEl && "animate-pulse"}`}
        onClick={handleClick}
      >
        {children}

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          className="flex justify-center items-center"
          placement="right"
        >
          <div
            className={`w-0 h-0 
    border-t-[5px] border-t-transparent
    border-r-[7.5px] border-r-red-500
    border-b-[5px] border-b-transparent`}
          />
          <button
            className={` z-50 rounded-lg w-12 h-12  p-3 border border-solid flex items-center justify-center border-red-500 bg-background text-stone-100`}
            onClick={() => startTransition(() => onPopperClickHandler(id))}
            type="button"
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={20} className={`text-${color}`} />
            ) : isDelete ? (
              <MdOutlineDelete className="text-2xl text-center text-red-500" />
            ) : (
              <FaCheck className="text-2xl text-center text-green-500" />
            )}
          </button>
        </Popper>
      </tr>
    </ClickAwayListener>
  );
}
