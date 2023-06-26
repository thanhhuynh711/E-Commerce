import React, { useState, useEffect } from "react";
import { apiGetCategory } from "../apis/app";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState(null);
  const fetchCatagories = async () => {
    const response = await apiGetCategory();
    if (response.success) setCategories(response.prodCatrgories);
  };

  useEffect(() => {
    fetchCatagories();
  }, []);
  return <div>Sidebar</div>;
};

export default Sidebar;
