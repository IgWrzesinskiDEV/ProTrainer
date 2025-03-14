import { User } from "@/lib/models/user.model";

export async function getProfileInfoById(id?: string) {
  try {
    if (!id) {
      return {};
    }
    const userProfileInfo = await User.findById(id, "profileInformation");

    return userProfileInfo.profileInformation;
  } catch {
    return {};
  }
}
