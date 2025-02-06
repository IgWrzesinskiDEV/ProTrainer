"use client";

import { Popper } from "@mui/base/Popper";
import { Fragment, useState, useTransition } from "react";

import { FaCheck } from "react-icons/fa";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";

import { CircularProgress } from "@mui/material";
interface ex {
  number: number;
  name: string;
  tempo: string;
  weekData: {
    week: number;
    coachData: string;
    userData: string;
  }[];
}
export default function PlansTablePopper({
  id,
  index,
  exercise,
  onPopperClickHandler,

  borderColor,
}: {
  index: number;
  exercise: ex;
  id: string;

  borderColor: string;

  onPopperClickHandler: (id: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      return;
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const open = isPending || Boolean(anchorEl);
  const color = "green-500";
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <tr
        className={`${
          index % 2 === 0 ? "bg-blue-500/70 " : "bg-blue-500/30"
        } text-nowrap text-base font-normal cursor-pointer
                   `}
        onClick={handleClick}
      >
        <td className={`border ${borderColor} px-2 py-1 text-center font-bold`}>
          {index + 1}
        </td>
        <td className={`border ${borderColor} px-2 py-1`}>{exercise.name}</td>
        <td className={`border ${borderColor} px-2 py-1`}>{exercise.tempo}</td>
        {exercise.weekData.map((week, weekIndex) => (
          <Fragment key={weekIndex}>
            <td
              key={weekIndex}
              className={`border ${borderColor} px-2 py-1 text-center`}
            >
              {week.coachData}
            </td>
            <td className={`border ${borderColor}  text-center max-w-16 w-16`}>
              {anchorEl ? (
                <input
                  type="text"
                  defaultValue={week?.userData || ""}
                  className=" bg-transparent  animate-pulse text-amber-500  w-16 font-bold  text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              ) : (
                week.userData || ""
              )}
            </td>
          </Fragment>
        ))}

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
    border-r-[7.5px] border-r-green-500
    border-b-[5px] border-b-transparent`}
          />
          <button
            className={` z-50 rounded-lg w-12 h-12  p-3 border border-solid flex items-center justify-center border-green-500 bg-background text-stone-100`}
            onClick={() => startTransition(() => onPopperClickHandler(id))}
            type="button"
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={20} className={`text-${color}`} />
            ) : (
              <FaCheck className="text-2xl text-center text-green-500" />
            )}
          </button>
        </Popper>
      </tr>
    </ClickAwayListener>
  );
}
