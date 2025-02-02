import React from 'react';
import Carousel from './Carrusel';
import participaList from '../atoms/participaList';
import Link from 'next/link';
import Image from 'next/image';

const ParticipaSlider = () => {
  const items = participaList(); 

  return (
    <Carousel>
      {items.map((item, index) => (
        <Link legacyBehavior
          key={index} 
          href={item.title === 'Voluntariado' ? '/voluntariado' : '/donaciones'} 
        >
          <a className="relative border border-[#E8DECF] rounded-[8px] w-[90%] max-w-[200px] mx-auto h-[155px] flex flex-col items-start">
            <Image 
              src={item.img} 
              alt={`Icono de ${item.title}`} 
              className="w-[24px] h-[24px] mt-[16px] ml-[16px] mb-[13px]" 
            />
            <div className="p-4">
              <p className="font-bold text-[14px]">{item.title}</p>
              <p className="text-[12px]">{item.description}</p>
            </div>
          </a>
        </Link>
      ))}
    </Carousel>
  );
};

export default ParticipaSlider;
