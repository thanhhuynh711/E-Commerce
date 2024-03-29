import React, { memo, useEffect, useState } from "react";
import { apiGetProducts } from "apis/product";
import { CustomSlider } from "components";
import { getNewProducts } from "store/products/asynsActions";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);

  const fetchProduct = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response?.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProduct();
    dispatch(getNewProducts());
  }, []);

  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);

  return (
    <div>
      <div className="flex text-[20px]  ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold cursor-pointer uppercase px-8 border-r text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }  `}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px] border-t-4 border-main pt-4">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="flex w-full gap-4 mt-4">
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="1"
          className="flex-1 object-contain"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="2"
          className="flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default memo(BestSeller);
