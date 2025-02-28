export interface unitsInterface {
  weight: "kg" | "lbs";
  height: "cm" | "ft";
  bodyMeasurement: "cm" | "in";
}

export interface profileDetailsInterface {
  fullName?: string;
  bio?: string;
  avatarFileName?: string;
}

export interface IUserBacisDetails {
  userName: string;
  _id: string;
  profileDetails: profileDetailsInterface;
}
