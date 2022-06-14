import { React, useEffect, useState } from "react";
import { useCounter } from "../CounterProvider";

const NumberPresenter = () => {
  const { value } = useCounter(); //custom hook bro!

  return (
    <div>
      <h4>NumberPresenter</h4>
      <p>{value}</p>
    </div>
  );
};

export default NumberPresenter;