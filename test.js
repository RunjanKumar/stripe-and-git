const stripe = require("stripe")("sk_test_51MjwfJDSatVzNODcTpiCAtR37lc0l68VbDPv8EjyiqnnIQHplYbn3iTDfBSA1JKQ4NOA319VpHR75PJhIjc18SdU000UDuJ5Lx"
);
// sk_test_51MjwfJDSatVzNODcTpiCAtR37lc0l68VbDPv8EjyiqnnIQHplYbn3iTDfBSA1JKQ4NOA319VpHR75PJhIjc18SdU000UDuJ5Lx
const express = require("express");
const app = express();

app.get("/secret", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent);
  res.json({ client_secret: paymentIntent.client_secret });
});

app.get("/r/:amount", async (req, res) => {
  // const product = await stripe.products.retrieve('prod_OiLYlmBJwmyG0e');
  const { amount } = req.params;
  console.log(amount);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: 'price_1Nuur7SDX4ipoJLQVGNTx6UE',
        quantity: 1 * amount,
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `https://minihearts.org`,
    cancel_url: `https://minihearts.org`,
    // automatic_tax: {enabled: true},
  });
  return res.redirect(303, session.url);
});

app.listen(3500, () => {
  console.log("Running on port 3500");
});
