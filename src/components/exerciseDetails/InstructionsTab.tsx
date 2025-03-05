import { LuList } from "react-icons/lu";

export default function InstructionsTab({
  instructions,
}: {
  instructions?: string;
}) {
  return (
    <div className="bg-[#1e1e24] p-3 sm:p-4 rounded-lg">
      <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3 flex items-center">
        <LuList size={18} className="mr-2 text-blue-500 flex-shrink-0" />
        Instructions
      </h3>
      {instructions ? (
        <p className="text-gray-200 text-sm sm:text-base whitespace-pre-line">
          {instructions}
        </p>
      ) : (
        <p className="text-gray-400 text-sm sm:text-base">
          No instructions available
        </p>
      )}
    </div>
  );
}
