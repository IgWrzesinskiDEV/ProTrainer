"use client";

import type React from "react";

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
        className={`${trClassName} ${
          anchorEl ? "bg-blue-50 dark:bg-blue-900/20" : ""
        } cursor-pointer relative`}
        onClick={handleClick}
      >
        {children}

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          className="z-20"
          placement="right"
        >
          <div className="flex items-center">
            <div
              className={`w-0 h-0 
                border-t-[6px] border-t-transparent
                border-r-[9px] border-r-${color}
                border-b-[6px] border-b-transparent
                drop-shadow-md
              `}
            />
            <button
              className={`
                z-50 rounded-lg w-12 h-12 p-3 
                border border-solid flex items-center justify-center 
                border-${color} bg-white dark:bg-gray-800 
                shadow-lg hover:shadow-xl transition-all duration-300
                transform hover:scale-105 active:scale-95
              `}
              onClick={() => startTransition(() => onPopperClickHandler(id))}
              type="button"
              disabled={isPending}
              aria-label={isDelete ? "Delete measurement" : "Confirm action"}
            >
              {isPending ? (
                <CircularProgress size={24} className={`text-${color}`} />
              ) : isDelete ? (
                <MdOutlineDelete className="text-2xl text-center text-red-500" />
              ) : (
                <FaCheck className="text-2xl text-center text-green-500" />
              )}
            </button>
          </div>
        </Popper>
      </tr>
    </ClickAwayListener>
  );
}
