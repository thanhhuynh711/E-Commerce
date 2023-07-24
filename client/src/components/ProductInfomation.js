import React, { memo, useState, useCallback } from "react";
import { productInfoTabs } from "../ultils/contants";
import { Votebar, Button, VoteOption } from "./";
import { renderStartFromNumber } from "../ultils/helper";
import { apiRatings } from "../apis";
import { useDispatch } from "react-redux";
import { sowModal } from "../store/app/appSlice";

const ProductInfomation = ({ totalRatings, totalCount, nameProduct }) => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            onClick={() => setActiveTab(el.id)}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === +el.id
                ? "bg-white border border-b-0 "
                : "bg-gray-200"
            }`}
            key={el.id}
          >
            {el.name}
          </span>
        ))}
        <div
          onClick={() => setActiveTab(5)}
          className={`py-2 px-4 cursor-pointer ${
            activeTab === 5 ? "bg-white border border-b-0 " : "bg-gray-200"
          }`}
        >
          CUSTOMER REVIEW
        </div>
      </div>
      <div className="w-full  border p-4">
        {productInfoTabs.some((el) => el.id === activeTab) &&
          productInfoTabs.find((el) => el.id === activeTab)?.content}
        {activeTab === 5 && (
          <div className="flex border flex-col p-4">
            <div className="flex">
              <div className="flex-4 flex items-center flex-col gap-1 justify-center">
                <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
                <span className="flex items-center gap-1">
                  {renderStartFromNumber(totalRatings)?.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </span>
                <span className="text-sm">{`${totalCount} reviewer and commentors`}</span>
              </div>
              <div className="flex-6 flex flex-col p-2 gap-4">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <Votebar
                      key={el}
                      number={el + 1}
                      ratingTotal={5}
                      ratingCount={2}
                    />
                  ))}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center text-sm flex-col gap-2">
              <span>Do you review this product?</span>
              <Button
                handleOnClick={() =>
                  dispatch(
                    sowModal({
                      isShowModal: true,
                      modalChildren: <VoteOption nameProduct={nameProduct} />,
                    })
                  )
                }
              >
                Vore now!
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
