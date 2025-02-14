import ProfileWrapper from "../profile/ProfileWrapper";
import { getTrainerById } from "@/utils/data/getTrainers";
import ProfileAvatar from "../UI/ProfileAvatar";
import {
  LuUser,
  LuMail,
  LuBriefcase,
  LuAward,
  LuGlobe,
  LuInstagram,
  LuFacebook,
  LuExternalLink,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

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
  console.log(socialAndExpirianceArray);
  const workingModes = Object.entries(socialAndExpiriance?.workingModes || {})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return (
    <ProfileWrapper title="">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-blue-400/10">
        <div className="bg-[#3b82f6] text-white p-8">
          <h2 className="text-4xl font-bold flex items-center mb-4">
            {profileDetails?.avatarFileName ? (
              <ProfileAvatar
                fileName={profileDetails.avatarFileName}
                className="w-20 h-20 mr-4 border-2 border-white rounded-full"
              />
            ) : (
              <LuUser className="w-20 h-20 mr-4" />
            )}
            {userName}
          </h2>
          <p className="text-xl flex items-center opacity-90">
            <LuMail className="mr-3" size={24} />
            {email}
          </p>
        </div>
        <div className="p-8 bg-gray-900 bg-opacity-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <InfoSection
                icon={<LuBriefcase className="text-[#3b82f6]" size={24} />}
                title="Specialization"
                content={
                  socialAndExpiriance?.specialization ||
                  "No specialization description added yet"
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
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center text-gray-200">
                  <LuGlobe className="mr-2 text-[#3b82f6]" size={24} />
                  Working Modes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {workingModes.map((mode, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-opacity-30 select-none"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-200">
                  Social Media
                </h3>
                <div className="flex space-x-4">
                  {socialAndExpirianceArray.map(({ key, value }, index) => (
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
                  ))}
                  {/* <SocialLink
                    href={socialAndExpiriance.socialMedia.facebook}
                    icon={<LuFacebook size={24} />}
                  />
                  <SocialLink
                    href={socialAndExpiriance.socialMedia.instagram}
                    icon={<LuInstagram size={24} />}
                  />
                  <SocialLink
                    href={socialAndExpiriance.socialMedia.whatsapp}
                    icon={<FaWhatsapp size={24} />}
                  /> */}
                </div>
                <div className="mt-12 flex justify-center">
                  <button className="bg-[#3b82f6] text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Hire me!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
}

const InfoSection = ({ icon, title, content, large = false }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-200">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    <p className={`text-gray-300 ${large ? "text-lg" : ""}`}>{content}</p>
  </div>
);

const SocialLink = ({ href, icon }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
    >
      {icon}
      <LuExternalLink size={16} className="ml-1" />
    </a>
  );
};
