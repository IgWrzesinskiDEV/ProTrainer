import { ReactNode } from "react";

export default function WrapperSplitter({
  leftContent,
  rightContent,
}: {
  leftContent: ReactNode;
  rightContent: ReactNode;
}) {
  return (
    <>
      <div className="w-1/3">{leftContent}</div>
      <div className="w-[1px] opacity-20 h-80 self-center bg-stone-300" />
      <div className="w-1/3 ">{rightContent}</div>
    </>
  );
}
