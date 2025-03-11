import Account from "@/components/account/Account";
import { verifyAuth } from "@/lib/lucia/auth";
import isGoogleAuthUser from "@/utils/data/isGoogleAuthUser";

export default async function SecurityPage() {
  const user = (await verifyAuth()).user;
  const isGoogleUser = await isGoogleAuthUser(user?.id);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Account isGoogleUser={isGoogleUser} />
    </div>
  );
}
