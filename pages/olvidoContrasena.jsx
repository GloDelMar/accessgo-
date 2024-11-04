import React from 'react';
import Link from 'next/link';

const olvidoContraseña = () => {
  return (
    <>
      <div>
        <div>
          <h1 className='text-center text-2xl text-[#2F4F4F] p-10 font-extrabold'>
            ¿Olvidaste tu contraseña?
          </h1>
        </div>
        <div>
          <h1 className='text-center text-[#2F4F4F] p-1 font-extrabold'>
            Escribe el Correo Electronico que usaste al registrarte y te
            enviaremos un codigo de verificacion.
          </h1>
        </div>
        <div className=' flex justify-center p-10 '>
          <div>
            <div>
              <input
                type='email'
                name='correoElectronico'
                placeholder=''
                className='px-40 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] '
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
