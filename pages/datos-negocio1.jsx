import { StyledButton } from '@/components/atoms/Index';
import { InputWithLabel } from '@/components/atoms/Input';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { updateCompany } from "./api/api_company";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A';

const View23 = () => {
  const mapDiv = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [address, setAddress] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [marker, setMarker] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const router = useRouter();

  const [formValues, setFormValues] = useState({
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

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Todos los días'];

  const toggleDay = (day) => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);

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

  useEffect(() => {
    if (!mapRef.current && mapDiv.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapDiv.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude || -100.3899, latitude || 20.5888],
        zoom: 9,
      });
  
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([longitude || -100.3899, latitude || 20.5888])
        .addTo(mapRef.current);
    } else if (latitude && longitude && markerRef.current) {
      markerRef.current.setLngLat([longitude, latitude]);
      mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });
    }
  }, [latitude, longitude]);
  
  
  const fetchCompanyData = async () => {
    const companyId = localStorage.getItem("userId");
    if (!companyId) return;

    try {
      const response = await axios.get(`https://api-ag.devthings.wiki/api/company/${companyId}`);
      const companyData = response.data.data.company; 
      console.log(companyData);

      setFormValues({
        nombreComercial: companyData.companyName || '',
        rfc: companyData.rfc || '',
        representanteLegal: companyData.representanteLegal || '',
        giro: companyData.giro || '',
        horario: {
          apertura: companyData.horario.abre || '',
          cierre: companyData.horario.cierra || ''
        },
        descripcion: companyData.description || ''
      });
      setAddress(companyData.address || '');
      setSelectedDays(companyData.diasDeServicio || []);

      setLatitude(companyData.latitude);
      setLongitude(companyData.longitude);


    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };


  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const { latitude, longitude } = await getCoordinates(address);

      mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });

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

  const handleSubmit = async () => {
    const companyId = localStorage.getItem("userId");
    const userAccountType = localStorage.getItem("cuenta");
  
    if (!companyId) {
      alert("No se encontró el ID de la empresa en localStorage");
      return;
    }
  
    const formData = {
      companyName: formValues.nombreComercial,
      rfc: formValues.rfc,
      representanteLegal: formValues.representanteLegal,
      giro: formValues.giro,
      horario: {
        abre: formValues.horario.apertura,
        cierra: formValues.horario.cierre,
      },
      diasDeServicio: selectedDays,
      description: formValues.descripcion,
      address: address,
      phone: '',
      latitude: markerRef.current ? markerRef.current.getLngLat().lat : latitude,
      longitude: markerRef.current ? markerRef.current.getLngLat().lng : longitude,
      verified: false,
    };
  
    try {
      console.log("Enviando datos de la compañía:", formData);
      const response = await updateCompany(companyId, formData);
      console.log("Respuesta de actualización:", response);
  
      if (userAccountType === "premium") {
        router.push("/sesion-prem");
      } else {
        router.push("/sesion-base");
      }
    } catch (error) {
      console.error("Error al actualizar la compañía:", error);
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

          <StyledButton onClick={handleSubmit}>Enviar</StyledButton>

        </div>
      </div>
    </>
  );
};

export default View23;