import { getUserById } from "./user";

export default async function isGoogleAuthUser(id?: string) {
  if (!id) return false;
  const user = await getUserById(id);
  return user.password ? false : true;
}
