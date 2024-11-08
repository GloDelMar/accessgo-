import React, { useEffect, useState } from "react";
import { createComment } from "./api/api_comment";
import Image from "next/image";
import { getCompanyById } from "./api/api_company";
import  CommentSection  from "../components/Molecules/CommentsCard"

export default function CardFree() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCompanyId(localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) {
        setError("Company ID not found");
        setLoading(false);
        return;
      }

      try {
        const data = await getCompanyById(companyId);
        console.log("Datos de compañía", data);
        setCompanyData(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='flex flex-col justify-center max-w-screen-sm h-full md:p-4 lg:p-8'>
      <div className='w-full mt-4 flex flex-col justify-center items-center'>
        <p className='text-[#2F4F4F] text-[20px] md:text-[40px] lg:text-[56px] text-center font-semibold'>
          ¡AccessGo!
        </p>
        <Image
          className='w-full mt-8 object-cover'
          src={companyData?.data?.company?.profilePicture || '/img-card.png'}
          alt='Foto principal de empresa'
          width={632}
          height={250}
          layout="responsive"
        />
      </div>

      <section className='flex flex-col md:flex-row lg:flex-row w-full mt-4'>
        <div className='md:w-2/3 lg:w-2/3'>
          <p className='w-full h-[40px] text-[#7E952A] text-[20px] md:text-2xl lg:text-3xl font-semibold'>
            {companyData?.data?.company?.companyName || 'Información no disponible.'}
          </p>
          <div className='flex flex-rows ml-2 mb-2 '>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                src='/estrellita.svg'
                alt='Estrella'
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
          <p className='text-[10.5px] md:text-[12px] lg:text-sm text-[#607D8B] ml-2 mt-2'>
            Horarios
          </p>

          <div className='flex flex-row mt-2'>
            <img className='w-[20px] h-[14px]' src='calendarVector.png' alt='' />
            <div className='flex flex-row text-[12px] md:text-sm lg:text-base text-[#546E7A] ml-2'>
              {(companyData?.data?.company?.diasDeServicio || []).join(', ') || 'Información no disponible.'}
            </div>
          </div>

          <div className='flex flex-row mt-2'>
            <img className='w-[20px] h-[14px] md:w-[22px] md:h-[16] lg:w-[22px] lg:h-[18px]' src='clockOpeningVector.png' alt='' />
            <p className='text-[12.6px] md:text-sm lg:text-base text-[#546E7A] ml-2'>
              {companyData?.data?.company?.horario?.abre || 'Información no disponible.'}
            </p>
          </div>

          <div className='flex flex-row mt-2'>
            <img className='w-[20px] h-[14px] md:w-[22px] md:h-[16] lg:w-[22px] lg:h-[18px]' src='clockClosingVector.png' alt='' />
            <p className='text-[12.6px] text-[#546E7A] md:text-sm lg:text-base ml-2'>
              {companyData?.data?.company?.horario?.cierra || 'Información no disponible.'}
            </p>
          </div>
        </div>
      </section>

      <div className='w-full flex flex-col justify-center items-center mt-8'>
        <select className='rounded-lg mt-4 bg-[#ECEFF1] w-[290px] h-[37px] text-[#455A64]' name='' id=''>
          <option value='Place'>{companyData?.data?.company?.address || 'Información no disponible.'}</option>
        </select>

        <div className='w-[200px] h-[40px] md:w-[220px] md:h-[45px] lg:w-[250px] lg:h-[50px] mt-6 flex justify-center items-center self-center shadow-md shadow-gray-300 border border-[#231b1b6b] rounded-2xl '>
          <img className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]' src='iconsBlue/motorDisabilityIcon.png' alt='' />
          <img className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]' src='iconsBlue/blindIcon.png' alt='' />
          <img className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]' src='iconsBlue/signalIcon.png' alt='' />
          <img className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]' src='iconsBlue/neuroDicon.png' alt='' />
        </div>
      </div>
      <CommentSection />
    </div>
  );
}
