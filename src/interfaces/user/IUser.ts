export interface unitsInterface {
  weight: "kg" | "lbs";
  height: "cm" | "ft";
  bodyMeasurement: "cm" | "in";
  distance: "km" | "mi";
}
export enum userSex {
  MALE = "male",
  FEMALE = "female",
}

export interface profileDetailsInterface {
  fullName?: string;
  bio?: string;
  avatarFileName?: string;
}

export interface profileInformationInterface {
  height?: number;
  sex: userSex;
  age?: number;
}

export interface IUserBacisDetails {
  userName: string;
  _id: string;
  profileDetails: profileDetailsInterface;
}
