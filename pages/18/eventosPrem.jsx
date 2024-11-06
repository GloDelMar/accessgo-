import { InputWithLabel } from '@/components/atoms/Input';
import Image from 'next/image';
import { router } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const View18 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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
      images: selectedImage
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
    dataHoraFinAmen,
    selectedImage
  );
  return (
    <>
      <div>
        <h1 className='text-2xl font-bold text-center mb-6 text-[#263238]'>
          Este espacio es para dar a conocer tus proximos Eventos
        </h1>

        <div className=''>
          <div className=''>
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
                  placeholder=' '
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
            <div>
              <button
                className='px-6 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
              >
                listo
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
                htmlFor='imgUsuario'
                className='cursor-pointer mt-5 row-span-4'
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt='Foto de perfil'
                    width={300}
                    height={300}
                    className=''
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
              <div>
                <button
                  className='px-6 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
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
                htmlFor='imgUsuario'
                className='cursor-pointer mt-5 row-span-4'
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt='Foto de perfil'
                    width={300}
                    height={300}
                    className=''
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
              <div>
                <button
                  className='px-6 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
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
                htmlFor='imgUsuario'
                className='cursor-pointer mt-5 row-span-4'
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt='Foto de perfil'
                    width={300}
                    height={300}
                    className=''
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
              <div>
                <button
                  className='px-6 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
                >
                  Listo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 flex justify-center md:justify-end space-x-4'>
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
