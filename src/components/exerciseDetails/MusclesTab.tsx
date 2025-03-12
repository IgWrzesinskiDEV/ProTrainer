import { LuTarget } from "react-icons/lu";
import Model, { Muscle } from "react-body-highlighter";
import textWithDashTransform from "@/utils/textWithDashTransform";

export default function MusclesTab({
  muscleGroup,
  exerciseName,
}: {
  muscleGroup: Muscle[];
  exerciseName: string;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1e1e24] p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <LuTarget size={18} className="mr-2 text-blue-500" />
            Target Muscles
          </h3>
          {muscleGroup && muscleGroup.length > 0 ? (
            <ul className="space-y-2">
              {muscleGroup.map((muscle, index) => (
                <li
                  key={index}
                  className="flex items-center text-xs sm:text-base  text-gray-200 capitalize"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 "></div>
                  {textWithDashTransform(muscle)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No muscle groups specified</p>
          )}
        </div>

        <div className="bg-[#1e1e24] p-4 rounded-lg text-blue-500">
          <h3 className="text-lg font-medium text-white mb-3">Muscle Model</h3>
          <div className="aspect-square w-[80%]  mx-auto bg-gray-800 rounded-lg flex items-center justify-center">
            {/* <p className="text-gray-400">Muscle visualization not available</p> */}

            <Model
              data={[{ name: exerciseName, muscles: muscleGroup }]}
              style={{ width: "20rem", padding: "1rem" }}
              highlightedColors={["#db2f2f"]}
            />
            <div className="w-[2px] h-full bg-gray-700" />
            <Model
              data={[{ name: exerciseName, muscles: muscleGroup }]}
              style={{ width: "20rem", padding: "1rem" }}
              highlightedColors={["#3b82f6"]}
              type="posterior"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
