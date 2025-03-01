"use client";
import { PiCertificate } from "react-icons/pi";
import { PiGraduationCap } from "react-icons/pi";
import { IoLanguageOutline } from "react-icons/io5";
import { CiDumbbell } from "react-icons/ci";

import ModalUnstyled from "../../UI/Modal";
import TrainerAdditionalDataSquare from "./TrainerAdditionalDataSquare";
import { useRef, useState } from "react";
import TrainerProfileModal from "./TrainerProfileModal";
import {
  type ITrainerAddSchema,
  type ITrainerOnlyDetails,
  TrainerAdditionalDataHeadingType,
} from "@/interfaces/trainers/ITrainer";

export default function TrainerProfileAdditionalForm({
  trainerDetails,
}: {
  trainerDetails: string;
}) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const trainerDetailsData: ITrainerOnlyDetails = JSON.parse(trainerDetails);
  const [currentModalContent, setCurrentModalContent] =
    useState<ITrainerAddSchema>();

  function openModal(contentData: ITrainerAddSchema) {
    modalRef.current?.open();
    setCurrentModalContent(contentData);
  }

  function closeModal() {
    modalRef.current?.close();
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
          <span className="bg-blue-500 h-6 sm:h-8 w-1 rounded-full mr-2 sm:mr-3"></span>
          Additional Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          <TrainerAdditionalDataSquare
            heading={TrainerAdditionalDataHeadingType.Certifications}
            openModalHandler={openModal}
            HeadingIcon={PiCertificate}
            content={trainerDetailsData.trainerDetails?.certifications}
          />
          <TrainerAdditionalDataSquare
            heading={TrainerAdditionalDataHeadingType.Services}
            HeadingIcon={CiDumbbell}
            openModalHandler={openModal}
            content={trainerDetailsData.trainerDetails?.services}
          />
          <TrainerAdditionalDataSquare
            heading={TrainerAdditionalDataHeadingType.Education}
            HeadingIcon={PiGraduationCap}
            openModalHandler={openModal}
            content={trainerDetailsData.trainerDetails?.education}
          />
          <TrainerAdditionalDataSquare
            heading={TrainerAdditionalDataHeadingType.Languages}
            HeadingIcon={IoLanguageOutline}
            openModalHandler={openModal}
            content={trainerDetailsData.trainerDetails?.languages}
          />
        </div>
      </div>

      <ModalUnstyled ref={modalRef}>
        <TrainerProfileModal
          heading={
            currentModalContent?.heading ||
            TrainerAdditionalDataHeadingType.Certifications
          }
          HeadingIcon={currentModalContent?.HeadingIcon || PiCertificate}
          trainerData={currentModalContent?.content || []}
          closeModalHandler={closeModal}
        />
      </ModalUnstyled>
    </>
  );
}
