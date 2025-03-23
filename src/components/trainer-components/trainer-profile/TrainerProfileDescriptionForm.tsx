"use client";

import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import TextArea from "@/components/UI/TextArea";
import LocationsCheckBoxes from "./LocationsCheckBoxes";
import SocialMediaInput from "./SocialMediaInput";
import { useActionState } from "react";
import { addSocialMediaTrainerData } from "@/actions/trainers.actions";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import type { ITrainerSocials } from "@/interfaces/trainers/ITrainer";

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

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 flex items-center">
        <span className="bg-blue-500 h-5 sm:h-6 md:h-8 w-1 rounded-full mr-2 sm:mr-3"></span>
        Personal Information
      </h2>

      <form className="space-y-4 sm:space-y-6 md:space-y-8" action={formAction}>
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <label className="block text-sm sm:text-base md:text-lg font-medium text-white">
            Experience
          </label>
          <TextArea
            label=""
            name="experience"
            className="w-full min-h-[80px] sm:min-h-[100px] md:min-h-[120px] bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            defaultValue={fetchedData?.experience}
            error={err}
            success={formState.success}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-sm sm:text-base md:text-lg font-medium text-white">
                Specialization
              </label>
              <input
                name="specialization"
                type="text"
                defaultValue={fetchedData?.specialization}
                className="w-full outline-none bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 text-xs sm:text-sm md:text-base text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500  transition-all duration-200"
              />
            </div>

            <LocationsCheckBoxes workingModes={fetchedData?.workingModes} />
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-white">
              Social Media
            </h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-5 bg-slate-800/30 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-slate-700/50">
              <SocialMediaInput
                Icon={FaInstagram}
                name="instagram"
                defaultValue={fetchedData?.socialMedia?.instagram}
                error={err?.instagram}
              />
              <SocialMediaInput
                Icon={FaFacebook}
                name="facebook"
                defaultValue={fetchedData?.socialMedia?.facebook}
                error={err?.facebook}
              />
              <SocialMediaInput
                Icon={FaWhatsapp}
                name="whatsapp"
                defaultValue={fetchedData?.socialMedia?.whatsapp}
                error={err?.whatsapp}
              />
            </div>
          </div>
        </div>

        {err?.error && (
          <p className="text-red-400 font-medium text-xs sm:text-sm bg-red-500/10 p-2 rounded-lg border border-red-500/20">
            {err.error}
          </p>
        )}

        <div className="flex justify-center pt-1 sm:pt-2 md:pt-4">
          <ButtonWithLoading
            type="submit"
            loaderclassname="text-white "
            className="w-full sm:w-auto  min-w-44 disabled:opacity-30 disabled:hover:from-blue-600 disabled:shadow-none  disabled:hover:to-blue-500 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-xs sm:text-sm md:text-base font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 touch-manipulation"
            isLoading={isPending}
            size={20}
            isDisabled={isPending}
          >
            Save Changes
          </ButtonWithLoading>
        </div>
      </form>
    </div>
  );
}
