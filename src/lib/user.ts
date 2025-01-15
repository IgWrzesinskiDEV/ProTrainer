import { IUser } from "./models/user.model";
import { User } from "./models/user.model";

export async function createUser(user: IUser) {
  const newUser = new User({
    _id: user._id,
    email: user.email,
    userName: user.userName,
    password: user.password,
    role: user.role,
  });
  return newUser.save();
}
