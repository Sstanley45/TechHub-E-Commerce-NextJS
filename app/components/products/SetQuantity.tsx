"use client";

import React from "react";
import { CartProductType } from "@/app/productDetails/ProductDetailsComponent";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease, 
}) => {


    const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

    return <div className="flex gap-8 items-center">
        {cartCounter ? null : <div className="font-semibold">Quantity</div>}
        <div className="flex gap-4 items-center text-base">
            <button className={btnStyles} onClick={handleQtyDecrease}>-</button>
            <div>{cartProduct.quantity}</div> 
            <button className={btnStyles} onClick={handleQtyIncrease}>+</button> 
        </div> 
      
  </div>
};

export default SetQuantity;
