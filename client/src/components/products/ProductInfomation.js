import React, { memo, useState, useCallback } from "react";
import { productInfoTabs } from "ultils/contants";
import { Votebar, Button, VoteOption, Comment } from "components";
import { renderStartFromNumber } from "ultils/helper";
import { apiRatings } from "apis";
import { useDispatch, useSelector } from "react-redux";
import { sowModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import path from "ultils/path";
import { useNavigate } from "react-router-dom";

const ProductInfomation = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleSubmitVoleOption = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert("Please vote when click submit");
      return;
    }
    await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
    dispatch(sowModal({ isShowModal: false, modalChildren: null }));
    rerender();
  };

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to vote",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Oops!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        sowModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              handleSubmitVoleOption={handleSubmitVoleOption}
              nameProduct={nameProduct}
            />
          ),
        })
      );
    }
  };

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
      </div>
      <div className="w-full  border p-4">
        {productInfoTabs.some((el) => el.id === activeTab) &&
          productInfoTabs.find((el) => el.id === activeTab)?.content}
      </div>

      <div className="border p-4 mt-4">
        <div className="flex flex-col p-4">
          <div className="flex">
            <div className="flex-4 flex items-center flex-col gap-1 justify-center">
              <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
              <span className="flex items-center gap-1">
                {renderStartFromNumber(totalRatings)?.map((el, index) => (
                  <span key={index}>{el}</span>
                ))}
              </span>
              <span className="text-sm">{`${ratings?.length} reviewer and commentors`}</span>
            </div>
            <div className="flex-6 flex flex-col p-2 gap-4">
              {Array.from(Array(5).keys())
                .reverse()
                .map((el) => (
                  <Votebar
                    key={el}
                    number={el + 1}
                    ratingTotal={ratings?.length}
                    ratingCount={
                      ratings?.filter((i) => i.star === el + 1)?.length
                    }
                  />
                ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center text-sm flex-col gap-2">
            <span>Do you review this product?</span>
            <Button handleOnClick={handleVoteNow}>Vore now!</Button>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {ratings?.map((el) => (
            <Comment
              key={el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
