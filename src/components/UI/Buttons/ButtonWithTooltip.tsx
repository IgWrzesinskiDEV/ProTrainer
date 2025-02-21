export default function ButtonWithTooltip({
  onClick,
  children,
  tooltipText,
}: {
  onClick: () => void;
  children: React.ReactNode;
  tooltipText: string;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className="text-red-500 hover:text-red-700 flex items-center justify-center"
      >
        {children}
      </button>
      <div className="absolute bottom-full pointer-events-none right-0 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
          <div className="relative">
            {tooltipText}
            <div className="absolute w-2 h-2 bg-red-500 rotate-45 -bottom-1 right-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
