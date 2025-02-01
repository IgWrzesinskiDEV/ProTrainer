import { Lucia, TimeSpan } from "lucia";

import { adapter } from "../mongodb/adapter";
import {
  unitsInterface,
  profileDetailsInterface,
} from "@/interfaces/user/IUser";
import connectMongoDb from "../mongodb/mogodb";
await connectMongoDb();
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
      userName: attributes.userName,
      email: attributes.email,
      units: attributes.units,
      email_verified: attributes.email_verified,
      avatarFileName: attributes.avatarFileName,
      profileDetails: attributes.profileDetails,
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
  userName: string;
  units: unitsInterface;
  email: string;
  email_verified: boolean;
  avatarFileName: string;
  profileDetails: profileDetailsInterface;
}
