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
import { getHotelAccessibility, getRestaurantAccessibility } from './api/api_questionnaire';
import { ChevronDown } from 'lucide-react';
import { useCallback } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A';

export default function MapWithPlaces() {

  /**
   * -----------------------------------------------------------------
   * Inicialización de referencias y estados necesarios para el mapa y la funcionalidad principal
   * -----------------------------------------------------------------
   */
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
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedDisability, setSelectedDisability] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  let forAccesibilityIcons = new Set();
  const forAccesibilityIconsRef = useRef(new Set());


  /**
   * -----------------------------------------------------------------
   * Hook que carga todas las compañías desde la API al iniciar el componente
   * -----------------------------------------------------------------
   */
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

  /**
   * -----------------------------------------------------------------
   * Obtiene la ubicación actual del usuario utilizando la API de geolocalización del navegador
   * -----------------------------------------------------------------
   */
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

  /**
   * -----------------------------------------------------------------
   * Inicializa el mapa de Mapbox cuando la ubicación del usuario está disponible
   * -----------------------------------------------------------------
   */
  useEffect(() => {
    if (!userLocation || map.current) return;

    const { latitude, longitude } = userLocation;

    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [longitude, latitude],
      zoom: 13,
    });
    
    // Agregar el icono para dirigirte a tu ubicacion 
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true, 
      },
      trackUserLocation: true, 
      showUserLocation: true, 
      fitBoundsOptions: {
        maxZoom: 14, 
      },
    });

    map.current.addControl(geolocateControl, 'top-right');

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      interactive: false,
    });

    map.current.addControl(directions.current, 'top-left');
    map.current.on('load', () => {
      directions.current.on('route', () => {
        // Obtener el contenedor de direcciones
        const directionsContainer = document.querySelector('.mapboxgl-ctrl-directions');
        if (directionsContainer) {
          directionsContainer.style.display = 'none';
        }

        const collapseButton = document.createElement('button');
        collapseButton.textContent = 'Mostrar/Ocultar Ruta';
        collapseButton.className = 'mapboxgl-ctrl-directions-collapse';

        // Estilos para el botón
        collapseButton.style.position = 'absolute';
        collapseButton.style.top = '10px';
        collapseButton.style.left = '10px';
        collapseButton.style.zIndex = '1';
        collapseButton.style.backgroundColor = '#fff';
        collapseButton.style.border = '1px solid #ccc';
        collapseButton.style.borderRadius = '4px';
        collapseButton.style.padding = '10px 35px';
        collapseButton.style.cursor = 'pointer';
        collapseButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        collapseButton.style.fontFamily = 'Arial, sans-serif';
        collapseButton.style.fontSize = '14px';
        collapseButton.style.color = '#333';

        collapseButton.addEventListener('click', () => {
          if (directionsContainer) {
            if (directionsContainer.style.display === 'none') {
              directionsContainer.style.display = 'block';
              collapseButton.textContent = 'Ocultar Ruta';
            } else {
              directionsContainer.style.display = 'none';
              collapseButton.textContent = 'Mostrar Ruta';
            }
          }
        });

        // Agregar el botón al contenedor del mapa
        map.current.getContainer().appendChild(collapseButton);
      });
    });

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

  /**
   * -----------------------------------------------------------------
   * Calcula la distancia en kilómetros entre dos coordenadas geográficas
   * @param {number} lat1 - Latitud del primer punto
   * @param {number} lon1 - Longitud del primer punto
   * @param {number} lat2 - Latitud del segundo punto
   * @param {number} lon2 - Longitud del segundo punto
   * @returns {number} Distancia en kilómetros
   * -----------------------------------------------------------------
   */
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

  /**
   * -----------------------------------------------------------------
   * Hook que maneja el filtro de búsqueda en tiempo real
   * -----------------------------------------------------------------
   */
  useEffect(() => {
    const fetchDataAndFilter = async () => {

      const filtered = await Promise.all(
        companies.map(async (company) => {

          const averageRating = Math.round(company.averageRating || 0);

          // Obtener accesibilidad según el giro
          let accessibilityData = null;
          try {
            if (company.giro === "HOTEL") {
              accessibilityData = await getHotelAccessibility(company._id);
            } else if (company.giro === "RESTAURANTE") {
              accessibilityData = await getRestaurantAccessibility(company._id);
            }
          } catch (error) {
            console.error("Error obteniendo accesibilidad:", error);
          }

          // Validar que accessibilityData.disabilities sea un array
          const disabilities = accessibilityData?.disabilities || [];
          if (!Array.isArray(disabilities)) {
            console.warn(
              `La propiedad 'disabilities' no es un array para ${company.companyName}`,
              accessibilityData
            );
            return null;
          }

          // Verificar si cumple con los criterios de accesibilidad
          const matchesDisability =
            selectedDisability === "all" ||
            disabilities.some((disability) => {
              // Verificar el tipo
              if (disability.type === selectedDisability) {
                return disability.sections.some((section) => {
                  return section.questions.some((question) => {
                    return question.response === true;
                  });
                });
              }
              return false;
            });

          // Verificar si cumple con los demás filtros
          const matchesCompany =
            company.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedType === "all" || company.giro === selectedType) &&
            (selectedRating === "all" ||
              (selectedRating === "high" && averageRating >= 4) ||
              (selectedRating === "mid" && averageRating >= 3 && averageRating < 4) ||
              (selectedRating === "low" && averageRating < 3)) && matchesDisability;

          return matchesCompany ? company : null;
        })
      );

      const validCompanies = filtered.filter(Boolean);

      setFilteredCompanies(validCompanies);
    };

    fetchDataAndFilter();
  }, [searchQuery, selectedType, selectedRating, selectedDisability, companies]);

  const handleDisabilityChange = (e) => {
    setSelectedDisability(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  /**
   * -----------------------------------------------------------------
   * Función para centrar el mapa en un lugar específico
   * -----------------------------------------------------------------
   */
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

  /**
   * -----------------------------------------------------------------
   * Función para abrir el modal de un establecimiento
   * -----------------------------------------------------------------
   */
  const handleOpenModal = useCallback(async (company) => {
    let averageRating = 0;
    try {
      const avgData = await getBusinessAverageRanking(company._id);
      averageRating = avgData.data.averageRating || 0;
    } catch (error) {
      console.error('Error al obtener el promedio de calificaciones:', error);
    }

    let iconsData = null;
    try {
      if (company.giro === "HOTEL") {
        iconsData = await getHotelAccessibility(company._id);
      } else if (company.giro === "RESTAURANTE") {
        iconsData = await getRestaurantAccessibility(company._id);
      }
    } catch (error) {
      console.error("Error obteniendo accesibilidad:", error);
    }

    const disabilities = iconsData?.disabilities || [];
    if (!Array.isArray(disabilities)) {
      console.warn(
        `La propiedad 'disabilities' no es un array para ${company.companyName}`,
        iconsData
      );
      return null;
    }

    disabilities.forEach((disability) => {
      if (disability.type) {
        const hasValidResponse = disability.sections.some((section) =>
          section.questions.some((question) => question.response === true)
        );
        if (hasValidResponse) {
          forAccesibilityIconsRef.current.add(disability.type);
        }
      }
    });

    const transformedCompany = {
      id: company._id,
      name: company.companyName || "Sin nombre",
      images: company.images || [company.profilePicture || "/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png"],
      rating: averageRating || 0,
      features: company.features || [],
      description: company.description || "No hay descripción disponible.",
      address: company.address || "Dirección no disponible.",
      latitude: company.latitude,
      longitude: company.longitude,
      comments: company.comments || [],
      disabilities: Array.from(forAccesibilityIconsRef.current)
    };

    setSelectedEstablishment(transformedCompany);
    setIsModalOpen(true);
  }, []); // El segundo parámetro vacío asegura que la función no se vuelva a crear


  /**
   * -----------------------------------------------------------------
   * Hook que agrega marcadores dinámicamente al mapa para mostrar compañías cercanas
   * -----------------------------------------------------------------
   */
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
          handleOpenModal(company);
        });
      }
    });
  }, [filteredCompanies, userLocation, handleOpenModal]);


  /**
   * -----------------------------------------------------------------
   * Función para cancelar la ruta actual
   * -----------------------------------------------------------------
   */
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

  /**
   * -----------------------------------------------------------------
   * Función para iniciar una nueva ruta
   * -----------------------------------------------------------------
   */
  const startRoute = (origin, destination) => {
    if (!directions.current) return;

    // Solo establece la ruta si ambos puntos están definidos
    if (origin && destination) {
      directions.current.setOrigin(origin);
      directions.current.setDestination(destination);
      setIsRouting(true);
    }
  };


  /**
   * -----------------------------------------------------------------
   * Función para obtener las direcciones de un establecimiento
   * -----------------------------------------------------------------
   * @param {Object} establishment - Establecimiento seleccionado
   * -----------------------------------------------------------------
   */
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

  /**
   * -----------------------------------------------------------------
   * Función para manejar el clic de una tarjeta de establecimiento
   * -----------------------------------------------------------------
   * @param {string} id - ID de la compañía
   * -----------------------------------------------------------------
   * @returns {string} Tipo de compañía
   * -----------------------------------------------------------------
   * @throws {Error} Error al redirigir a la página de la compañía
   * -----------------------------------------------------------------
   */
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
      <div className="container mx-auto px-4">
        {/* Tamaño móvil */}
        <div className="block md:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-md p-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full bg-white text-black py-2 px-4 rounded-full focus:outline-none"
          >
            Filtros
            <ChevronDown className={`ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="bg-white shadow-md rounded-lg mt-2 space-y-4 px-4 py-2 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar en el mapa"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
                />
              </div>

              <div className="space-y-2">
                <select
                  className="bg-gray-100 text-gray-700 rounded-full py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">Todos los establecimientos</option>
                  <option value="HOTEL">Hoteles</option>
                  <option value="RESTAURANTE">Restaurantes</option>
                </select>

                <select
                  id="disability"
                  value={selectedDisability}
                  onChange={handleDisabilityChange}
                  className="bg-gray-100 text-gray-700 rounded-full py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
                >
                  <option value="" disabled selected >Accesible para:</option>
                  <option value="all">Inclusión para todos</option>
                  <option value="Visual">Personas con Discapacidad Visual</option>
                  <option value="Auditiva">Personas con Discapacidad Auditiva</option>
                  <option value="Motriz">Personas con Discapacidad Motriz</option>
                  <option value="Intelectual">Personas con Discapacidad Intelectual</option>
                  <option value="Neurodivergente">Personas Neurodivergentes</option>
                </select>

                <select
                  id="rating"
                  value={selectedRating}
                  onChange={handleRatingChange}
                  className="bg-gray-100 text-gray-700 rounded-full py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
                >
                  <option value="all">Todas las calificaciones</option>
                  <option value="high">4 estrellas o más</option>
                  <option value="mid">3 estrellas</option>
                  <option value="low">2 estrellas o menos</option>
                </select>
              </div>
            </div>
          )}

          {searchQuery && !isVisible && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg max-h-48 overflow-y-auto z-20">
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

        {/* Tamaño tablet y desktop */}
        <div className="hidden md:flex absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white shadow-md rounded-full flex-wrap items-center px-4 py-2 w-[90%] max-w-4xl space-y-4 sm:space-y-0 md:flex-nowrap md:space-x-4">
          {/* Botón de retroceso */}
          <Link href="/" legacyBehavior>
            <a className="mb-2 sm:mb-0 mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors" />
            </a>
          </Link>

          {/* Campo de entrada */}
          <div className="relative flex-1 min-w-[150px]">
            <input
              type="text"
              placeholder="Buscar en el mapa"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
            />
          </div>

          {/* Filtros desplegables */}
          <div className="w-full md:w-1/3">
            <select
              className="bg-gray-100 text-gray-700 rounded-full py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Todos los establecimientos</option>
              <option value="HOTEL">Hoteles</option>
              <option value="RESTAURANTE">Restaurantes</option>
            </select>
          </div>

          {/* Filtro de tipo de discapacidad */}
          <div className="w-full md:w-1/3">
            <select
              id="disability"
              value={selectedDisability}
              onChange={handleDisabilityChange}
              className="bg-gray-100 text-gray-700 rounded-full py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
            >
              <option value="" disabled selected >Accesible para:</option>
              <option value="all">Inclusivo para todos</option>
              <option value="Visual">Personas con Discapacidad Visual</option>
              <option value="Auditiva">Personas con Discapacidad Auditiva</option>
              <option value="Motriz">Personas con Discapacidad Motriz</option>
              <option value="Intelectual">Personas con Discapacidad Intelectual</option>
              <option value="Neurodivergente">Personas Neurodivergentes</option>
            </select>
          </div>

          {/* Filtro de mejor calificado */}
          <div className="w-full md:w-1/3">
            <select
              id="rating"
              value={selectedRating}
              onChange={handleRatingChange}
              className="bg-gray-100 text-gray-700 rounded-full py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-200 text-sm"
            >
              <option value="all">Todas las calificaciones</option>
              <option value="high">4 estrellas o más</option>
              <option value="mid">3 estrellas</option>
              <option value="low">2 estrellas o menos</option>
            </select>
          </div>

          {/* Busqueda de resultados dinámicos */}
          {searchQuery && !isVisible && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg max-h-48 overflow-y-auto z-20">
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
      </div>

      {/* Contenedor del mapa */}
      <div ref={mapContainer} className="!w-screen h-full rounded-lg shadow-md overflow-hidden">
      </div>

      {/* Botón para alternar visibilidad */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
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
                return distance < 10;
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
                          src={company.profilePicture || "/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png"}
                          alt={company.companyName}
                          width={400}
                          height={100}
                          className="rounded"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-800">{company.companyName}</h3>
                        <div className='flex'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${star <= Math.round(company.averageRating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                                } fill-current`}
                              viewBox='0 0 24 24'
                            >
                              <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
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