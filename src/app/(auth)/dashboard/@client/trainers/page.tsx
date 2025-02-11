import TrainersList from "@/components/client-components/Trainers";
import { getAvaliableTrainers } from "@/utils/data/getTrainers";
export default async function TrainersPage() {
  const trainers = await getAvaliableTrainers();
  console.log(trainers, "trainers");
  return <TrainersList trainerList={JSON.stringify(trainers)} />;
}
