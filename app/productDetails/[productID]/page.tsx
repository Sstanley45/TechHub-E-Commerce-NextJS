import React from "react";
import { product } from "@/utils/productTemp";
import ProductDetailsComponent from "../ProductDetailsComponent";
import Container from "@/app/components/Container";

interface IParams {
  productId?: string;
}

const ProductPage = ({ params }: { params: IParams }) => {
  // console.log("params", params);

  return (
    <div className="p-8">
      <Container>
        <ProductDetailsComponent product={product} />;
      </Container>
    </div>
  );
};

export default ProductPage;
