import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserById } from '../api/api_getById';

const defaultProfilePic = "/6073873.png";

const View8 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Verificar que estamos en el entorno del navegador
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      // Solo intenta obtener los datos del usuario si userId tiene un valor
      if (userId) {
        try {
          const data = await getUserById(userId);
          console.log(data);
          setUserData(data);
        } catch (error) {
          console.error(error);
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("User ID not found.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p className="text-blue-500 text-center">Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className='max-w-md w-full mx-auto'>
      <h1 className='text-center text-2xl text-[#2F4F4F] p-10 font-bold'>
        ¡Bienvenid@ a AccessGo!
      </h1>

      <div className='flex flex-col gap-8 mt-1 mb-3 justify-center items-center md:grid md:grid-cols-2'>
        <div className='flex justify-center'>
          <div className='flex md:gap-4 bg-[#F5F0E5] md:h-[250px] p-4 rounded-[25px] flex-col md:justify-center items-center'>
            <Image
              src={userData?.data?.user?.ProfilePic || defaultProfilePic}
              alt='Foto de perfil'
              width={150}
              height={150}
              className='rounded-full mx-auto mb-4'
            />
            <div>
              <h3 className='justify-center'>
                {userData?.data?.user?.firstName || "Ella se llamaba"} {userData?.data?.user?.lastName || "Martha"}
              </h3>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <h3 className='text-[#2F4F4F] font-semibold text-2xl m-4'>Sobre mí</h3>
          <p className='text-gray-600 shadow-lg text-center w-[250px] h-[185px] bg-[#F6F9FF] rounded-[25px] p-4 m-2'>
            {userData?.data?.user?.biography || 'Información no disponible.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default View8;
