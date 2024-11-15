import { useEffect, useState } from 'react';
import Stripe from 'stripe';
import ButtonCheckout from '@/components/Molecules/ButtonCheckout';
import Link from 'next/link';

async function loadPrices() {
  const response = await fetch('/api/prices');
  if (!response.ok) {
    throw new Error('Error al cargar los precios');
  }
  return await response.json();
}

function PricingPage() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const pricesData = await loadPrices();
        setPrices(pricesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los precios: {error.message}</div>;

  return (
    <main className='flex overflow-hidden flex-col items-center justify-center pb-44 mx-auto w-full text-xl bg-white max-w-[480px] md:max-w-[700px] text-slate-700'>
      <div>
        <header className='flex flex-col'>
          <h1 className='mt-9 font-bold leading-3 text-center'>
            ¡Elige tu plan!
          </h1>
          <p className='mt-8 text-sm font-bold text-center mt-10'>
            ¡Aquí puedes elegir el plan que te interese más!
          </p>
        </header>
       
    <div className='flex flex-col md:flex-col justify-center mt-10'>
          {prices.map((price) => (
            <div key={price.id} className='flex flex-col mt-2 items-center'>
              <h3>{price.nickname}</h3>
              <h2 className='text-3xl font-bold'>{price.unit_amount / 100}$</h2>
              <ButtonCheckout priceId={price.id} />
            </div>
          ))}
        </div>


        <div className='flex flex-row justify-center mt-5 space-x-4 md:space-x-[200px]'>
          <button className='w-[155px] h-[40px] bg-white border-2 rounded-lg border border-black mt-20'>
            <Link legacyBehavior href='https://backend-r159.onrender.com/planes'>
              <a>Cancelar</a>
            </Link>
          </button>
        </div>

      </div>
    </main>
  );
}

export default PricingPage;
