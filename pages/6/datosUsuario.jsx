import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UploadImage from '@/components/Molecules/UploadImage';


const View6 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataNombre, setDataNombre] = useState('');
  const [dataApellido, setDataApellido] = useState('');
  const [dataFecha, setDataFecha] = useState('');
  const [dataBio, setDataBio] = useState('');
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');
      
      if (token && storedUserId) {
        setIsLoggedIn(true);
        setUserId(storedUserId);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const { data: { user: userData } } = await response.json();
        setDataNombre(userData.firstName || '');
        setDataApellido(userData.lastName || '');
        setDataFecha(userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : '');
        setDataBio(userData.biography || '');
      } else {
        console.error('Error al obtener datos del usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      firstName: dataNombre,
      lastName: dataApellido,
      birthDate: dataFecha,
      biography: dataBio,
    };
    
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Usuario actualizado:', jsonResponse);
        router.push('/7/perfilUsuario');
      } else {
        console.error('Error al actualizar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <h1 className="text-center text-2xl p-4 font-bold text-[#2F4F4F]">
        ¡Cuéntanos un poco de ti!
      </h1>
      <h3 className="text-center text-[#2F4F4F] px-4 pb-10">
        Para personalizar tu perfil te pedimos que llenes los siguientes campos
      </h3>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start md:space-x-8 lg:space-x-8 px-4">
        <div className="lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0">
          <h3 className="text-xl text-center text-[#2F4F4F] mb-4">
            Datos personales
          </h3>
          <div className="flex justify-center lg:justify-start">
            <label htmlFor="imgUsuario" className="cursor-pointer">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Foto de perfil"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src="/iconoframe.png"
                  alt="Foto de perfil"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              )}
              <input
                type="file"
                id="imgUsuario"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        
        <UploadImage />

        <div className="lg:w-2/3 flex flex-col items-center lg:items-start">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={dataNombre}
                onChange={(e) => setDataNombre(e.target.value)}
                name="Nombre"
                placeholder="Nombre"
                className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={dataApellido}
                onChange={(e) => setDataApellido(e.target.value)}
                name="apellido"
                placeholder="Apellido"
                className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]"
              />
            </div>

            <div className="mb-4">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                value={dataFecha}
                onChange={(e) => setDataFecha(e.target.value)}
                name="fechanacimiento"
                className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]"
              />
            </div>

            <div className="mb-4">
              <textarea
                name="descripcion"
                value={dataBio}
                onChange={(e) => setDataBio(e.target.value)}
                placeholder="¿Te gustaría describir un poco de ti?"
                className="w-full px-4 py-2 border bg-[#F9F9F9] rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] h-32"
              />
            </div>

            <div className="flex justify-center items-center py-5">
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
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
