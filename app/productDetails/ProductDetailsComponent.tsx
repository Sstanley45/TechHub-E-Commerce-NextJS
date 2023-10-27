"use client";

import { Rating } from "@mui/material";
import React, { useCallback, useState } from "react";
import SetColor from "../components/products/SetColor";
import SetQuantity from "../components/products/SetQuantity";
import Button from "../components/Button";
import ProductImage from "../components/products/ProductImage";
import Container from "../components/Container";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImageType;
  quantity: number;
  price: number;
};

export type selectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const HorizontalLine = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetailsComponent: React.FC<ProductDetailsProps> = ({
  product,
}) => {
  const [cartProduct, setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: selectedImageType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  // console.log(cartProduct);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
      
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <ProductImage
            cartProduct={cartProduct}
            product={product}
            handleColorSelect={handleColorSelect}
          />
        </div>
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className="text-3xl font-medium text-slate-700">
            {" "}
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <Rating value={productRating} readOnly />
            <div>{product.reviews.length} reviews</div>
          </div>
          <HorizontalLine />
          <div className="text-justify">{product.description}</div>
          <HorizontalLine />
          <div>
            <span className="font-semibold">CATEGORY: </span> {product.category}
          </div>
          <div>
            <span className="font-semibold">BRAND: </span>
            {product.brand}
          </div>
          <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
            {product.inStock ? "in stock" : "Out of stock"}
          </div>
          <HorizontalLine />
          <div>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
          </div>
          <HorizontalLine />
          <div>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
          </div>
          <HorizontalLine />
          <div className="max-w-[300px]">
            <Button label="Add to Cart" onClick={() => {}} />
          </div>
        </div>
    </div>
      
  );
};

export default ProductDetailsComponent;
