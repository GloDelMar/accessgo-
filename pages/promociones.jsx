import { InputWithLabel } from '@/components/atoms/Input';
import Image from 'next/image';
import { router } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const View18 = () => {
  const [selectedImageEvento, setSelectedImageEvento] = useState(null);
  const [selectedImagePromocion, setSelectedImagePromocion] = useState(null);
  const [selectedImageAmenidad, setSelectedImageAmenidad] = useState(null);

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'evento') {
          setSelectedImageEvento(reader.result);
        } else if (type === 'promocion') {
          setSelectedImagePromocion(reader.result);
        } else if (type === 'amenidad') {
          setSelectedImageAmenidad(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
  const [dataFacebook, setDataFacebook] = useState('');
  const [dataInstagram, setDataInstagram] = useState('');
  const [dataX, setDataX] = useState('');
  const [dataTiktok, setDataTiktok] = useState('');

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
      imagEvent: selectedImageEvento,
      imgPromo: selectedImagePromocion,
      imgAmenity: selectedImageAmenidad
    };
    console.log(JSON.stringify(formData));

    router.push('/sesion-prem');
  };

  console.log(
    dataNombreEvento,
    datadDescEvento,
    dataFechaEvento,
    dataHoraInicioEvento,
    dataHoraFinEvento,
    dataNombrePromocion,
    dataDescPromocion,
    dataFechaPromocion,
    dataHoraInicioPromocion,
    dataHoraFinPromocion,
    dataNombreAmenidad,
    datadDescAmenidad,
    dataHoraInicioAmen,
    dataHoraFinAmen
  );
  return (
    <>
      <div className='m-10'>
        <h1 className='text-2xl font-bold text-center mb-6 text-[#263238]'>
          Este espacio es para dar a conocer tus Redes Sociales y tus proximos
        </h1>
        <h1 className='text-2xl font-bold text-center mb-6 text-[#263238]'>
          Eventos, Promociones y Amenidades
        </h1>

        <div>
          <div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <InputWithLabel
                  type='text'
                  value={dataFacebook}
                  onChange={(event) => {
                    setDataFacebook(event.target.value);
                  }}
                  label='Facebook'
                  id='facebook'
                  placeholder=''
                />
              </div>
              <div>
                <InputWithLabel
                  type='text'
                  value={dataInstagram}
                  onChange={(event) => {
                    setDataInstagram(event.target.value);
                  }}
                  label='Instagram'
                  id='instagram'
                  placeholder=' '
                />
              </div>
              <div>
                <InputWithLabel
                  type='text'
                  value={dataX}
                  onChange={(event) => {
                    setDataX(event.target.value);
                  }}
                  label=' X '
                  id='x'
                  placeholder=' '
                />
              </div>
              <div>
                <InputWithLabel
                  type='text'
                  value={dataTiktok}
                  onChange={(event) => {
                    setDataTiktok(event.target.value);
                  }}
                  label=' Tik Tok '
                  id='tiktok'
                  placeholder=' '
                />
              </div>
            </div>
            <div className='mt-10 flex justify-center'>
              <button
                className='px-12 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
              >
                Listo
              </button>
            </div>

            <p className='mb-4 mt-10 text-center'>Datos de tu Evento</p>

            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='nombre Evento'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Nombre
                </label>
                <input
                  id='nombreEvento'
                  type='text'
                  value={dataNombreEvento}
                  onChange={(event) => {
                    setDataNombreEvento(event.target.value);
                  }}
                  className='w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                ></input>
              </div>

              <label
                htmlFor='imgEvento'
                className='cursor-pointer mt-5 row-span-4 justify-items-center'
              >
                {selectedImageEvento ? (
                  <Image
                    src={selectedImageEvento}
                    alt='Imagen de Evento'
                    width={300}
                    height={300}
                    className=''
                  />
                ) : (
                  <Image
                    src='/iconoframe.png'
                    alt='Imagen Evento'
                    width={150}
                    height={150}
                    className='rounded-full'
                  />
                )}
                <input
                  type='file'
                  id='imgEvento'
                  className='hidden'
                  onChange={(event) => handleImageChange(event, 'evento')}
                />
              </label>
              <div>
                <label
                  htmlFor='descripcion'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Descripción del Evento
                </label>
                <textarea
                  type='text'
                  value={datadDescEvento}
                  onChange={(event) => {
                    setDataDescEvento(event.target.value);
                  }}
                  id='descripcion Evento'
                  placeholder=''
                  className='w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                />
              </div>

              <div>
                <label
                  htmlFor='fecha evento'
                  className='block text-sm font-medium text-[#546E7A] mb-1 '
                >
                  Fecha
                </label>
                <div className='flex items-center space-x-2 mb-5'>
                  <input
                    type='text'
                    value={dataFechaEvento}
                    onChange={(event) => {
                      setDataFechaEvento(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                </div>
                <label
                  htmlFor='horario evento'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Horario
                </label>
                <div className='flex items-center space-x-2'>
                  <input
                    type='time'
                    value={dataHoraInicioEvento}
                    onChange={(event) => {
                      setDataHoraInicioEvento(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                  <span className='text-[#546E7A]'>a</span>
                  <input
                    type='time'
                    value={dataHoraFinEvento}
                    onChange={(event) => {
                      setDataHoraFinEvento(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                </div>
              </div>
              <div className='mt-10 flex justify-center'>
                <button
                  className='px-12 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
                  onClick={() => {
                    const formData = {
                      eventName: dataNombreEvento,
                      eventDescription: datadDescEvento,
                      dateEvent: dataFechaEvento,
                      hourStartEvent: dataHoraInicioEvento,
                      hourEndEvent: dataHoraFinEvento,
                      images: selectedImageEvento
                    };
                    sendData(formData, 'evento');
                  }}
                >
                  Listo
                </button>
              </div>
            </div>

            <p className='mb-4 mt-10 text-center'>Datos de tu Promocion</p>

            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='nombre promocion'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Nombre
                </label>
                <input
                  id='nombrePromocion'
                  type='text'
                  value={dataNombrePromocion}
                  onChange={(event) => {
                    setDataNombrePromocion(event.target.value);
                  }}
                  className='w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                ></input>
              </div>

              <label
                htmlFor='imgPromocion'
                className='cursor-pointer mt-5 row-span-4 justify-items-center'
              >
                {selectedImagePromocion ? (
                  <Image
                    src={selectedImagePromocion}
                    alt='Imagen de Promocion'
                    width={300}
                    height={300}
                    className=''
                  />
                ) : (
                  <Image
                    src='/iconoframe.png'
                    alt='Imagen Promocion'
                    width={150}
                    height={150}
                    className='rounded-full'
                  />
                )}
                <input
                  type='file'
                  id='imgPromocion'
                  className='hidden'
                  onChange={(event) => handleImageChange(event, 'promocion')}
                />
              </label>
              <div>
                <label
                  htmlFor='descripcion'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Descripción de la Promocion
                </label>
                <textarea
                  type='text'
                  value={dataDescPromocion}
                  onChange={(event) => {
                    setDataDescPromocion(event.target.value);
                  }}
                  id='descripcion promocion'
                  placeholder=''
                  className='w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                />
              </div>

              <div>
                <label
                  htmlFor='fecha promocion'
                  className='block text-sm font-medium text-[#546E7A] mb-1 '
                >
                  Fecha
                </label>
                <div className='flex items-center space-x-2 mb-5'>
                  <input
                    type='text'
                    value={dataFechaPromocion}
                    onChange={(event) => {
                      setDataFechaPromocion(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                </div>
                <label
                  htmlFor='horario promocion'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Horario
                </label>
                <div className='flex items-center space-x-2'>
                  <input
                    type='time'
                    value={dataHoraInicioPromocion}
                    onChange={(event) => {
                      setDataHoraInicioPromocion(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                  <span className='text-[#546E7A]'>a</span>
                  <input
                    type='time'
                    value={dataHoraFinPromocion}
                    onChange={(event) => {
                      setDataHoraFinPromocion(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                </div>
              </div>
              <div className='mt-10 flex justify-center'>
                <button
                  className='px-12 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
                  onClick={() => {
                    const formData = {
                      eventName: dataNombreEvento,
                      eventDescription: datadDescEvento,
                      dateEvent: dataFechaEvento,
                      hourStartEvent: dataHoraInicioEvento,
                      hourEndEvent: dataHoraFinEvento,
                      images: selectedImagePromocion
                    };
                    sendData(formData, 'promocion');
                  }}
                >
                  Listo
                </button>
              </div>
            </div>

            <p className='mb-4 mt-10 text-center'>Amenidades</p>

            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='nombre amenidades'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Nombre
                </label>
                <input
                  id='nombre amenidades'
                  type='text'
                  value={dataNombreAmenidad}
                  onChange={(event) => {
                    setDataNombreAmenidad(event.target.value);
                  }}
                  className='w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                ></input>
              </div>

              <label
                htmlFor='imgAmenidad'
                className='cursor-pointer mt-5 row-span-4 justify-items-center'
              >
                {selectedImageAmenidad ? (
                  <Image
                    src={selectedImageAmenidad}
                    alt='Imagen Amenidad'
                    width={300}
                    height={300}
                    className=''
                  />
                ) : (
                  <Image
                    src='/iconoframe.png'
                    alt='Imagen Amenidad'
                    width={150}
                    height={150}
                    className='rounded-full'
                  />
                )}
                <input
                  type='file'
                  id='imgAmenidad'
                  className='hidden'
                  onChange={(event) => handleImageChange(event, 'amenidad')}
                />
              </label>
              <div>
                <label
                  htmlFor='descripcion amenidades'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  descripcion Amenidades
                </label>
                <textarea
                  type='text'
                  value={datadDescAmenidad}
                  onChange={(event) => {
                    setDataDescAmenidad(event.target.value);
                  }}
                  id='descripcion amenidades'
                  placeholder=''
                  className='w-full h-[100px] px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#263238] placeholder-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                />
              </div>

              <div>
                <label
                  htmlFor='horario amenidades'
                  className='block text-sm font-medium text-[#546E7A] mb-1'
                >
                  Horario
                </label>
                <div className='flex items-center space-x-2'>
                  <input
                    type='time'
                    value={dataHoraInicioAmen}
                    onChange={(event) => {
                      setDataHoraInicioAmen(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                  <span className='text-[#546E7A]'>a</span>
                  <input
                    type='time'
                    value={dataHoraFinAmen}
                    onChange={(event) => {
                      setDataHoraFinAmen(event.target.value);
                    }}
                    className='flex-1 px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50'
                  />
                </div>
              </div>
              <div className='mt-10 flex justify-center'>
                <button
                  className='px-12 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
                  onClick={() => {
                    const formData = {
                      eventName: dataNombreEvento,
                      eventDescription: datadDescEvento,
                      dateEvent: dataFechaEvento,
                      hourStartEvent: dataHoraInicioEvento,
                      hourEndEvent: dataHoraFinEvento,
                      images: selectedImageAmenidad
                    };
                    sendData(formData, 'amenidad');
                  }}
                >
                  Listo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-20 flex justify-center  space-x-4'>
          <button
            type='submit'
            onClick={handleSubmit}
            className=' px-6 py-2 border border-transparent rounded-md shadow-sm
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

export default View18;