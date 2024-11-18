import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserById } from './api/api_getById';
import { useRouter } from 'next/router';

const defaultProfilePic = "/6073873.png";

const View8 = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return; 
      setLoading(true);
      try {
        const data = await getUserById(id);
        setUserData(data);
      } catch (error) {
        console.error(error);
        setError("No se pudo obtener la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]); 

  if (loading) {
    return <p className="text-blue-500 text-center">Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  const user = userData?.data?.user;

  return (
    <div className="max-w-md w-full mx-auto">
      <h1 className="text-center text-2xl text-[#2F4F4F] p-10 font-bold">
        ¡Bienvenid@ a AccessGo!
      </h1>

      <div className="flex flex-col gap-8 mt-1 mb-3 justify-center items-center md:grid md:grid-cols-2">
         <div className="flex justify-center">
          <div className="bg-[#F5F0E5] md:h-[250px] p-4 rounded-[25px] flex flex-col md:justify-center items-center">
            <Image
              src={user?.ProfilePic || defaultProfilePic}
              alt="Foto de perfil"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-center text-lg font-semibold">
              {user?.firstName || "Usuario"} {user?.lastName || "Anónimo"}
            </h3>
          </div>
        </div>
       <div className="flex flex-col items-center">
          <h3 className="text-[#2F4F4F] font-semibold text-2xl m-4">Sobre mí</h3>
          <p className="text-gray-600 shadow-lg text-center w-[250px] h-[185px] bg-[#F6F9FF] rounded-[25px] p-4 m-2 overflow-auto">
            {user?.biography || "El usuario no ha proporcionado información sobre sí mismo."}
          </p>
        </div>
      </div>
    </div>
  );
};
export default View8;
