import React from "react";
import ProductDetailsComponent from "../ProductDetailsComponent";
import Container from "@/app/components/Container";
import ListRating from "../ListRating";
// import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "../AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productID?: string;
}

const ProductPage = async ({ params }: { params: IParams }) => {
  // console.log("params", params);

  const user = await getCurrentUser();
  if (!user) {
    return <NullData title="No user" />;
  }

  const product = await getProductById(params);

  if (!product) {
    return <NullData title="No product..." />;
  }
  return (
    <div className="p-8">
      <Container>
        <ProductDetailsComponent product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>
            <AddRating product={product} user={user} />
          </div>
          <div>
            <ListRating product={product} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
