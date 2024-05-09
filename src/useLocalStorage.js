import { useEffect, useState } from "react";

export default function useLocalStorage(initalState,key) {
  const [value, setValue] = useState(function () {
    const storageValues = localStorage.getItem(key);
    return storageValues ? JSON.parse(storageValues) : initalState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value,key]
  );

  return [value,setValue]
}
