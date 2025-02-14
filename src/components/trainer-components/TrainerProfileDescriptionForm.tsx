"use client";

// import Map from "../googleMaps/Map";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import LocationsCheckBoxes from "./LocationsCheckBoxes";
import SocialMediaInput from "./SocialMediaInput";
import { useActionState } from "react";
import { addSocialMediaTrainerData } from "@/actions/trainers.actions";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { error } from "console";

const initialState = {
  errors: [],
  success: "",
};

export default function TrainerProfileDescriptionForm({
  trainerDetails,
}: {
  trainerDetails: string;
}) {
  const [formState, formAction, isPending] = useActionState(
    addSocialMediaTrainerData,
    initialState
  );
  return (
    <form
      className="flex items-center justify-center flex-col gap-6"
      action={formAction}
    >
      <TextArea label="Experience" name="experience" className="w-2/3" />
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col gap-6 w-[45%]">
          <Input label="Specialization" name="specialization" type="text" />
          <LocationsCheckBoxes />
        </div>
        <div className="w-[1px] opacity-20 h-60 self-center bg-stone-300 " />
        <div className="flex flex-col gap-6 w-[45%]">
          <SocialMediaInput Icon={FaInstagram} name="instagram" />
          <SocialMediaInput Icon={FaFacebook} name="facebook" />
          <SocialMediaInput Icon={FaWhatsapp} name="whatsapp" />
        </div>
      </div>

      {/* <Map /> */}

      <ButtonWithLoading type="submit" className="w-1/5" isLoading={isPending}>
        Save
      </ButtonWithLoading>
    </form>
  );
}
