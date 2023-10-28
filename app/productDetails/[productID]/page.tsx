import React from "react";
import { product } from "@/utils/productTemp";
import ProductDetailsComponent from "../ProductDetailsComponent";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";

interface IParams {
  productId?: string;
}

const ProductPage = ({ params }: { params: IParams }) => {
  // console.log("params", params);

  return (
    <div className="p-8">
      <Container>
        <ProductDetailsComponent product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div><ListRating product={ product } /></div>
          <div>List</div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
