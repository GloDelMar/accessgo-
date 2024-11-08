import React, { useEffect } from 'react';
import Link from 'next/link';

const LoginPage = () => {
  useEffect(() => {
    const updateAccountToPremium = async () => {
      const companyId = localStorage.getItem('userId'); // Asegúrate de tener el ID de la compañía almacenado

      if (!companyId) {
        console.error('No company ID found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/company/${companyId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cuenta: 'premium', // Aquí es donde se envía el valor de la cuenta como "premium"
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update company account');
        }
        
        console.log('Account successfully updated to premium!');
      } catch (error) {
        console.error('Error updating account:', error);
      }
    };

    localStorage.setItem('cuenta', "premium");

    updateAccountToPremium();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <header>Tu pago ha sido exitoso.</header>

      <Link legacyBehavior href='/23/view23'>
        <a className='mt-20 w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center'>
          Siguiente
        </a>
      </Link>
    </div>
  );
};

export default LoginPage;
