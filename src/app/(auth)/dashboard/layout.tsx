import ProfileLink from "@/components/UI/profile/ProfileLink";
import AsideNav from "@/components/dashboard/AsideNav";
import TrainerNavLinks from "@/components/dashboard/TrainerNavLinks";
import ClientNavLinks from "@/components/dashboard/ClientNavLinks";
import { verifyAuth } from "@/lib/lucia/auth";
export default async function profileLayout({
  trainer,
  client,
}: {
  trainer: React.ReactNode;
  client: React.ReactNode;
}) {
  const { user } = await verifyAuth();
  const { userName, profileDetails, role } = user!;

  return (
    <>
      <AsideNav
        avatarFileName={profileDetails?.avatarFileName}
        userName={userName}
      >
        {role === "USER" ? <ClientNavLinks /> : <TrainerNavLinks />}
      </AsideNav>

      <section>{role === "USER" ? client : trainer}</section>
    </>
  );
}
