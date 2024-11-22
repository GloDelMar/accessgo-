import React, { useState, useEffect } from 'react';
import Carousel from './Carrusel';

import Image from 'next/image';

const EstablecimientoSlider = ({ companies, onCardClick }) => {
  if (!companies || companies.length === 0) {
    return <p>No hay establecimientos disponibles</p>;
  }

  return (
    <Carousel>
      {companies.map((company) => (
        <div
          key={company._id}
          onClick={() => onCardClick(company._id)}
          className="relative rounded-md w-[90%] max-w-[200px] mx-auto h-[251px] overflow-hidden cursor-pointer"
        >
          <Image
            src={company.profilePicture || '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'}
            alt={company.companyName}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
          <div className="relative p-4 bg-black bg-opacity-50 flex flex-col justify-end h-full">
            <h3 className="text-lg font-semibold text-white truncate">
              {company.companyName}
            </h3>
            <div className="flex items-center mt-2">
              {Array.from({ length: company.averageRating || 0 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-white mt-2 truncate">
              {company.giro || 'Información de accesibilidad no disponible'}
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};


export default EstablecimientoSlider;
