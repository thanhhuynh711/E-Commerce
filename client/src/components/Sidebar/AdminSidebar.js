import React, { memo, Fragment, useState } from "react";
import logo from "assets/logo_digital_new_250x.png";
import { adminSidebar } from "ultils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-gray-200";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-gray-100";

const AdminSidebar = () => {
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tapID) => {
    if (actived.some((el) => el === tapID))
      setActived((prev) => prev.filter((el) => el !== tapID));
    else setActived((prev) => [...prev, tapID]);
  };

  return (
    <div className=" bg-white h-full py-4">
      <Link
        to={"/"}
        className="flex flex-col items-center p-4 justify-center gap-2"
      >
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <small>Admin Workspace</small>
      </Link>
      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                onClick={(e) => e.stopPropagation()}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                onClick={() => handleShowTabs(+el.id)}
                className="flex flex-col "
              >
                <div className="flex justify-between cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <AiFillCaretUp />
                  ) : (
                    <AiFillCaretDown />
                  )}
                </div>
                {actived.some((id) => id === el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu.map((item) => (
                      // lỗi
                      <NavLink
                        key={el.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notActivedStyle,
                            "pl-10"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
