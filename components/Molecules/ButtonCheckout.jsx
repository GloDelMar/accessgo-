import { useEffect } from 'react';

function ButtonCheckout({ priceId }) {
  console.log('Price ID:', priceId); 

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al crear la sesión de pago:', errorData);
      return; 
    }

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url; 
    } else {
      console.error('Error al obtener la URL de la sesión de pago:', session);
    }
  };

  return (
    <button onClick={handleCheckout} className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center">
      Pagar
    </button>
  );
}

export default ButtonCheckout;