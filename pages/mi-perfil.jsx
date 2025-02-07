import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getUserById } from './api/api_getById';
import { getCommentByUserId } from './api/api_comment';
import { getCompanyById } from './api/api_company';

const defaultProfilePic = '/6073873.png';

const View7 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComents, setShowComents] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const userId = localStorage.getItem('userId');

        if (!userId) {
          setError('Usuario no encontrado.');
          setLoading(false);
          return;
        }
        const data = await getUserById(userId);

        setUserData(data);

        const commentsData = await getCommentByUserId(userId);
        setComments(commentsData || []);
      } catch (err) {
        setError('Error al cargar los datos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleCompanyClick = async (companyId) => {
    if (!companyId) {
      console.error('ID de la compañía no encontrado.');
      return;
    }

    try {
      const companyData = await getCompanyById(companyId);
      const companyType = companyData?.data?.company?.cuenta;

      if (!companyType) {
        console.error('Tipo de compañía no encontrado.');
        return;
      }

      router.push(
        companyType === 'free'
          ? `/vista-base?id=${companyId}`
          : `/vista-prem?id=${companyId}`
      );
    } catch (error) {
      console.error('Error al manejar el clic de la compañía:', error.message);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return <p className='text-red-500 text-center'>{error}</p>;
  }

  return (
    <>
      <h1 className='text-center text-[#2F4F4F] text-2xl p-10 font-bold'>
        ¡Bienvenid@ a AccessGo!
      </h1>
      <p className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-2 mb-12'>
        {userData?.data?.user?.firstName || 'Información no disponible.'}
      </p>

      <div className='flex flex-col items-center lg:flex-row lg:justify-center lg:items-start lg:space-x-4 px-2'>
        <div className='max-w-40 max-h-40 p-4 rounded-md bg-[#F5F0E5] lg:w-1/3 flex flex-col items-center'>
          <div className='w-32 h-32 rounded-full overflow-hidden'>
            <Image
              src={userData?.data?.user?.profilePicture || defaultProfilePic}
              alt='Foto de perfil'
              width={150}
              height={150}
              className='w-full h-full object-cover'
            />
          </div>
          <h2 className='text-xl font-semibold mt-2'>
            {userData?.data?.user?.firstName} {userData?.data?.user?.lastName}
          </h2>
        </div>

        <div className='flex flex-col space-y-4 py-4 items-center lg:space-y-6'>
          <h3 className='text-2xl text-[#2F4F4F] mb-4 lg:text-center'>
            Acerca de mí
          </h3>
          <textarea
            value={
              userData?.data?.user?.biography || 'Información no disponible.'
            }
            readOnly
            className='bg-[#F6F9FF] p-6 rounded-md mb-4 text-[#2F4F4F] shadow-lg w-full resize-none'
          />
          <button
            onClick={() => setShowComents(!showComents)}
            className='w-[300px] bg-[#F5F0E5] py-2 px-4 rounded-md text-center'
          >
            {showComents ? 'Ocultar comentarios' : 'Ver tus comentarios'}
          </button>

          {showComents && (
            <ul className='mt-4 space-y-2'>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <li
                    key={comment._id}
                    className='w-[300px] bg-[#F6F9FF] p-4 rounded-md shadow-md relative'
                  >
                    <div className='flex items-start justify-end'>
                      <button
                        onClick={() =>
                          handleCompanyClick(comment.businessId?._id)
                        }
                        className='text-gray-600 text-sm font-semibold hover:underline'
                      >
                        Comentario para:{' '}
                        {comment.businessId?.companyName || 'Sin nombre'}
                      </button>
                    </div>
                    <p className='mt-2'>{comment.content}</p>
                    <p className='text-gray-500 text-sm'>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))
              ) : (
                <p className='text-center text-gray-500'>
                  No tienes comentarios.
                </p>
              )}
            </ul>
          )}

          {comments.length === 0 && !loading && !error && showComents && (
            <p className='text-center text-gray-500 mt-4'>
              No se han encontrado comentarios para este usuario.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default View7;
