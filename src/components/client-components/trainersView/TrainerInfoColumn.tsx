import { InfoSection } from "./InfoSection";

import { IconType } from "react-icons/lib";
interface InfoSections {
  data: string[];
  icon: IconType;
  title: string;
}
export default function TrainerInfoColumn({
  InfoSections,
}: {
  InfoSections: InfoSections[];
}) {
  return (
    <>
      {InfoSections.map((section, index) => (
        <InfoSection
          key={index}
          icon={<section.icon className="text-[#3b82f6]" size={24} />}
          title={section.title}
          content={
            section.data.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {section.data.map((data, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-opacity-30 select-none"
                  >
                    {data}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-300 font-thin">
                No {section.title.toLowerCase()} modes added yet
              </p>
            )
          }
        />
      ))}
    </>
  );
}
