import ProfileWrapper from "../UI/profile/ProfileWrapper";
import { Avatar } from "@mui/material";
import { addTrainer } from "@/actions/trainers.actions";
import TrainerButton from "../UI/trainers/TrainerButton";
export default async function SingleTrainer({
  params,
}: {
  params: Promise<{ trainerSlug: string }>;
}) {
  const trainerId = (await params).trainerSlug;
  console.log(trainerId);
  return (
    <ProfileWrapper title="Trainer">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <Avatar
            src="https://pro-trainer-app.s3.eu-north-1.amazonaws.com/1636044070474.jpg"
            alt="The image selected by the user."
            className="w-14 h-14 p-1"
          />
          <div className="flex flex-col items-center gap-2 justify-center text-center">
            <p className="text-xl">John Doe</p>
            <p>Specialization: powerlifting</p>
          </div>
        </div>
        <p className="text-slate-400 font-normal text-sm mx-5 italic">
          John is a powerlifting coach with 10 years of experience. He has
          helped many clients achieve their goals. He is a very experienced
          coach and has a lot of knowledge to share.
        </p>
        <TrainerButton addTrainerHandler={addTrainer} trainerId={trainerId} />
      </div>
    </ProfileWrapper>
  );
}
