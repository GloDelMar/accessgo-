import React from 'react';
import Carousel from './Carrusel';
import LocalesList from '../atoms/establecimientosList';
import Link from 'next/link';

const EstablecimientoSlider = () => {
  const locales = LocalesList(); 

  return (
    <Carousel>
      {locales.map((local, index) => (
        <Link legacyBehavior key={index} href="/2/view2">
          <a className="relative border rounded-md w-[90%] max-w-[215px] mx-auto h-[257px]">
            <img 
              src={local.img} 
              alt={`Imagen de ${local.label}`} 
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent w-full text-white">
              <h4 className="text-[15px] font-bold">{local.label}</h4>
              <div className="flex items-center mb-1">
                {Array(local.rating).fill().map((_, i) => (
                  <img 
                    key={i} 
                    src="/estrellita.svg" 
                    alt="star" 
                    className="w-4 h-4 mr-[3px]" 
                  />
                ))}
              </div>
              <p className="text-[10px] mt-2">{local.access}</p>
            </div>
          </a>
        </Link>
      ))}
    </Carousel>
  );
};

export default EstablecimientoSlider;
