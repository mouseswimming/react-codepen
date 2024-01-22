import { useEffect, useState } from "react";

export default function useLocalStorage(key, initValues) {
  const PREFIX = "codepen-clone-";
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(prefixedKey);

    if (saved != null) {
      return JSON.parse(saved);
    }

    if (typeof initValues === "function") {
      return initValues();
    } else {
      return initValues;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
