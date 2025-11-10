import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

const CommonShimmer = ({
  type = "text",
  className,
  count = 1,
  width,
  height,
  ...props
}) => {
  const renderShimmer = () => {
    switch (type) {
      case "text":
        return (
          <div className="space-y-2">
            {[...Array(count)].map((_, index) => (
              <Skeleton
                key={index}
                className={cn("h-4 w-full", className)}
                {...props}
              />
            ))}
          </div>
        );
      case "avatar":
        return (
          <Skeleton
            className={cn("h-12 w-12 rounded-full", className)}
            {...props}
          />
        );
      case "image":
        return (
          <Skeleton
            className={cn("h-48 w-full rounded-lg", className)}
            {...props}
          />
        );
      case "card":
        return (
          <div className="space-y-3">
            <Skeleton className={cn("h-48 w-full rounded-lg", className)} />
            <div className="space-y-2">
              <Skeleton className={cn("h-4 w-3/4", className)} />
              <Skeleton className={cn("h-4 w-1/2", className)} />
            </div>
          </div>
        );
      case "custom":
        return (
          <Skeleton
            className={className}
            style={{ width, height }}
            {...props}
          />
        );
      default:
        return <Skeleton className={cn("h-4 w-full", className)} {...props} />;
    }
  };

  return renderShimmer();
};

export default CommonShimmer;
