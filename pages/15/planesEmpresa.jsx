import React from 'react';

const Header = () => (
  <header className="flex overflow-hidden gap-5 justify-between self-stretch px-6 py-3 w-full text-xs font-semibold text-white whitespace-nowrap bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.08)]">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d310e856573bd604fe8bae8c8c7b39bbd509981e63dd5b3dadff32654e77c4c9?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="AccessoGo logo" className="object-contain shrink-0 my-auto aspect-[2.7] w-[81px]" />
    <nav className="flex gap-5">
      <button className="flex gap-3 items-center py-1 pr-2 pl-5 my-auto rounded-2xl bg-slate-700 min-h-[28px]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f90f1c2279400d2bb1af1bb06f0d952eaf5612816f1734378cc728bc738ecf7?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
        <span className="self-stretch my-auto">¡Únete!</span>
      </button>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/473fc6479f8a0f7759592e7a37222ec475e4f3c5985e57876dea7ecf0e91b42c?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="User profile" className="object-contain shrink-0 w-10 rounded-none aspect-square" />
    </nav>
  </header>
);

const PlanCard = ({ title, icon, features, buttonText }) => (
  <section className="flex flex-col items-start px-5 pt-7 pb-12 mt-10 w-full text-base bg-white rounded-2xl border border-gray-100 border-solid shadow-lg max-w-[328px] text-slate-700">
    <div className="flex gap-5 ml-5 text-lg font-bold text-gray-800 whitespace-nowrap">
      <img loading="lazy" src={icon} alt={`${title} plan icon`} className="object-contain shrink-0 aspect-square w-[60px]" />
      <h2 className="my-auto">{title}</h2>
    </div>
    <ul className="list-none p-0">
      {features.map((feature, index) => (
        <li key={index} className="flex gap-2 mt-5">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c570330027866616a4ff9fd294f6b8a3a32f349511a4c11a7dcee980e9ca9f40?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0" alt="" className="object-contain shrink-0 self-start w-6 aspect-square" />
          <p className="flex-auto">{feature}</p>
        </li>
      ))}
    </ul>
    <button className="self-center px-6 py-3.5 mt-10 max-w-full text-xl font-semibold text-center text-white rounded-lg bg-slate-700 shadow-[0px_6px_28px_rgba(0,0,0,0.16)] w-[202px]">
      {buttonText}
    </button>
  </section>
);

const CancelButton = () => (
  <button className="px-16 py-5 mt-10 w-full text-xl text-center whitespace-nowrap bg-white rounded-lg border border-gray-800 border-solid max-w-[250px] text-slate-700">
    cancelar
  </button>
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
      buttonText: '¡UNETE AHORA!'
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
      buttonText: '¡UNETE AHORA!'
    }
  ];

  return (
    <main className="flex overflow-hidden flex-col items-center pb-44 mx-auto w-full bg-white max-w-[480px]">
      
      <h1 className="mt-7 text-xl font-bold leading-3 text-slate-700">
        ¡ AccessoGo!
      </h1>
      <p className="mt-6 text-sm font-bold text-center text-gray-600">
        ¡Aqui puedes elegir el plan que te interese mas!
      </p>
      {plans.map((plan, index) => (
        <PlanCard key={index} {...plan} />
      ))}
      <CancelButton />
      <style jsx>{`
        builder-component {
          max-width: none !important;
        }
      `}</style>
    </main>
  );
};

export default View15;