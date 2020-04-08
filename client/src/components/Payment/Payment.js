import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "../CardSection/CardSection";

const Payment = ({ userInfo }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: userInfo.email,
      },
    });

    function stripePaymentMethodHandler(result, email) {
      if (result.error) {
        console.log(result.error);
      } else {
        // Otherwise send paymentMethod.id to your server
        fetch("localhost:9000/stripe/create-customer", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userInfo.email,
            payment_method: result.paymentMethod.id,
          }),
        })
          .then(function (result) {
            return result.json();
          })
          .then(function (customer) {
            fetch("localhost:9000/stripe/create-subscription", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customer: customer.id,
              }),
            })
              .then(function (result) {
                return result.json();
              })
              .then(function (subscription) {});
          });
      }
    }

    stripePaymentMethodHandler(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment Information</h3>
      <CardSection />
      <button disabled={!stripe}>Pay Now</button>
    </form>
  );
};

export default Payment;
