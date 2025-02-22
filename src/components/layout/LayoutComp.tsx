import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

const LayoutComp = () => {
  return (
    <div className=" sm:flex sm:flex-row-reverse  ">
      {/* Main Content */}
      <div className="  w-full min-h-[100vh]  overflow-y-scroll  sm:h-[100vh] ">
        {/* <div className="max-w-[70%] mx-auto"> */}
        <Outlet />
        {/* </div> */}
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default LayoutComp;
