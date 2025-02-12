export interface ITrainer {
  userName: string;
  _id: string;
  profileDetails: {
    avatarFileName?: string;
    bio?: string;
    fullName?: string;
  };
}

export interface ITrainerDetails extends ITrainer {
  email: string;
  trainerDetails?: {
    clients?: string[] | undefined;
    specialization?: string;
    experienceDescription?: string;
    education?: string[] | undefined;
    certifications?: string[] | undefined;
    languages?: string[] | undefined;
    services?: string[] | undefined;
  };
}

export interface ITrainerOnlyDetails {
  _id: string;
  trainerDetails?: {
    clients?: string[] | undefined;
    specialization?: string;
    experienceDescription?: string;
    education?: string[] | undefined;
    certifications?: string[] | undefined;
    languages?: string[] | undefined;
    services?: string[] | undefined;
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
