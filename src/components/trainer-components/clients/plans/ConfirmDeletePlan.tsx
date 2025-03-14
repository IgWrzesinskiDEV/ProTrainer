import { deletePlan } from "@/actions/trainerClients.actions";
import DeleteModalConent from "@/components/UI/DeleteModalContent";
export default function ConfirmDeletePlan({
  closeModal,
  planName,
  planId,
  clientId,
}: {
  closeModal?: () => void;
  planName?: string;
  planId?: string;
  clientId?: string;
}) {
  if (!planId || !clientId)
    return (
      <div className="flex items-center justify-center  px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        No plan id or client id{" "}
      </div>
    );

  return (
    <DeleteModalConent
      closeModal={closeModal}
      deleteHandler={async () => {
        await deletePlan(planId, clientId);
      }}
      buttonText="Remove Plan"
    >
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg font-medium text-white" id="modal-headline">
          Remove Workout Plan
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-300">
            Are you sure you want to remove this workout plan? This action
            cannot be undone.
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-400">
            Plan to be removed:{" "}
            <span className="font-semibold text-white">{planName}</span>
          </p>
        </div>
      </div>
    </DeleteModalConent>
  );
}
