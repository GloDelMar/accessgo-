import Link from 'next/link';
import { useState } from 'react';

const Deslinde = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='w-full h-full flex flex-col lg:w-2/3 text-[#2F4F4F] mt-4 md:px-10 lg:px-0'>
      <div className='flex flex-col text-center'>
        <p className='text-base md:text-[40px] py-8 lg:text-[56px] font-bold mt-8'>
          ¡Bienvenido a AccessoGo!
        </p>

        <div className='w-full h-full flex flex-col justify-center items-center font-semibold text-sm md:text-base lg:text-xl px-4 md:px-8'>
          <p className='mt-6'>
            En AccesGo estamos conscientes que la información proporcionada por
            nuestros usuarios al momento de su registro es de tipo sensible y
            por lo tanto de vital importancia a no ser expuesta a divulgación
            sin su previo consentimiento.
          </p>
        </div>

        <div className='w-full h-full flex flex-col justify-center items-center font-semibold text-sm md:text-base lg:text-xl px-4 md:px-8'>
          <p className='mt-6'>
            Es por esto que te recordamos que los archivos de imagen y los
            textos que compartas en nuestra comunidad quedan bajo tu
            responsabilidad
          </p>
          <p className='mt-6'>
            Así mismo, el uso incorrecto de esta plataforma por medio de este
            tipo de archivos podrá resultar en la baja de la cuenta.
          </p>
          <p className='mt-6'>
            En este sitio web Publicamos la información que es registrada por los
            por establecimientos, quienes publican detalles sobre lugares y
            servicios accesibles. Y si bien AccessGo se esfuerza por verificar
            la información compartida. No podemos garantizar que sea 100%
            fehaciente ni actualizada en todo momento.
          </p>
          <p className='mt-6'>
            Por lo tanto, AccessGo NO SE HACE RESPONSABLE por omisiones o
            cambios en la información presentada.
          </p>
          <p className='mt-6'>
            De la misma manera, cualquier visita a las instalaciones mostradas
            en esta plataforma se realiza bajo la propia responsabilidad de los
            usuarios.
          </p>
          <p className='mt-6'>
            AccessGo NO ASUME RESPONSABILIDAD ALGUNA por las experiencias
            relacionadas con las condiciones del lugar, el acceso, o servicios
            durante sus visitas.
          </p>
        </div>
      </div>

      {/* Checkbox Agreement Section */}
      <div className='flex flex-row justify-center items-center my-10 font-extrabold text-[#2F4F4F] px-4'>
        <label className='flex items-center space-x-2'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='accent-[#2F4F4F]'
          />
          <span className='text-sm md:text-base'>
            Estoy de acuerdo con la información que aquí se muestra
          </span>
        </label>
      </div>

      {/* Continue Button */}
      <div className='flex flex-row justify-center items-center px-10 mt-10 md:mt-20 md:mb-10'>
        <div>
          <Link legacyBehavior href='/registro'>
            <button
              className='w-[180px] h-[45px] md:w-[250px] md:h-[50px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center shadow-md shadow-gray-400 disabled:opacity-50'
              disabled={!isChecked}
            >
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Deslinde;
