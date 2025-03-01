import type React from "react";
import { TbLayoutGridAdd } from "react-icons/tb";
import { VscDebugBreakpointFunction } from "react-icons/vsc";
import type {
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
  const hasContent = content && content.length > 0;

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-slate-600/70 group">
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium text-white flex items-center gap-1.5 sm:gap-2 capitalize">
            <HeadingIcon className="text-blue-400 text-lg sm:text-xl" />
            <span className="truncate">{heading}</span>
          </h3>

          <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400 text-xs font-medium">
              {content?.length || 0}
            </span>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>

        <div className="h-[140px] sm:h-[160px] md:h-[180px] overflow-y-auto pr-2 planScrollbar scrollBarRectangle trainerDataSquareScrollbar">
          {hasContent ? (
            <ul className="space-y-1.5 sm:space-y-2">
              {content.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-slate-700/30 border border-slate-700/50 hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <VscDebugBreakpointFunction className="text-blue-400 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200 text-xs sm:text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs sm:text-sm">
              <p>No {heading.toLowerCase()} added yet</p>
              <p>Click the button below to add</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => openModalHandler(contentData)}
        className="w-full py-2 sm:py-3 bg-slate-800/80 hover:bg-blue-500/20 border-t border-slate-700/50 text-blue-400 hover:text-blue-300 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 group-hover:border-blue-500/30"
      >
        <TbLayoutGridAdd className="text-lg sm:text-xl" />
        <span className="font-medium text-sm sm:text-base">Add {heading}</span>
      </button>
    </div>
  );
}
