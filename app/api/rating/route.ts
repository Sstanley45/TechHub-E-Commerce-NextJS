import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

    //a user should not be able to add a rating if they don't have their product delivered
    const deliveredOrder = currentUser?.orders.some(
      (order) =>
        order.products.find((item) => item.id === product.id) &&
        order.deliveryStatus === "delivered"
    );

    //check if the user has already rated the product so that they don't rate it twice
    const userReview = product?.reviews.find((review: Review) => {
      return review.userId === currentUser.id;
    });

    if (userReview || !deliveredOrder) {
      return NextResponse.error();
    }

  //create review
  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });

  return NextResponse.json(review);
}
