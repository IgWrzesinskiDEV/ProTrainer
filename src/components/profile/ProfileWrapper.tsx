import { cn } from "@/lib/twMergeUtill";
export default function ProfileWrapper({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        " bg-stone-800 p-8 rounded-b-lg   shadow-lg mx-auto rounded-tr-none relative z-10",
        className
      )}
    >
      {title && (
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {title}
        </h2>
      )}
      <div
        className={`flex relative  w-full items-end justify-around h-full ${
          !title && "pt-5"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
