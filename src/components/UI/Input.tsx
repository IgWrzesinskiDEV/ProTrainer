import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  type: string;
  name?: string;
}

export default function Input({ label, name, type, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-3/4 ">
      <label htmlFor={label} className="text-xl capitalize">
        {label}
      </label>
      <input
        type={type}
        name={name || label}
        {...props}
        defaultValue={props.defaultValue}
        className="px-4 py-2 rounded-lg text-lg font-medium focus:outline-none text-background"
      />
    </div>
  );
}
