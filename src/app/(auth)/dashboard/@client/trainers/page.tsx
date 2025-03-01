import TrainersList from "@/components/client-components/Trainers";
import { getAvaliableTrainers } from "@/utils/data/getTrainers";
export default async function TrainersPage() {
  const trainers = await getAvaliableTrainers();

  return <TrainersList trainerList={JSON.stringify(trainers)} />;
}
