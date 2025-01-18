import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getUserById } from './api/api_getById';

const defaultProfilePic = "/6073873.png";

const View8 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Obtiene el userId de la query string
console.log("el id", id)
  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const data = await getUserById(id);
          console.log(data);
          setUserData(data);
        } catch (error) {
          console.error(error);
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div  className='my-4'>
         <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start lg:space-x-8 px-4">
   
    <div className="w-full lg:w-1/3 flex flex-col items-center">
      <div className="flex md:gap-4 bg-[#F5F0E5] md:h-[250px] p-4 rounded-[25px] flex-col md:justify-center items-center">
        <Image
          src={userData?.data?.user?.profilePicture || defaultProfilePic}
          alt="Foto de perfil"
          width={150}
          height={150}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">
          {userData?.data?.user?.firstName} {userData?.data?.user?.lastName}
        </h2>
      </div>
    </div>
    <div className="flex flex-col space-y-4 py-4 items-center lg:space-y-6">
      <h3 className="text-2xl text-[#2F4F4F] mb-4 lg:text-center">
        Acerca de mí
      </h3>
      <textarea
        value={userData?.data?.user?.biography || "Información no disponible."}
        readOnly
        className="bg-[#F6F9FF] p-6 rounded-md mb-4 text-[#2F4F4F] shadow-lg w-full resize-none"
      />
     
    </div>
  </div></div>
  );
};

export default View8;
