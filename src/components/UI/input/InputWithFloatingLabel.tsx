import { InputHTMLAttributes } from "react";
interface InputFloatingLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  forHTMLLabel: string;
}

export default function InputFloatingLabel({
  label,
  forHTMLLabel,
  ...props
}: InputFloatingLabelProps) {
  return (
    <div className="relative">
      <input
        type="text"
        id={forHTMLLabel}
        {...(props.onChange && { onChange: props.onChange })}
        {...(props.value !== undefined && { value: props.value })}
        className="block p-2 w-full  min-w-24  -z-10 bg-gray-700 text-white   rounded      appearance-none  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
        placeholder=" "
      />
      <label
        htmlFor={forHTMLLabel}
        className="absolute select-none text-nowrap cursor-text text-gray-400  duration-300 transform  -translate-y-5 scale-75 top-2 z-10 origin-[0]   px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
