import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  type: string;
  name?: string;
  isArea?: boolean;
}

export default function Input({
  label,
  name,
  type,
  isArea,
  ...props
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label}
      </label>
      {!isArea ? (
        <input
          type={type}
          name={name || label}
          {...props}
          defaultValue={props.defaultValue}
          className="w-full px-4 py-2 bg-[#3a3633] border border-[#4a4643] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2673e8] text-white"
        />
      ) : (
        <textarea
          id="bio"
          name={name || label}
          rows={4}
          defaultValue={props.defaultValue}
          className="w-full px-4 py-2 bg-[#3a3633] border border-[#4a4643] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2673e8] text-white resize-none"
          placeholder="Tell us about yourself..."
        />
      )}
    </div>
  );
}
