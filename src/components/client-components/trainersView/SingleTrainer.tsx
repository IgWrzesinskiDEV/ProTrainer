import ProfileWrapper from "../../profile/ProfileWrapper";
import { getTrainerById } from "@/utils/data/getTrainers";
import ProfileAvatar from "../../UI/ProfileAvatar";
import {
  LuUser,
  LuMail,
  LuBriefcase,
  LuAward,
  LuGlobe,
  LuInstagram,
  LuFacebook,
  LuGraduationCap,
  LuLanguages,
  LuStar,
} from "react-icons/lu";
import { PiCertificate } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

import { InfoSection } from "./InfoSection";
import SocialLink from "./SocialLink";
import AddTrainerButton from "./AddTrainerButton";
import TrainerInfoColumn from "./TrainerInfoColumn";

import { MdOutlineChevronLeft } from "react-icons/md";

import { verifyAuth } from "@/lib/lucia/auth";

import RemoveTrainerButton from "./RemoveTrainerButton";
import Link from "next/link";
export default async function SingleTrainer({
  params,
}: {
  params: Promise<{ trainerSlug: string }>;
}) {
  const trainerId = (await params).trainerSlug;
  const trainer = await getTrainerById(trainerId);
  const { user } = await verifyAuth();
  const currentTrainer = user?.currentTrainer;
  if (!trainer) {
    return (
      <ProfileWrapper title="">
        <div className="flex flex-col items-center gap-10">
          <p className="text-white text-xl">Trainer not found</p>
        </div>
      </ProfileWrapper>
    );
  }

  const { userName, email, trainerDetails, profileDetails, _id } = trainer;
  const socialAndExpiriance = trainerDetails?.socialAndExpiriance;
  const socialAndExpirianceArray = Object.entries(
    trainerDetails?.socialAndExpiriance?.socialMedia || {}
  ).map(([key, value]) => ({ key, value }));

  const certifications = trainerDetails?.certifications || [];
  const education = trainerDetails?.education || [];

  const services = {
    data: trainerDetails?.services || [],
    icon: LuBriefcase,
    title: "Services",
  };
  const languages = {
    data: trainerDetails?.languages || [],
    icon: LuLanguages,
    title: "Languages",
  };
  const workingModes = {
    data: Object.entries(socialAndExpiriance?.workingModes || {})
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value)
      .map(([key]) => key),
    icon: LuGlobe,
    title: "Working Modes",
  };

  return (
    <ProfileWrapper title="" className="realtive">
      {/* <BackToLink
        href="/dashboard/trainers"
        className="items-center gap-2 absolute top-2 left-2 px-4 py-2 text-sm font-medium text-white bg-[#18202F] rounded-lg transition-all duration-200 border border-white/20 hover:border-amber-500/30 backdrop-blur-sm"
      >
        Back to trainers
      </BackToLink> */}
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-lg  transition-all duration-300 hover:shadow-blue-400/10">
        <div className="bg-[#3b82f6] relative text-white p-8 flex justify-start items-center">
          <Link
            href="/dashboard/trainers"
            className="group absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center bg-blue-700/30 hover:bg-blue-700/50 transition-all duration-300 border-r border-blue-400/20 hover:border-blue-400/30"
          >
            <MdOutlineChevronLeft className="text-4xl text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1" />
          </Link>
          <div className="ml-14">
            <h2 className="text-4xl font-bold  capitalize flex items-center mb-4">
              {profileDetails?.avatarFileName ? (
                <ProfileAvatar
                  fileName={profileDetails.avatarFileName}
                  className="w-20 h-20 mr-4 border-2 border-gray-800 rounded-full"
                />
              ) : (
                <LuUser className="w-20 h-20 mr-4" />
              )}
              {userName}
              {currentTrainer === _id && (
                <div className="flex gap-2">
                  <span className="flex ml-3 items-center cursor-default justify-center gap-1.5 px-2.5 py-1 text-sm font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full shadow-sm shadow-yellow-500/20 transition-all duration-300 hover:shadow-yellow-500/30 hover:scale-105">
                    <FaRegStar className="w-4 h-4" />
                    My trainer
                  </span>
                  <RemoveTrainerButton trainerId={trainerId} />
                </div>
              )}
            </h2>
            <a
              className="text-xl flex w-fit items-center opacity-90 hover:text-gray-200 transition-colors duration-300"
              href={`mailto:${email}`}
            >
              <LuMail className="mr-3" size={24} />
              {email}
            </a>
          </div>
          {/* <div className="flex flex-col justify-between  items-center ml-auto gap-f">
            <BackToLink
              href="/dashboard/trainers"
              className=" items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-200 border border-yellow-500/20 hover:border-yellow-500/40 backdrop-blur-sm"
            >
              Back to trainers
            </BackToLink>
            <RemoveTrainerButton />
          </div> */}
        </div>
        <div className="p-8 bg-gray-900 bg-opacity-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <InfoSection
                icon={<LuStar className="text-[#3b82f6]" size={24} />}
                title="Specialization"
                content={
                  socialAndExpiriance?.specialization ||
                  "No specialization added yet"
                }
              />
              <InfoSection
                icon={<LuAward className="text-[#3b82f6]" size={24} />}
                title="Experience"
                content={
                  socialAndExpiriance?.experience ||
                  "No experience description added yet"
                }
                large
              />
              <InfoSection
                icon={<PiCertificate className="text-[#3b82f6]" size={24} />}
                title="Certifications"
                content={
                  certifications.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {certifications.map((cert, index) => (
                        <li key={index} className="text-gray-300">
                          {cert}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No certifications added yet"
                  )
                }
              />
              <InfoSection
                icon={<LuGraduationCap className="text-[#3b82f6]" size={24} />}
                title="Education"
                content={
                  education.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {education.map((edu, index) => (
                        <li key={index} className="text-gray-300">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No education history added yet"
                  )
                }
              />
            </div>
            <div className="space-y-8">
              <TrainerInfoColumn
                InfoSections={[workingModes, services, languages]}
              />

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-200">
                  Social Media
                </h3>
                <div className="flex space-x-4">
                  {socialAndExpirianceArray.length > 0 ? (
                    socialAndExpirianceArray.map(({ key, value }, index) => (
                      <SocialLink
                        key={index}
                        href={value}
                        icon={
                          {
                            instagram: <LuInstagram size={24} />,
                            facebook: <LuFacebook size={24} />,
                            whatsapp: <FaWhatsapp size={24} />,
                          }[key]
                        }
                      />
                    ))
                  ) : (
                    <p className="text-gray-300 font-thin">
                      No social media added yet
                    </p>
                  )}
                </div>
                <div className="mt-12 flex justify-center">
                  <AddTrainerButton
                    trainerId={trainerId}
                    isDisabled={!!currentTrainer}
                    className={
                      "bg-[#3b82f6] disabled:text-white/30 disabled:hover:scale-100 disabled:border-opacity-30 disabled:hover:shadow-none disabled:bg-transparent border border-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
}
