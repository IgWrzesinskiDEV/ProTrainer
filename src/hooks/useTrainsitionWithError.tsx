import { toastify } from "@/components/UI/Toastify";
import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { ReactNode, useTransition } from "react";
import { TbFaceIdError } from "react-icons/tb";

export default function useTransitionWithError(
  toastSuccesContent: ReactNode,
  onTrainsition?: () => Promise<void>
) {
  if (!onTrainsition) {
    throw new Error("onTrainsition is required");
  }
  const [isPending, startTransition] = useTransition();
  const onClickHandler = () => {
    startTransition(async () => {
      try {
        await onTrainsition();
        toastify(toastSuccesContent, 3000);
      } catch (e) {
        toastify(
          <CustomToastContent
            message={e instanceof Error ? e.message : String(e)}
            CustomIcon={<TbFaceIdError className="text-2xl text-red-500" />}
          />,
          3000
        );
      }
    });
  };

  return { isPending, onClickHandler };
}
