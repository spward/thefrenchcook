const express = require("express");
const randomToken = require("random-token").create(
  "abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
);

const router = express.Router();

router.get("/generate", (req, res) => {
  // Search database for users name

  // If the user does not have a token
  // generate a key
  res.send(randomToken(20));
  // Store the user and key

  // If user has a key then send database key
});

module.exports = router;
