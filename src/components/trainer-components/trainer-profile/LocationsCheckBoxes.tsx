"use client";

import type * as React from "react";
import { Checkbox } from "@base-ui-components/react/checkbox";
import { CheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { useState } from "react";

interface IWorkingModes {
  onSite: boolean;
  online: boolean;
}

export default function LocationsCheckBoxes({
  workingModes,
}: {
  workingModes: IWorkingModes;
}) {
  const [values, setValues] = useState(workingModes);

  function handleChange(name: keyof IWorkingModes, checked: boolean) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-base sm:text-lg font-medium text-white">
        Working Modes
      </h3>

      <CheckboxGroup
        aria-labelledby="workingmodes-caption"
        className="space-y-2.5 sm:space-y-3 bg-slate-800/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-700/50"
      >
        <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group">
          <Checkbox.Root
            name="onSite"
            className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-md border border-slate-600 bg-slate-800 transition-all duration-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 data-[checked]:bg-blue-500 data-[checked]:border-blue-500"
            checked={values?.onSite || false}
            onCheckedChange={(checked) => handleChange("onSite", checked)}
          >
            <Checkbox.Indicator className="flex text-white data-[unchecked]:hidden">
              <CheckIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-sm sm:text-base text-white group-hover:text-blue-300 transition-colors duration-200">
            On-site Training
          </span>
        </label>

        <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group">
          <Checkbox.Root
            name="online"
            className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-md border border-slate-600 bg-slate-800 transition-all duration-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 data-[checked]:bg-blue-500 data-[checked]:border-blue-500"
            checked={values?.online || false}
            onCheckedChange={(checked) => handleChange("online", checked)}
          >
            <Checkbox.Indicator className="flex text-white data-[unchecked]:hidden">
              <CheckIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-sm sm:text-base text-white group-hover:text-blue-300 transition-colors duration-200">
            Online Coaching
          </span>
        </label>
      </CheckboxGroup>
    </div>
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
