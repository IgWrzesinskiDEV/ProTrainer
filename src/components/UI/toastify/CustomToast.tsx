import { ReactNode } from "react";

export default function CustomToastContent({
  CustomIcon,
  message,
}: {
  CustomIcon: ReactNode;
  message: ReactNode | string;
}) {
  return (
    <p className="flex items-center gap-2">
      {CustomIcon} {message}
    </p>
  );
}
