import { useState, useEffect } from 'react';
import EstablecimientoSlider from '@/components/Molecules/establesamientoSlider';
import { Link, StyledButton } from '@/components/atoms/Index';
import Image from 'next/image';
import { getAllCompanies } from './api/api_company';
import { toast } from "sonner";
import { useRouter } from 'next/router';
import { getCompanyById } from './api/api_company';

const View2 = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getAllCompanies()
      .then((companyData) => {
        console.log("Datos recibidos de compañías:", companyData); // Verifica los datos recibidos
        setCompanies(companyData); // Almacena directamente el array de compañías
        setFilteredCompanies(companyData); // Lo asigna también a `filteredCompanies` para mostrar todas las compañías
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los establecimientos");
        console.error("[getCompanies error]", error);
        setLoading(false);
      });
  }, []);

  // Función para manejar la redirección (se hace async)
  const handleCardClick = async (id) => {
    try {
      const companyData = await getCompanyById(id); // Espera la respuesta de la compañía
      const companyType = companyData?.data?.company?.cuenta;

      if (companyType === "free") {
        router.push(`/vista-base?id=${id}`);
      } else if (companyType === "premium") {
        router.push(`/vista-prem?id=${id}`);
      } else {
        throw new Error("Tipo de compañía inválido.");
      }
    } catch (error) {
      console.error("Error al manejar el clic de la tarjeta:", error.message);
      toast.error("Error al redirigir a la página de la compañía.");
    }
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
      {/* Elimina los botones de filtro temporalmente */}
      <div className="md:hidden mt-4">
        <EstablecimientoSlider />
      </div>

      <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center sm:justify-items-start">
        {filteredCompanies.map(company => (
          <div 
            key={company._id} 
            onClick={() => handleCardClick(company._id)} // Llama a la función con el id de la empresa
            className="relative rounded-lg w-[215px] h-[256px] shadow-md overflow-hidden cursor-pointer" // Añade cursor-pointer
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
                {[...Array(company.rating || 0)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
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
          <StyledButton className="hidden md:block" variant="verdeCurvo">¿Quieres hacer un donativo?</StyledButton>
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mt-16 mb-12">
        ¡Juntos podemos hacer del mundo un lugar<br />más accesible para todos!
      </h2>
    </div>
  );
};

export default View2;




/*
import { useState, useEffect } from 'react';
import EstablecimientoSlider from '@/components/Molecules/establesamientoSlider';
import { Link, StyledButton } from '@/components/atoms/Index';
import Image from 'next/image';
import getUserLocation from '@/utils/geolocalization';
import { getAllCompanies } from '../api/api_company';
import { toast } from "sonner"
import { data } from 'autoprefixer';




const View2 = () => {
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      const location = await getUserLocation();
      setUserLocation(location);
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
        

    getAllCompanies()
    .then((company) => {
        seCompanies(company);
    })
    .catch((error) => {
        toast.error("Error al obtener los establecimientos")
        console.error("[getCompanies error]", error)
    })
},[])

 /*
  const handleFilter = (filterType) => {
    let filteredData = [...prods];
    filteredData = filteredCompanies(filteredData, filterType);
    setFilteredCompanies(filteredData);
  };

 const filterCategories = (data, filterType) => {
    switch (filterType) {
      case 'accesibilidad':
        return data.data.filter(giro => category.access === '100% Acceso');
      case 'cercanos':
        return data.sort((a, b) => a.distance - b.distance);
      case 'valoracion':
        return data.sort((a, b) => b.rating - a.rating);
      default:
        return data;
    }
  };
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterCategoriesBySearch(e.target.value, searchLocation);
  };

  const handleLocationSearch = (e) => {
    setSearchLocation(e.target.value);
    filterCategoriesBySearch(searchQuery, e.target.value);
  };

  const filterCategoriesBySearch = (nameQuery, locationQuery) => {
    const filteredData = categories.filter(category =>
      // Filtra por nombre o tipo de establecimiento
      (category.name.toLowerCase().includes(nameQuery.toLowerCase()) ||
       category.type.toLowerCase().includes(nameQuery.toLowerCase())) &&
      // Filtra por ubicación geográfica usando coordenadas
      calculateDistance(category.latitude, category.longitude, locationQuery.lat, locationQuery.lon) <= 50 // Ajusta el umbral de distancia (50 km en este caso)
    );
    setFilteredCategories(filteredData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      

      <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 mb-8 justify-center sm:justify-start">
        <button onClick={() => handleFilter('accesibilidad')} className="w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
          Con accesibilidad
        </button>
        <button onClick={() => handleFilter('cercanos')} className="w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
          Más cercanos
        </button>
        <button onClick={() => handleFilter('valoracion')} className="w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
          Mejor valorados
        </button>
      </div>

      <div className="md:hidden mt-4">
        <EstablecimientoSlider />
      </div>

      <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center sm:justify-items-start">
        {filteredCategories.map(companies => (
          <div key={data.data._id} className="relative rounded-lg w-[215px] h-[256px] shadow-md overflow-hidden">
            <Image src={companyData?.data?.company?.profilePicture || '/perfil1.png'} 
            alt={category.label} 
            layout="fill" 
            objectFit="cover" 
            className="absolute inset-0 w-full h-full" />
            <div className="relative p-4 w-[215px] h-[256px] bg-black bg-opacity-50 flex flex-col justify-end">
              <h3 className="text-lg font-semibold text-white">{category.label}</h3>
              <div className="flex items-center mt-2">
                {[...Array(category.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-white mt-2">{category.access}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 my-12">
        <Link legacyBehavior href="/voluntariado">
          <StyledButton variant="verdeCurvo">¿Quieres ser voluntario?</StyledButton>
        </Link>
        <Link legacyBehavior href="/donaciones">
          <StyledButton className="hidden md:block" variant="verdeCurvo">¿Quieres hacer un donativo?</StyledButton>
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mt-16 mb-12">
        ¡Juntos podemos hacer del mundo un lugar<br />más accesible para todos!
      </h2>
    </div>
  );
};

export default View2;
*/