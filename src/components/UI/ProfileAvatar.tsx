import { Avatar } from "@mui/material";
import { LuUser } from "react-icons/lu";

export default function ProfileAvatar({
  className,
  fileName,
  size = "default",
}: {
  className?: string;
  fileName?: string;
  size?: "small" | "default" | "large";
}) {
  const sizeClasses = {
    small: "w-10 h-10",
    default: "w-20 h-20",
    large: "w-32 h-32",
  };

  return (
    <div className={`relative group ${sizeClasses[size]} ${className}`}>
      {fileName ? (
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden 
                      ring-2 ring-gray-700/50 group-hover:ring-blue-500/50 
                      transition-all duration-300 shadow-lg"
        >
          <Avatar
            src={`https://pro-trainer-app.s3.eu-north-1.amazonaws.com/${fileName}?v=${fileName}`}
            className="w-full h-full object-cover "
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      ) : (
        <div
          className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 
                     rounded-2xl flex items-center justify-center ring-2 
                     ring-gray-700/50 group-hover:ring-blue-500/50 
                     transition-all duration-300 shadow-lg"
        >
          <LuUser className="text-white w-1/2 h-1/2" />
        </div>
      )}
    </div>
  );
}
