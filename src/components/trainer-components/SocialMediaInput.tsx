export default function SocialMediaInput({
  Icon,
  error,
  name,
  defaultValue,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex items-end  gap-2 mx-3">
      <label htmlFor={name} className="text-xl capitalize">
        <Icon className="w-6 h-6 text-blue-500" />
      </label>
      <div className="flex flex-col gap-2 relative">
        <input
          defaultValue={defaultValue}
          type="text"
          name={name}
          className={`px-1 py-1 w-[120%]  text-sm bg-transparent border-b-2  font-medium focus:outline-none text-slate-200 ${
            error ? "border-red-500" : "border-blue-500/80"
          }`}
        />
        <p className="text-red-500 font-thin text-xs absolute -bottom-5 right-0">
          {error}
        </p>
      </div>
    </div>
  );
}
