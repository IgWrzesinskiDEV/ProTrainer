"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Slide } from "@mui/material";
import { MdMarkEmailRead } from "react-icons/md";

interface SnackBarToastProps {
  message: string;
  closeTime: number;
  isOpen: boolean;
  onCloseHandler: () => void;
}

export default function SnackBarToast({
  message,
  closeTime,
  onCloseHandler,
  isOpen,
}: SnackBarToastProps) {
  return (
    <Snackbar
      open={isOpen}
      onClose={onCloseHandler}
      TransitionComponent={Slide}
      autoHideDuration={closeTime}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      className="mt-4"
    >
      <Alert
        icon={<MdMarkEmailRead className="text-lime-400 mr-2 text-3xl" />}
        variant="filled"
        severity="success"
        className="text-xl bg-blue-500 px-2 py-1 rounded-md text-white border-2 border-blue-700 shadow-lg"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
