import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center align-center">
      <Image src="/spinner.gif" alt="loader" width={240} height={240} />
    </div>
  );
};

export default Loading;
