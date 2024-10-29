import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const prices = await stripe.prices.list();
    const sortedPrices = prices.data.sort((a, b) => a.unit_amount - b.unit_amount);
    res.status(200).json(sortedPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}