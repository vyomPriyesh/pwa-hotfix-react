import { useCallback, useRef } from "react";

const useDebounce = (callback, delay = 500) => {
  const timerRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export default useDebounce;
