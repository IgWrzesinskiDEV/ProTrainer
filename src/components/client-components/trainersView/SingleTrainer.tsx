import { getTrainerById } from "@/utils/data/getTrainers";
import ProfileAvatar from "../../UI/ProfileAvatar";
import {
  LuMail,
  LuBriefcase,
  LuAward,
  LuGlobe,
  LuInstagram,
  LuFacebook,
  LuGraduationCap,
  LuLanguages,
  LuStar,
  LuArrowLeft,
} from "react-icons/lu";
import { PiCertificate } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { InfoSection } from "./InfoSection";
import SocialLink from "./SocialLink";
import AddTrainerButton from "./AddTrainerButton";
import TrainerInfoColumn from "./TrainerInfoColumn";
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
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-4xl text-gray-500">😕</div>
        <h1 className="text-2xl font-semibold text-gray-300 text-center">
          Trainer not found
        </h1>
        <Link
          href="/dashboard/trainers"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          Browse other trainers
        </Link>
      </div>
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="absolute inset-0 bg-blue-900/20" />

          {/* Back Button */}
          <Link
            href="/dashboard/trainers"
            className="group absolute left-0 z-10 top-0 bottom-0 w-12 sm:w-16 flex items-center justify-center 
                     bg-blue-900/30 hover:bg-blue-900/50 transition-all duration-300 
                     border-r border-blue-400/20"
          >
            <LuArrowLeft
              className="text-xl sm:text-2xl text-white/70 group-hover:text-white 
                                transition-all duration-300 transform group-hover:-translate-x-1"
            />
          </Link>

          {/* Profile Header */}
          <div className="relative p-4 sm:p-6 md:p-8 pl-16 sm:pl-20 md:pl-24">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <ProfileAvatar
                fileName={profileDetails?.avatarFileName}
                size="large"
                className="flex-shrink-0"
              />

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">
                    {userName}
                  </h1>

                  {currentTrainer === _id && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mt-2 sm:mt-0">
                      <span
                        className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium 
                                   bg-gradient-to-r from-yellow-400 to-yellow-500 
                                   text-gray-900 rounded-xl shadow-lg shadow-yellow-500/20 
                                   transition-all duration-300 hover:shadow-yellow-500/30"
                      >
                        <FaRegStar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Current Trainer
                      </span>
                      <RemoveTrainerButton trainerId={trainerId} />
                    </div>
                  )}
                </div>

                <a
                  href={`mailto:${email}`}
                  className="mt-2 sm:mt-3 inline-flex items-center text-base sm:text-lg text-white/80 
                         hover:text-white transition-colors duration-300 break-all"
                >
                  <LuMail className="mr-2 flex-shrink-0" />
                  <span className="truncate">{email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              <InfoSection
                icon={<LuStar size={24} />}
                title="Specialization"
                content={
                  socialAndExpiriance?.specialization ||
                  "No specialization added yet"
                }
              />

              <InfoSection
                icon={<LuAward size={24} />}
                title="Experience"
                content={
                  socialAndExpiriance?.experience ||
                  "No experience description added yet"
                }
                large
              />

              <InfoSection
                icon={<PiCertificate size={24} />}
                title="Certifications"
                content={
                  certifications.length > 0 ? (
                    <ul className="space-y-2">
                      {certifications.map((cert, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <span className="text-gray-300">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No certifications added yet"
                  )
                }
              />

              <InfoSection
                icon={<LuGraduationCap size={24} />}
                title="Education"
                content={
                  education.length > 0 ? (
                    <ul className="space-y-2">
                      {education.map((edu, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <span className="text-gray-300">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No education history added yet"
                  )
                }
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <TrainerInfoColumn
                InfoSections={[workingModes, services, languages]}
              />

              <div
                className="bg-gray-800/50 rounded-2xl p-4 sm:p-6 
                           border border-gray-700/50 hover:border-blue-500/20 
                           transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white flex items-center">
                  <span className="p-1.5 sm:p-2 bg-blue-500/10 rounded-xl mr-2 sm:mr-3 text-blue-400">
                    <LuGlobe size={20} className="sm:w-6 sm:h-6" />
                  </span>
                  Social Media
                </h3>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialAndExpirianceArray.length > 0 ? (
                    socialAndExpirianceArray.map(({ key, value }, index) => (
                      <SocialLink
                        key={index}
                        href={value}
                        icon={
                          {
                            instagram: (
                              <LuInstagram
                                size={18}
                                className="sm:w-5 sm:h-5"
                              />
                            ),
                            facebook: (
                              <LuFacebook size={18} className="sm:w-5 sm:h-5" />
                            ),
                            whatsapp: (
                              <FaWhatsapp size={18} className="sm:w-5 sm:h-5" />
                            ),
                          }[key]
                        }
                        label={`${key} profile`}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 italic">
                      No social media profiles added yet
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-2 sm:pt-4 md:pt-6">
                <AddTrainerButton
                  trainerId={trainerId}
                  isDisabled={!!currentTrainer}
                  className={`
                    relative overflow-hidden
                    px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-medium
                    transition-all duration-300 transform
                    disabled:bg-opacity-50  disabled:pointer-events-none
                    ${
                      currentTrainer
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r disabled:opacity-50 from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0"
                    }
                  `}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
