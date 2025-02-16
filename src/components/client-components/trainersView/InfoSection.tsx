import { ReactNode } from "react";

export function InfoSection({
  icon,
  title,
  content,
  large = false,
}: {
  icon: ReactNode;
  title: string;
  content: string | React.ReactNode;
  large?: boolean;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-200">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <div className={`text-gray-300 font-thin ${large ? "text-lg" : ""}`}>
        {content}
      </div>
    </div>
  );
}
