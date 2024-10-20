import { Stripe } from "stripe";
import Layout from "@/components/Layout";


async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list();
  const sortedPrices = prices.data.sort(
    (a, b) => a.unit_amount - b.unit_amount
  );
  return sortedPrices;
}

async function PricingPage() {
  const prices = await loadPrices();
  console.log(prices);

  return (
    <div className={`flex gap-5 justify-between px-7 py-3 mt-10 w-full text-center whitespace-nowrap bg-white rounded-xl border border-solid max-w-[249px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer ${isSelected ? "border-blue-500" : "border-black"
      }`}
      <div>
        <header>
          <h1 className="text-center my-5">Pricing</h1>
        </header>

        <div className="flex gap-x-2">
          {prices.map((price) => (
            <div key={price.id} className="bg-slate-300 mb-2 p-7">
              <h3>{price.nickname}</h3>
              <h2 className="text-3xl font-bold">${price.unit_amount / 100}mxn</h2>
              <button
              priceId={price.id} 
      className="bg-sky-500 text-white px-4 py-2 rounded"
      onClick={async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
                priceId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        window.location.href = data.url
      }}
    >
      Buy
    </button>
            </div>
          ))}
        </div>
      </div>
    </div>
        

  );
}

export default PricingPage;