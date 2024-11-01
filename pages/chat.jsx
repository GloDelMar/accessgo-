import { InputWithLabel } from '@/components/atoms/Input';
import Image from 'next/image';
import { router } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const View18 = () => {
  const [selectedImages, setSelectedImages] = useState([null, null, null]);
  const [dataNombreEvento, setDataNombreEvento] = useState('');
  const [datadDescEvento, setDataDescEvento] = useState('');
  const [dataFechaEvento, setDataFechaEvento] = useState('');
  const [dataHoraInicioEvento, setDataHoraInicioEvento] = useState('');
  const [dataHoraFinEvento, setDataHoraFinEvento] = useState('');
  const [dataNombrePromocion, setDataNombrePromocion] = useState('');
  const [dataDescPromocion, setDataDescPromocion] = useState('');
  const [dataFechaPromocion, setDataFechaPromocion] = useState('');
  const [dataHoraInicioPromocion, setDataHoraInicioPromocion] = useState('');
  const [dataHoraFinPromocion, setDataHoraFinPromocion] = useState('');
  const [dataNombreAmenidad, setDataNombreAmenidad] = useState('');
  const [datadDescAmenidad, setDataDescAmenidad] = useState('');
  const [dataHoraInicioAmen, setDataHoraInicioAmen] = useState('');
  const [dataHoraFinAmen, setDataHoraFinAmen] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      eventName: dataNombreEvento,
      eventDescription: datadDescEvento,
      dateEvent: dataFechaEvento,
      hourStartEvent: dataHoraInicioEvento,
      hourEndEvent: dataHoraFinEvento,
      namePromotion: dataNombrePromocion,
      promotionDescription: dataDescPromocion,
      datePromotion: dataFechaPromocion,
      hourStartPromotion: dataHoraInicioPromocion,
      hourEndPromotion: dataHoraFinPromocion,
      nameAmenity: dataNombreAmenidad,
      amenityDescription: datadDescAmenidad,
      hourStartAmenity: dataHoraInicioAmen,
      hourEndAmenity: dataHoraFinAmen,
      images: selectedImages
    };
    console.log(JSON.stringify(formData));
    router.push('/22/sesionPremium');
  };

  const handleImageChange = (index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = reader.result;
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

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
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold text-center mb-6 text-[#263238]'>
          Este espacio es para dar a conocer tus próximos eventos
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Input fields for business data... */}

          <div className='grid md:grid-cols-3 gap-4 mt-5'>
            {selectedImages.map((image, index) => (
              <label key={index} className='cursor-pointer mt-5'>
                {image ? (
                  <Image
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    width={300}
                    height={300}
                    className='rounded'
                  />
                ) : (
                  <Image
                    src='/iconoframe.png'
                    alt='Imagen predeterminada'
                    width={300}
                    height={300}
                    className='rounded'
                  />
                )}
                <input
                  type='file'
                  className='hidden'
                  onChange={handleImageChange(index)}
                />
              </label>
            ))}
          </div>

          {/* More input fields... */}

          <div className='mt-8 flex justify-center md:justify-end space-x-4'>
            <button
              type='submit'
              className='px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default View18;
