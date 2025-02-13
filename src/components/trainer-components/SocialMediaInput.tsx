export default function SocialMediaInput({
  Icon,
  name,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
}) {
  return (
    <div className="flex items-end  gap-2 ">
      <label htmlFor={name} className="text-xl capitalize">
        <Icon className="w-6 h-6 text-blue-500" />
      </label>
      <input
        type="text"
        name={name}
        className="px-1   text-lg bg-transparent border-b-2 border-blue-500/80 font-medium focus:outline-none text-slate-200"
      />
    </div>
  );
}
