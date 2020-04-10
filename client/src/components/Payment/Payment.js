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

    const stripePaymentMethodHandler = (result, email) => {
      if (result.error) {
        alert("Submit error:", result.error.message);
      } else {
        // Otherwise send paymentMethod.id to your server
        fetch("http://localhost:9000/membership/create-customer", {
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
                      alert("confirmed payment error:", result.error.message);
                    } else {
                      // Show a success message to your customer
                      confirmSubscription(subscription.id);
                    }
                  });
              } else {
                // No additional information was needed
                // Show a success message to your customer
              }
            }
          })
          .catch((err) => console.log(err));
      }
    };

    const confirmSubscription = (subscriptionId) => {
      return fetch("http://localhost:9000/membership/subscription", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscriptionId,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (subscription) {
          alert(subscription.status);
        });
    };

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
