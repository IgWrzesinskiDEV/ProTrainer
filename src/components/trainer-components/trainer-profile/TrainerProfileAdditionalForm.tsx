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
  ITrainerAddSchema,
  ITrainerOnlyDetails,
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
      <div className="flex flex-wrap items-center justify-center w-3/4 mx-auto gap-4">
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
