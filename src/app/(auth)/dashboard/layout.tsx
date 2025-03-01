import { verifyAuth } from "@/lib/lucia/auth";

import { IUserRole } from "@/lib/models/user.model";

export const revalidate = 0;
export default async function profileLayout({
  trainer,
  client,
}: {
  trainer: React.ReactNode;
  client: React.ReactNode;
}) {
  const { user } = await verifyAuth();
  const { role } = user!;

  return (
    <>
      {/* <AsideNav
        avatarFileName={avatar.profileDetails.avatarFileName}
        userName={userName}
      >
        {role === "USER" ? <ClientNavLinks /> : <TrainerNavLinks />}
      </AsideNav> */}
      {/* <nav className="bg-[#252220] shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {["Profile", "Account", "Plans", "Measurement", "Trainers"].map(
              (tab) => (
                <ProfileLink key={tab} href="/dashboard/profile" text={tab} />
              )
            )}
          </div>
        </div>
      </nav> */}
      {}

      <section>{role === IUserRole.CLIENT ? client : trainer}</section>
    </>
  );
}
