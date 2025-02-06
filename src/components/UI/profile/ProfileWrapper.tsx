import { cn } from "@/lib/twMergeUtill";
export default function ProfileWrapper({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "z-10 bg-stone-800 p-8 rounded-b-lg  rounded-tr-lg shadow-lg mx-auto ",
        className
      )}
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {title}
      </h2>
      <div className="flex relative  w-full items-end justify-around h-full">
        {children}
      </div>
    </div>
  );
}
