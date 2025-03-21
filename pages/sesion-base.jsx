import ImagenSubiryBorrarBase from '@/components/Molecules/ImagenSubiryBorrarBase';
import { getCompanyById } from '@/pages/api/api_company';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { getCommentsByCompanyId } from './api/api_comment';
import { getBusinessAverageRanking } from './api/api_ranking';
import { useRouter } from 'next/router';
import CustomModal from '@/components/Molecules/CostumModal';

const View21 = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleClickListo = async () => {
    const userType = localStorage.getItem('tipoUsuario');

    if (userType === 'company') {
      const userId = localStorage.getItem('userId');

      try {
        const Data = await getCompanyById(userId);
       
        console.log('data', Data);
        const cuentaUsuario = Data.data.company.cuenta;
        console.log('cuenta de compañia', cuentaUsuario);

        if (cuentaUsuario === 'free') {
          router.push(`/vista-base?id=${userId}`);
        } else if (cuentaUsuario === 'premium') {
          router.push(`/vista-prem?id=${userId}`);
        } else {
          console.error('Tipo de cuenta no reconocido.');
        }
      } catch (error) {
        console.error('Error al obtener los datos de la compañía:', error);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setCompanyId(storedUserId);
      } else {
        setError('Company ID not found in localStorage');
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) return;
      try {
        const data = await getCompanyById(companyId);
        setCompanyData(data);
        
        const verified = data.data.company.verified;
        
        if (!verified) {
          setShowModal(true); // Activamos el modal
          return;
        }

        const avgData = await getBusinessAverageRanking(companyId);
        setAverageRating(avgData.averageRating || 0);

        const commentsData = await getCommentsByCompanyId(companyId);

        if (commentsData.data && commentsData.data.length > 0) {
          setComments(commentsData?.data);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  if (loading)
    return (
      <p className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-12'>
        Loading...
      </p>
    );
  if (error) return <p>{error}</p>;

  const handleModal2Close = () => {
    setShowModal(false);
    router.push("/autentificacion");
  };
  
  return (
    <>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
      {showModal && (
        <CustomModal 
          isOpen={showModal}
          onClose={handleModal2Close}
          title="Verificación requerida"
          message="Debes verificar tu cuenta para continuar."
          buttonText="Aceptar"
        />
      )}
        <h1 className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mb-12'>
          ¡Bienvenido!
          <p className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-2 mb-12'>
            {companyData?.data?.company?.companyName ||
              'Información no disponible.'}
          </p>
        </h1>

        <div className='flex flex-col lg:flex-row gap-6 p-6 max-w-4xl mx-auto'>
          {/* Contenedor de perfil */}
          <div className='w-full lg:w-1/3 flex justify-center'>
            <div className='bg-[#F5F0E5] max-w-[231px] w-full max-h-[231px] rounded-[25px] shadow-md p-4 flex justify-center items-center'>
              <Image
                src={
                  companyData?.data?.company?.profilePicture || '/perfil1.png'
                }
                alt='Foto de perfil'
                width={300}
                height={150}
                className='rounded-full object-cover justify-self-center w-full h-full'
                quality={10}
              />
            </div>
          </div>
          {/* Contenedor de calificaciones y comentarios */}
          <div className='w-full lg:w-2/3 flex flex-col justify-center'>
            <div className='bg-white rounded-[30px] shadow-md p-6 w-full'>
              <div className='flex flex-col md:flex-row md:justify-start gap-4 md:items-center mb-4'>
                <h3 className='text-lg font-semibold text-[#2F4F4F] mb-2 md:mb-0'>
                  Tu calificación es de:
                </h3>
                <div className='flex justify-center'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } fill-current`}
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
                    </svg>
                  ))}
                </div>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>
                  Últimos comentarios:
                </h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4'>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <p
                      key={comment?._id}
                      className='bg-[#F5F0E5] p-2 rounded text-center text-sm'
                    >
                      {comment.content}
                    </p>
                  ))
                ) : (
                  <p className='text-center text-sm'>
                    No hay comentarios disponibles.
                  </p>
                )}
              </div>
              <button
                className='px-2.5 py-0.5 mt-11 text-base bg-[#F5F0E5] rounded-[30px] md:mt-10'
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? 'Mostrar menos' : 'Todos los comentarios'}
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center h[200px] w[200px]'>
          <h3 className='text-xl text-center font-semibold mb-10 text-[#2F4F4F]'>
            Cambia tus imágenes
          </h3>
          <ImagenSubiryBorrarBase userId={companyId} />
        </div>

        <div className='flex justify-self-center items-center py-2'>
          <Link
            
            href='#'
            className='block px-4 py-2 hover:bg-gray-100'
            onClick={handleClickListo}
          >
            <button
              className=' px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
            >
              Listo
            </button>
          </Link>
        </div>

        <div className='flex justify-self-center items-center py-5'>
          <Link legacyBehavior href='/cobro'>
            <button
              className=' mt-20 px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
            >
              Unete a Premium
            </button>
          </Link>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default View21;
