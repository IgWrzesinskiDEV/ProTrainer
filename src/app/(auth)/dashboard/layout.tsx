import ProfileLink from "@/components/UI/profile/ProfileLink";
import AsideNav from "@/components/dashboard/AsideNav";
import { verifyAuth } from "@/lib/lucia/auth";
export default async function profileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await verifyAuth();
  const { userName, profileDetails, role } = user!;
  console.log(role);
  return (
    <>
      <AsideNav
        avatarFileName={profileDetails?.avatarFileName}
        userName={userName}
      >
        <li>
          <ProfileLink href="/dashboard/profile" text="Profile" />
        </li>
        <li>
          <ProfileLink href="/dashboard/account" text="Account" />
        </li>
        <li>
          <ProfileLink href="/dashboard/plans" text=" Plans" />
        </li>
        <li>
          <ProfileLink href="/dashboard/measurement" text="Measurement" />
        </li>
      </AsideNav>

      <section>{children}</section>
    </>
  );
}
