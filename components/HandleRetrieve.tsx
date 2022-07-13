import React, { useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";

export const HandleRetrieve = ({ clientSecret }) => {
  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("Payment succeeded!");
          break;
        case "processing":
          console.log("Your payment is processing.");
          break;
        case "requires_payment_method":
          console.log("Your payment was not successful, please try again.");
          break;
        default:
          console.log("Something went wrong.");
          break;
      }
    });
  }, []);

  return <p>jwojsowdojwjdojwd</p>;
};
