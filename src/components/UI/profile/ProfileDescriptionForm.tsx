"use client";
import { useActionState } from "react";
import { saveProfileData } from "@/actions/profile.actions";
import Input from "../Input";
import ImagePicker from "./ImagePicker";
import ButtonWithLoading from "../Buttons/ButtonWithLoading";

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
    <form
      action={formAction}
      className="flex items-center justify-center flex-col gap-6"
    >
      <ImagePicker name="avatar" />
      <Input
        label="full Name"
        name="fullName"
        type="text"
        defaultValue={profileDetails?.fullName}
      />
      <Input
        label="Bio"
        name="bio"
        type="text"
        defaultValue={profileDetails?.bio}
      />
      <ul className="h-5">
        {formState?.errors?.map((error) => (
          <li key={error} className="text-red-500">
            {error}
          </li>
        ))}
      </ul>
      <ButtonWithLoading type="submit" className="w-1/5" isLoading={isPending}>
        Save
      </ButtonWithLoading>
    </form>
  );
}
