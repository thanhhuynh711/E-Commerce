import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";

const MyCart = (props) => {
  return <div onClick={() => props.navigate("/")}>MyCart</div>;
};

export default withBaseComponent(MyCart);
