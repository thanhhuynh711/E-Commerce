import React, { Fragment, memo } from "react";
import logo from "assets/logo_digital_new_250x.png";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";

const { ImPhone, MdEmail, BsHandbagFill, BiSolidUserCircle } = icons;

const Header = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-main h-[110px] py-[35px] flex justify-between">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex items-center gap-3">
            <ImPhone color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex items-center gap-3">
            <MdEmail color="red" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div className="flex cursor-pointer items-center px-6 border-r justify-center gap-2">
              <BsHandbagFill color="red" />
              <span>0 items(s)</span>
            </div>
            <Link
              to={
                +current?.role === 1945
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
              className="flex cursor-pointer gap-2 justify-center px-6 items-center"
            >
              <BiSolidUserCircle size={24} color="red" />
              <span>Profile</span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
