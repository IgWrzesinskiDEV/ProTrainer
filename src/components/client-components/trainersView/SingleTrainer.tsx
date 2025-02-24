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
import { InfoSection } from "./InfoSection";
import SocialLink from "./SocialLink";
import AddTrainerButton from "./AddTrainerButton";
import TrainerInfoColumn from "./TrainerInfoColumn";
import BackToLink from "@/components/UI/Buttons/BackToLink";
export default async function SingleTrainer({
  params,
}: {
  params: Promise<{ trainerSlug: string }>;
}) {
  const trainerId = (await params).trainerSlug;
  const trainer = await getTrainerById(trainerId);

  if (!trainer) {
    return (
      <ProfileWrapper title="">
        <div className="flex flex-col items-center gap-10">
          <p className="text-white text-xl">Trainer not found</p>
        </div>
      </ProfileWrapper>
    );
  }

  const { userName, email, trainerDetails, profileDetails } = trainer;
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
    <ProfileWrapper title="">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-blue-400/10">
        <div className="bg-[#3b82f6] text-white p-8 flex justify-start items-center">
          <div>
            <h2 className="text-4xl font-bold flex items-center mb-4">
              {profileDetails?.avatarFileName ? (
                <ProfileAvatar
                  fileName={profileDetails.avatarFileName}
                  className="w-20 h-20 mr-4 border-2 border-gray-800 rounded-full"
                />
              ) : (
                <LuUser className="w-20 h-20 mr-4" />
              )}
              {userName}
            </h2>
            <a
              className="text-xl flex items-center opacity-90 hover:text-gray-200 transition-colors duration-300"
              href={`mailto:${email}`}
            >
              <LuMail className="mr-3" size={24} />
              {email}
            </a>
          </div>
          <BackToLink
            href="/dashboard/trainers"
            className="mb-auto ml-auto items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-200 border border-yellow-500/20 hover:border-yellow-500/40 backdrop-blur-sm"
          >
            Back to trainers
          </BackToLink>
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
                  <AddTrainerButton trainerId={trainerId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
}
