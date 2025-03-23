import { CircularProgress } from "@mui/material";
import { useTransition } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import ButtonWithLoading from "./Buttons/ButtonWithLoading";

export default function DeleteModalConent({
  children,
  buttonText,
  closeModal,
  deleteHandler,
}: {
  children: React.ReactNode;
  buttonText: string;
  closeModal?: () => void;
  deleteHandler: () => Promise<void>;
}) {
  const [isPending, startTrainsition] = useTransition();
  return (
    <div className="flex items-center justify-center  px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div
        className={`inline-block  overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-[#1E2024] sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        tabIndex={-1}
      >
        {isPending && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-full h-full bg-[#1E2024] bg-opacity-90">
            <CircularProgress size={48} />
          </div>
        )}
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-500/20 rounded-full sm:mx-0 sm:h-10 sm:w-10">
              <FiAlertTriangle
                className="w-6 h-6 text-red-500"
                aria-hidden="true"
              />
            </div>

            {children}
          </div>
        </div>
        <div className="px-4 py-3 bg-[#262931] sm:px-6 sm:flex sm:flex-row-reverse">
          <ButtonWithLoading
            type="button"
            isDisabled={isPending}
            isLoading={isPending}
            loadingClass="bg-opacity-50 hover:bg-emerald-500 pointer-events-none"
            size={20}
            className="inline-flex justify-center min-w-28 disabled:hover:bg-red-500 disabled:bg-opacity-40 disabled:cursor-not-allowed w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#262931] sm:ml-3 sm:w-auto"
            onClick={() => {
              startTrainsition(async () => {
                await deleteHandler();
                if (closeModal) closeModal();
              });
            }}
          >
            {buttonText}
          </ButtonWithLoading>
          <button
            type="button"
            disabled={isPending}
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium border rounded text-gray-300 bg-[#1E2024] border-gray-600 hover:bg-[#262931] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#262931] sm:mt-0 sm:ml-3 sm:w-auto"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        <button
          className="absolute disabled:opacity-30 top-0 right-0 p-2 m-2 text-gray-400 hover:text-gray-200 disabled:hover:text-gray-400"
          disabled={isPending}
          onClick={closeModal}
        >
          <FiX className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
