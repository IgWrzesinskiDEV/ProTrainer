import { LuDumbbell, LuPlay, LuTag } from "react-icons/lu";

export default function DemoTab({
  videoUrl,
  equipment,
  category,
  name,
}: {
  videoUrl?: string;
  equipment?: string;
  category?: string;
  name: string;
}) {
  return (
    <div className="space-y-4">
      {videoUrl ? (
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
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
            <LuPlay size={48} className="text-blue-500 mx-auto mb-2" />
            <p className="text-gray-400">No video available</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1e1e24] p-3 rounded-lg">
          <div className="flex items-center text-gray-300 mb-2">
            <LuDumbbell size={16} className="mr-2 text-blue-500" />
            <span className="text-sm font-medium">Equipment</span>
          </div>
          <p className="text-white">{equipment || "Not specified"}</p>
        </div>

        <div className="bg-[#1e1e24] p-3 rounded-lg">
          <div className="flex items-center text-gray-300 mb-2">
            <LuTag size={16} className="mr-2 text-blue-500" />
            <span className="text-sm font-medium">Category</span>
          </div>
          <p className="text-white">{category || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
}
