export function InfoSection({
  icon,
  title,
  content,
  large = false,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  large?: boolean;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-200">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <p className={`text-gray-300 font-thin ${large ? "text-lg" : ""}`}>
        {content}
      </p>
    </div>
  );
}
