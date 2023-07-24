import React, { memo, useRef, useEffect } from "react";
import logo from "../assets/logo_digital_new_250x.png";
import { voteOption } from "../ultils/contants";
import icons from "../ultils/icons";
import { Button } from "./";

const { AiFillStar } = icons;

const VoteOption = ({ nameProduct }) => {
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
        placeholder="Type something"
        className="form-textarea w-full placeholder:italic placeholder:text-sm placeholder:text-gray-500"
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center">How do you like this product?</p>
        <div className="flex items-center justify-center gap-4">
          {voteOption.map((el) => (
            <div
              key={el.id}
              className="flex w-[100px] h-[100px] items-center bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-md p-4 justify-center flex-col gap-2"
            >
              <AiFillStar color="gray" />
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button fw>Submit</Button>
    </div>
  );
};

export default memo(VoteOption);
