import { React, useEffect, useState } from "react";

export const useCounter = (componentName) => {
  const [counter, setCounter] = useState(
    Number(localStorage.getItem(`counter${componentName}`))
  );

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  useEffect(() => {
    localStorage.setItem(`counter${componentName}`, counter);
  }, [counter, componentName]);

  return { counter, increment, decrement };
};
