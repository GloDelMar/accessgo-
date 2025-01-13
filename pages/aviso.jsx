import { useState } from 'react';
import Link from 'next/link';

export default function Aviso() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='w-full h-full lg:w-2/3 flex flex-col text-[#2F4F4F] mt-2 md:px-6 lg:px-0'>
      <div className='flex flex-col text-center px-4'>
        <p className='text-lg md:text-[40px] lg:text-[56px] font-bold mt-8'>
          ¡Aviso!
        </p>

        <div className='w-full h-full flex flex-col justify-center items-center font-semibold text-sm md:text-base lg:text-xl mt-4'>
          <p className='mt-8 px-4 md:px-0'>
            Antes de continuar con tu registro y de elegir el mejor plan para
            ti. En Accessgo consideramos de suma importancia mencionar el hecho
            de que si tu Negocio, Establecimiento o Servicio no cuenta con las
            mínimas Normas, Instalaciones o Criterios de Accesibilidad. NO
            podremos aceptar tu registro como un Perfil Inclusivo. Aun cuando se
            tenga algún registro exitoso de pago.
          </p>
        </div>
      </div>

      <div className='flex flex-row justify-center my-8 font-extrabold text-[#2F4F4F] px-4'>
        <label className='flex items-center text-sm md:text-base'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='mr-2'
          />
          Estoy consciente de los criterios mencionados.
        </label>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mt-8 md:mt-16 mb-10 px-4'>
        <div className='mb-4 sm:mb-0'>
          <Link legacyBehavior href='/'>
            <button className='w-[155px] h-[40px] md:w-[250px] md:h-[50px] border border-[#263238] rounded-lg text-center'>
              Cancelar
            </button>
          </Link>
        </div>
        <div>
          <Link legacyBehavior href='/notificacion'>
            <button
              className='w-[155px] h-[40px] md:w-[250px] md:h-[50px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center shadow-md shadow-gray-400'
              disabled={!isChecked}
            >
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
