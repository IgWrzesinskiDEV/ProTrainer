import React from "react";
import { TbLayoutGridAdd } from "react-icons/tb";
import { VscDebugBreakpointFunction } from "react-icons/vsc";

export default function TrainerAdditionalDataSquare({
  HeadingIcon,
  content,
  heading,
}: {
  HeadingIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  content: string[];
  heading: string;
}) {
  return (
    <div className=" p-2 rounded-lg w-[45%] h-[20vh] bg-background flex flex-col gap-4 overflow-auto planScrollbar trainerDataSquareScrollbar shadow-xl">
      <strong className="text-xl flex items-center justify-center gap-1">
        <HeadingIcon className="text-2xl text-yellow-300" />
        {heading}
      </strong>
      <ol className="flex flex-col gap-2 text-base font-thin  ">
        {content.map((item, index) => {
          return (
            <li
              key={`${item}-${index}`}
              className="flex items-center  gap-1  border-b-2 pb-2 border-blue-500/70"
            >
              <VscDebugBreakpointFunction className="rotate-90 text-blue-500 text-xl cursor-pointer" />
              <span className="w-3/4 break-words">{item}</span>
            </li>
          );
        })}
      </ol>
      <button className="flex items-center justify-center w-full text-center mt-auto mb-1">
        <TbLayoutGridAdd className="text-3xl text-blue-500 " />
      </button>
    </div>
  );
}
