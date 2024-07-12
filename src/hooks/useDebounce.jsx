import { useEffect, useState } from "react";

export const useDebounce = (value, inputError, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (!inputError) {
      const timeout = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [delay, inputError, value]);

  return debouncedValue;
};
