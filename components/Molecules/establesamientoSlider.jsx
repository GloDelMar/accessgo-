import React, { useState, useEffect } from 'react';
import Carousel from './Carrusel';
import { useRouter } from 'next/router';
import { toast } from "sonner";
import { getAllCompanies } from "@/pages/api/api_company";

const EstablecimientoSlider = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllCompanies()
      .then((companyData) => {
        setCompanies(companyData);
        setFilteredCompanies(companyData); // Puedes aplicar un filtro aquí si es necesario
      })
      .catch((error) => {
        toast.error("Error al obtener los establecimientos");
        console.error("[getCompanies]", error);
      });
  }, []);

  const handleCardClick = (id) => {
    router.push(`/vista-base?id=${id}`);
  };

  return (
    <Carousel>
      {filteredCompanies.map((company, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(company.id)}
          className="relative border rounded-md w-[90%] max-w-[200px] mx-auto h-[251px] overflow-hidden cursor-pointer"
        >
          <img 
            src={company.profilePicture || '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'} 
            alt={`Imagen de ${company.giro}`} 
            className="w-full h-[251px] object-cover"
          />
          <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent w-full text-white">
            <h4 className="text-[15px] font-bold">{company.companyName}</h4>
            <div className="flex items-center mb-1">
              {Array(company.rating).fill().map((_, i) => (
                <img 
                  key={i} 
                  src="/estrellita.svg" 
                  alt="star" 
                  className="w-4 h-4 mr-[3px]" 
                />
              ))}
            </div>
            <p className="text-[10px] mt-2">{company.access}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default EstablecimientoSlider;
