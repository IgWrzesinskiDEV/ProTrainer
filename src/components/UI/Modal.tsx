import { forwardRef, useState, useImperativeHandle } from "react";

import clsx from "clsx";
import { styled } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { BackdropProps } from "@mui/material";

export default function ModalUnstyled({
  children,
  ref,
  isBackDropClickClose = true,
}: {
  children: React.ReactElement;
  ref: React.Ref<{ open: () => void; close: () => void }>;
  isBackDropClickClose?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: { onClick: isBackDropClickClose ? handleClose : undefined },
      }}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      {children}
    </Modal>
  );
}

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  const { open, className, ...other } = props;
  Backdrop.displayName = "Backdrop";
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;

  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
