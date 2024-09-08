import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center w-full h-auto bg-blue-500 text-white text-center sm:text-left py-6 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col justify-start items-center sm:items-start mb-4 sm:mb-0">
        <h1 className="text-base sm:text-lg">Yahya Nashar</h1>
        <h3 className="text-xs sm:text-sm italic">Prodigy Info Tech</h3>
      </div>

      <div className="flex flex-col justify-start items-center sm:items-start mb-4 sm:mb-0">
        <h1 className="text-base sm:text-lg">PRODIGY_FS_02</h1>
        <h3 className="text-xs sm:text-sm italic">
          Employee Management System
        </h3>
      </div>

      <div className="flex flex-col justify-start items-center sm:items-start">
        <h1 className="text-base sm:text-lg">Tech Stack</h1>
        <h3 className="text-xs sm:text-sm italic">Next.js</h3>
        <h3 className="text-xs sm:text-sm italic">Express.js</h3>
        <h3 className="text-xs sm:text-sm italic">Material UI</h3>
      </div>
    </footer>
  );
};

export default Footer;
