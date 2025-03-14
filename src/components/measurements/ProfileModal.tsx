import React, { useActionState, useEffect } from "react";
import {
  profileInformationInterface,
  unitsInterface,
} from "@/interfaces/user/IUser";
import { LuX } from "react-icons/lu";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
import { saveProfileInfo } from "@/actions/profile.actions";

interface ProfileModalProps {
  userInfo: profileInformationInterface | null;
  formatedUnits: unitsInterface;

  onClose: () => void;
}
const initialState = {
  errors: [],
};

export default function ProfileModal({
  userInfo,
  formatedUnits,

  onClose,
}: ProfileModalProps) {
  const [formState, formAction, isPending] = useActionState(
    saveProfileInfo,
    initialState
  );
  useEffect(() => {
    if (formState.success && onClose) {
      onClose();
    }
  }, [formState.success, onClose]);
  console.log(formState?.errors);
  return (
    <form
      action={formAction}
      className="w-[95%] sm:w-auto mx-auto p-4 sm:p-6 outline-none bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl planScrollbar trainerDataSquareScrollbar text-gray-100 max-h-[92vh] overflow-y-auto relative max-w-md"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        type="button"
        disabled={isPending}
        className="absolute disabled:opacity-30 top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white p-1.5 hover:bg-gray-700/50 rounded-full transition-colors"
        aria-label="Close modal"
      >
        <LuX className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-400 mb-4 sm:mb-6 pr-8">
        Update Profile Information
      </h1>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
        <div className="p-3 border-b border-gray-700">
          <label
            htmlFor="height"
            className="block text-blue-300 font-medium mb-2"
          >
            Height
          </label>
          <div className="flex items-center ">
            <input
              id="height"
              type="number"
              min={0}
              step={0.1}
              name="height"
              defaultValue={userInfo?.height || ""}
              className="w-[90%] sm:flex-1 bg-gray-700 border border-gray-600 rounded-l-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors py-2 px-3 text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <div className="bg-gray-600 text-gray-200 py-2 px-3 rounded-r-md border border-l-0 border-gray-600">
              {formatedUnits?.height}
            </div>
          </div>
          {formatedUnits?.height === "ft" && (
            <p className="text-xs text-gray-400 mt-1">
              Enter decimal feet (e.g. 5.75 for 5&apos;9&quot;)
            </p>
          )}
        </div>

        <div className="p-3 border-b border-gray-700">
          <label htmlFor="sex" className="block text-blue-300 font-medium mb-2">
            Sex
          </label>
          <div className="relative ">
            <select
              id="sex"
              name="sex"
              defaultValue={userInfo?.sex}
              className="w-full bg-gray-700 border border-gray-600 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors py-2 px-3 text-gray-100 appearance-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-3 ">
          <label htmlFor="age" className="block text-blue-300 font-medium mb-2">
            Age
          </label>
          <div className="flex items-center ">
            <input
              id="age"
              type="number"
              min={0}
              step={1}
              name="age"
              defaultValue={userInfo?.age || ""}
              className="w-[90%] sm:flex-1 bg-gray-700  border border-gray-600 rounded-l-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors py-2 px-3 text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="bg-gray-600 text-gray-200 py-2  px-1 sm:px-3 rounded-r-md border border-l-0 border-gray-600">
              years
            </div>
          </div>
        </div>
      </div>
      {formState.errors && (
        <div className="flex flex-col gap-1 mt-4">
          {formState.errors.map((error) => (
            <p
              key={error}
              className="text-red-400 text-center text-sm sm:text-base"
            >
              {error}
            </p>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          disabled={isPending}
          onClick={onClose}
          className="w-[48%] disabled:opacity-30 disabled:hover:bg-gray-700 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Cancel
        </button>
        <ButtonWithLoading
          type="submit"
          isDisabled={isPending}
          isLoading={isPending}
          size={24}
          className="w-[48%] bg-gradient-to-r disabled:from-purple-500/30 disabled:to-purple-600/30 disabled:hover:from-purple-500/30 disabled:hover:to-purple-600/30 from-purple-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg"
        >
          Save
        </ButtonWithLoading>
      </div>
    </form>
  );
}
