import { getCurrentUser } from "@/actions/getCurrentUser";
import { CartProductType } from "@/app/productDetails/ProductDetailsComponent";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

//we calculate the total amount again
const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return (acc += itemTotal);
  }, 0);
  const price: any = totalPrice.toFixed(2); //limit to 2 decimal
  return price;
};

//payment logic at the backend

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
     return NextResponse.error();   
  }
  const { items, payment_intent_id } = await request.json();
  const total = calculateOrderAmount(items) * 100;

  //order data
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  //so if we have the payment intent, we update it and
  //if we don't have it we create the intent

  if (payment_intent_id) {
    //update the payment intent
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_Intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      //update the order
      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),

        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
       return NextResponse.error();   
      }
      return NextResponse.json({ paymentIntent: updated_Intent });
    }
  } else {
    //create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    //create the order
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent });
  }

  return NextResponse.error()   
}
