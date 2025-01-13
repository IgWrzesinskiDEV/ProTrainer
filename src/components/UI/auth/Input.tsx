import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  type: string;
}

export default function Input({ label, type, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor={label} className="text-xl capitalize">
        {label}
      </label>
      <input
        type={type}
        name={label}
        {...props}
        className="px-3 py-2 rounded-lg text-xl focus:outline-none text-background"
      />
    </div>
  );
}
