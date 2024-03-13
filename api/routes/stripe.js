const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = "sk_test_51NkpqlFjgQmQhjqjfL0ZaRI3h1Ti3lxSxYoIBCmiCgTt0AfBCNXlq1aAsQ4zj0XKt4jp1JvDRzn4AGvfvB0dj83a00fJwliJJv"
const stripe = require("stripe")(KEY);

console.log(KEY)

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log("Error:", stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;