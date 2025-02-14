import { TrainerSocialMediaSchemaType } from "@/schemas/zSchemas";

export default function convertSocialMediaDatatoDB(
  validateData: TrainerSocialMediaSchemaType
) {
  const dbData = {
    experience: validateData.experience,
    specialization: validateData.specialization,
    workingModes: {
      onSite: validateData.onSite,
      online: validateData.online,
    },
    socialMedia: {
      instagram: validateData.instagram,
      facebook: validateData.facebook,
      whatsapp: validateData.whatsapp,
    },
  };
  return dbData;
}
