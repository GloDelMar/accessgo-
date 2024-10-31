import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <header>Tu pago ha sido exitoso.</header>

      

      <Link legacyBehavior href='/17/datosNegocio'>
        <a className=' mt-20 w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center'>
          Siguiente
        </a>
      </Link>
    </div>
  );
};

export default LoginPage;
