"use client";
import { cn } from "@/lib/twMergeUtill";
import { useState } from "react";

const maxCharacters = 300;
export default function TextArea({
  label,
  name,
  className,
}: {
  className?: string;
  label: string;
  name: string;
}) {
  const [value, setValue] = useState("");
  return (
    <div className={cn("flex flex-col gap-2 ", className)}>
      <label htmlFor={name} className="text-xl capitalize">
        {label}
      </label>
      <textarea
        className="px-4 py-2 rounded-lg text-lg font-medium focus:outline-none text-background h-40 resize-none"
        name={name}
        maxLength={maxCharacters}
        rows={5}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="self-end text-slate-200/60 font-thin text-sm">
        <p>
          {value.length}/{maxCharacters}
        </p>
      </div>
    </div>
  );
}
