import React from "react";
import banner from "../assets/WIHH4196.JPEG";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="banner"
        className="h-[400px] w-full object-cover rounded-md"
      />
    </div>
  );
};

export default Banner;
