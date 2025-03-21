import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getBusinessAverageRanking } from './api/api_ranking';
import { getCompanyById } from './api/api_company';
import CommentSection from '../components/Molecules/CommentsCard';
import AccessVisibility from '@/components/Molecules/muestraAccess';
import ImageCarouselACC from '@/components/Molecules/ImageCarouselACC';
import ShowNearPlaces from '@/components/Molecules/ShowNearPlaces';

const defaultProfilePic = '/6073873.png';

const getValueOrDefault = (
  value,
  defaultText = 'Información no disponible.'
) => {
  return value || defaultText;
};

export default function CardFree() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = router.query;

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex flex-col justify-center items-center max-w-screen-sm w-full h-full md:p-4 lg:p-8'>
      <div className='w-full mt-4 flex flex-col justify-center items-center'>
        <p className='text-[#2F4F4F] text-[20px] md:text-[40px] lg:text-[56px] text-center font-semibold'>
          ¡AccessGo!
        </p>
        <p className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-2 mb-12'>
          {companyData?.data?.company?.companyName || 'Información no disponible.'}
        </p>
        <div className="relative w-[250px] h-[170px] sm:w-[350px] sm:h-[220px] md:w-[600px] md:h-[350px] lg:w-[900px] lg:h-[450px]">
          <Image
            src={companyData?.data?.company?.profilePicture || "/img-card.png"}
            alt="Foto principal de empresa"
            fill
            className="object-contain"
            quality={75}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
            {companyData?.data?.company?.redesSociales?.facebook && (
              <a
                href={`https://${companyData.data.company.redesSociales.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/pngwing.com (3).png" alt="Facebook" width={40} height={40} className='rounded-lg' />
              </a>
            )}
            {companyData?.data?.company?.redesSociales?.instagram && (
              <a
                href={`https://${companyData.data.company.redesSociales.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/instagram-logo.svg" alt="Instagram" width={40} height={40} />
              </a>
            )}
            {companyData?.data?.company?.redesSociales?.twitter && (
              <a
                href={`https://${companyData.data.company.redesSociales.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/sl_z_072523_61700_01.jpg" alt="Twitter" width={40} height={40} className="rounded-lg" />
              </a>
            )}
          </div>
        </div>
      </div>

      <section className="flex flex-col md:flex-row lg:flex-row justify-between p-2 mt-4 w-full">
        <div className="flex flex-col max-w-full">

          <div className="mt-2">
            <div className="flex flex-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src="/estrellita.svg"
                  alt="Estrella"
                  className={
                    star <= Math.round(averageRating)
                      ? 'opacity-100'
                      : 'opacity-30'
                  }
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-[#455A64] lg:text-md mt-2">
            {getValueOrDefault(companyData?.data?.company?.giro)}
          </p>
          <p className="text-sm text-[#455A64] lg:text-lg mt-2">
            {getValueOrDefault(companyData?.data?.company?.description)}
          </p>
        </div>

        <div className="flex flex-col justify-center items-start md:items-end  w-full mt-4 md:mt-0">
          <br />
          <p className="text-sm text-[#607D8B] mt-2 flex ">Dias de servicio</p>
          <Image
            src="/calendarVector.png"
            alt="Calendario"
            width={16}
            height={14}
          />
          <div className="flex flex-row mt-2   gap-2">
            <div className="text-[12px] md:text-sm lg:text-base text-[#546E7A] ">
              {(companyData?.data?.company?.diasDeServicio || ['Información no disponible']).map(
                (dia, index) => (
                  <div key={index}>{dia}</div>
                )
              )}
            </div>
          </div>


          <div>
            <p className="text-sm ml-6 text-[#607D8B] mt-2 flex">Horario</p>

            {companyData?.data?.company?.horario?.abre ? (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src="/clockOpeningVector.png"
                    alt="ícono de reloj para hora de iniciar"
                    width={14}
                    height={16}
                    className="flex-shrink-0"
                  />
                  <p className="text-[12.6px] md:text-sm lg:text-base text-[#546E7A]">
                    {companyData.data.company.horario.abre}
                  </p>
                </div>
                {companyData?.data?.company?.horario?.cierra && (
                  <div className="flex items-center gap-2 mt-2">
                    <Image
                      src="/clockClosingVector.png"
                      alt="ícono de reloj para hora de salida"
                      width={14}
                      height={16}
                      className="flex-shrink-0"
                    />
                    <p className="text-[12.6px] text-[#546E7A] md:text-sm lg:text-base">
                      {companyData?.data?.company?.horario?.cierra}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src="/clockOpeningVector.png"
                  alt="ícono de reloj para hora de iniciar"
                  width={14}
                  height={16}
                  className="flex-shrink-0"
                />
                <p className="text-[12.6px] md:text-sm lg:text-base text-[#546E7A]">
                  Abierto las 24 horas
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      <div className="w-full flex flex-col justify-center items-center mt-8">
        <div className="border p-3 rounded mt-4 bg-[#ECEFF1] w-full justify-center flex flex-col items-center text-[#455A64]">
          <h4 className="text-[#546E7A] font-semibold">Dirección:</h4>
          <p className="text-center">
            {companyData?.data?.company?.address || 'Información no disponible.'}
          </p>
          <h4 className="text-[#546E7A] font-semibold mt-3">Teléfono:</h4>
          <p className="text-center">
            {companyData?.data?.company?.phone || 'Información no disponible.'}
          </p>
        </div>

        <div className="flex flex-col w-full justify-item-center gap-5">
          
          <div className='flex justify-center w-full h-full'>
            <ImageCarouselACC userId={id} className='sm:max-w-[300px]' />
          </div>
        </div>

        <div className='w-full'>
          <AccessVisibility companyId={id} />
        </div>
      </div>
      <div>
        <ShowNearPlaces />
      </div>

      <div className="w-full h-full mt-6 flex flex-col items-center">
        <CommentSection onNewRating={fetchAverageRating} />
      </div>
    </div>
  );
}
