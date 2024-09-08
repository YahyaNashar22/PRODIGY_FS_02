"use client";

import React from "react";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center w-full h-auto bg-blue-500 text-white font-semibold py-4 px-4 sm:py-6 sm:px-8 lg:py-8 lg:px-16">
      <div className="flex flex-col justify-start items-start mb-4 sm:mb-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl">PRODIGY_FS_02</h1>
        <h3 className="text-lg sm:text-xl lg:text-2xl italic">
          Employee Management App
        </h3>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
