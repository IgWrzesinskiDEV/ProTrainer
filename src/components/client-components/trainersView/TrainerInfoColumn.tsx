import { InfoSection } from "./InfoSection";
import type { IconType } from "react-icons/lib";

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
    <div className="grid gap-6">
      {InfoSections.map((section, index) => (
        <InfoSection
          key={index}
          icon={<section.icon className="text-blue-400" size={24} />}
          title={section.title}
          content={
            section.data.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {section.data.map((data, index) => (
                  <span
                    key={index}
                    className="relative group overflow-hidden bg-blue-500/10 
                             text-blue-300 px-4 py-1.5 rounded-xl text-sm 
                             transition-all duration-300 hover:bg-blue-500/20 
                             cursor-default select-none"
                  >
                    {data}
                    <span
                      className="absolute inset-0 bg-gradient-to-r 
                                 from-blue-400/0 via-blue-400/10 to-blue-400/0 
                                 translate-x-[-100%] group-hover:translate-x-[100%] 
                                 transition-transform duration-1000"
                    />
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">
                No {section.title.toLowerCase()} added yet
              </p>
            )
          }
        />
      ))}
    </div>
  );
}
