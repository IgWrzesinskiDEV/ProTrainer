import { IUser } from "@/interfaces/auth/IUser";
import User from "@/models/auth/user";
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
