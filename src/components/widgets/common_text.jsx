import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const CommonText = ({
  text,
  color = "text-gray-900",
  maxLines,
  className,
  fontSize = "text-base",
  textAlign = "text-left",
  fontWeight = "font-normal",
  onClick,
}) => {
  const textClasses = clsx(
    color,
    fontSize,
    textAlign,
    fontWeight,
    {
      "cursor-pointer": onClick,
      "line-clamp-1": maxLines === 1,
      "line-clamp-2": maxLines === 2,
      "line-clamp-3": maxLines === 3,
      "line-clamp-4": maxLines === 4,
      "line-clamp-5": maxLines === 5,
    },
    className
  );

  return (
    <p className={textClasses} onClick={onClick}>
      {text}
    </p>
  );
};

CommonText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  maxLines: PropTypes.oneOf([1, 2, 3, 4, 5]),
  className: PropTypes.string,
  fontSize: PropTypes.string,
  textAlign: PropTypes.oneOf([
    "text-left",
    "text-center",
    "text-right",
    "text-justify",
  ]),
  fontWeight: PropTypes.oneOf([
    "font-thin",
    "font-extralight",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black",
  ]),
  onClick: PropTypes.func,
};

export default CommonText;
