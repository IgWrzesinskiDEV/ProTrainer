import { mongoose } from "@lucia-auth/adapter-mongoose";

import { User } from "./models/user.model";
import { Key } from "./models/key.model";
import { Session } from "./models/session.model";

export const adapter = mongoose({
  User,
  Key,
  Session,
});
