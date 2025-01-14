import { IUser } from "./models/user.model";
import { User } from "./models/user.model";
import connectMongoDb from "./mogodb";
export async function createUser(user: IUser) {
  await connectMongoDb();
  const newUser = new User({
    email: user.email,
    userName: user.userName,
    password: user.password,
    role: user.role,
  });
  return newUser.save();
}
