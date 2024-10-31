import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { priceId } = req.body;
    console.log('Received priceId:', priceId);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_URLS}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URLF}`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('Error creating checkout session:', error); // Log the error for debugging
      res.status(500).json({ error: 'Error creating checkout session', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}