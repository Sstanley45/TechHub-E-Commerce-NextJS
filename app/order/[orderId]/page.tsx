

import React from "react";
import OrderDetails from "./OrderDetails";
import Container from "@/app/components/Container";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
  // console.log("params", params);
  const order = await getOrderById(params);

  if (!order) return <NullData title="No order" />;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
