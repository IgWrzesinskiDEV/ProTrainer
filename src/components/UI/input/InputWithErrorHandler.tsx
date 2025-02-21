import { IoAlertCircleOutline } from "react-icons/io5";

export default function InputWithErrorHandler({
  hasError,
  errorMessage = "Error has occurred",
}: {
  hasError: boolean;
  errorMessage?: string;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        name="planName"
        placeholder="New plan name"
        className={`
                  w-full
                  bg-gradient-to-b from-gray-600 to-gray-700
                  text-white placeholder:text-gray-400
                  px-4 py-2.5 rounded-lg
                  border-2 transition-all duration-200
                  outline-none
                  hover:from-gray-500 hover:to-gray-600
                  focus:ring-2 focus:ring-blue-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    hasError
                      ? "border-red-500/50 focus:border-red-500 hover:border-red-500/80"
                      : "border-gray-500/30 focus:border-blue-500 hover:border-blue-500/30"
                  }
                  
                `}
      />

      {hasError && (
        <div className="absolute inset-y-0 right-0 flex items-center animate-in fade-in slide-in-from-right-1 duration-200">
          <div className="relative group">
            <IoAlertCircleOutline className="text-xl text-red-500 mr-3" />

            <div className="absolute bottom-full right-0 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
                <div className="relative">
                  {errorMessage}
                  <div className="absolute w-2 h-2 bg-red-500 rotate-45 -bottom-1 right-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {hasError && (
        <div
          className="absolute left-3 right-3 h-[2px] bottom-0 rounded-full overflow-hidden bg-[rgba(239, 68, 68, 0.1)]"
          //style={{ background: "rgba(239, 68, 68, 0.1)" }}
        >
          <div
            className="absolute inset-y-0 left-0 bg-red-500"
            style={{
              width: "30%",
              animation: "slide 2s linear 1.5",
            }}
          />
        </div>
      )} */}
    </div>
  );
}
