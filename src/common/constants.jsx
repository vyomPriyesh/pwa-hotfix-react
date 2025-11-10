import moment from "moment";
import { AppIcons, AppImages } from "./ImagePath";

export const formatDate = (dateTime) => {
  if (!dateTime) return "";
  return moment(dateTime).format("MMMM D, YYYY");
};

export const formatDay = (dateTime) => {
  if (!dateTime) return "";
  return moment(dateTime).format("dddd");
};

export const formatTimeFromMilliseconds = (milliseconds) => {
  return moment(milliseconds).format("hh:mm A");
};

export const getTimeDuration = (startTimeMillis, endTimeMillis) => {
  const startTime = moment(startTimeMillis);
  const endTime = moment(endTimeMillis);
  const duration = moment.duration(endTime.diff(startTime));

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${
      minutes > 0 ? `${minutes} min` : ""
    }`;
  } else {
    return `${minutes} min`;
  }
};

export const getFirstName = (name) => {
  const nameParts = name.split(" ");
  return nameParts.length > 0 ? nameParts[0] : "";
};

export const getLastName = (name) => {
  const nameParts = name.split(" ");
  return nameParts.length > 1 ? nameParts[1] : "";
};

export const formatDistance = (distanceInKm) => {
  if (distanceInKm < 1) {
    const distanceInMeters = Math.round(distanceInKm * 1000);
    return `${distanceInMeters}M`;
  } else {
    const distanceInKmInt = Math.round(distanceInKm);
    return `${distanceInKmInt}KM`;
  }
};

export const launchURL = async (url) => {
  try {
    window.open(url, "_blank");
  } catch (error) {
    throw new Error(`Could not launch ${url}`);
  }
};

// Empty state component
export const EmptyDataPlaceholder = ({ name, desc, top }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <img
        src={AppImages.noData}
        alt="No data"
        className={`h-[200px] mb-2.5 ${top ? `mt-[${top}]` : "mt-[100px]"}`}
      />
      <h2 className="text-lg font-bold mb-2.5">{name || "No Data Found"}</h2>
      <p className="text-xs text-gray-600 font-normal text-center px-[22px]">
        {desc || "There is no data to show you right now"}
      </p>
    </div>
  );
};

// Empty image component
export const EmptyImage = ({ height, width }) => {
  return (
    <img
      src={AppIcons.avatarIcon}
      alt="Empty"
      className={`w-[${width}] h-[${height}]`}
    />
  );
};
