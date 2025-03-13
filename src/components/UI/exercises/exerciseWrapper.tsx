export default function ExerciseWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full lg:w-3/4  mx-auto ">{children}</div>;
}
