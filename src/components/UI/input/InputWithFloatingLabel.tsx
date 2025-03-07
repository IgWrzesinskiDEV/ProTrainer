import { cn } from "@/lib/twMergeUtill";
import { InputHTMLAttributes } from "react";
interface InputFloatingLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  forHTMLLabel: string;
  classNameAdded?: string;
  classNameLabel?: string;
}

export default function InputFloatingLabel({
  label,
  forHTMLLabel,
  classNameAdded,
  classNameLabel,
  ...props
}: InputFloatingLabelProps) {
  return (
    <div className="relative w-full z-10">
      <input
        type="text"
        id={forHTMLLabel}
        {...(props.onChange && { onChange: props.onChange })}
        {...(props.value !== undefined && { value: props.value })}
        className={cn(
          "block p-2 w-full  min-w-24     bg-gray-700 text-white outline-none   rounded      appearance-none  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer",
          classNameAdded
        )}
        {...props}
        placeholder=" "
      />
      <label
        htmlFor={forHTMLLabel}
        className={cn(
          "absolute select-none font-thin text-nowrap cursor-text text-gray-400  duration-300 transform ml-1 -translate-y-5 scale-75 top-2 z-0 origin-[0]   px-1 peer-focus:px-1 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
          classNameLabel
        )}
      >
        {label}
      </label>
    </div>
  );
}

// {import { InputHTMLAttributes } from "react";

// export default function InputFloatingLabel({
//   label,
//   forHTMLLabel,
//   ...props
// }: InputFloatingLabelProps) {
//   return (
//     <div className="relative">
//       <input
//         id={forHTMLLabel}
//         value={props.value || ""}
//         onChange={props.onChange}
//         className="block p-2 w-full text-sm min-w-24  -z-10 bg-gray-700 text-white   rounded      appearance-none  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
//       />
//       <label
//         htmlFor={forHTMLLabel}
//         className="absolute  text-gray-400 cursor-text  duration-300 transform  -translate-y-5 scale-75 top-2 z-10 origin-[0]   px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
//       >
//         {label}
//       </label>
//     </div>
//   );
// }
// }
