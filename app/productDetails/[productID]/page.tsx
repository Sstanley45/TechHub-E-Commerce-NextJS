"use client";

import React from "react";
import ProductDetailsComponent from "../ProductDetailsComponent";
import Container from "@/app/components/Container";
import ListRating from "../ListRating";
import { products } from "@/utils/products";

interface IParams {
  productID?: string; 
}

const ProductPage = ({ params }: { params: IParams }) => {
 // console.log("params", params); 

  const product = products.find((item) => item.id === params.productID);
 // console.log(product);

  return (
    <div className="p-8">
      <Container>
        <ProductDetailsComponent product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <div>
            <ListRating product={product} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
