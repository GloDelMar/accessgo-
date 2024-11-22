import { InputWithLabel } from '@/components/atoms/Input';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createpromo } from './api/api_promos'; // Asegúrate de tener esta función en tu archivo API.

const View18 = () => {
  const [selectedImagePromo, setSelectedImagePromo] = useState(null);
  const [dataNombrePromo, setDataNombrePromo] = useState('');
  const [dataDescPromo, setDataDescPromo] = useState('');
  const [dataFechaInicioPromo, setDataFechaInicioPromo] = useState('');
  const [dataFechaFinPromo, setDataFechaFinPromo] = useState('');
  const [dataHoraInicioPromo, setDataHoraInicioPromo] = useState('');
  const [dataHoraFinPromo, setDataHoraFinPromo] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const response = await createpromo(); // Llama a la API para obtener datos de una promoción
        if (response.ok) {
          const data = await response.json();
          // Actualiza los estados con la información obtenida
          setDataNombrePromo(data.promoName || '');  // Usa los datos de la promoción
          setDataDescPromo(data.promoDescription || ''); // Usa la descripción de la promoción
          setDataFechaInicioPromo(data.startDate || '');
          setDataFechaFinPromo(data.endDate || '');
          setDataHoraInicioPromo(data.startTime || '');
          setDataHoraFinPromo(data.endTime || '');
          setSelectedImagePromo(data.promoImage || null);
        } else {
          console.error('Error al obtener los datos:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchPromoData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      promoName: dataNombrePromo,
      promoDescription: dataDescPromo,
      startDate: dataFechaInicioPromo,
      endDate: dataFechaFinPromo,
      startTime: dataHoraInicioPromo,
      endTime: dataHoraFinPromo,
      promoImage: selectedImagePromo,
    };

    console.log(JSON.stringify(formData));
    // Suponiendo que este es el proceso para enviar los datos de la promoción
    router.push('/sesion-prem');  // Ruta para el estado final después de enviar la promo
  };

  return (
    <div className='m-10'>
      <h1 className='text-2xl font-bold text-center mb-6 text-[#263238]'>
        Editar Promoción
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='nombrePromo'
              className='block text-sm font-medium text-[#546E7A] mb-1'
            >
              Nombre de la Promoción
            </label>
            <input
              id='nombrePromo'
              type='text'
              value={dataNombrePromo}
              onChange={(e) => setDataNombrePromo(e.target.value)}
              className='w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
            />
          </div>
          <label
            htmlFor='imgPromo'
            className='cursor-pointer mt-5 row-span-4 justify-items-center'
          >
            {selectedImagePromo ? (
              <Image
                src={selectedImagePromo}
                alt='Imagen de Promoción'
                width={300}
                height={300}
              />
            ) : (
              <Image
                src='/iconoframe.png'
                alt='Imagen Promoción'
                width={150}
                height={150}
                className='rounded-full'
              />
            )}
            <input
              type='file'
              id='imgPromo'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSelectedImagePromo(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
          <div>
            <label
              htmlFor='descripcionPromo'
              className='block text-sm font-medium text-[#546E7A] mb-1'
            >
              Descripción
            </label>
            <textarea
              id='descripcionPromo'
              value={dataDescPromo}
              onChange={(e) => setDataDescPromo(e.target.value)}
              className='w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
            />
          </div>
          <div>
            <label
              htmlFor='fechaInicioPromo'
              className='block text-sm font-medium text-[#546E7A] mb-1'
            >
              Fecha de Inicio de la Promoción
            </label>
            <input
              type='date'
              id='fechaInicioPromo'
              value={dataFechaInicioPromo}
              onChange={(e) => setDataFechaInicioPromo(e.target.value)}
              className='w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
            />
            <label
              htmlFor='fechaFinPromo'
              className='block text-sm font-medium text-[#546E7A] mb-1 mt-4'
            >
              Fecha de Fin de la Promoción
            </label>
            <input
              type='date'
              id='fechaFinPromo'
              value={dataFechaFinPromo}
              onChange={(e) => setDataFechaFinPromo(e.target.value)}
              className='w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
            />
            <label
              htmlFor='horarioPromo'
              className='block text-sm font-medium text-[#546E7A] mb-1 mt-4'
            >
              Horario de la Promoción
            </label>
            <div className='flex items-center space-x-2'>
              <input
                type='time'
                value={dataHoraInicioPromo}
                onChange={(e) => setDataHoraInicioPromo(e.target.value)}
                className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
              />
              <span className='text-[#546E7A]'>a</span>
              <input
                type='time'
                value={dataHoraFinPromo}
                onChange={(e) => setDataHoraFinPromo(e.target.value)}
                className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
              />
            </div>
          </div>
        </div>
        <div className='mt-10 flex justify-center'>
          <button
            type='submit'
            className='px-12 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default View18;
