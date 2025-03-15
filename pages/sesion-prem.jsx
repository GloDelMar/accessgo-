import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getCompanyById } from '@/pages/api/api_company';
import router from 'next/router';
import { getBusinessAverageRanking } from './api/api_ranking';
import { getCommentsByCompanyId } from './api/api_comment';
import EstadisticasVisitas from '../components/Molecules/Estadisticas';
import { getPromoByCompanyId, deletePromo } from './api/api_promos';
import DOMPurify from 'dompurify';
import ImagenSubiryBorrarPrem from '@/components/Molecules/ImagenSubiryBorrarPrem';
import { Toaster } from 'sonner';
import CustomModal from '@/components/Molecules/CostumModal';

const imageDefault = '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SesionPremium = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null
  ]);
  const [rango, setRango] = useState('semana');
  const [promociones, setPromociones] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleRangoChange = (event) => {
    setRango(event.target.value);
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
    if (!companyId) return;

    const fetchCompanyData = async () => {
      try {
        setLoading(true);

        const data = await getCompanyById(companyId);
        setCompanyData(data);
        const verified = data.data.company.verified;

        if (!verified) {
          setShowModal(true); // Activamos el modal
          return;
        }
        const avgData = await getBusinessAverageRanking(companyId);
        setAverageRating(avgData.data.averageRating || 0);

        const commentsData = await getCommentsByCompanyId(companyId);
        setComments(commentsData.data || []);

        const promocionesData = await getPromoByCompanyId(companyId);
        setPromociones(promocionesData.data || []);
        console.log("promociones", promociones)
      } catch (error) {
        console.error(error);
        setError('Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCreatePromotion = () => {
    router.push(`/promociones`);
  };

  const handleRemovePromotion = async (promoId) => {
    try {
      // Llama a la API para eliminar la promoción
      await deletePromo(promoId);

      // Actualiza el estado local eliminando la promoción eliminada
      setPromociones((prevPromociones) =>
        prevPromociones.filter((promo) => promo._id !== promoId)
      );

      alert('Promoción eliminada con éxito.');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al eliminar la promoción.');
    }
  };

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

  const handleModal2Close = () => {
    setShowModal(false);
    router.push("/autentificacion");
  };

  return (
    <main className='w-full flex overflow-hidden flex-col items-center px-4 sm:px-10 md:px-20 pt-28 bg-white pb-[1572px] max-sm:px-5 max-sm:py-24'>
      {showModal && (
        <CustomModal
          isOpen={showModal}
          onClose={handleModal2Close}
          title="Verificación requerida"
          message="Debes verificar tu cuenta para continuar."
          buttonText="Aceptar"
        />
      )}
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        <h1 className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mb-12'>
          ¡Bienvenido!
          <p className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-2 mb-12'>
            {companyData?.data?.company?.companyName ||
              'Información no disponible.'}
          </p>
        </h1>

        <div className='flex flex-col lg:flex-row gap-6 p-6 max-w-4xl mx-auto'>
          <div className='w-full lg:w-1/3 flex justify-center'>
            <div className='bg-[#F5F0E5] max-w-[231px] w-full max-h-[231px] rounded-[25px] shadow-md p-4 flex justify-center items-center'>
              <Image
                src={
                  companyData?.data?.company?.profilePicture || '/perfil1.png'
                }
                alt='Foto de perfil'
                width={200}
                height={200}
                className='rounded-full object-cover justify-self-center w-full h-full'
              />
            </div>
          </div>

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
                      className={`w-5 h-5 ${star <= Math.round(averageRating)
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
                      key={comment._id}
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

        <div className='mt-12 w-full'>
          <h3 className='text-xl text-center font-semibold mb-10 text-[#2F4F4F]'>
            Cambia tus imágenes
          </h3>
          <div className='w-full flex flex-col justify-center gap-5'>
            <ImagenSubiryBorrarPrem userId={companyId} />
          </div>
        </div>

        <div className='flex justify-self-center items-center py-'>
          <Link
            href='#'
            className='block px-4 py-2 hover:bg-gray-100'
            onClick={handleClickListo}
          >
            <button
              className='px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
            >
              Listo
            </button>
          </Link>
        </div>

        <div className="w-full sm:w-[300px] sm:h-full lg:w-[600px] flex flex-col justify-self-center mt-6">
          <div className="w-full max-w-xxl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-4">
            <div className="bg-[#2F4F4F] text-white p-4">
              <h2 className="text-2xl lg:text-3xl text-center">Tus promociones este mes:</h2>
            </div>
            <div className="p-4">
              {loading && <div className="text-center text-sm md:text-base">Cargando promociones...</div>}
              {error && <div className="text-red-500 text-sm md:text-base">{error}</div>}
              {!loading && promociones && promociones.length === 0 && (
                <div className="text-gray-500 text-center text-sm md:text-base">No hay promociones disponibles.</div>
              )}

              {!loading && promociones && promociones.length > 0 && (
                <ul className="space-y-4 md:space-y-6">
                  {promociones
                    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
                    .map((promocion) => (
                      <li
                        key={promocion._id}
                        className="p-4 md:p-6 border justify-center items-center rounded-lg shadow-sm bg-[#F5F0E5] relative flex flex-col sm:flex-row sm:justify-between"
                      >
                        <button
                          className="absolute top-2 right-2 px-2 py-1 md:px-3 md:py-1.5 border border-transparent rounded-md shadow-sm text-xs md:text-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
                          onClick={() => handleRemovePromotion(promocion._id)}
                        >
                          X
                        </button>
                        <div className="mt-6 sm:mt-0 sm:ml-6">
                          <h4 className="text-base md:text-2xl text-center font-bold mb-2">
                            {promocion.name || "Sin título"}
                          </h4>
                          {promocion.images && promocion.images.length > 0 ? (
                            <div className={"mb-4 w-full h-auto flex flex-col lg:flex-row lg:justify-center items-center flex-row gap-4"}>
                              {promocion.images.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image}
                                  alt={`Promoción ${index + 1}`}
                                  width={promocion.images.length === 1 ? 320 : 160}
                                  height={promocion.images.length === 1 ? 320 : 160}
                                  className="rounded-lg object-cover cursor-pointer"
                                  onClick={() => setSelectedImage(image)} // 🔹 ACTUALIZA EL ESTADO
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="mb-4">
                              <Image
                                src={imageDefault} // Imagen predeterminada
                                alt="Imagen predeterminada de promoción"
                                width={500}
                                height={300}
                                className="w-full max-w-xl h-auto object-cover rounded-md"
                              />
                            </div>
                          )}
                          {selectedImage && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                              <div className="relative bg-white p-4 rounded-lg max-w-screen-md w-full max-h-[80vh] overflow-auto flex flex-col items-center">
                                <div className="relative w-auto max-h-[70vh] max-w-full flex justify-center">
                                  <Image
                                    src={selectedImage}
                                    alt="Selected Image"
                                    width={1000} 
                                    height={1000} 
                                    layout="intrinsic" 
                                    className="max-w-full max-h-[90vh] object-contain"
                                    quality={100}
                                  />
                                </div>
                                <button
                                  onClick={() => setSelectedImage(null)}
                                  className="absolute top-2 right-2 p-2 text-white bg-red-600 rounded-full"
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          )}
                          <div
                            className="mb-2 text-sm md:text-base text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(promocion.description || "Sin descripción"),
                            }}
                          />
                          <div className="grid grid-cols-2 space-x-4 md:text-base lg:text-2xl">
                            <span className="text-xs md:text-sm text-gray-500">
                              Fecha de inicio: {promocion.startDate ? new Date(promocion.startDate).toLocaleDateString() : "Sin fecha"}
                            </span>
                            <span className="text-xs md:text-sm text-gray-500">
                              Fecha de vencimiento: {promocion.endDate ? new Date(promocion.endDate).toLocaleDateString() : "Sin fecha"}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => handleCreatePromotion()}
              className="block mx-auto my-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
            >
              Publicar una Promoción
            </button>
          </div>
        </div>

        <div>
          <h3 className='text-2xl text-center font-semibold my-8 text-[#2F4F4F]'>
            Estas son las estadísticas de visitas a tu perfil de AccessGo
            Premium
          </h3>

          <EstadisticasVisitas rango={rango} />

          <select value={rango} onChange={handleRangoChange}>
            <option value='día'>Día</option>
            <option value='semana'>Semana</option>
            <option value='mes'>Mes</option>
            <option value='año'>Año</option>
          </select>
        </div>

        <div className='flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]'>
          <button className='w-[155px] h-[40px] bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C] text-white rounded-lg flex items-center justify-center'>
            <Link legacyBehavior href='/ticket'>
              <a>Levantar ticket</a>
            </Link>
          </button>
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default SesionPremium;