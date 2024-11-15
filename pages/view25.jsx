import Link from 'next/link';
import { useState } from 'react';

const View25 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div>
        <form className='mt-8 space-y-6' method='POST'>
          <div className='mb-4 '>
            <div className=' px-20  relative bg-[#F0F4F8] rounded-md'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                required
                className=' text-left block w-full pr-10 py-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent pl-3'
                placeholder='Nueva Contraseña'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div>
            <div className='relative bg-[#F0F4F8] rounded-md mt-10'>
              <input
                id='confirm-password'
                name='confirm-password'
                type={showConfirmPassword ? 'text' : 'password'}
                required
                className='block w-full  py-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent pl-3'
                placeholder='Confirma Nueva Contraseña'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div className=' flex justify-center'>
            <Link legacyBehavior href='/mi-perfil'>
              <button
                type='submit'
                className=' mt-10 group relative  py-2 px-10 border border-transparent text-sm font-medium rounded-full text-[#2F4F4F] bg-[#F0EAE0] hover:bg-[#E5DFD5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0EAE0]'
              >
                Inicia Sesion
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default View25;