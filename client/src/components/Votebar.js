import React, { memo, useRef, useEffect } from "react";
import icons from "../ultils/icons";

const { AiFillStar } = icons;

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();

  useEffect(() => {
    percentRef.current.style.cssText = `right: ${
      100 - Math.round((ratingCount * 100) / ratingTotal)
    }%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex items-center w-[10%] justify-center gap-1 text-sm">
        <span className="w-[6px]">{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[75%]">
        <div className="w-full h-[6px] bg-gray-200 relative rounded-r-full rounded-l-full">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-main rounded-r-full rounded-l-full"
          ></div>
        </div>
      </div>
      <div className="w-[15%] text-xs flex justify-end text-gray-400">{`${
        ratingCount || 0
      } reviewers`}</div>
    </div>
  );
};

export default memo(Votebar);
