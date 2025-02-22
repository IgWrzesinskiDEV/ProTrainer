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
import { ITrainerSocials } from "@/interfaces/trainers/ITrainer";
const initialState = {
  errors: [] as string[],
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
  const fetchedData: ITrainerSocials =
    JSON.parse(trainerDetails)?.trainerDetails?.socialAndExpiriance;
  const err = formState.errors?.reduce(
    (acc: { [key: string]: string }, curr) => {
      if (typeof curr !== "string" && curr.path.length === 1) {
        acc[curr.path[0]] = curr.message;
      } else {
        acc["error"] = typeof curr === "object" ? curr.message : curr;
      }
      return acc;
    },
    {}
  ) as { [key: string]: string };
  console.log(fetchedData);
  return (
    <form
      className="flex items-center justify-center flex-col gap-6"
      action={formAction}
    >
      <TextArea
        label="Experience"
        name="experience"
        className="w-2/3 "
        defaultValue={fetchedData?.experience}
        error={err}
        success={formState.success}
      />
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col gap-6 w-[45%]">
          <Input
            label="Specialization"
            name="specialization"
            type="text"
            defaultValue={fetchedData?.specialization}
          />
          <LocationsCheckBoxes workingModes={fetchedData?.workingModes} />
        </div>
        <div className="w-[1px] opacity-20 h-60 self-center bg-stone-300 " />
        <div className="flex flex-col gap-6 w-[45%]">
          <SocialMediaInput
            Icon={FaInstagram}
            name="instagram"
            defaultValue={fetchedData?.socialMedia.instagram}
            error={err?.instagram}
          />
          <SocialMediaInput
            Icon={FaFacebook}
            name="facebook"
            defaultValue={fetchedData?.socialMedia.facebook}
            error={err?.facebook}
          />
          <SocialMediaInput
            Icon={FaWhatsapp}
            name="whatsapp"
            defaultValue={fetchedData?.socialMedia.whatsapp}
            error={err?.whatsapp}
          />
        </div>
      </div>

      {/* <Map /> */}
      {err?.error && (
        <p className="text-red-500 font-thin text-xs">{err.error}</p>
      )}
      <ButtonWithLoading type="submit" className="w-1/5" isLoading={isPending}>
        Save
      </ButtonWithLoading>
    </form>
  );
}
