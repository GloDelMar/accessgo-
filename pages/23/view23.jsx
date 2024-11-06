import { Link, StyledButton } from '@/components/atoms/Index';
import { InputWithLabel } from '@/components/atoms/Input';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// Configuración del token de acceso para Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A';

const View23 = () => {
  // Referencias y estados del componente
  const mapDiv = useRef(null); // Referencia para el contenedor del mapa
  const mapRef = useRef(null); // Referencia para el mapa de Mapbox
  const [address, setAddress] = useState(''); // Estado para la dirección ingresada
  const [selectedDays, setSelectedDays] = useState([]); // Estado para los días seleccionados
  const [marker, setMarker] = useState(null); // Estado para el marcador en el mapa
  const [formValues, setFormValues] = useState({ // Estado para los valores del formulario  
    nombre: '',
    nombreComercial: '',
    rfc: '',
    representanteLegal: '',
    giro: '',
    horario: {
      apertura: '',
      cierre: ''
    },
    descripcion: '' 
  });

  // Días de servicio disponibles
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Todos los días'];

  /**
   * Función para alternar el estado de los días seleccionados.
   * Si el día ya está seleccionado, lo elimina, de lo contrario lo agrega.
   */
  const toggleDay = (day) => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);

  /**
   * Función para obtener las coordenadas (latitud y longitud) de una dirección utilizando la API de geocodificación de Mapbox.
   * @param {string} address - Dirección a buscar.
   * @returns {Object} Coordenadas en formato { latitude, longitude }.
   * @throws Error si no se encuentran coordenadas para la dirección.
   */
  const getCoordinates = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      return { latitude, longitude };
    } else {
      throw new Error('No se encontraron coordenadas para esta dirección.');
    }
  };

  /**
   * Efecto que inicializa el mapa al montar el componente.
   */
  useEffect(() => {
    if (mapDiv.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapDiv.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-100.3899, 20.5888],
        zoom: 9,
      });
    }
  }, []);

  /**
   * Manejador para actualizar el estado de la dirección.
   * @param {Object} event - Evento del input de dirección.
   */
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  /**
   * Manejador para buscar las coordenadas de la dirección y actualizar el mapa y marcador en esa ubicación.
   * Utiliza la función getCoordinates para obtener las coordenadas y luego centra el mapa y coloca un marcador en la posición.
   */
  const handleSearch = async () => {
    try {
      const { latitude, longitude } = await getCoordinates(address);

      // Centra el mapa en las coordenadas obtenidas
      mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });

      // Añade un marcador en la ubicación obtenida
      if (marker) {
        marker.setLngLat([longitude, latitude]);
      } else {
        const newMarker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
        setMarker(newMarker);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  /**
   * Estructura del objeto que se enviará al servidor al enviar el formulario,
   * incluyendo los campos de nombre, RFC, representante legal, giro, horario,
   * descripción, días de servicio, dirección y las coordenadas obtenidas.
   */
  const handleSubmit = async () => {
    const formData = {
      companyName: formValues.nombreComercial,
      giro: formValues.giro,
      horario: {
        abre: formValues.horario.apertura,
        cierra: formValues.horario.cierre
      },
      diasDeServicio: selectedDays,
      description: formValues.descripcion,
      address: address,
      phone: '',
      coordenadas: marker ? { latitud: marker.getLngLat().lat, longitud: marker.getLngLat().lng } : null,
      verified: false
    };

    try {
      console.log(formData);
      const response = await axios.post('/api/companies', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="w-full max-w-[900px] mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#263238]">¡Cuéntanos sobre ustedes!</h1>
        <p className="text-center mb-8 text-[#546E7A]">Para personalizar el perfil te pedimos que respondas los siguientes campos</p>

        <div className="grid gap-8 lg:grid-cols-[300px,1fr] w-full">
          <div className="flex flex-col justify-items-center items-center space-y-4 w-full">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-[#ECEFF1] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-[#B0BEC5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <button className="px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] md:hidden">
              Actualizar foto de perfil
            </button>
            <InputWithLabel
              name="nombre"
              placeholder="Nombre"
              value={formValues.nombre}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 space-y-6 w-full">
            <h2 className="text-xl font-semibold text-[#263238]">Datos del negocio</h2>
            <div className="grid gap-4 md:grid-cols-2 w-full">
              <InputWithLabel
                name="nombreComercial"
                placeholder="Ingresar dato"
                value={formValues.nombreComercial}
                onChange={handleInputChange}
                label="Nombre comercial de tu negocio"
              />
              <InputWithLabel
                name="rfc"
                label="RFC"
                placeholder="Ingresar dato"
                value={formValues.rfc}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="persona-moral" className="block text-sm font-medium text-[#546E7A] mb-1">Persona moral</label>
              <InputWithLabel
                name="representanteLegal"
                label="Nombre y apellido representante legal del negocio"
                id="persona-moral"
                placeholder="Ingresar dato"
                value={formValues.representanteLegal}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 w-full">
              <div className="w-full">
                <label htmlFor="giro" className="block text-sm font-medium text-[#546E7A] mb-1">Giro de tu negocio</label>
                <select
                  id="giro"
                  name="giro"
                  value={formValues.giro}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
                >
                  <option>Giro de tu negocio</option>
                  <option value="HOTEL">HOTEL</option>
                  <option value="RESTAURANTE">RESTAURANTE</option>
                  <option value="BAR">BAR</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="horario" className="block text-sm font-medium text-[#546E7A] mb-1">Horario de servicio</label>
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="time"
                    name="horarioApertura"
                    value={formValues.horario.apertura}
                    onChange={(e) => setFormValues(prev => ({ ...prev, horario: { ...prev.horario, apertura: e.target.value } }))}
                    className="flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
                  />
                  <span className="text-[#546E7A]">a</span>
                  <input
                    type="time"
                    name="horarioCierre"
                    value={formValues.horario.cierre}
                    onChange={(e) => setFormValues(prev => ({ ...prev, horario: { ...prev.horario, cierre: e.target.value } }))}
                    className="flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 w-full">
              <div className="w-full">
                <label htmlFor="descripcion" className="block text-sm font-medium text-[#546E7A] mb-1">Descripción de tu negocio</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Ingresar dato"
                  value={formValues.descripcion}
                  onChange={handleInputChange}
                  className="w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
                />
              </div>
              <div className="w-full">
                <span className="block text-sm font-medium text-[#546E7A] mb-2">Días de servicio</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                  {days.map((day) => (
                    <div key={day} className="flex items-center w-full">
                      <input
                        id={day}
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleDay(day)}
                        className="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] bg-[#F9F9F9] rounded"
                      />
                      <label htmlFor={day} className="ml-2 block text-sm text-[#546E7A]">{day}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full">
              <InputWithLabel
                name="direccion"
                label="Dirección de tu negocio"
                id="direccion"
                placeholder="Ingresar dato"
                value={address}
                onChange={handleAddressChange}
              />
              <button onClick={handleSearch} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Buscar</button>
            </div>
            <div className="aspect-video relative rounded-md overflow-hidden w-full" ref={mapDiv} style={{ height: '400px' }}></div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-4 w-full">
          <StyledButton variant="blancoCuadrado">CANCELAR</StyledButton>
          <Link legacyBehavior href="/cardFree09">
            <StyledButton onClick={handleSubmit} variant="verdeCuadrado">CONTINUAR</StyledButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default View23;