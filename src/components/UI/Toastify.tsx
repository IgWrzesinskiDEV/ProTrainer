"use client";

import { ReactNode } from "react";
import { toast } from "react-toastify";
export function toastify(message: ReactNode, closeTime: number) {
  toast.info(message, {
    icon: false,
    autoClose: closeTime,
    isLoading: false,
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: false,

    draggable: true,
    progress: undefined,
    theme: "dark",
    progressClassName: "bg-blue-500",
  });
}
