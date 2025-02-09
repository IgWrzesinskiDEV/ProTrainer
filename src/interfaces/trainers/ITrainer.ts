export interface ITrainer {
    userName: string;
    _id: string;
    profileDetails: {
        avatarFileName?: string;
        bio?: string;
        fullName?: string;
    }
}