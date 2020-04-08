const express = require("express");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const STRIPE_SECRET = process.env.STRIPE_SECRET;

const stripe = require("stripe")(STRIPE_SECRET);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/create-customer", function (req, res, next) {
  const { email } = req.body;
  // This creates a new Customer and attaches the PaymentMethod in one API call.

  return stripe.customers.create({
    payment_method: intent.payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: intent.payment_method,
    },
  });
});

router.get("/create-subscription", function (req, res, next) {
  const { customer } = req.body;
  // This creates a new Customer and attaches the PaymentMethod in one API call.

  return stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "plan_FSDjyHWis0QVwl" }],
    expand: ["latest_invoice.payment_intent"],
  });
});

module.exports = router;
