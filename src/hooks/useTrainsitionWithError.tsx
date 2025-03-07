import { toastify } from "@/components/UI/Toastify";
import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { ReactNode, useTransition } from "react";
import { TbFaceIdError } from "react-icons/tb";

export default function useTransitionWithError(
  toastSuccesContent: ReactNode,
  onTrainsition?: () => Promise<void | { error: string }>
) {
  if (!onTrainsition) {
    throw new Error("onTrainsition is required");
  }
  const [isPending, startTransition] = useTransition();
  const onClickHandler = () => {
    startTransition(async () => {
      try {
        const data = await onTrainsition();
        if (data && "error" in data) {
          throw new Error(data.error);
        }
        toastify(toastSuccesContent, 3000);
      } catch (e) {
        if (e && typeof e === "object" && "digest" in e) {
          const dig: string = (e as { digest: string }).digest;
          if (dig.split(";")[0] === "NEXT_REDIRECT") {
            return;
          }
        }

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
