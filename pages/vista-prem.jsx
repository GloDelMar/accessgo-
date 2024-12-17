import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getCompanyById } from './api/api_company';
import { getBusinessAverageRanking } from './api/api_ranking';
import CommentSection from '../components/Molecules/CommentsCard';
import AccessVisibility from '@/components/Molecules/muestraAccess';
import { contarVisita } from './api/api_visits';
import { getPromoByCompanyId } from './api/api_promos';
import DOMPurify from 'dompurify';
import ImageCarouselACC from '@/components/Molecules/ImageCarouselACC';

const defaultProfilePic = 'public/6073873.png';

export default function CardFree() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promociones, setPromociones] = useState(null);

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      contarVisita(id, `vista-prem/${id}`);
    }
  }, [id]); // El hook se ejecutará solo cuando 'id' cambie

  const fetchAverageRating = useCallback(async () => {
    if (!id) return;
    try {
      const avgData = await getBusinessAverageRanking(id);
      setAverageRating(avgData.data.averageRating || 0);
    } catch (error) {
      console.error('Error al obtener el promedio:', error);
    }
  }, [id]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!id) return;

      try {
        const data = await getCompanyById(id);
        setCompanyData(data);

        await fetchAverageRating();
        const promocionesData = await getPromoByCompanyId(id);
        setPromociones(promocionesData.data || []);
      } catch (error) {
        console.error(error);
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyData();
    }
  }, [id, fetchAverageRating]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex flex-col justify-center max-w-screen-sm  h-full md:p-4 lg:p-8'>
      <div className='w-full mt-4 flex flex-col justify-center items-center'>
        <p className='text-[#2F4F4F] text-[20px] md:text-[40px] lg:text-[56px] text-center font-semibold'>
          ¡AccessGo!
        </p>
        <img
          className='w-[472px] h-[300px] md:w-[1264px] md:h-[500px] lg:w-[1304px] lg:h-[500px] mt-8 object-contain'
          src={companyData?.data?.company?.profilePicture || '/img-card.png'}
          alt='Foto principal de empresa'
          width={1300}
          height={500}
          layout='responsive'
        />
        <div className=' flex flex-row gap-5 mt-2 justify-between '>
          <img className='w-[50px]' src='./facebook_logo.svg' alt='' />
          <img className='w-[50px]' src='./instagram-logo.svg' alt='' />
          <img className='w-[50px]' src='./tiktok-icon.svg' alt='' />
          <img className='w-[75px]' src='./x-logo.svg' alt='' />
        </div>
      </div>

      <section className='flex flex-col justify-between p-2 md:flex-row lg:flex-row w-full mt-4'>
        <div className='flex flex-col'>
          <div className='flex items-center mb-2'>
            <img
              src={
                companyData?.data?.company?.profilePicture || defaultProfilePic
              }
              alt='Foto de perfil'
              className='w-10 h-10 rounded-full p-2'
            />
            <p className='w-full h-[40px] text-[#7E952A] text-[20px] md:text-2xl font-semibold'>
              {companyData?.data?.company?.companyName ||
                'Información no disponible.'}
            </p>
          </div>
          {/* Contenedor de estrellas debajo del nombre */}
          <div className='flex flex-row mt-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                className={`w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px] ${
                  star <= Math.round(averageRating)
                    ? 'opacity-100'
                    : 'opacity-30'
                }`}
                src='/estrellita.svg'
                alt='Estrella'
                width={20}
                height={20}
              />
            ))}
          </div>
          {/* Textos adicionales */}
          <p className='w-full md:w-3/4 text-xs text-[#455A64] lg:text-md mt-2'>
            {companyData?.data?.company?.giro || 'Información no disponible.'}
          </p>
          <p className='w-full md:w-3/4 text-sm text-[#455A64] lg:text-lg mt-2'>
            {companyData?.data?.company?.description ||
              'Información no disponible.'}
          </p>
        </div>

        {/* Contenedor de horarios y detalles adicionales */}
        <div>
          <p className='text-[10.5px] md:text-[12px] lg:text-sm text-[#607D8B] mt-2'>
            Horarios
          </p>
          {/* Días de servicio */}
          <div className='flex items-start items-center gap-2 mt-2'>
            <Image
              src='/calendarVector.png'
              alt='ícono de calendario'
              width={14}
              height={16}
              className='flex-shrink-0'
            />
            <div className='text-[12px] md:text-sm lg:text-base text-[#546E7A]'>
              {(companyData?.data?.company?.diasDeServicio || []).join(', ') ||
                'Información no disponible.'}
            </div>
          </div>
          {/* Hora de apertura */}
          <div className='flex items-start items-center gap-2 mt-2'>
            <Image
              src='/clockOpeningVector.png'
              alt='ícono de reloj para hora de iniciar'
              width={14}
              height={16}
              className='flex-shrink-0'
            />
            <p className='text-[12.6px] md:text-sm lg:text-base text-[#546E7A]'>
              {companyData?.data?.company?.horario?.abre ||
                'Información no disponible.'}
            </p>
          </div>
          {/* Hora de cierre */}
          <div className='flex items-start items-center gap-2 mt-2'>
            <Image
              src='/clockClosingVector.png'
              alt='ícono de reloj para hora de salida'
              width={14}
              height={16}
              className='flex-shrink-0'
            />
            <p className='text-[12.6px] text-[#546E7A] md:text-sm lg:text-base'>
              {companyData?.data?.company?.horario?.cierra ||
                'Información no disponible.'}
            </p>
          </div>
        </div>
      </section>
      <div className='w-full flex flex-col justify-center items-center mt-8'>
        <div className='border p-3 rounded mt-4 bg-[#ECEFF1] w-[290px]  md:w-full  justify-center flex flex-col items-center text-[#455A64]'>
          <h4 value='Place' className='text-[#546E7A] font-semibold'>
            Dirección:
          </h4>
          <p className='text-center'>
            {' '}
            {companyData?.data?.company?.address ||
              'Información no disponible.'}
          </p>
          <h4 value='Place' className='text-[#546E7A] font-semibold mt-3'>
            Teléfono:
          </h4>
          <p className='text-center'>
            {' '}
            {companyData?.data?.company?.phone || 'Información no disponible.'}
          </p>
        </div>
        <div className='flex flex-col justify-center gap-5'>
          <h1 className='text-center text-[#2F4F4F] mt-8'>
            Imagenes de accesibilidad proporcionadas por la empresa:
          </h1>
          <ImageCarouselACC userId={id} />
        </div>
        <div>
          <AccessVisibility companyId={id} />
        </div>
      </div>

      <div className='w-full flex flex-col mt-6'>
        <div className='max-w-xxl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-4'>
          <div className='bg-[#2F4F4F] text-white p-4'>
            <h2 className='text-2xl lg:text-3xl text-center'>
              ¡Checa estas promociones!
            </h2>
          </div>
          <div className='p-4'>
            {loading && (
              <div className='text-center'>Cargando promociones...</div>
            )}

            {error && <div className='text-red-500'>{error}</div>}

            {!loading && promociones && promociones.length === 0 && (
              <div className='text-gray-500'>
                No hay promociones disponibles.
              </div>
            )}

            {!loading && promociones && promociones.length > 0 && (
              <ul className='space-y-4 md:space-y-6'>
                {promociones
                  .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
                  .map((promocion) => (
                    <li
                      key={promocion._id}
                      className='p-4 md:p-6 border rounded-lg shadow-sm bg-[#F5F0E5] relative flex flex-col sm:flex-row sm:justify-between sm:items-start'
                    >
                      <div className='mt-6 sm:mt-0 sm:ml-6'>
                        <h4 className='text-base md:text-lg font-bold mb-2'>
                          {promocion.name || 'Sin título'}
                        </h4>
                        {promocion.image && (
                          <div className='mb-4'>
                            <img
                              src={promocion.image}
                              alt={`Imagen de la promoción: ${promocion.name}`}
                              className='w-full h-auto object-cover rounded-md'
                            />
                          </div>
                        )}
                        <div
                          className='mb-2 text-sm md:text-base text-gray-700'
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              promocion.description || 'Sin descripción'
                            )
                          }}
                        />
                        <span className='text-xs md:text-sm text-gray-500'>
                          Fecha de vencimiento:{' '}
                          {promocion.endDate
                            ? new Date(promocion.endDate).toLocaleDateString()
                            : 'Sin fecha'}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <section className='w-full h-full mt-6 flex flex-col items-center '>
        <CommentSection onNewRating={fetchAverageRating} />
      </section>
    </div>
  );
}
