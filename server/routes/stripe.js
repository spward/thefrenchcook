const express = require("express");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const STRIPE_SECRET = process.env.STRIPE_SECRET;

const stripe = require("stripe")(STRIPE_SECRET);

/* GET users listing. */
router.post("/create-customer", async (req, res) => {
  // This creates a new Customer and attaches the PaymentMethod in one API call.
  const customer = await stripe.customers.create({
    payment_method: req.body.payment_method,
    email: req.body.email,
    invoice_settings: {
      default_payment_method: req.body.payment_method,
    },
  });

  // At this point, associate the ID of the Customer object with your
  // own internal representation of a customer, if you have one.
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        plan: "plan_H3Aj1iFeYnMU4V",
      },
    ],
    expand: ["latest_invoice.payment_intent"],
  });
  res.send(subscription);

  console.log(customer);
});

router.post("/subscription", async (req, res) => {
  let subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId
  );
  res.send(subscription);
});

module.exports = router;
