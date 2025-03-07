"use client";
import { useActionState } from "react";
import { saveProfileData } from "@/actions/profile.actions";
import Input from "../UI/Input";
import ImagePicker from "./ImagePicker";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";

import useUserData from "@/hooks/useUserData";
const initialState = {
  errors: [],
};
export default function ProfileDescriptionForm() {
  const [formState, formAction, isPending] = useActionState(
    saveProfileData,
    initialState
  );
  const { userData } = useUserData(formState);
  const profileDetails = userData?.profileDetails;

  return (
    <div className="lg:col-span-1">
      <div className="bg-[#252220] rounded-xl shadow-lg p-6">
        <form action={formAction} className="flex flex-col items-center">
          <ImagePicker
            name="avatar"
            avatarFileName={profileDetails?.avatarFileName}
          />
          <div className="w-full space-y-4">
            <Input
              label="Full Name"
              name="fullName"
              type="text"
              defaultValue={profileDetails?.fullName}
            />
            <Input
              label="Bio"
              name="bio"
              type="text"
              defaultValue={profileDetails?.bio}
              isArea
            />
          </div>
          <ul className="h-5 mb-3">
            {formState?.errors?.map((error) => (
              <li key={error} className="text-red-500">
                {error}
              </li>
            ))}
          </ul>
          <ButtonWithLoading
            type="submit"
            className="w-full bg-[#2673e8] hover:bg-blue-600 disabled:bg-transparent border border-[#2673e8] text-white py-2 rounded-md transition-colors duration-200 font-medium"
            isDisabled={isPending}
            isLoading={isPending}
          >
            Save Profile
          </ButtonWithLoading>
        </form>
      </div>
    </div>
  );
}

{
  /* <div className="lg:col-span-1">
  <div className="bg-[#252220] rounded-xl shadow-lg p-6">
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <button className="absolute bottom-0 right-0 bg-[#2673e8] hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
      <a
        href="#"
        className="text-[#2673e8] hover:text-blue-400 text-sm font-medium mb-6"
      >
        Change avatar
      </a>

      <div className="w-full space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full px-4 py-2 bg-[#3a3633] border border-[#4a4643] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2673e8] text-white"
            defaultValue="Jacek Bracki"
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            className="w-full px-4 py-2 bg-[#3a3633] border border-[#4a4643] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2673e8] text-white resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <button className="w-full bg-[#2673e8] hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-200 font-medium">
          Save Profile
        </button>
      </div>
    </div>
  </div>
</div>; */
}
