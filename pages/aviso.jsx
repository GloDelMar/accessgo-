import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import Image from 'next/image';

export default function Aviso() {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const imagecarr = [
    '/carmodal/busines.png',
    '/carmodal/close.png',
    '/carmodal/efic.png',
    '/carmodal/loca.png',
    '/carmodal/rest8.png',
    '/carmodal/union.png'
  ];

  const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagecarr.length);
      }, 4000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className='flex justify-self-center items-center mt-4 h-40 w-40'>
        <Image
          src={imagecarr[currentIndex]}
          alt={`Imagen carrusel ${currentIndex + 1}`}
          className='object-cover rounded-lg'
          priority
          width={160}
          height={160}
        />
      </div>
    );
  };


  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='w-full h-full lg:w-2/3 flex flex-col text-[#2F4F4F] mt-4 px-4 sm:px-6 lg:px-0'>
      {/* Modal - renderizado condicional */}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <h2 className='text-2xl text-center font-bold text-[#2F4F4F]'>
            🚀 ¡Lleva tu negocio al siguiente nivel con AccessGo Premium! 🌟
          </h2>
          <p className='text-center text-lg font-semibold text-gray-700 mt-2'>
            No solo te mostramos, ¡te impulsamos! Con nuestra versión Premium,
            harás que más clientes te encuentren y se enamoren de tu espacio.
          </p>
          <div className='mt-4'>
            <h3 className='text-lg font-bold text-[#2F4F4F] text-center'>
              🔥 Beneficios exclusivos de AccessGo Premium:
            </h3>
            <ul className='mt-2 list-disc list-inside text-gray-700 text-center'>
              <li>📍 Mayor visibilidad con una ubicación destacada.</li>
              <li>📢 Promociones y eventos con más alcance.</li>
              <li>📊 Accede a estadísticas detalladas de tu perfil.</li>
              <li>💬 Recibe y gestiona comentarios de tus clientes.</li>
              <li>✨ Personalización premium para destacar aún más.</li>
            </ul>
          </div>
          <ImageCarousel />
          <div className='flex flex-col items-center mt-6 gap-4'>
            <h3
              className='bg-[#2F4F4F]  text-center text-white px-6 py-2 font-semibold rounded shadow-md transition-all'
             >
              ¡Elige el Plan de AccessGo Premium!
            </h3>
            <button
              className='bg-gray-400 text-white px-6 py-2 rounded shadow-md hover:bg-gray-500 transition-all'
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}


      <div className='flex flex-col text-center'>
        <p className='text-lg sm:text-2xl md:text-[40px] lg:text-[56px] font-bold mt-8'>
          ¡Aviso!
        </p>

        <div className='w-full flex flex-col justify-center items-center font-semibold text-sm sm:text-base lg:text-xl mt-6'>
          <p className='mt-6 text-2xl px-4 sm:px-0'>
            Antes de continuar con tu registro y de elegir el mejor plan para
            ti.
          </p>
          <p className='mt-6 px-4 sm:px-0'>
            En Accessgo consideramos de suma importancia mencionar el hecho de
            que si tu Negocio, Establecimiento o Servicio no cuenta con las
            mínimas Normas, Instalaciones o Criterios de Accesibilidad. NO
            podremos aceptar tu registro como un Perfil Inclusivo. Aun cuando tu
            trámite de pago sea exitoso.
          </p>
          <p className='mt-6 px-4 sm:px-0'>
            Para poder ser parte de la comunidad de AccesGo. Debes contar con al
            menos un tipo de Accesibilidad, Servicio o Personal Capacitado para
            cubrir las necesidades de personas con discapacidad.
          </p>
          <p className='mt-6 px-4 sm:px-0'>
            Los niveles de accesibilidad y servicio serán registrados en tu
            perfil mediante nuestro formulario y verificados mediante las
            reseñas, comentarios y calificaciones de nuestros usuarios. Para
            ello requerimos que toda la información proporcionada sea fidedigna
            y real.
          </p>
          <p className='mt-6 px-4 sm:px-0'>
            Si tu establecimiento, negocio o servicios han tenido algún cambio
            desde el momento de la creación de tu cuenta. Te pediremos que
            rectifiques la información manteniéndola actualizada.
          </p>
          <p className='mt-6 px-4 sm:px-0 text-[#be553a]'>
            Causas que podrán provocar Baja Permanente de tu Cuenta sin importar
            su categoría:
          </p>
          <ol className='text-left mt-4 text-[#be553a]'>
            <li className='mt-6'>
              En caso de descubrir alguna irregularidad u omisión de tu
              información en los registros.
            </li>
            <li className='mt-6'>
              Si mediante los comentarios y reseñas de nuestros usuarios
              detectamos un Uso Inapropiado o Comportamiento Inaceptable.
            </li>
            <li className='mt-6'>
              Tener la calificación mínima por un largo periodo de tiempo.
            </li>
          </ol>
        </div>
      </div>

      <div className='flex flex-row justify-center my-6 font-extrabold text-[#2F4F4F]'>
        <label className='flex items-center text-sm sm:text-base'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='mr-2'
          />
          Estoy consciente de los criterios mencionados.
        </label>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mt-8 mb-10 px-4'>
        <div className='mb-4 sm:mb-0'>
          <Link href='/' passHref>
            <button className='w-[155px] h-[40px] md:w-[250px] md:h-[50px] border border-[#263238] rounded-lg text-center'>
              Cancelar
            </button>
          </Link>
        </div>
        <div>
          <Link href='/registro' passHref>
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
