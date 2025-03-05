export default function SearchBar({ ...props }) {
  return (
    <input
      type="text"
      className="w-full px-6 py-4 pl-14 text-base text-white 
                 bg-gray-800/50  border border-gray-700 
                 rounded-2xl focus:outline-none outline-none focus:border-blue-500/50 
                 focus:ring-4 focus:ring-blue-500/20 
                 placeholder:text-gray-500 transition-all duration-300
                 hover:border-gray-600"
      {...props}
    />
  );
}
