"use client";

import type React from "react";

import { Popper } from "@mui/base/Popper";
import { Fragment, useState, useTransition } from "react";
import { FaCheck } from "react-icons/fa";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { CircularProgress } from "@mui/material";
import type { Exercise } from "@/interfaces/workout/IWorkout";
import InputFloatingLabel from "../UI/input/InputWithFloatingLabel";

export default function PlansTablePopper({
  id,
  index,
  exercise,
  onPopperClickHandler,
}: {
  index: number;
  exercise: Exercise;
  id: string;
  onPopperClickHandler: (id?: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = isPending || Boolean(anchorEl);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <tr
        className={`
          ${index % 2 === 0 ? "bg-[#2A3142]/50" : "bg-transparent"}
          transition-colors duration-200 hover:bg-[#2A3142]
          cursor-pointer text-base
        `}
        onClick={handleClick}
      >
        <td className="py-4 px-4 text-left  font-medium text-white">
          {index + 1}
        </td>
        <td className="py-4 px-4 text-white">{exercise.name}</td>
        <td className="py-4 px-4 text-white font-mono">{exercise.tempo}</td>
        {exercise.weekData.map((week, weekIndex) => (
          <Fragment key={weekIndex}>
            <td className="py-4 px-4 text-center text-white bg-[#2A3142]/30">
              {week.trainerData}
            </td>
            <td className="py-4 px-4 text-center relative group">
              {anchorEl ? (
                // <input
                //   name={week.weekNumber.toString()}
                //   type="text"
                //   defaultValue={week?.clientData || ""}
                //   className="
                //     w-full bg-[#2A3142] rounded px-3 py-1.5
                //     text-white text-center
                //     focus:outline-none focus:ring-2 focus:ring-[#4285F4]
                //     transition-all duration-200
                //     [appearance:textfield]
                //     [&::-webkit-outer-spin-button]:appearance-none
                //     [&::-webkit-inner-spin-button]:appearance-none
                //   "
                // />
                <InputFloatingLabel
                  label="Client data"
                  name={week.weekNumber.toString()}
                  forHTMLLabel={`${exercise.number}-${week.weekNumber}`}
                />
              ) : (
                <div
                  className={`
                  py-2 px-3 rounded
                  ${week.clientData ? "text-white" : "text-gray-500"}
                  group-hover:bg-[#2A3142] transition-colors duration-200
                `}
                >
                  {week.clientData || "Client data"}
                </div>
              )}
            </td>
          </Fragment>
        ))}

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          className="z-20 "
          placement="right"
        >
          <div className="flex items-center">
            <div
              className="w-0 h-0 
              border-t-[6px] border-t-transparent
              border-r-[8px] border-r-[#4285F4]
              border-b-[6px] border-b-transparent
            "
            />
            <button
              className={`
                ml-1 rounded-lg w-12 h-12 p-3
                border border-[#4285F4]
                bg-[#1E2330] text-white
                hover:bg-[#4285F4]/10
                transition-colors duration-200
                flex items-center justify-center
                disabled:opacity-50
              `}
              onClick={() => startTransition(() => onPopperClickHandler())}
              type="button"
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress size={20} className="text-[#4285F4]" />
              ) : (
                <FaCheck className="text-2xl text-[#4285F4]" />
              )}
            </button>
          </div>
        </Popper>
      </tr>
    </ClickAwayListener>
  );
}
