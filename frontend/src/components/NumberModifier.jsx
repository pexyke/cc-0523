import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import NumberPresenter from "./NumberPresenter";
import { useCounter } from "../CounterProvider";

const NumberModifier = () => {
  const { increment, decrement } = useCounter(); //custom hook bro!

  return (
    <div>
      <h4>NumberModifier</h4>
      <Button onClick={decrement} variant="contained" size="small">
        -
      </Button>
      <Button onClick={increment} variant="contained" size="small">
        +
      </Button>
      <NumberPresenter />
    </div>
  );
};

export default NumberModifier;