import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Navbar = () => {
  const navigate = useNavigate();

  const nav = (path) => {
    console.log("rerouting");
    navigate(path);
  };

  return (
    <div className="navbar">
      <nav>
        <Button onClick={() => nav("/")} variant="contained" size="small">
          Home
        </Button>
        <Button onClick={() => nav("/about")} variant="contained" size="small">
          About
        </Button>
        <Button onClick={() => nav("/profile")} variant="contained" size="small">
          Profile
        </Button>
      </nav>
    </div>
  );
};

export default Navbar;