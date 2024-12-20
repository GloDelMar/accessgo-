import { useState } from 'react';
import Link from 'next/link';

export default function Notificacion() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='w-full h-full lg:w-2/3 flex flex-col text-[#2F4F4F] mt-2 md:px-10 lg:px-0'>
      <div className='flex flex-col text-center '>
        <p className='text-base md:text-[40px] lg:text-[56px] font-bold mt-8'>
          ¡Bienvenido a AccessoGo!
        </p>

        <div className='w-full h-full flex flex-col justify-center items-center font-semibold text-sm md:text-base lg:text-xl'>
          <p className='mt-10'>
            En AccesoGo, invitamos a las empresas a unirse a esta causa tan
            importante y a marcar una diferencia real en la vida de muchas
            personas. Regístrate y elige entre las opciones de perfil que
            tenemos para ti.
          </p>
        </div>

        <div className='w-full h-full flex flex-col justify-center items-center font-semibold text-sm md:text-base lg:text-xl'>
          <p className='mt-6'>
            Tu puedes generar información sobre tu establecimiento o negocio,
            indicando las diferentes formas y niveles de accesibilidad con los
            que cuentas.
          </p>
          <p className='mt-6'>
            Los niveles de accesibilidad y de servicio son verificados con las
            reseñas, comentarios y calificaciones de nuestros usuarios.
          </p>
          <p className='mt-6'>
            Para brindar un servicio de calidad a los usuarios y a los
            comercios, debemos cumplir con los aspectos más importantes
            referentes a la información. Para ello requerimos que toda la
            información proporcionada sea fidedigna y real.
          </p>
          <p className='mt-6'>
            Para poder ser parte de la comunidad de AccesGo, debes contar con al
            menos un tipo de accesibilidad, servicio o personal capacitado para
            necesidades de personas con discapacidad.
          </p>
          <p className='mt-6'>
            En caso de detectar alguna irregularidad u omisión de esta
            información en los registros, en cualquier tipo de cuenta, dicha
            cuenta podría ser cancelada.
          </p>
          <p className='mt-6'>
            Si tu establecimiento o negocio no cuenta con las instalaciones o
            servicios que registraste al crear tu cuenta, te pediremos que
            rectifiques la información, o hagas los arreglos pertinentes a tus
            instalaciones y servicios.
          </p>
          <p className='mt-6'>
            Si tu establecimiento no cuenta con ninguna forma de accesibilidad
            NO podrá calificar para ser parte de nuestra comunidad.
          </p>
          <p className='mt-6'>
            SI adquiriste una cuenta premium y se detectó que tu negocio o
            establecimiento no contaba con ningún nivel de accesibilidad, tu
            cuenta Premium será dada de baja.
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
          He leído y acepto los términos y condiciones mencionados.
        </label>
      </div>
      <div className='flex flex-row justify-between items-center mt-10 md:mt-20 md:mb-10'>
        <div>
          <Link legacyBehavior href='/socios'>
            <button className='w-[155px] h-[40px] md:w-[250px] md:h-[50px] border border-[#263238] rounded-lg'>
              Cancelar
            </button>
          </Link>
        </div>
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