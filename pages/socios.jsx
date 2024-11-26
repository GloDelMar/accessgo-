import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { toast } from "sonner";
import EstablecimientoSlider from '@/components/Molecules/establesamientoSlider';
import { getAllCompanies, getCompanyById } from './api/api_company';
import EstablishmentSelect from '@/components/Molecules/establecimientoFiltrado';
import Link from 'next/link';
import { StyledButton } from '@/components/atoms/Index';
import Image from 'next/image';
import { getBusinessAverageRanking } from "./api/api_ranking";

const View2 = () => {
  const [selectedEstablishment, setSelectedEstablishment] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [giroOptions, setGiroOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const data = await getAllCompanies();
        setCompanies(data);
        setFilteredCompanies(data);

        const uniqueGiros = [...new Set(data.map(company => company.giro))];
        setGiroOptions(uniqueGiros);

        setLoading(false);
      } catch (error) {
        toast.error("Error al obtener los establecimientos");
        console.error("[getCompanies error]", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Se ha añadido el id de empresa de forma condicional
  const fetchAverageRating = useCallback(async (id) => {
    if (!id) return;
    try {
      const avgData = await getBusinessAverageRanking(id);
      setAverageRating(avgData.data.averageRating || 0);
    } catch (error) {
      console.error("Error al obtener el promedio:", error);
    }
  }, []);

  const handleEstablishmentChange = (e) => {
    const value = e.target.value;
    setSelectedEstablishment(value);
    const filtered = companies.filter(company => company.giro === value);
    setFilteredCompanies(filtered);
  };

  const handleCardClick = async (id) => {
    try {
      const companyData = await getCompanyById(id);
      const companyType = companyData?.data?.company?.cuenta;

      if (companyType === "free") {
        router.push(`vista-base?id=${id}`);
      } else if (companyType === "premium") {
        router.push(`vista-prem?id=${id}`);
      } else {
        throw new Error("Tipo de compañía inválido.");
      }
    } catch (error) {
      console.error("Error al manejar el clic de la tarjeta:", error.message);
      toast.error("Error al redirigir a la página de la compañía.");
    }
  };

  const handleFilter = (filterType) => {
    let filteredData = [...companies];

    switch (filterType) {
      case 'premium':
        filteredData = filteredData.filter(company => company.cuenta === 'premium');
        break;
      case 'rating':
        filteredData.sort((a, b) => b.averageRating - a.averageRating);
        break;
      default:
        break;
    }

    setFilteredCompanies(filteredData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-[#2F4F4F]">Visita a nuestros socios</h1>
      <p className="text-center mt-3 mb-3 md:text-left">Para ti, que buscas un lugar para pasar un buen rato:</p>
      <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 mb-8 justify-center sm:justify-start">
        <EstablishmentSelect options={giroOptions} onChange={handleEstablishmentChange} />
        <button onClick={() => handleFilter('premium')} className="w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
          Los premium
        </button>
        <button onClick={() => handleFilter('rating')} className="w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
          Mejor calificados
        </button>
        <button onClick={() => router.push('/MapWithPlaces')} className="w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold !text-white bg-[#2F4F4F] rounded-full">
        Buscar en el mapa
        </button>
      </div>

      {/* Elimina los botones de filtro temporalmente */}
      <div className="md:hidden mt-4">
        <EstablecimientoSlider
          companies={filteredCompanies}
          onCardClick={handleCardClick}
        />
      </div>

      <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center sm:justify-items-start">
        {filteredCompanies.map(company => (
          <div
            key={company._id}
            onClick={() => handleCardClick(company._id)} // Llama a la función con el id de la empresa
            className="relative rounded-lg w-[200px] h-[241px] shadow-md overflow-hidden cursor-pointer transition-transform transform hover:shadow-[0_0_15px_5px_#2F4F4F] hover:scale-105"
          >
            <Image
              src={company.profilePicture || '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'}
              alt={company.companyName}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full"
            />
            <div className="relative p-4 w-[215px] h-[256px] bg-black bg-opacity-50 flex flex-col justify-end">
              <h3 className="text-lg font-semibold text-white">{company.companyName}</h3>
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

              <p className="text-sm text-white mt-2">{company.giro || 'Información de accesibilidad no disponible'}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 my-12">
        <Link legacyBehavior href="/voluntariado">
          <StyledButton variant="verdeCurvo">¿Quieres ser voluntario?</StyledButton>
        </Link>
        <Link legacyBehavior href="/donaciones">
          <StyledButton className="hidden md:block" variant="verdeCurvo">¿Quieres donar?</StyledButton>
        </Link>
      </div>
    </div>
  );
};

export default View2