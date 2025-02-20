"use client";

import * as React from "react";
import { Checkbox } from "@base-ui-components/react/checkbox";
import { saveSingleDayRestDay } from "@/actions/trainerClients.actions";
import type { WeekDays } from "@/interfaces/workout/IWorkout";

export default function RestDayCheckBox({
  isRestDay,
  planId,
  weekDay,
  checkRestDayHandler,
}: {
  isRestDay: boolean;
  planId: string;
  weekDay: WeekDays;
  checkRestDayHandler: (checked: boolean) => void;
}) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <label className="group relative flex items-center gap-3 text-base text-white/90 select-none cursor-pointer">
      <div className="relative">
        <Checkbox.Root
          checked={isRestDay}
          disabled={isPending}
          onClick={() =>
            startTransition(() => saveSingleDayRestDay(weekDay, planId))
          }
          onCheckedChange={checkRestDayHandler}
          className="flex disabled:opacity-55 size-[18px] pointer-events-auto items-center justify-center 
            rounded-[4px] outline-none transition-all duration-200 ease-in-out
            hover:shadow-md hover:shadow-blue-500/20
            active:scale-95
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 
            data-[checked]:bg-blue-500 data-[checked]:border-blue-500
            data-[unchecked]:border-2 data-[unchecked]:border-gray-400 data-[unchecked]:hover:border-blue-400
            data-[unchecked]:bg-gray-700/50
            disabled:cursor-not-allowed disabled:hover:border-gray-400
            disabled:data-[checked]:bg-blue-500/50 disabled:data-[checked]:border-blue-500/50"
        >
          <Checkbox.Indicator
            className="flex text-white data-[unchecked]:hidden
              transition-all duration-200 ease-out
              data-[state=checked]:scale-100 data-[state=unchecked]:scale-75"
          >
            <CheckIcon className="size-3.5" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {isPending && (
          <div className="absolute inset-0 bg-gray-700/50 rounded-[4px] animate-pulse" />
        )}
      </div>
      <span
        className={`transition-opacity duration-200 font-medium ${
          isPending ? "opacity-50" : "opacity-100"
        }`}
      >
        Rest Day
      </span>
    </label>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
