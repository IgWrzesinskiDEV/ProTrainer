export default function ExerciseDetailsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1e1e24] portrait:h-[75vh]  h-[87vh] trainerDataSquareScrollbar scrollBarRectangle  lg:h-full z-10 rounded-lg overflow-y-auto shadow-xl w-full lg:w-3/4 lg:mx-auto">
      {children}
    </div>
  );
}
