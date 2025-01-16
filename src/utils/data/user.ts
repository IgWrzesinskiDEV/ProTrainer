import { IUser } from "../../lib/models/user.model";
import { User } from "../../lib/models/user.model";

export async function createUser(user: IUser) {
  const newUser = await User.create({
    _id: user._id,
    email: user.email,
    userName: user.userName,
    password: user.password,
    role: user.role,
  });
  return newUser;
}

export async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch {
    return null;
  }
}
