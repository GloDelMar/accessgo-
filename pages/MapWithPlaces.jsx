import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { getAllCompanies } from './api/api_company';
import { toast } from 'sonner';
import Link from 'next/link';

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

    // Add directions control with customization
    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    // Add the directions control to the map
    map.current.addControl(directions.current, 'top-left');

    // Apply custom styles to the directions container after it's added to the map
    const directionsElement = document.querySelector('.mapbox-directions');
    if (directionsElement) {
      directionsElement.style.backgroundColor = '#ffffff'; // Set background color
      directionsElement.style.borderRadius = '10px'; // Add rounded corners
      directionsElement.style.padding = '10px'; // Add padding around the container
      directionsElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow
      directionsElement.style.maxWidth = '300px'; // Set a max width
    }


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

    document.querySelectorAll('.mapboxgl-marker').forEach((marker) => marker.remove());

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
    if (!place || typeof place.longitude !== 'number' || typeof place.latitude !== 'number') {
      console.error('Invalid coordinates:', place);
      toast.error('No se pudieron centrar los datos debido a coordenadas inválidas.');
      return;
    }

    map.current.flyTo({
      center: [place.longitude, place.latitude],
      zoom: 15,
      essential: true,
    });
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
    <div className="relative w-screen h-screen">

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-md z-10 p-4 flex flex-col gap-4">

        {/* Input and Search Area */}
        <div className="relative flex items-center">
          <Link href="/" legacyBehavior>
            <a className="absolute left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
            </a>
          </Link>
          <input
            type="text"
            placeholder="Buscar establecimientos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-lg p-2 pl-10"
          />
          <select
            className="border rounded-lg p-2"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500 mr-2"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {isVisible ? 'Cerrar lista' : 'Ver establecimientos'}
        </button>
      </div>


      {/* Lista de compañías */}
      {isVisible && (
        <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg max-h-[50%] overflow-y-auto p-4 rounded-t-lg transition-all">
          {/* Título */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Establecimientos cercanos</h2>
            {/* Botón para cerrar */}
            <button
              className="text-gray-500 hover:text-gray-700 transition"
              onClick={() => setIsVisible(!isVisible)} // Cierra el modal al hacer clic
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Lista de establecimientos */}
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
  );
}
