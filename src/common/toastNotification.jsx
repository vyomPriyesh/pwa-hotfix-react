import { toast } from "react-hot-toast";

export const toastSuccess = (message) => {
  toast.success(message || "Operation successful!");
};

export const toastWarning = (message) => {
  toast(message || "Warning!", {
    icon: "⚠️",
    style: {
      borderRadius: "10px",
      background: "#fff3cd",
      color: "#856404",
    },
  });
};

export const toastInfo = (message) => {
  toast(message || "Information", {
    icon: "ℹ️",
    style: {
      borderRadius: "10px",
      background: "#cce5ff",
      color: "#004085",
    },
  });
};

export const toastError = (message, setPlans) => {
  const errorMessage = message?.response?.data?.message
    ? message?.response?.data?.message
    : message?.response?.data?.detail
    ? message?.response?.data?.detail
    : message?.message
    ? message?.message
    : message;

  if (
    errorMessage === "Internal error: 'NoneType' object is not subscriptable"
  ) {
    setPlans(0);
    localStorage.setItem("chat-step", 0);
    return;
  }
  toast.error(errorMessage || "Something went wrong.");
};

export const toastLocalError = (error, setPlans) => {
  const errorMessage = error?.response?.data?.apierror?.message
    ? error?.response?.data?.apierror?.message
    : error?.response?.data?.message
    ? error?.response?.data?.message
    : error?.response?.message
    ? error?.response?.message
    : error?.message
    ? error?.message
    : error;

  if (
    errorMessage === "Internal error: 'NoneType' object is not subscriptable"
  ) {
    setPlans(0);
    localStorage.setItem("chat-step", 0);
    return;
  }
  toast.error(errorMessage || "Something went wrong.");
};
