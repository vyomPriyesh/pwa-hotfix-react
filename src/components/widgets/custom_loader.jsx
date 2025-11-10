import React from "react";

const CustomLoader = ({ size = 24, color = "currentColor" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-2 border-current border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: color,
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
};

export default CustomLoader;
