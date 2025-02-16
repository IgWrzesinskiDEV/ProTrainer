import { IUserBacisDetails } from "../user/IUser";
export interface ITrainer extends IUserBacisDetails {
  email: string;
  trainerDetails?: ITrainerDetails;
}

export interface ITrainerOnlyDetails {
  _id: string;
  trainerDetails?: ITrainerDetails;
}

export interface ITrainerDetails {
  clients?: string[] | undefined;

  socialAndExpiriance?: ITrainerSocials;
  [TrainerAdditionalDataHeadingType.Certifications]?: string[] | undefined;
  [TrainerAdditionalDataHeadingType.Services]?: string[] | undefined;
  [TrainerAdditionalDataHeadingType.Education]?: string[] | undefined;
  [TrainerAdditionalDataHeadingType.Languages]?: string[] | undefined;
}
export interface ITrainerSocials {
  experience?: string;
  specialization?: string;
  workingModes: {
    onSite: boolean;
    online: boolean;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}
export interface ITrainerAddSchema {
  heading: TrainerAdditionalDataHeadingType;
  content: string[] | undefined;
  HeadingIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export enum TrainerAdditionalDataHeadingType {
  Education = "education",
  Certifications = "certifications",
  Languages = "languages",
  Services = "services",
}
