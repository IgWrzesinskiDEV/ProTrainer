import React from "react";
import { TbLayoutGridAdd } from "react-icons/tb";
import { VscDebugBreakpointFunction } from "react-icons/vsc";
import {
  ITrainerAddSchema,
  TrainerAdditionalDataHeadingType,
} from "@/interfaces/trainers/ITrainer";
export default function TrainerAdditionalDataSquare({
  HeadingIcon,
  content,
  heading,
  openModalHandler,
}: {
  HeadingIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  content: string[] | undefined;
  heading: TrainerAdditionalDataHeadingType;
  openModalHandler: (contentData: ITrainerAddSchema) => void;
}) {
  const contentData = { heading, content, HeadingIcon };
  return (
    <div className=" p-2 rounded-lg w-[45%] h-[20vh] bg-background flex flex-col gap-4 overflow-auto planScrollbar trainerDataSquareScrollbar shadow-xl">
      <strong className="text-xl flex items-center justify-center gap-1 capitalize">
        <HeadingIcon className="text-2xl text-yellow-300" />
        {heading}
      </strong>
      <ol className="flex flex-col gap-2 text-base font-thin  ">
        {content && content.length !== 0 ? (
          content.map((item, index) => {
            return (
              <li
                key={`${item}-${index}`}
                className="flex items-center  gap-1  border-b-2 pb-2 border-blue-500/70"
              >
                <VscDebugBreakpointFunction className="rotate-90 text-blue-500 text-xl " />
                <span className="w-3/4 break-words">{item}</span>
              </li>
            );
          })
        ) : (
          <li className="text-center w-1/2 self-center">
            Click button bellow to add one
          </li>
        )}
      </ol>
      <button
        className="flex items-center justify-center w-full text-center mt-auto mb-1"
        onClick={() => openModalHandler(contentData)}
      >
        <TbLayoutGridAdd className="text-3xl text-blue-500 " />
      </button>
    </div>
  );
}
