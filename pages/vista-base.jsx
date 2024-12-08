import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getBusinessAverageRanking } from './api/api_ranking';
import { getCompanyById } from './api/api_company';
import CommentSection from '../components/Molecules/CommentsCard';
import AccessVisibility from '@/components/Molecules/muestraAccess';
import ImageCarouselACC from '@/components/Molecules/ImageCarouselACC';

const defaultProfilePic = '/6073873.png';


const getValueOrDefault = (
  value,
  defaultText = 'Información no disponible.'
) => {
  console.log('getValueOrDefault - value:', value, 'defaultText:', defaultText);
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
        console.log('aqui data', data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex flex-col justify-center md:p-4 lg:p-8'>
      <div className='w-full mt-4 flex flex-col justify-center items-center'>
        <p className='text-[#2F4F4F] text-[20px] md:text-[40px] lg:text-[56px] text-center font-semibold'>
          ¡AccessGo!
        </p>
        <img
          className='w-[236px] h-[300px] md:w-[632px] md:h-[250px] lg:w-[652px] lg:h-[250px] mt-8 object-cover'
          src={companyData?.data?.company?.profilePicture || '/img-card.png'}
          alt='Foto principal de empresa'
        />
      </div>
      <section className='flex flex-col md:flex-row lg:flex-row justify-between p-2 mt-4 w-full'>
        <div className='flex flex-col max-w-[500px]'>
          <div className='flex items-center'>
            <img
              src={
                companyData?.data?.company?.profilePicture || defaultProfilePic
              }
              alt='Foto de perfil'
              className='w-10 h-10 rounded-full p-2'
            />
            <p className='text-[#7E952A] text-[20px] md:text-2xl lg:text-3xl font-semibold ml-2'>
              {getValueOrDefault(companyData?.data?.company?.companyName)}
            </p>
          </div>
          <div className='mt-2'>
            <div className='flex flex-row'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src='/estrellita.svg'
                  alt='Estrella'
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
          <p className='text-xs text-[#455A64] lg:text-md mt-2'>
            {getValueOrDefault(companyData?.data?.company?.giro)}
          </p>
          <p className='text-sm text-[#455A64] lg:text-lg mt-2'>
            {getValueOrDefault(companyData?.data?.company?.description)}
          </p>
        </div>
        <div>
          <p className='text-sm text-[#607D8B] mt-2'>Horarios</p>
          <div className='flex flex-row mt-2'>
            <Image
              src='/calendarVector.png'
              alt='Calendario'
              width={16}
              height={14}
            />
            <p className='ml-2 text-sm text-[#546E7A]'>
              {(companyData?.data?.company?.diasDeServicio || []).join(', ') ||
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
      <div className='w-full h-full mt-6 flex flex-col items-center'>
        <CommentSection onNewRating={fetchAverageRating} />
      </div>
    </div>
  );
}

