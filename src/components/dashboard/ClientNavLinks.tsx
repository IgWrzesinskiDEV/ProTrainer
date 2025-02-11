import CurrentTrainerPopUp from "../client-components/CurrentTrainerPopup";
import ProfileLink from "../profile/ProfileLink";
import getCurrentTrainer from "@/utils/data/getCurrentTrainer";
export default async function ClientNavLinks() {
  const trainer = await getCurrentTrainer();

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
      <li>
        <ProfileLink href="/dashboard/trainers" text="Trainers" />
      </li>
      <li className="ml-auto">
        <CurrentTrainerPopUp currentTrainer={JSON.stringify(trainer)} />
      </li>
    </>
  );
}
