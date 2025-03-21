import {
  IUserBacisDetails,
  profileInformationInterface,
  unitsInterface,
} from "../user/IUser";
import { ISingleMeasurement } from "@/lib/models/measurement.model";
export interface IClientPreview extends IUserBacisDetails {
  email: string;
}

export interface IfullClientData extends IClientPreview {
  measurements?: ISingleMeasurement[];
  units: unitsInterface;
  profileInformation: profileInformationInterface;
}
