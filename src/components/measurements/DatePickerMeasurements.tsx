"use client";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { FiCalendar } from "react-icons/fi";

export default function DatePickerMeasurements() {
  const [value, setValue] = useState<Value>(new Date());

  return (
    <DatePicker
      value={value}
      containerClassName="w-full bg-blue-500 rounded-t-md border-0 focus:outline-none"
      weekStartDayIndex={1}
      className="bg-dark "
      calendarPosition="top"
      format="DD.MM.YYYY"
      maxDate={new Date()}
      render={(value, openCalendar) => {
        return (
          <>
            <button
              type="button"
              className="w-full p-1 flex items-center justify-center gap-x-2"
              onClick={openCalendar}
            >
              {value}
              <FiCalendar className="text-stone-50 text-xl" />
            </button>
            <input
              type="date"
              name="mesurementDate"
              className="hidden"
              defaultValue={value}
            />
          </>
        );
      }}
      onChange={setValue}
    >
      <button
        className="bg-blue-500 p-1 mb-2 rounded-md text-stone-50"
        type="button"
        onClick={() => setValue(new Date())}
      >
        Today
      </button>
    </DatePicker>
  );
}
