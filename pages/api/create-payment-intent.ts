const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = () => {
  return 1400;
};

export default async function handler(req, res) {
  const { donationAmount, charity } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: donationAmount,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: { charity },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
