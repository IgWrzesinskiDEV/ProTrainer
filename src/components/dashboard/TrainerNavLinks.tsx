import ProfileLink from "../profile/ProfileLink";
export default function TrainerNavLinks() {
  return (
    <>
      <li>
        <ProfileLink href="/dashboard/profile" text="Profile" />
      </li>
      <li>
        <ProfileLink href="/dashboard/account" text="Account" />
      </li>
      <li>
        <ProfileLink href="/dashboard/clients" text="Clients" />
      </li>
      <li>
        <ProfileLink href="/dashboard/trainer-profile" text="Trainer profile" />
      </li>
    </>
  );
}
