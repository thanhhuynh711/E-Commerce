import React, { memo, Fragment, useState } from "react";
import avatar from "assets/avatar default.jpg";
import { menberSidebar } from "ultils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useSelector } from "react-redux";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-gray-200";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-gray-100";

const MemberSibar = () => {
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);
  const handleShowTabs = (tapID) => {
    if (actived.some((el) => el === tapID))
      setActived((prev) => prev.filter((el) => el !== tapID));
    else setActived((prev) => [...prev, tapID]);
  };

  return (
    <div className=" bg-white h-full py-4 w-[250px] flex-none">
      <div className="flex flex-col w-full items-center justify-center py-4 border-b">
        <img
          src={current?.avatar || avatar}
          alt="avatar"
          className="w-20 h-20 object-cover mb-2 border rounded-full"
        />
        <small className="font-bold mt-1">{`${current?.lastname} ${current?.firstname}`}</small>
      </div>
      <div>
        {menberSidebar.map((el) => (
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

export default memo(MemberSibar);
