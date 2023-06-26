import axios from "../axios";

export const apiGetCategory = () =>
  axios({
    url: "/prodcategory/",
    method: "get",
  });
