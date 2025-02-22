import { Box, Card, Grid, Grid2, Paper } from "@mui/material";
import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <div className=" flex flex-col justify-center items-center my-6 gap-2">
      <Paper variant="outlined" className=" w-[30%]  text-center ">
        <h1 className=" text-4xl py-7 font-bold font-mono">Buzzer</h1>
        {isLogin ? <Login /> : <Register />}
      </Paper>
      <Paper variant="outlined" className=" w-[30%]  text-center py-5 ">
        {isLogin ? "Don't have an account? " : "Have an account? "}
        <span
          className=" text-blue-600 font-semibold hover:cursor-pointer hover:text-blue-400"
          onClick={toggleLogin}
        >
          {!isLogin ? "Log in" : "Sign up"}
        </span>
      </Paper>
    </div>
  );
};

export default Authentication;
