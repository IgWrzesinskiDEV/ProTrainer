import TrainerProfileDescriptionForm from "./TrainerProfileDescriptionForm";
import TrainerProfileAdditionalForm from "./TrainerProfileAdditionalForm";
import { getTrainerAdditionalData } from "@/utils/data/getTrainers";

export default async function TrainerProfileView() {
  const trainerDetails = JSON.stringify(await getTrainerAdditionalData());

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/90 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-blue-500/10">
          <TrainerProfileDescriptionForm trainerDetails={trainerDetails} />
        </div>
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/90 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-blue-500/10">
          <TrainerProfileAdditionalForm trainerDetails={trainerDetails} />
        </div>
      </div>
    </div>
  );
}
