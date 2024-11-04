import Link from 'next/link';
import { useState } from 'react';

const View25 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div>
        <div className='m-10'>
          <h1 className='text-center text-3xl font-extrabold text-[#2F4F4F] mb-8'>
            ¡Revisa tu Correo!
          </h1>
          <form className='  ' method='POST'>
            <div>
              <div className='relative bg-[#F0F4F8] rounded-md text-center pt-2'>
                <input
                  id='verification-code'
                  name='verification-code'
                  type='text'
                  required
                  className='block w-full text-center py-2 text-gray-600 placeholder-gray-500  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent'
                  placeholder='Confirma tu código'
                />
              </div>
            </div>

            <div>
              <Link legacyBehavior href='/login'>
                <button
                  type='submit'
                  className=' mt-20 group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-[#2F4F4F] bg-[#F0EAE0] hover:bg-[#E5DFD5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0EAE0]'
                >
                  Inicia Sesion
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default View25;
