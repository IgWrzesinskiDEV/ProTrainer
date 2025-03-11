import Account from "@/components/account/Account";

export default async function AccountPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Security Settings</h1>
      <Account />
    </div>
  );
}
