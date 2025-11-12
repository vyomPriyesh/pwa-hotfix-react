import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";

const CommonDialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "default",
  showClose = true,
  className,
}) => {
  const sizeClasses = {
    sm: "max-w-[calc(100vw-32px)] sm:max-w-[425px]",
    default: "max-w-[calc(100vw-32px)] sm:max-w-[600px]",
    lg: "max-w-[calc(100vw-32px)] sm:max-w-[800px] max-sm:px-2.5",
    xl: "max-w-[calc(100vw-32px)] sm:max-w-[1000px]",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        {footer && <DialogFooter className="max-sm:[&_button]:w-full">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
