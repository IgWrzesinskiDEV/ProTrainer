import { IoAlertCircleOutline } from "react-icons/io5";

export default function InputWithErrorHandler({
  hasError,
  errorMessage = "Error has occurred",
}: {
  hasError: boolean;
  errorMessage?: string;
}) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        name="planName"
        placeholder="New plan name"
        className={`
          w-full
          bg-gradient-to-b from-gray-800 to-gray-900
          text-white placeholder:text-gray-500
          px-4 py-2.5 rounded-md
          border transition-all duration-200
          outline-none
          shadow-sm
          hover:from-gray-700 hover:to-gray-800
          focus:ring-2 focus:ring-blue-500/30
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            hasError
              ? "border-red-500/70 focus:border-red-500 hover:border-red-500/80"
              : "border-gray-700 focus:border-blue-500 hover:border-blue-500/50"
          }
        `}
      />

      {hasError && (
        <div className="absolute inset-y-0 right-0 flex items-center animate-in fade-in slide-in-from-right-1 duration-200">
          <div className="relative group">
            <IoAlertCircleOutline className="text-xl text-red-500 mr-3" />

            <div className="absolute bottom-full right-0 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <div className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md shadow-lg">
                <div className="relative">
                  {errorMessage}
                  <div className="absolute w-2 h-2 bg-red-500 rotate-45 -bottom-1 right-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
