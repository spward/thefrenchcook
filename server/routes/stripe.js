var express = require("express");
var router = express.Router();
const STRIPE_SECRET = process.env.STRIPE_SECRET;

const stripe = require("stripe")(STRIPE_SECRET);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/payment", function (req, res, next) {
  (async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "euro",
      payment_method_types: ["card"],
      receipt_email: "jenny.rosen@example.com",
    });
  })();
});
1;
module.exports = router;
