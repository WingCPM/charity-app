const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:3000";

export default async function handler(req, res) {
  const { donationAmount, charity, business_name } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: donationAmount, // TODO ADD VALIDATION
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: { charity, business_name },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
