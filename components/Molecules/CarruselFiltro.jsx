import React, { useState } from 'react';
import Carousel from './Carrusel';
import LocalesList from '../atoms/establecimientosList';
import Image from 'next/image';

const EstablecimientoFiltrado = () => {
  const [filter, setFilter] = useState('');
  const locales = LocalesList();

 
  const handleFilter = (criteria) => {
    setFilter(criteria);
  };

 
  const filteredLocales = locales.filter((local) => {
    if (filter === 'accesibilidad') return local.access === '100% Acceso'; 
    if (filter === 'cercanos') return local.distance <= '20';
    if (filter === 'valorados') return local.rating >= 4;
    return true; 
  });

  return (
    <div>
      <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 mb-8 justify-center sm:justify-start">
        <button
          className={`w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full ${filter === 'accesibilidad' ? 'bg-[#2F4F4F] text-white' : ''}`}
          onClick={() => handleFilter('accesibilidad')}
        >
          Con accesibilidad
        </button>
        <button
          className={`w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full ${filter === 'cercanos' ? 'bg-[#2F4F4F] text-white' : ''}`}
          onClick={() => handleFilter('cercanos')}
        >
          Más cercanos
        </button>
        <button
          className={`w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full ${filter === 'valorados' ? 'bg-[#2F4F4F] text-white' : ''}`}
          onClick={() => handleFilter('valorados')}
        >
          Mejor valorados
        </button>
      </div>

     
      <Carousel>
        {filteredLocales.map((local, index) => (
          <div key={index} className="relative border rounded-md w-[90%] max-w-[200px] mx-auto h-[251px]">
            <Image 
              src={local.img} 
              alt={`Imagen de ${local.label}`} 
              className="w-full h-[251px] rounded object-cover" 
            />
            <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent w-full text-white">
              <h4 className="text-[15px] font-bold">{local.label}</h4>
              <div className="flex items-center mb-1">
                {Array(local.rating).fill().map((_, i) => (
                  <Image 
                    key={i} 
                    src="/estrellita.svg" 
                    alt="Estrellas de calificación" 
                    className="w-4 h-4 mr-[3px]" 
                  />
                ))}
              </div>
              <p className="text-[10px] mt-2">{local.access}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default EstablecimientoFiltrado;
