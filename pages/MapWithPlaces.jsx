import EstablecimientoModal from '@/components/EstableciminetoModal';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import DOMPurify from 'dompurify';
import { ArrowLeft, MapPin, Menu, X } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { getAllCompanies, getCompanyById } from './api/api_company';
import { getBusinessAverageRanking } from './api/api_ranking';
import { useRouter } from 'next/router';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A';

export default function MapWithPlaces() {
  const router = useRouter();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const directions = useRef(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [isRouting, setIsRouting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  // Obtener compañías desde la API
  useEffect(() => {
    setLoading(true);
    getAllCompanies()
      .then((companyData) => {
        setCompanies(companyData);
        setFilteredCompanies(companyData);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los establecimientos");
        console.error("[getCompanies error]", error);
        setLoading(false);
      });
  }, []);

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("La geolocalización no está soportada en tu navegador");
      setUserLocation({ latitude: 19.4326, longitude: -99.1332 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error);
        toast.error("No se pudo obtener tu ubicación, mostrando un mapa predeterminado");
        setUserLocation({ latitude: 19.4326, longitude: -99.1332 });
      }
    );
  }, []);

  // Inicializar el mapa cuando la ubicación del usuario esté disponible
  useEffect(() => {
    if (!userLocation || map.current) return;

    const { latitude, longitude } = userLocation;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [longitude, latitude],
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    map.current.addControl(directions.current, 'top-right');

    // Agregar marcador para la ubicación del usuario
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          DOMPurify.sanitize(
            `<div>
              <h3 class="font-semibold">Tu ubicación</h3>
              <p>Esta es tu ubicación actual</p>
            </div>`
          )
        )
      )
      .addTo(map.current);
  }, [userLocation]);

  // Calcular la distancia entre dos puntos en el mapa
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Agregar marcadores dinámicamente y establecimientos mas cercanos
  useEffect(() => {
    if (!map.current || !userLocation) return;

    document.querySelectorAll('.mapboxgl-marker').forEach((marker) => marker.remove());

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          DOMPurify.sanitize(
            `<div>
                        <h3 class="font-semibold">Tu ubicación</h3>
                        <p>Esta es tu ubicación actual</p>
                    </div>`
          )
        )
      )
      .addTo(map.current);

    const companiesWithDistance = filteredCompanies.map((company) => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        company.latitude,
        company.longitude
      );
      return { ...company, distance };
    }).sort((a, b) => a.distance - b.distance);

    companiesWithDistance.forEach((company, index) => {
      const { latitude, longitude, companyName, distance } = company;
      const color = index === 0 ? '#00FF00' : index <= 3 ? '#FFA500' : '#0000FF';

      if (latitude && longitude) {
        const currentMarker = new mapboxgl.Marker({ color })
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              DOMPurify.sanitize(
                `<div>
                                <h3 class="font-semibold">${companyName}</h3>
                                <p>Distancia: ${distance.toFixed(2)} km</p>
                            </div>`
              )
            )
          )
          .addTo(map.current);

        currentMarker.getElement().addEventListener('click', () => {
          startRoute(
            [userLocation.longitude, userLocation.latitude],
            [longitude, latitude]
          );
        });
      }
    });
  }, [filteredCompanies, userLocation]);


  // Manejar el filtro de búsqueda en tiempo real
  useEffect(() => {
    const filtered = companies.filter(
      (company) =>
        company.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedType === 'all' || company.giro === selectedType)
    );
    setFilteredCompanies(filtered);
  }, [searchQuery, selectedType, companies]);

  // Función para centrar el mapa en un lugar específico
  const centerMapOnPlace = (place) => {
    if (!place || typeof place.longitude !== 'number' || typeof place.latitude !== 'number') {
      console.error('Invalid coordinates:', place);
      toast.error('No se pudieron centrar los datos debido a coordenadas inválidas.');
      return;
    }

    map.current.flyTo({
      center: [place.longitude, place.latitude],
      zoom: 350,
      essential: true,
    });
  };

  // Función para abrir el modal de un establecimiento
  const handleOpenModal = async (company) => {
    let averageRating = 0;
    try {
      const avgData = await getBusinessAverageRanking(company._id);
      averageRating = avgData.data.averageRating || 0;
    } catch (error) {
      console.error('Error al obtener el promedio de calificaciones:', error);
    }

    const transformedCompany = {
      id: company._id,
      name: company.companyName || "Sin nombre",
      images: company.images || [company.profilePicture || "/placeholder.svg"],
      rating: averageRating || 0,
      features: company.features || [],
      description: company.description || "No hay descripción disponible.",
      address: company.address || "Dirección no disponible.",
      latitude: company.latitude,
      longitude: company.longitude,
      comments: company.comments || [],
    };

    setSelectedEstablishment(transformedCompany);
    setIsModalOpen(true);
  };

  // Función para cancelar la ruta actual
  const cancelRoute = () => {
    if (directions.current && map.current) {
      map.current.removeControl(directions.current);

      directions.current = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
      });

      map.current.addControl(directions.current, 'top-left');

      setIsRouting(false);
    }
  };

  // Función para iniciar una nueva ruta
  const startRoute = (origin, destination) => {
    if (directions.current) {
      directions.current.setOrigin(origin);
      directions.current.setDestination(destination);
      setIsRouting(true);
    }
  };

  // Función para obtener las direcciones de un establecimiento
  const handleGetDirections = (establishment) => {
    if (!userLocation || !establishment.latitude || !establishment.longitude) {
      toast.error('No se pudo calcular la ruta. Faltan coordenadas.');
      console.error('Ubicación del usuario o coordenadas del establecimiento faltantes.');
      return;
    }

    try {
      directions.current.setOrigin([userLocation.longitude, userLocation.latitude]);
      directions.current.setDestination([establishment.longitude, establishment.latitude]);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error al calcular la ruta.');
      console.error('Error en handleGetDirections:', error);
    }
  };

  // Función para manejar el clic en una tarjeta
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

  return (
    <div className="relative w-screen h-screen">

      {/* Header */}

      {/* Barra de búsqueda personalizada */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white shadow-md rounded-full flex items-center px-4 py-2 w-[90%] max-w-2xl">
        {/* Botón de retroceso */}
        <Link href="/" legacyBehavior>
          <a className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors" />
          </a>
        </Link>

        {/* Campo de entrada */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar en el mapa"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          />
        </div>

        {/* Filtros desplegables */}
        <div className="ml-4">
          <select
            className="bg-gray-100 text-gray-700 rounded-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="HOTEL">Hoteles</option>
            <option value="RESTAURANTE">Restaurantes</option>
          </select>
        </div>


        {/* Busqueda de resultados dinamicos */}
        {searchQuery && !isVisible && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg max-h-48 overflow-y-auto  z-20">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <div
                  key={company._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    centerMapOnPlace(company);
                    setSearchQuery('');
                  }}
                >
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-700">{company.companyName}</h3>
                    <p className="text-sm text-gray-500">{company.giro}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-center">No se encontraron resultados</div>
            )}
          </div>
        )}
      </div>

      {/* Contenedor del mapa */}
      <div ref={mapContainer} className="!w-screen h-full rounded-lg shadow-md overflow-hidden" />

      {/* Botón para alternar visibilidad */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-0">
        <button
          className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-all"
          onClick={() => setIsVisible(!isVisible)}
        >
          <Menu className="h-5 w-5" />
          {isVisible ? 'Cerrar lista' : 'Ver establecimientos'}
        </button>
      </div>


      {/* Lista de compañías */}
      {isVisible && (
        <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg max-h-[50%] overflow-hidden p-4 rounded-t-lg transition-all">
          {/* Título */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Establecimientos cercanos</h2>
            {/* Botón para cerrar */}
            <button
              className="text-gray-500 hover:text-gray-700 transition"
              onClick={() => setIsVisible(!isVisible)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {filteredCompanies
              .filter((company) => {
                const distance = calculateDistance(
                  userLocation?.latitude,
                  userLocation?.longitude,
                  company?.latitude,
                  company?.longitude
                );
                return distance < 50;
              })
              .map((company) => {
                const distance = calculateDistance(
                  userLocation?.latitude,
                  userLocation?.longitude,
                  company?.latitude,
                  company?.longitude
                );

                const bgColorClass = distance < 1 ? 'bg-green-100' : 'bg-orange-100';

                return (
                  <div
                    key={company._id}
                    className={`shadow rounded-lg min-w-[200px] snap-start flex-shrink-0 ${bgColorClass}`}
                    onClick={() => handleOpenModal(company)}
                  >
                    <div className="p-4 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-muted rounded overflow-hidden">
                        <Image
                          src={company.profilePicture || "/placeholder.svg?height=64&width=64"}
                          alt={company.companyName}
                          width={400}
                          height={100}
                          className="rounded"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-800">{company.companyName}</h3>
                        <div className="flex justify-center items-center gap-1">
                          {[...Array(3)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {company.giro || "Sin giro definido"}
                        </p>
                        <p className="text-xs text-gray-500">Distancia: {distance.toFixed(2)} km</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>
      )}
      {/* Modal */}
      {isModalOpen && selectedEstablishment && (
        <EstablecimientoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        establishment={selectedEstablishment}
        onGetDirections={handleGetDirections}
        onImageClick={async (id) => {
          const companyType = await handleCardClick(id);
          if (companyType !== "free" && companyType !== "premium") {
            console.error("Tipo de compañía inválido para redirección.");
          }
        }}
      />
      
      )}
    </div>
  );
}
