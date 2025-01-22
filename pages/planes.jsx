import React from 'react';
import Link from 'next/link';

const PlanCard = ({ title, icon, features, buttonText, link }) => (
  <section className='flex flex-col items-start px-5 pt-7 pb-12 mt-10 w-full text-base bg-white rounded-2xl border border-gray-100 border-solid shadow-lg max-w-[328px] text-slate-700'>
    <div className='flex gap-5 ml-5 text-lg font-bold text-gray-800 whitespace-nowrap'>
      <img
        loading='lazy'
        src={icon}
        alt={`${title} plan icon`}
        className='object-contain shrink-0 aspect-square w-[60px]'
      />
      <h2 className='my-auto'>{title}</h2>
    </div>
    <ul className='list-none p-0'>
      {features.map((feature, index) => (
        <li key={index} className='flex gap-2 mt-5'>
          <img
            loading='lazy'
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/c570330027866616a4ff9fd294f6b8a3a32f349511a4c11a7dcee980e9ca9f40?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0'
            alt=''
            className='object-contain shrink-0 self-start w-6 aspect-square'
          />
          <p className='flex-auto'>{feature}</p>
        </li>
      ))}
    </ul>
    <Link legacyBehavior href={link}>
      <div className='flex justify-center w-full mt-5'>
        <button className='w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center'>
          {buttonText}
        </button>
      </div>
    </Link>
  </section>
);

const CancelButton = ({ cancelLink }) => (
  <Link legacyBehavior href={cancelLink}>
    <button className='w-[155px] h-[40px] bg-white border-2 rounded-lg mt-5'>
      Cancelar
    </button>
  </Link>
);

const View15 = () => {
  const plans = [
    {
      title: 'GRATUITO',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b351190d274b6b2edd8a617c5ef2fd6860989557a46d69210a5f9971910aee6b?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0',
      features: [
        'Tu negocio o servicio se podrá visualizar mediante Geolocalización',
        'Podrás recibir una calificación por parte de tu clientela con base en tus servicios.',
        'Números de contacto'
      ],
      buttonText: '¡UNETE AHORA!',
      link: 'datos-negocio1'
    },
    {
      title: 'PREMIUM',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e60d6da1e14b477f74ee7deb3a8d826195224167056164773f12f9a7395ce9bd?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0',
      features: [
        'Tu negocio o servicio se podrá visualizar mediante Geolocalización',
        'Tu negocio o servicio aparecerán como las primeras recomendaciones a clientes',
        'Podrás recibir una calificación por parte de tu clientela con base en tus servicios.',
        'Números de contacto y redes sociales ligadas a tu perfil',
        'Promociona eventos especiales. ofertas temporales. tus nuevas especialidades y amenidades',
        'Datos y estadísticas sobre las visitas a tu negocio'
      ],
      buttonText: '¡UNETE AHORA!',
      link: '/cobro'
    }
  ];

  return (
    <main className='flex overflow-hidden flex-col items-center pb-44 mx-auto w-full bg-white md:w-full'>
      <h1 className='mt-7 text-4xl font-bold leading-3 text-[#2F4F4F]'>
        ¡ AccessoGo!
      </h1>
      <p className='mt-8  text-xl font-bold text-center text-[#2F4F4F]'>
        ¡Aqui puedes elegir el plan que más te convenga!
      </p>
      <div className='flex flex-col items-start justify-start gap-16 mt-10 md:flex-row md:gap-12 md:items-start'>
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>

      <CancelButton cancelLink='/' />
      <style jsx>{`
        builder-component {
          max-width: none !important;
        }
      `}</style>
    </main>
  );
};

export default View15;
