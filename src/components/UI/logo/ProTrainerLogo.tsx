import { cn } from "@/lib/twMergeUtill";

export default function ProTrainerLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative ", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full text-primary-600"
      >
        <path
          d="M6.5 4C5.67157 4 5 4.67157 5 5.5V8.5C5 9.32843 5.67157 10 6.5 10C7.32843 10 8 9.32843 8 8.5V5.5C8 4.67157 7.32843 4 6.5 4Z"
          fill="currentColor"
        />
        <path
          d="M17.5 4C16.6716 4 16 4.67157 16 5.5V8.5C16 9.32843 16.6716 10 17.5 10C18.3284 10 19 9.32843 19 8.5V5.5C19 4.67157 18.3284 4 17.5 4Z"
          fill="currentColor"
        />
        <path
          d="M8 8.5V15.5C8 16.3284 7.32843 17 6.5 17C5.67157 17 5 16.3284 5 15.5V12.5C5 11.6716 4.32843 11 3.5 11C2.67157 11 2 11.6716 2 12.5V15.5C2 18.5376 4.46243 21 7.5 21H16.5C19.5376 21 22 18.5376 22 15.5V12.5C22 11.6716 21.3284 11 20.5 11C19.6716 11 19 11.6716 19 12.5V15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5V8.5C16 7.67157 15.3284 7 14.5 7H9.5C8.67157 7 8 7.67157 8 8.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
