import { User } from "../../lib/models/user.model";

export async function createUser(user: {
  _id: string;
  email: string;
  userName: string;
  password: string;
  role?: string;
}) {
  const newUser = await User.create({
    _id: user._id,
    email: user.email,
    userName: user.userName,
    password: user.password,
    role: user.role || "CLIENT",
  });
  return newUser;
}

export async function getUserByEmail(email: string) {
  try {
    const user = User.findOne({ email });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = User.findOne({ _id: id });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserAvatarById(id: string) {
  try {
    const avatarFileName = User.findById(id, "profileDetails.avatarFileName");
    return avatarFileName;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserUnitsById(id: string) {
  try {
    const units = User.findById(id, "units");
    return units;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserProfileDetails(id: string) {
  try {
    const profileDetails = User.findById(id, "profileDetails");
    return profileDetails;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserNamesById(id: string) {
  try {
    const names = User.findById(id, "userName profileDetails");
    return names;
  } catch (e) {
    console.error(e);
    return null;
  }
}
