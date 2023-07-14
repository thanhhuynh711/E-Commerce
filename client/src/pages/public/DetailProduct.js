import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis";
import { Breadcrumb } from "../../components";

const DetailProduct = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) setProduct(response.ProductData);
  };
  useEffect(() => {
    if (pid) fetchProductData();
  }, [pid]);

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumb title={title} category={product?.category} />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
