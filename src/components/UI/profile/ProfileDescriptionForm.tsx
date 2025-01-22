"use client";
import { useActionState } from "react";
import { saveProfileData } from "@/actions/profile.actions";
import AuthButton from "../auth/AuthButton";
import Input from "../Input";
import ImagePicker from "./ImagePicker";
const initialState = {
  error: "",
};
export default function ProfileDescriptionForm() {
  const [formState, formAction, isPending] = useActionState(
    saveProfileData,
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex items-center justify-center flex-col gap-6"
    >
      <ImagePicker name="avatar" />
      <Input label="full Name" name="fullName" type="text" />
      <Input label="Bio" name="bio" type="text" />

      <AuthButton type="submit" className="w-1/5">
        Save
      </AuthButton>
    </form>
  );
}
