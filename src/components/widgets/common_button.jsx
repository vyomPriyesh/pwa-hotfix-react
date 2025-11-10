import React from "react";
import { Button } from "../ui/button";
import CustomLoader from "./custom_loader";
import { cn } from "../../lib/utils";

const CommonButton = ({
  children,
  isLoading = false,
  variant = "default",
  size = "default",
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("relative", className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CustomLoader size={20} color="currentColor" />
        </div>
      )}
      <span className={cn(isLoading && "opacity-0")}>{children}</span>
    </Button>
  );
};

export default CommonButton;
