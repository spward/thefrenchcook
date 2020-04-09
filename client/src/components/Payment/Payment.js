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
        email: "wardsean15@gmail.com",
      },
    });

    function stripePaymentMethodHandler(result, email) {
      if (result.error) {
      } else {
        // Otherwise send paymentMethod.id to your server
        fetch("/create-customer", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            payment_method: result.paymentMethod.id,
          }),
        })
          .then((result) => {
            return result.json();
          })
          .then((subscription) => {
            const { latest_invoice } = subscription;
            const { payment_intent } = latest_invoice;

            if (payment_intent) {
              const { client_secret, status } = payment_intent;

              if (status === "requires_action") {
                stripe
                  .confirmCardPayment(client_secret)
                  .then(function (result) {
                    if (result.error) {
                      // Display error message in your UI.
                      // The card was declined (i.e. insufficient funds, card has expired, etc)
                    } else {
                      // Show a success message to your customer
                    }
                  });
              } else {
                // No additional information was needed
                // Show a success message to your customer
              }
            }
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
