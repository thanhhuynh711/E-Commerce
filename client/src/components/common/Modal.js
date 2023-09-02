import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { sowModal } from "store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(sowModal({ isShowModal: false, modalChildren: null }))
      }
      className="absolute inset-0 bg-overlay z-[5000] flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default memo(Modal);
