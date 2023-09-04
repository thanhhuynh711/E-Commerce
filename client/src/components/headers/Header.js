import React, { Fragment, memo, useEffect, useState } from "react";
import logo from "assets/logo_digital_new_250x.png";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";

const { ImPhone, MdEmail, BsHandbagFill, BiSolidUserCircle } = icons;

const Header = () => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickoutOptions);
    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);
  console.log(current);

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
            <div
              id="profile"
              onClick={() => setIsShowOption((prev) => !prev)}
              className="relative flex cursor-pointer gap-2 justify-center px-6 items-center"
            >
              {!current?.avatar ? (
                <BiSolidUserCircle size={24} color="red" />
              ) : (
                <img
                  src={current?.avatar}
                  alt="avatar"
                  className="w-[24px] h-[24px] object-cover rounded-full"
                />
              )}
              <span className="font-semibold">Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute flex flex-col top-full left-0 bg-gray-100 border min-w-[150px] py-2"
                >
                  <Link
                    className="p-2 hover:bg-white w-full"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {+current?.role === 1945 && (
                    <Link
                      className="p-2 hover:bg-white w-full"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin workspace
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="p-2 hover:bg-white w-full"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);

// to={
//   +current?.role === 1945
//     ? `/${path.ADMIN}/${path.DASHBOARD}`
//     : `/${path.MEMBER}/${path.PERSONAL}`
// }
