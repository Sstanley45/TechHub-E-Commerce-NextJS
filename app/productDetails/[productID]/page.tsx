import React from "react";
import { product } from "@/utils/productTemp";
import ProductDetailsComponent from "../ProductDetailsComponent";

interface IParams {
  productId?: string;
}

const ProductPage = ({ params }: { params: IParams }) => {
  // console.log("params", params);

  return <ProductDetailsComponent product={product} />;
};

export default ProductPage;