"use client";
import { cn } from "@/lib/twMergeUtill";
import AuthButton from "../UI/auth/AuthButton";
import DatePickerMeasurements from "./DatePickerMeasurements";
import { useActionState } from "react";
import { saveMessurement } from "@/actions/profile.actions";
const initialState = {
  error: "",
};
export default function MeasurementsForm({
  TABLE_HEAD,
}: {
  TABLE_HEAD: string[];
}) {
  const [formState, formAction] = useActionState(saveMessurement, initialState);
  return (
    <div className="p-4 flex flex-col gap-4 bg-backgroundLite rounded-lg shadow-2xl items-center">
      <h1>Add your mesurements</h1>
      <form
        action={formAction}
        className="w-2/3  flex flex-col gap-4 items-center "
      >
        <div className="w-full rounded-lg border-2 border-blue-500 ">
          <DatePickerMeasurements />
          {TABLE_HEAD.map((field, index) => {
            const className = ` border-[#aaaabc]/50 border-2 bg-[#1C2025] border-b-0    w-2/3 p-2 ${
              index === 0 ? "border-t-0" : ""
            }`;
            if (field === "Date") return null;
            return (
              <div key={field} className="flex items-center justify-center ">
                <label
                  htmlFor={field}
                  className={cn(
                    className,
                    "border-r-0 border-l-0 text-center ",
                    index === 0 ? "rounded-tl-lg" : "",
                    index === TABLE_HEAD.length - 1 ? "rounded-bl-lg" : ""
                  )}
                >
                  {field}
                </label>
                <div
                  className={cn(
                    className,
                    "flex items-center space-x-4 border-r-0 ",
                    index === 0 ? "rounded-tr-lg" : "",
                    index === TABLE_HEAD.length - 1 ? "rounded-br-lg" : ""
                  )}
                >
                  <input
                    type={field === "Date" ? "date" : "number"}
                    min={0}
                    name={field}
                    className="w-full bg-transparent  focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div>kg</div>
                </div>
              </div>
            );
          })}
        </div>
        <AuthButton className="w-1/3">Save</AuthButton>
      </form>
    </div>
  );
}
