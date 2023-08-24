import React, { memo } from "react";
import { formatMoney, renderStartFromNumber } from "ultils/helper";

const ProductCard = ({ price, totalRatings, image, title }) => (
  <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
    <div className="flex w-full border">
      <img src={image} alt={title} className="w-[120px] object-contain p-4" />
      <div className="flex flex-col mt-[15px] items-start gap-1 text-sx w-full felx flex-col">
        <span className="line-clamp-1 capitalize text-sm">
          {title.toLowerCase()}
        </span>
        <span>{`${formatMoney(price)} VNĐ`}</span>
        <span className="flex h-4">
          {renderStartFromNumber(totalRatings, 14)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
      </div>
    </div>
  </div>
);

export default memo(ProductCard);
