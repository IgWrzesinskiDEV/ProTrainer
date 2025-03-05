import { LuDumbbell, LuPlay, LuTag } from "react-icons/lu";

export default function DemoTab({
  videoUrl,
  equipment,
  category,
  name,
  isModal,
}: {
  videoUrl?: string;
  equipment?: string;
  category?: string;
  name: string;
  isModal?: boolean;
}) {
  return (
    <div className="space-y-4">
      {videoUrl ? (
        <div
          className={`aspect-video bg-black mx-auto rounded-lg overflow-hidden relative ${
            isModal ? "w-full" : "w-full sm:w-3/4 md:w-1/2 my-3 sm:my-5"
          }`}
        >
          <iframe
            src={"https://www.youtube.com/embed/" + videoUrl}
            className="w-full h-full"
            allowFullScreen
            title={`${name} demonstration`}
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <LuPlay size={36} className="text-blue-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm sm:text-base">
              No video available
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-[#1e1e24] p-2.5 sm:p-3 rounded-lg">
          <div className="flex items-center text-gray-300 mb-1 sm:mb-2">
            <LuDumbbell
              size={16}
              className="mr-2 text-blue-500 flex-shrink-0"
            />
            <span className="text-xs sm:text-sm font-medium">Equipment</span>
          </div>
          <p className="text-white text-sm sm:text-base break-words">
            {equipment || "Not specified"}
          </p>
        </div>

        <div className="bg-[#1e1e24] p-2.5 sm:p-3 rounded-lg">
          <div className="flex items-center text-gray-300 mb-1 sm:mb-2">
            <LuTag size={16} className="mr-2 text-blue-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Category</span>
          </div>
          <p className="text-white text-sm sm:text-base break-words">
            {category || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
}
