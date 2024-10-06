import React from 'react';
import Image from 'next/image';


const view8 = () => {
  return (
    <>
      <div className='max-w-md w-full mx-auto'>
        <h1 className='text-center text-2xl text-[#2F4F4F]  p-10 font-bold'>
          ¡Bienvenid@ a AccessGo!
        </h1>

        <div>
          <div>
            <div className='flex flex-col justify-center items-center md:grid md:grid-cols-2'>
              <div className='flex justify-center md:justify-end md:mr-40'>
                <div className='flex flex-col items-center '>
                  <Image
                    src='/iconoframe.png'
                    alt='Foto de perfil'
                    width={150}
                    height={150}
                    className='rounded-full mx-auto mb-4'
                  />
                  <h3 className='flex justify-center'>NOMBRE</h3>
                </div>
              </div>

              <div>
                <h3 className='flex justify-start  text-[#2F4F4F] font-semibold text-2xl m-4'>
                  Sobre mi
                </h3>
                <p className='text-gray-600 bg-[#F6F9FF] m-2'>
                  Lorem ipsum es el texto que se usa habitualmente en diseño
                  gráfico en demostraciones de tipografías o de borradores de
                  diseño para probar el diseño visual antes de insertar el texto
                  final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default view8;
