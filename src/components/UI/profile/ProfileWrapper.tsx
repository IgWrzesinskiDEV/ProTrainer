export default function ProfileWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="z-10 bg-stone-800 p-8 rounded-b-lg rounded-tr-lg shadow-lg mx-auto ">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {title}
      </h2>
      <div className="flex  w-full items-center justify-around">{children}</div>
    </div>
  );
}
