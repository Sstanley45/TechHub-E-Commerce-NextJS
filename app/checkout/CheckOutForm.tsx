"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckOutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckOutForm: React.FC<CheckOutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const elements = useElements();
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const formatedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-5">
        <Heading title="Enter your details to complete checkout" />
        <div>
          <h2 className="font-semibold mb-2">Address Information</h2>
          <AddressElement
            options={{ mode: "shipping", allowedCountries: ["US", "KE"] }}
          />
          <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
        </div>
      </div>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-xl font-semibold">
        Total : {formatedPrice}
      </div>
      <Button
        label={loading ? "Processing" : "Pay now"}
        disabled={loading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckOutForm;