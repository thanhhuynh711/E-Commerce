import React from "react";
import logo from "../assets/logo_digital_new_250x.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { ImPhone, MdEmail, BsHandbagFill, BiSolidUserCircle } = icons;

const Header = () => {
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
        <div className="flex items-center px-6 border-r justify-center gap-2">
          <BsHandbagFill color="red" />
          <span>0 items(s)</span>
        </div>
        <div className="flex justify-center px-6 items-center">
          <BiSolidUserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
