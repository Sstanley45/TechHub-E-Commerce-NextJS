"use client";

import { SafeUser } from "@/types";
import { Order, Product, Review } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import { Rating } from "@mui/material";
import Input from "../components/inputs/Input";
import { useState } from "react";
import Button from "../components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    setLoading(true);
    if (data.rating === 0) {
      setLoading(false);
      return toast.error("No rating selected");
    }
    const ratingData = { ...data, userId: user?.id, product: product };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating submitted");
        router.refresh();
        reset();
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (!user || !product) return null;

  //a user should not be able to add a rating if they don't have their product delivered
  const deliveredOrder = user?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  //check if the user has already rated the product so that they don't rate it twice
  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user.id;
  });

  if (userReview || !deliveredOrder) {
    return null; //we will not show the UI of the product Rating
  }

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={loading ? "Loading" : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
