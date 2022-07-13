const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { payment_intent } = req.query;
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  const charge = paymentIntent.charges.data.find(
    (charge: any) => charge.payment_intent === payment_intent
  );

  res.send({ charge });
}
