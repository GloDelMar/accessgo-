import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router'
import { getCompanyById } from "./api/api_company";
import CommentSection from "../components/Molecules/CommentsCard";



export default function CardFree() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = router.query;
  


  useEffect(() => {
    if (id) {
      console.log("ID de la compañía desde la URL:", id); 
    }
  }, [id]);

  const companyId = id

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) return;

      try {
        const data = await getCompanyById(companyId);
        setCompanyData(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch company data.");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

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
          width={652}     
          height={250}    
          layout="responsive"  
        />
      </div>

      <section className='flex flex-col justify-between p-2 md:flex-row lg:flex-row w-full mt-4'>
        <div className='flex flex-col '>
          <p className='w-full h-[40px] text-[#7E952A] text-[20px] md:text-2xl lg:text-3xl font-semibold'>
            {companyData?.data?.company?.companyName || 'Información no disponible.'}
          </p>
          <div className='flex flex-rows ml-2 mb-2'>
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                src='/estrellita.svg'
                alt='Estrella'
                width={20}
                height={20}
              />
            ))}
          </div>
          <p className='w-full md:w-3/4 text-xs text-[#455A64] lg:text-md mt-2'>
            {companyData?.data?.company?.giro || 'Información no disponible.'}
          </p>
          <p className='w-full md:w-3/4 text-sm text-[#455A64] lg:text-lg mt-2'>
            {companyData?.data?.company?.description || 'Información no disponible.'}
          </p>
        </div>

        <div>
          <p className='text-[10.5px] md:text-[12px] lg:text-sm text-[#607D8B] mt-2'>
            Horarios
          </p>

          <div className='flex flex-row mt-2'>
            <Image src='/calendarVector.png' alt='ícono de calendario' width={16} height={14} />
            <div className='flex flex-row text-[12px] md:text-sm lg:text-base text-[#546E7A] ml-2'>
              {(companyData?.data?.company?.diasDeServicio || []).join(', ') || 'Información no disponible.'}
            </div>
          </div>

          <div className='flex flex-row mt-2'>
            <Image src='/clockOpeningVector.png' alt='ícono de reloj para hora de iniciar' width={16} height={14} />
            <p className='text-[12.6px] md:text-sm lg:text-base text-[#546E7A] ml-2'>
              {companyData?.data?.company?.horario?.abre || 'Información no disponible.'}
            </p>
          </div>

          <div className='flex flex-row mt-2'>
            <Image src='/clockClosingVector.png' alt='ícono de reloj para hora de salida' width={16} height={14} />
            <p className='text-[12.6px] text-[#546E7A] md:text-sm lg:text-base ml-2'>
              {companyData?.data?.company?.horario?.cierra || 'Información no disponible.'}
            </p>
          </div>
        </div>
      </section>

      <div className='w-full flex flex-col justify-center items-center mt-8'>
        <select className='rounded-lg mt-4 bg-[#ECEFF1] w-[290px] h-[37px] text-[#455A64]'>
          <option value='Place'>{companyData?.data?.company?.address || 'Información no disponible.'}</option>
        </select>

        <div className='w-[200px] h-[40px] md:w-[220px] md:h-[45px] lg:w-[250px] lg:h-[50px] mt-6 flex justify-around items-center self-center shadow-md shadow-gray-300 border border-[#231b1b6b] rounded-2xl '>
          <Image src='/iconsBlue/discapacidad.png' alt='ícono de persona usuaria de silla de ruedas' width={22} height={22} />
          <Image src='/iconsBlue/icons8-acceso-para-ciegos-50.png' alt='ícono de persona ciega con bastón' width={22} height={22} />
          <Image src='/iconsBlue/icons8-cabeza-con-cerebro-50.png' alt='ícono de persona con discapacidad intelectual' width={22} height={22} />
          <Image src='/iconsBlue/sordera.png' alt='ícono de discapacidad auditiva' width={22} height={22} />
          <Image src='/iconsBlue/icons8-infinito-64.png' alt='ícono de infinito, que representa a las personas Neurodivergentes' width={22} height={22} />
        </div>
      </div>
      <div>
        <CommentSection />
      </div>
    </div>
  );
}
