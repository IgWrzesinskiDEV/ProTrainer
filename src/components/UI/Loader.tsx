export default function Loader() {
  return (
    <div className="fixed inset-0 flex z-[1000] items-center justify-center bg-black/50 backdrop-blur-sm  ">
      {/* Circular loader only */}
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
}
