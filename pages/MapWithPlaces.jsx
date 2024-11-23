import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { getAllCompanies } from './api/api_company';
import { toast } from 'sonner';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A';

export default function MapWithPlaces() {
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
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Agregar control de direcciones
    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving', // Puedes cambiarlo a walking o cycling
    });

    map.current.addControl(directions.current, 'top-right');

    // Agregar marcador para la ubicación del usuario
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
            <h3 class="font-semibold">Tu ubicación</h3>
            <p>Esta es tu ubicación actual</p>
          </div>`
        )
      )
      .addTo(map.current);
  }, [userLocation]);

  // Agregar marcadores dinámicamente
  useEffect(() => {
    if (!map.current) return;

    // Eliminar marcadores previos
    document.querySelectorAll('.mapboxgl-marker').forEach((marker) => marker.remove());

    // Agregar marcador para la ubicación del usuario
    if (userLocation) {
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div>
              <h3 class="font-semibold">Tu ubicación</h3>
              <p>Esta es tu ubicación actual</p>
            </div>`
          )
        )
        .addTo(map.current);
    }

    // Agregar marcadores para las compañías filtradas
    filteredCompanies.forEach((company) => {
      const { latitude, longitude, companyName, giro, address } = company;

      if (latitude && longitude) {
        const currentMarker = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div>
                <h3 class="font-semibold">${companyName}</h3>
                <p>${giro}</p>
                <p>${address}</p>
              </div>`
            )
          )
          .addTo(map.current);

        // Añadir evento para iniciar la ruta al hacer clic en el marcador
        currentMarker.getElement().addEventListener('click', () => {
          startRoute(
            [userLocation.longitude, userLocation.latitude],
            [longitude, latitude]
          );
        });
      } else {
        console.warn("Marcador no agregado debido a coordenadas inválidas:", company);
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

  const centerMapOnPlace = (place) => {
    map.current.flyTo({
      center: [place.longitude, place.latitude],
      zoom: 15,
      essential: true,
    });
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
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

  return (

    <div className="relative w-full h-screen">
  {/* Contenedor del mapa */} 
  <div
    ref={mapContainer}
    className="w-full h-full rounded-lg shadow-md overflow-hidden"
  />

  {/* Controles superpuestos */}
  <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:w-80 w-[95%] bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-lg shadow-lg z-10 space-y-3 sm:space-y-4 transition duration-300 ease-in-out">
    {/* Botón para cancelar la ruta */}
    {isRouting && (
      <button
        onClick={cancelRoute}
        className="w-full bg-red-500 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-red-600 text-sm sm:text-base transition duration-200 ease-in-out"
      >
        Cancelar ruta
      </button>
    )}

    {/* Campo de búsqueda */}
    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 16l-4-4m0 0l4-4m-4 4h16"
        />
      </svg>
      <input
        type="text"
        placeholder="Buscar establecimientos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent ml-2 focus:outline-none text-sm sm:text-base"
      />
    </div>

    {/* Filtro por tipo */}
    <select
      className="w-full bg-gray-100 rounded-lg border-gray-300 focus:ring focus:ring-blue-300 text-sm sm:text-base"
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
    >
      <option value="all">Todos los establecimientos</option>
      <option value="RESTAURANTE">Restaurantes</option>
      <option value="HOTEL">Hoteles</option>
    </select>

    {/* Botón para alternar visibilidad */}
    <button
      onClick={toggleVisibility}
      className="w-full bg-blue-500 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition duration-200 ease-in-out"
    >
      {isVisible ? 'Ocultar compañías' : 'Mostrar compañías'}
    </button>

    {/* Lista de compañías */}
    {isVisible && (
      <div className="space-y-2 overflow-y-auto max-h-[200px] sm:max-h-[300px] bg-white p-2 sm:p-4 rounded-lg shadow-inner text-sm sm:text-base">
        {filteredCompanies.map((company) => (
          <div
            key={company._id}
            className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-100 rounded-lg transition duration-200 ease-in-out"
            onClick={() => centerMapOnPlace(company)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657A8 8 0 1116.657 4a8 8 0 011 11.314z"
              />
            </svg>
            <span className="font-medium text-gray-700">{company.companyName}</span>
            <span className="text-sm text-gray-500 ml-auto">{company.giro}</span>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


  );
}
