"use client";
import { PiCertificate } from "react-icons/pi";
import { PiGraduationCap } from "react-icons/pi";
import { IoLanguageOutline } from "react-icons/io5";
import { CiDumbbell } from "react-icons/ci";

import ModalUnstyled from "../UI/Modal";
import TrainerAdditionalDataSquare from "./TrainerAdditionalDataSquare";
import { useEffect, useRef, useState } from "react";
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
  useEffect(() => {}, [trainerDetailsData]);
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

// const trainerDetails = {
//   education: ["szkoła podstawowa", "szkoła średnia", "studia"],
//   courses: [
//     "szkolenie z pierwszej pomocy dasdsadsadasdad ada dsad sadas dasdasdsa",
//     "szkolenie z pierwszej pomocy",
//     "szkolenie z pierwszej pomocy",
//   ],
//   languages: ["polski", "angielski", "niemiecki"],
//   services: ["trening personalny", "prowadzanie", "plany treingowe"],
// };

/* <div>
        <label htmlFor="certifications">Certifications</label>
        <input type="text" id="certifications" name="certifications" />
      </div>
      <div>
        <label htmlFor="specialties">Specialties</label>
        <input type="text" id="specialties" name="specialties" />
      </div>
      <div>
        <label htmlFor="experience">Experience</label>
        <input type="text" id="experience" name="experience" />
      </div>
      <div>
        <label htmlFor="education">Education</label>
        <input type="text" id="education" name="education" />
      </div>
      <div>
        <label htmlFor="trainingStyle">Training Style</label>
        <input type="text" id="trainingStyle" name="trainingStyle" />
      </div>
      <div>
        <label htmlFor="trainingLocations">Training Locations</label>
        <input type="text" id="trainingLocations" name="trainingLocations" />
      </div>
      <div>
        <label htmlFor="trainingEquipment">Training Equipment</label>
        <input type="text" id="trainingEquipment" name="trainingEquipment" />
      </div>
      <div>
        <label htmlFor="trainingPrograms">Training Programs</label>
        <input type="text" id="trainingPrograms" name="trainingPrograms" />
      </div>
      <div>
        <label htmlFor="trainingAvailability">Training Availability</label>
        <input
          type="text"
          id="trainingAvailability"
          name="trainingAvailability"
        />
      </div>
      <div>
        <label htmlFor="trainingRates">Training Rates</label>
        <input type="text" id="trainingRates" name="trainingRates" />
      </div>
      <div>
        <label htmlFor="trainingWebsite">Training Website</label>
        <input type="text" id="trainingWebsite" name="trainingWebsite" />
      </div>
      <div>
        <label htmlFor="trainingSocialMedia">Training Social Media</label>
        <input
          type="text"
          id="trainingSocialMedia"
          name="trainingSocialMedia"
        />
      </div>
      <div>
        <label htmlFor="trainingBio">Training Bio</label>
        <input type="text" id="trainingBio" name="trainingBio" />
      </div>
      <div>
        <button type="submit">Save</button>
      </div> */
