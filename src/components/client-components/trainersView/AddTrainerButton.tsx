"use client";
import { sendInviteToTrainer } from "@/actions/trainers.actions";
import { toastify } from "@/components/UI/Toastify";
import { RiUserAddLine } from "react-icons/ri";
import { TbFaceIdError } from "react-icons/tb";

import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { useTransition } from "react";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
export default function AddTrainerButton({ trainerId }: { trainerId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <ButtonWithLoading
      isLoading={isPending}
      isDisabled={isPending}
      onClick={() =>
        startTransition(async () => {
          try {
            await sendInviteToTrainer(trainerId);
            toastify(
              <CustomToastContent
                message="Invitation sent!"
                CustomIcon={
                  <RiUserAddLine className="text-2xl text-green-500" />
                }
              />,
              3000
            );
          } catch (e) {
            toastify(
              <CustomToastContent
                message={e instanceof Error ? e.message : String(e)}
                CustomIcon={<TbFaceIdError className="text-2xl text-red-500" />}
              />,
              3000
            );
          }
        })
      }
      className="bg-[#3b82f6] disabled:hover:scale-100 disabled:hover:shadow-none disabled:bg-transparent border border-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Hire me!
    </ButtonWithLoading>
  );
}
