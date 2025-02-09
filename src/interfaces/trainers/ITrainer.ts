export interface ITrainer {
    userName: string;
    _id: string;
    profileDetails: {
        avatarFileName?: string;
        bio?: string;
        fullName?: string;
    }
}

export interface ITrainerDetails extends ITrainer {

    email: string;
    trainerDetails?: {
        clients?: string[];
        specialization?: string;
        experience?: string;
        education?: string;
        languages?: string[];
        services?: string[];
    }
}