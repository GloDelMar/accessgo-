import React from 'react';
import Link from 'next/link';

const olvidoContraseña = () => {
  return (
    <>
      <div className='max-w-md w-full mx-auto'>
        <h1 className='text-center text-2xl text-[#2F4F4F] p-10 font-extrabold'>
          ¿Olvidaste tu contraseña?
        </h1>
        <h3 className='text-center text-[#2F4F4F] p-1 font-extrabold'>
          Escribe tu Correo Electronico o Numero de WhatsApp que usaste pare registrarte 
          y te enviaremos un codigo de verificacion.
        </h3>
        <div className='text-center flex justify-center p-10 '>
          <div>
            <div>
              <a className='text-center flex justify-center text-[#2F4F4F] p-1 font-bold'>
                Correo Electronico o WhatsApp
              </a>
              <input
                type='text'
                name='contraseña'
                placeholder=''
                className='px-10 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] '
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center py-5'>
          <Link legacyBehavior href='/25/view25'>
            <button
              className='px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
            >
              Enviar
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default olvidoContraseña;
