"use client";
import { sendInviteToTrainer } from "@/actions/trainers.actions";

import { RiUserAddLine } from "react-icons/ri";

import CustomToastContent from "@/components/UI/toastify/CustomToast";

import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import useTransitionWithError from "@/hooks/useTrainsitionWithError";

export default function AddTrainerButton({
  trainerId,
  isDisabled,
  className,
}: {
  trainerId: string;
  isDisabled?: boolean;
  className: string;
}) {
  const { isPending, onClickHandler } = useTransitionWithError(
    <CustomToastContent
      message="Invitation sent!"
      CustomIcon={<RiUserAddLine className="text-2xl text-green-500" />}
    />,
    () => sendInviteToTrainer(trainerId)
  );
  return (
    <ButtonWithLoading
      isLoading={isPending}
      isDisabled={isPending || isDisabled}
      onClick={onClickHandler}
      className={className}
    >
      Hire me!
    </ButtonWithLoading>
  );
}
