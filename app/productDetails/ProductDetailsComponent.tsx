"use client"


import React from 'react';

interface ProductDetailsProps {
  product : any
}

const ProductDetailsComponent: React.FC<ProductDetailsProps> = ({
  product
}) => {
  return <div>productDetailsComponent</div>;
};

export default ProductDetailsComponent;