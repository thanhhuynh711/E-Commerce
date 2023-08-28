import React, { memo } from "react";
import banner from "assets/WIHH4196.JPEG";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src="https://previews.123rf.com/images/niroworld/niroworld1405/niroworld140500010/28076906-sale-discount-and-promotion-shopping-concept-with-sale-sign-and-percentage-on-red-hanged-tags.jpg"
        alt="banner"
        className="h-[400px] w-full object-contain border rounded-md"
      />
    </div>
  );
};

export default memo(Banner);
