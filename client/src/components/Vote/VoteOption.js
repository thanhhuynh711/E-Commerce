import React, { memo, useRef, useEffect, useState } from "react";
import logo from "assets/logo_digital_new_250x.png";
import { voteOption } from "ultils/contants";
import icons from "ultils/icons";
import { Button } from "components";

const { AiFillStar } = icons;

const VoteOption = ({ nameProduct, handleSubmitVoleOption }) => {
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(null);
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center rounded-md"
    >
      <img src={logo} alt="logo" className="w-[300px] my-8 object-contain" />
      <h2 className="text-sm text-center">{`Voting product ${nameProduct}`}</h2>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type something"
        className="form-textarea w-full placeholder:italic placeholder:text-sm placeholder:text-gray-500"
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center">How do you like this product?</p>
        <div className="flex items-center justify-center gap-4">
          {voteOption.map((el) => (
            <div
              onClick={() => {
                setChosenScore(el.id);
                setScore(el.id);
              }}
              key={el.id}
              className="flex w-[100px] h-[100px] items-center bg-gray-100 cursor-pointer rounded-md p-4 justify-center flex-col gap-2"
            >
              {Number(chosenScore) && chosenScore >= el.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        fw
        handleOnClick={() => handleSubmitVoleOption({ comment, score })}
      >
        Submit
      </Button>
    </div>
  );
};

export default memo(VoteOption);
