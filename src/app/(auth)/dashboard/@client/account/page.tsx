import Account from "@/components/account/Account";
import { verifyAuth } from "@/lib/lucia/auth";
import isGoogleAuthUser from "@/utils/data/isGoogleAuthUser";

export default async function AccountPage() {
  const user = (await verifyAuth()).user;
  const isGoogleUser = await isGoogleAuthUser(user?.id);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Security Settings</h1>
      <Account isGoogleUser={isGoogleUser} />
    </div>
  );
}
