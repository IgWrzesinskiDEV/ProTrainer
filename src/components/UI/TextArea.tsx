export default function TextArea({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <label htmlFor={name} className="text-xl capitalize">
        {label}
      </label>
      <textarea
        className="px-4 py-2 rounded-lg text-lg font-medium focus:outline-none text-background min-h-20 max-h-40"
        name={name}
        rows={5}
      />
    </div>
  );
}
