import { React, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import NumberPresenter from "./components/NumberPresenter";
import NumberModifier from "./components/NumberModifier";
import { useCounter } from "./CounterProvider";

function App() {
  const { value, increment, decrement } = useCounter(); //custom hook bro!

  return (
    <div className="App">
      <h4>Counter</h4>
      <p>Value: {value}</p>
      <Button onClick={decrement} variant="contained" size="small">
        -
      </Button>
      <Button onClick={increment} variant="contained" size="small">
        +
      </Button>
      <NumberPresenter />
      <NumberModifier />
    </div>
  );
}

export default App;