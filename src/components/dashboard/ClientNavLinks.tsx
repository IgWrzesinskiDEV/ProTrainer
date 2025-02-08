import ProfileLink from "../UI/profile/ProfileLink";
export default function ClientNavLinks() {
  return (
    <>
      <li>
        <ProfileLink href="/dashboard/profile" text="Profile" />
      </li>
      <li>
        <ProfileLink href="/dashboard/account" text="Account" />
      </li>
      <li>
        <ProfileLink href="/dashboard/plans" text="Plans" />
      </li>
      <li>
        <ProfileLink href="/dashboard/measurement" text="Measurement" />
      </li>
    </>
  );
}
