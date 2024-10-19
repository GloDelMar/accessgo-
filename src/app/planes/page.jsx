import { Stripe } from "stripe";
import ButtonCheckout from "@/components/ButtonCheckout";
import Link from "next/link";

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
    <main className="flex overflow-hidden flex-col items-center  justify-center pb-44 mx-auto w-full text-xl bg-white max-w-[480px] md:max-w-[700px] text-slate-700">
      <div>
        <header className="flex flex-col">
          <h1 className="mt-9 font-bold leading-3 text-center">¡Elige tu plan!</h1>
          <p className="mt-8 text-sm font-bold text-center">¡Aqui puedes elegir el plan que te interese mas!</p>
        </header>

        <div className="flex flex-col md:flex-col justify-center">
          {prices.map((price) => (
            <div key={price.id} className="flex flex-col mt-2 items-center">
              <h3>{price.nickname}</h3>
              <h2 className="text-3xl font-bold">{price.unit_amount / 100}$</h2>
              <ButtonCheckout priceId={price.id} />
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center mt-5 space-x-4 md:space-x-[200px] mt-16">
        <button className="w-[155px] h-[40px] bg-white border-2 rounded-lg border border-black">
          <Link legacyBehavior href="http://localhost:3000/15/planesEmpresa"><a>Cancelar</a></Link>
        </button>
      </div>
      </div>
    </main>
  );
}

export default PricingPage;