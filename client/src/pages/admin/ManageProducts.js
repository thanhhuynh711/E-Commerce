import React, { useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiGetProducts } from "apis/product";
import moment from "moment";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setCounts(response.counts);
      setProducts(response.products);
    }
  };

  const queryDecounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    if (queryDecounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDecounce }).toString(),
      });
    } else
      navigate({
        pathname: location.pathname,
      });
  }, [queryDecounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className=" p-4 w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">ManageProducts</h1>
      </div>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search products by title, description,..."
          />
        </form>
      </div>
      <table className="table-auto p-4">
        <thead className="text-center">
          <tr className="bg-blue-800 text-white h-[50px] leading-[50px]">
            <th>Order</th>
            <th>Thumb</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sold</th>
            <th>Color</th>
            <th>Ratings</th>
            <th>UpdatedAt</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products?.map((el, index) => (
            <tr key={index} className="border">
              <td className="py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  index +
                  1}
              </td>
              <td className="py-2">
                <div className="flex justify-center">
                  <img
                    src={el.thumb}
                    alt="thumb"
                    className="w-12 h-12 object-cover "
                  />
                </div>
              </td>
              <td className="py-2">{el.title}</td>
              <td className="py-2">{el.brand}</td>
              <td className="py-2">{el.category}</td>
              <td className="py-2">{el.price}</td>
              <td className="py-2">{el.quantity}</td>
              <td className="py-2">{el.sold}</td>
              <td className="py-2">{el.color}</td>
              <td className="py-2">{el.totalRatings}</td>
              <td className="py-2">
                {moment(el.updatedAt).format("DD/MM/YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default ManageProducts;
