import { InputWithLabel } from '@/components/atoms/Input';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';
import { router } from 'next/router';
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A';

const View23 = () => {
  const mapDiv = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataNombreNegocio, setDataNombreNegocio] = useState('');
  const [dataRfc, setDataRfc] = useState('');
  const [dataTel, setDataTel] = useState('');
  const [dataNombrePersonaM, setDataNombrePersonaM] = useState('');
  const [dataApellidoPersonaM, setDataApellidoPersonaM] = useState('');
  const [dataGiroNegocio, setDataGiroNegocio] = useState('');
  const [dataHoraIni, setDataHoraIni] = useState('');
  const [dataHoraFin, setDataHoraFin] = useState('');
  const [dataDescripcion, setDataDescripcion] = useState('');
  const [dataDireccion, setDataDireccion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      nombreNegocio: dataNombreNegocio,
      rfc: dataRfc,
      nombrePersonaMoral: dataNombrePersonaM,
      apellidoPersonaMoral: dataApellidoPersonaM,
      giroNegocio: dataGiroNegocio,
      descripcion: dataDescripcion,
      direccion: dataDireccion,
      diasSeleccionados: selectedDays
    };
    console.log(JSON.stringify(formData));
    // Aquí puedes enviar formData a tu API o realizar otra acción necesaria
    router.push('/22/sesionPremium');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (mapDiv.current) {
      const map = new mapboxgl.Map({
        container: mapDiv.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-100.3899, 20.5888],
        zoom: 9
      });
    }
  }, []);

  const [selectedDays, setselectedDays] = useState([]);

  const days = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
    'Todos los días'
  ];

  const toggleDay = (day) =>
    setselectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  console.log(
    dataNombreNegocio,
    dataRfc,
    dataNombrePersonaM,
    dataApellidoPersonaM,
    dataGiroNegocio,
    dataDescripcion,
    dataHoraIni,
    dataHoraFin,
    dataDireccion,
    selectedDays,
    dataTel
  );
  return (
    <>
      <div className='max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm'>
        <h1 className='text-2xl font-bold text-center mb-6 text-[#263238]'>
          ¡Cuentanos sobre ustedes!
        </h1>
        <p className='text-center mb-8 text-[#546E7A]'>
          Para personalizar el perfil te pedimos que respondas los siguientes
          campos
        </p>

        <div className='grid lg:grid-cols-[300px,1fr] gap-8'>
          <div className='flex flex-col items-center'>
            <label htmlFor='imgUsuario' className='cursor-pointer'>
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt='Foto de perfil'
                  width={300}
                  height={300}
                  className='rounded-full'
                />
              ) : (
                <Image
                  src='/iconoframe.png'
                  alt='Foto de perfil'
                  width={300}
                  height={300}
                  className='rounded-full'
                />
              )}
              <input
                type='file'
                id='imgUsuario'
                className='hidden'
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-[#263238]'>
              Datos del negocio
            </h2>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <InputWithLabel
                  type='text'
                  value={dataNombreNegocio}
                  onChange={(event) => {
                    setDataNombreNegocio(event.target.value);
                  }}
                  label='Nombre comercial de tu negocio'
                  id='nombre-comercial'
                  placeholder='Ingresar dato'
                />
              </div>
              <div>
                <InputWithLabel
                  type='text'
                  value={dataRfc}
                  onChange={(event) => {
                    setDataRfc(event.target.value);
                  }}
                  label='RFC'
                  id='rfc'
                  placeholder='Ingresar dato'
                />
              </div>
              <div>
                <InputWithLabel
                  type='number'
                  value={dataTel}
                  onChange={(event) => {
                    setDataTel(event.target.value);
                  }}
                  label='Telefono'
                  id='telefono'
                  placeholder='Ingresar dato'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='persona-moral'
                className='block text-sm font-medium text-[#546E7A] mb-1'
              >
                Persona moral
              </label>

              <InputWithLabel
                type='text'
                value={dataNombrePersonaM}
                onChange={(event) => {
                  setDataNombrePersonaM(event.target.value);
                }}
                label='Nombre del representante legal'
                id='persona-moral'
                placeholder='Ingresar dato'
              />

              <InputWithLabel
                type='text'
                value={dataApellidoPersonaM}
                onChange={(event) => {
                  setDataApellidoPersonaM(event.target.value);
                }}
                label='Apellido del representante legal'
                id='persona-moral'
                placeholder='Ingresar dato'
              />
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='giro'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Giro de tu negocio
                </label>
                <input
                  id='giro'
                  type='text'
                  value={dataGiroNegocio}
                  onChange={(event) => {
                    setDataGiroNegocio(event.target.value);
                  }}
                  className='w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                ></input>
              </div>
              <div>
                <label
                  htmlFor='horario'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Horario de servicio
                </label>
                <div className='flex items-center space-x-2'>
                  <input
                    type='time'
                    value={dataHoraIni}
                    onChange={(event) => {
                      setDataHoraIni(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                  <span className='text-[#546E7A]'>a</span>
                  <input
                    type='time'
                    value={dataHoraFin}
                    onChange={(event) => {
                      setDataHoraFin(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                </div>
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='descripcion'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Descripción de tu negocio
                </label>
                <textarea
                  type='text'
                  value={dataDescripcion}
                  onChange={(event) => {
                    setDataDescripcion(event.target.value);
                  }}
                  id='descripcion'
                  placeholder='Ingresar dato'
                  className='w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                />
              </div>
              <div>
                <span className='block text-sm font-medium text-[#546E7A] mb-2'>
                  Días de servicio
                </span>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                  {days.map((day) => (
                    <div key={day} className='flex items-center'>
                      <input
                        id={day}
                        type='checkbox'
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleDay(day)}
                        className='h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] bg-[#F9F9F9] rounded'
                      />
                      <label
                        htmlFor={day}
                        className='ml-2 block text-sm text-[#546E7A]'
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <InputWithLabel
                type='text'
                value={dataDireccion}
                onChange={(event) => {
                  setDataDireccion(event.target.value);
                }}
                label='Dirección de tu negocio'
                id='direccion'
                placeholder='Ingresar dato'
              />
            </div>
            <div
              className='aspect-video relative rounded-md overflow-hidden'
              ref={mapDiv}
              style={{ height: '400px' }}
            ></div>
          </div>
        </div>
        <div className='mt-8 flex justify-center md:justify-end space-x-4'>
          <button
            type='submit'
            onClick={handleSubmit}
            className='px-6 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  );
};

export default View23;