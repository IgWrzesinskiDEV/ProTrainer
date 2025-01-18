"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Slide } from "@mui/material";

import { ReactElement } from "react";
import { cn } from "@/lib/twMergeUtill";

interface SnackBarToastProps {
  message: ReactElement | string;
  closeTime: number;
  isOpen: boolean;
  icon: ReactElement;
  className?: string;
  onCloseHandler: () => void;
}

export default function SnackBarToast({
  message,
  closeTime,
  onCloseHandler,
  isOpen,
  className,
  icon,
}: SnackBarToastProps) {
  return (
    <Snackbar
      open={isOpen}
      onClose={onCloseHandler}
      TransitionComponent={Slide}
      autoHideDuration={closeTime}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      className="mt-4 "
    >
      <Alert
        icon={icon}
        variant="filled"
        severity="success"
        className={cn(
          `text-xl bg-blue-500 px-2 py-1 rounded-md text-white border-2 border-blue-700 shadow-lg flex justify-center items-center`,
          className
        )}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
