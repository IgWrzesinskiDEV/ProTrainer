import ProfileLink from "@/components/UI/profile/ProfileLink";
import { Avatar } from "@mui/material";
import { verifyAuth } from "@/lib/lucia/auth";
export default async function profileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await verifyAuth();
  const { userName, profileDetails } = user!;

  return (
    <>
      <aside className="flex gap-4 flex-col ">
        <div className="flex items-center gap-2 ">
          <Avatar
            src={
              profileDetails?.avatarFileName
                ? `https://pro-trainer-app.s3.eu-north-1.amazonaws.com/${profileDetails.avatarFileName}`
                : undefined
            }
            alt="The image selected by the user."
            className="w-20 h-20 border-stone-600 border-2 p-1"
          />
          <h2 className="text-4xl ">{userName}</h2>
        </div>
        <nav className="">
          <ul className="flex  gap-1">
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
          </ul>
        </nav>
      </aside>
      <section>{children}</section>
    </>
  );
}
