import { LuSave } from "react-icons/lu";

export default function SaveChangesToast() {
  return (
    <p className="flex items-center gap-2">
      <LuSave className="text-3xl text-blue-500" /> Changes saved!
    </p>
  );
}
