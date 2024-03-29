import React, { memo } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "ultils/icons";

const { AiOutlineRight } = icons;

const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];

  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center gap-1 mt-2 text-gray-600">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className="flex gap-1 items-center"
            key={match.pathname}
            to={match.pathname}
          >
            <span className="capitalize text-[12px] hover:text-main">
              {breadcrumb}{" "}
            </span>
            {index !== self.length - 1 && <AiOutlineRight size={8} />}
          </Link>
        ))}
    </div>
  );
};

export default memo(Breadcrumb);
