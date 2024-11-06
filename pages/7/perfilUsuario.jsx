import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { getUserById } from "../api/api_getById";

const defaultProfilePic = '/6073873.png';

const View7 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID not found."); 
        setLoading(false);
        return;
      }

      try {
        const data = await getUserById(userId);
        setUserData(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user data."); 
      } finally {
        setLoading(false); 
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>; 
  }

  return (
    <>
      <h1 className="text-center text-[#2F4F4F] text-2xl p-10 font-bold">¡Bienvenid@ a AccessGo!</h1>
      <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:items-start lg:space-x-8 px-4">
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="bg-gradient-to-b from-[#ECEFF1] to-white w-full max-w-[231px] h-auto rounded-[25px] shadow-md p-6 text-center">
            <Image
                src={userData.data.user?.profilePicture || defaultProfilePic}
                alt="Foto de perfil"
                width={50} 
                height={50} 
                className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{userData.data.user?.firstName} {userData.data.user?.lastName}</h2>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 py-4 lg:items-start lg:space-y-6">
          <button className="w-40 bg-[#F5F0E5] py-2 px-4 mx-auto rounded-md text-center">Lugares que visitaste</button>
          <button className="w-40 bg-[#F5F0E5] py-2 px-4 rounded-md text-center">Tus comentarios</button>
        </div>
        <div className="flex flex-col items-center lg:w-1/3 mt-8 lg:mt-0">
          <h3 className="text-2xl text-[#2F4F4F] mb-4">Sobre mí</h3>
          <div className="bg-white p-6 rounded-md mb-4 text-[#2F4F4F] shadow-lg w-full max-w-lg">
            <p className="text-gray-600">{userData.data.user?.biography || 'Información no disponible.'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default View7;
