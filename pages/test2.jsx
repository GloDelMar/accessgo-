import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const View6 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataNombre, setDataNombre] = useState('');
  const [dataApellido, setDataApellido] = useState('');
  const [dataFecha, setDataFecha] = useState('');
  const [dataBio, setDataBio] = useState('');
  const router = useRouter(); // Agregar el hook de enrutamiento

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos
    console.log(dataNombre, dataApellido, dataFecha, dataBio);

    // Navegar a la siguiente página
    router.push('/mi-perfil');
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


  return (
    <>
      <h1 className='text-center text-2xl p-4 font-bold text-[#2F4F4F]'>
        ¡Cuéntanos un poco de ti!
      </h1>
      <h3 className='text-center text-[#2F4F4F] px-4 pb-10'>
        Para personalizar tu perfil te pedimos que llenes los siguientes campos
      </h3>

      <div className='flex flex-col md:flex-row md:justify-between md:items-start md:space-x-8 lg:flex-row lg:justify-between lg:items-start lg:space-x-8 px-4'>
        <div className='lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0'>
          <h3 className='text-xl text-center text-[#2F4F4F] mb-4'>
            Datos personales
          </h3>
          <div className='flex justify-center lg:justify-start'>
            <label htmlFor='imgUsuario' className='cursor-pointer'>
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt='Foto de perfil'
                  width={200}
                  height={200}
                  className='rounded-full'
                />
              ) : (
                <Image
                  src='/iconoframe.png'
                  alt='Foto de perfil'
                  width={200}
                  height={200}
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
        </div>

        <div className='lg:w-2/3 flex flex-col items-center lg:items-start'>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input
                type='text'
                value={dataNombre}
                onChange={(event) => setDataNombre(event.target.value)}
                name='Nombre'
                placeholder='Nombre'
                className='w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]'
              />
            </div>

            <div className='mb-4'>
              <input
                type='text'
                value={dataApellido}
                onChange={(event) => setDataApellido(event.target.value)}
                name='apellido'
                placeholder='Apellido'
                className='w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]'
              />
            </div>

            <div className='mb-4'>
              <div>
                <label>Fecha de Nacimiento</label>
                <input
                  type='date'
                  value={dataFecha}
                  onChange={(event) => setDataFecha(event.target.value)}
                  name='fechanacimiento'
                  className='w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]'
                />
              </div>
            </div>

            <div className='mb-4'>
              <textarea
                name='descripcion'
                value={dataBio}
                onChange={(event) => setDataBio(event.target.value)}
                placeholder='¿Te gustaría describir un poco de ti?'
                className='w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] h-32'
              />
            </div>

            <div className='flex justify-center items-center py-5'>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default View6;
