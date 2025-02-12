import AsideNav from "@/components/dashboard/AsideNav";
import TrainerNavLinks from "@/components/dashboard/TrainerNavLinks";
import ClientNavLinks from "@/components/dashboard/ClientNavLinks";
import { verifyAuth } from "@/lib/lucia/auth";
import { getUserAvatarById } from "@/utils/data/user";
export const revalidate = 0;
export default async function profileLayout({
  trainer,
  client,
}: {
  trainer: React.ReactNode;
  client: React.ReactNode;
}) {
  const { user } = await verifyAuth();
  const { userName, id, role } = user!;
  const avatar = await getUserAvatarById(id);

  return (
    <>
      <AsideNav
        avatarFileName={avatar.profileDetails.avatarFileName}
        userName={userName}
      >
        {role === "USER" ? <ClientNavLinks /> : <TrainerNavLinks />}
      </AsideNav>

      <section>{role === "USER" ? client : trainer}</section>
    </>
  );
}
