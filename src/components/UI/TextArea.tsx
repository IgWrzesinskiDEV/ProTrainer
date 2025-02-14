"use client";
import { cn } from "@/lib/twMergeUtill";
import { useEffect, useState } from "react";

const maxCharacters = 300;
export default function TextArea({
  label,
  name,
  className,
  error,
  defaultValue,
  success,
}: {
  className?: string;
  label: string;
  name: string;
  error: { [key: string]: string };
  success?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState<string | undefined>(defaultValue || "");

  useEffect(() => {
    if (error) {
      setValue(defaultValue || "");
    }
    if (success) {
      setValue(defaultValue);
    }
  }, [error, defaultValue, success]);
  return (
    <div className={cn("flex flex-col gap-2 ", className)}>
      <label htmlFor={name} className="text-xl capitalize">
        {label}
      </label>
      <textarea
        defaultValue={defaultValue || ""}
        className="px-4 py-2 rounded-lg text-lg font-medium focus:outline-none text-background h-40 resize-none"
        name={name}
        maxLength={maxCharacters}
        rows={5}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="self-end text-slate-200/60 font-thin text-sm">
        <p>
          {value?.length}/{maxCharacters}
        </p>
      </div>
    </div>
  );
}
