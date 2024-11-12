import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { getUserById } from "../api/api_getById";
import { getCommentByUserId } from "../api/api_comment";

const defaultProfilePic = '/6073873.png';

const View7 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComents, setShowComents] = useState(false);

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
        setShowComents(false);
        const commentsData = await getCommentByUserId(userId);
        setComments(commentsData.data || []);
      } catch (error) {
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
      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start lg:space-x-8 px-4">
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="flex md:gap-4 bg-[#F5F0E5] md:h-[250px] p-4 rounded-[25px] flex-col md:justify-center items-center">
            <Image
              src={userData.data.user?.profilePicture || defaultProfilePic}
              alt="Foto de perfil"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{userData.data.user?.firstName} {userData.data.user?.lastName}</h2>
          </div>
        </div>
        <div className="flex flex-col space-y-4 py-4 lg:items-center lg:space-y-6">
          <h3 className="text-2xl text-[#2F4F4F] mb-4 lg:text-center">Acerca de mi</h3>
          <textarea
            value={userData.data.user?.biography || 'Información no disponible.'}
            className="bg-[#F6F9FF] p-6 rounded-md mb-4 text-[#2F4F4F] shadow-lg w-full resize-none"/>
          <button
            onClick={() => setShowComents(!showComents)}
            className="w-[300px] bg-[#F5F0E5] py-2 px-4 rounded-md text-center">
            {showComents ? "Ocultar comentarios" : "Ver tus comentarios"}
          </button>

          {showComents && (
            <ul className="mt-4 space-y-2">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <li key={comment._id} className="w-[300px] bg-[#F6F9FF] p-4 rounded-md shadow-md relative">
                    <div className="flex items-start justify-end">
                      <p className="text-gray-600 text-sm font-semibold">
                        Comentario para: {comment.businessId?.companyName || "Sin nombre"}
                      </p>
                    </div>
                    <p className="mt-2">{comment.content}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No tienes comentarios.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default View7;
