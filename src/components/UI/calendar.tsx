"use client";

import Datepicker from "tailwind-datepicker-react";
import { useState } from "react";
const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  clearBtnText: "Clear",
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames:
    "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[210px]",
  defaultDate: new Date("2025-01-01"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

export default function DataPickerMes({}) {
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <Datepicker
      options={{
        ...options,
        maxDate: new Date(),
        theme: {
          ...options.theme,
        },
      }}
      classNames="w-full"
      onChange={handleChange}
      show={show}
      setShow={handleClose}
    />
  );
}
