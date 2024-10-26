// pages/api/prices.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const prices = await stripe.prices.list();
    res.status(200).json(prices.data);
  } catch (error) {
    res.status(500)
  }
}