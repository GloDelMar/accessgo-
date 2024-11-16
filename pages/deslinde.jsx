import Link from 'next/link';
import { useState } from 'react';

const Deslinde = () => {

   const [isChecked, setIsChecked] = useState(false);

   const handleCheckboxChange = () => {
     setIsChecked(!isChecked);
   };



  return (
    <div className='w-full h-full lg:w-2/3 flex flex-col text-[#2F4F4F] mt-2 md:px-10 lg:px-0'>
      <div className='flex flex-col text-center '>
        <p className='text-base md:text-[40px] py-10 lg:text-[56px] font-bold mt-8'>
          ¡Bienvenido a AccessoGo!
        </p>

        <div className='w-full h-full flex flex-col justify-center items-center font-semibold text-sm md:text-base lg:text-xl'>
          <p className='mt-6'>
            En AccesGo estamos conscientes que la información proporcionada por
            nuestros usuarios al momento de su registro es de tipo sensible y
            por lo tanto de vital importancia a no ser expuesta a divulgación
            sin su previo consentimiento.
          </p>
        </div>

        <div className='w-full h-full flex flex-col justify-center items-center font-semibold text-sm md:text-base lg:text-xl'>
          <p className='mt-6'>
            Es por esto que te recordamos que los archivos de tipo imagen y
            texto que compartas en nuestra comunidad quedan bajo tu
            responsabilidad.
          </p>
          <p className='mt-6'>
            Así mismo. El uso incorrecto de esta plataforma por medio de este
            tipo de archivos podrá resultar en la baja de la cuenta.
          </p>
          <p className='mt-6'>
            En este sitio web compartimos la información que es facilitada por
            establecimientos quienes publican detalles sobre lugares y servicios
            accesibles.
          </p>
          <p className='mt-6'>
            Y si bien AccessGo se esfuerza por verificar la precisión de la
            información compartida, no podemos garantizar que sea 100%
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
      <div className='flex flex-row justify-center my-10 font-extrabold text-[#2F4F4F]'>
        <label>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
          />{' '}
          Estoy de acuerdo con la informacion que aqui se muestra
        </label>
      </div>
      <div className='flex flex-row justify-center items center p-10 mt-10 md:mt-20 md:mb-10'>
        <div>
          <Link legacyBehavior href='/registro'>
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

export default Deslinde;