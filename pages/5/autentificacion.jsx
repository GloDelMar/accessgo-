import React from "react";
import Link from 'next/link';


 const view5 = () => {
    return (
      <>
        <div className='max-w-md w-full mx-auto'>
          <h1 className='text-center text-2xl text-[#2F4F4F] p-10 font-bold'>
            ¡Revisa tu correo o tu WhatsApp
          </h1>
          <h3 className='text-center text-[#2F4F4F] p-10 font-bold'>
            Te hemos enviado un codigo de verificacion. A continuacion escribe
            el codigo que te enviamos para validar tu cuenta
          </h3>
          <div className='text-center flex justify-center p-40 '>
            <div>
              <div>
                <a className='text-center flex justify-center text-[#2F4F4F] p-10 font-bold'>
                  Confirma Tu Codigo
                </a>
                <input
                  type='password'
                  name='contraseña'
                  placeholder='555-555-555'
                  className='px-10 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] '
                />
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center py-5'>
            <Link legacyBehavior href='/login'>
              <button
                className='px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
              >
                Inicia Sesion
              </button>
            </Link>
          </div>
        </div>
      </>
    );
}

export default view5; 