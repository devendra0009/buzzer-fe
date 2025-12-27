import React from "react";
import { removeTokenFromLocalStorage } from "../../helpers/helpers";

const SettingsPage = () => {
  const handleLogout = () => {
    removeTokenFromLocalStorage();
    window.location.href = "/login";
  };
  return (
    <div className=" flex justify-center w-[90%] mx-auto pt-6 ">
      <div className=" options w-1/3">
        <div className=" option-item p-2 hover:cursor-pointer hover:bg-[var(--outliner-color)] rounded-md">
          Account
        </div>
        <div className=" option-item p-2 hover:cursor-pointer hover:bg-[var(--outliner-color)] rounded-md">
          Privacy
        </div>
        <div className=" option-item p-2 hover:cursor-pointer hover:bg-[var(--outliner-color)] rounded-md">
          Security
        </div>
        <div className=" option-item p-2 hover:cursor-pointer hover:bg-[var(--outliner-color)] rounded-md">
          Notifications
        </div>
        <div className=" option-item p-2 hover:cursor-pointer hover:bg-[var(--outliner-color)] rounded-md">
          Help
        </div>
        <div className=" option-item p-2 hover:cursor-pointer hover:bg-[var(--outliner-color)] rounded-md">
          About
        </div>
      </div>
      <div className=" meta-option w-2/3">
        <div
          className=" bg-red-500 switch text-sm text-white p-2  rounded-md hover:cursor-pointer  inline"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
