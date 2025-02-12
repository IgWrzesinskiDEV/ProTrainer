import { Lucia, TimeSpan } from "lucia";

import { adapter } from "../mongodb/adapter";
import {
  unitsInterface,
  profileDetailsInterface,
} from "@/interfaces/user/IUser";
//import connectMongoDb from "../mongodb/mogodb";
//await connectMongoDb();
export const luciaAuth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(5, "d"),
  sessionCookie: {
    expires: false,

    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      userName: attributes.userName,
      email: attributes.email,
      role: attributes.role,
      units: attributes.units,
      email_verified: attributes.email_verified,
      avatarFileName: attributes.avatarFileName,
      profileDetails: attributes.profileDetails,
      currentTrainer: attributes.currentTrainer,
    };
  },
});
declare module "lucia" {
  interface Register {
    Lucia: typeof luciaAuth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
export interface DatabaseUserAttributes {
  id: string;
  userName: string;
  units: unitsInterface;
  email: string;
  role: string;
  email_verified: boolean;
  avatarFileName: string;
  profileDetails: profileDetailsInterface;
  currentTrainer: string;
}
