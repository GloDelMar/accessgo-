
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCompanyById } from "./api/api_company";
import { getBusinessAverageRanking } from "./api/api_ranking";
import CommentSection from "../components/Molecules/CommentsCard";
import AccessVisibility from "@/components/Molecules/muestraAccess";

import ImageCarouselACC from '@/components/Molecules/ImageCarouselACC';

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
      console.error("Error al obtener el promedio:", error);
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
        setError("Error al cargar los datos.");
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
          className="w-[236px] h-[300px] md:w-[632px] md:h-[250px] lg:w-[652px] lg:h-[250px] mt-8 object-cover"
          src={companyData?.data?.company?.profilePicture || "/img-card.png"}
          alt="Foto principal de empresa"
          width={652}
          height={250}
          layout="responsive"
        />
      </div>

     
      <section className="flex flex-col justify-between p-2 md:flex-row lg:flex-row w-full mt-4">
        <div className="flex flex-col">
          <p className="w-full h-[40px] text-[#7E952A] text-[20px] md:text-2xl lg:text-3xl font-semibold">
            {companyData?.data?.company?.companyName || "Información no disponible."}
          </p>
          <div className="flex flex-rows ml-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                className={`w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px] ${
                  star <= Math.round(averageRating) ? "opacity-100" : "opacity-30"
                }`}
                src="/estrellita.svg"
                alt="Estrella"
                width={20}
                height={20}
              />
            ))}
          </div>
          <p className="w-full md:w-3/4 text-xs text-[#455A64] lg:text-md mt-2">
            {companyData?.data?.company?.giro || "Información no disponible."}
          </p>
          <p className="w-full md:w-3/4 text-sm text-[#455A64] lg:text-lg mt-2">
            {companyData?.data?.company?.description || "Información no disponible."}
          </p>
        </div>

        <div>
          <p className="text-[10.5px] md:text-[12px] lg:text-sm text-[#607D8B] mt-2">
            Horarios
          </p>
          <div className="flex flex-row mt-2">
            <Image src="/calendarVector.png" alt="ícono de calendario" width={16} height={14} />
            <div className="flex flex-row text-[12px] md:text-sm lg:text-base text-[#546E7A] ml-2">
              {(companyData?.data?.company?.diasDeServicio || []).join(", ") || "Información no disponible."}
            </div>
          </div>

          <div className="flex flex-row mt-2">
            <Image src="/clockOpeningVector.png" alt="ícono de reloj para hora de iniciar" width={16} height={14} />
            <p className="text-[12.6px] md:text-sm lg:text-base text-[#546E7A] ml-2">
              {companyData?.data?.company?.horario?.abre || "Información no disponible."}
            </p>
          </div>

          <div className="flex flex-row mt-2">
            <Image src="/clockClosingVector.png" alt="ícono de reloj para hora de salida" width={16} height={14} />
            <p className="text-[12.6px] text-[#546E7A] md:text-sm lg:text-base ml-2">
              {companyData?.data?.company?.horario?.cierra || "Información no disponible."}
            </p>
          </div>
        </div>
      </section>

      <div className="w-full flex flex-col justify-center items-center mt-8">
        <div className="border p-3 rounded mt-4 bg-[#ECEFF1] w-[290px] md:w-full  justify-center flex items-center text-[#455A64]">
          <h4 value="Place">{companyData?.data?.company?.address || "Información no disponible."}</h4>
        </div>

        <div >
        <AccessVisibility companyId={id} />
        </div>
      </div>

      <div className='flex flex-col justify-center items-center h[200px] w[200px]'>
        <ImageCarouselACC userId={id} />
      </div>

      <section className='w-full flex flex-col mt-6'>
        <p className='text-2xl lg:text-3xl text-[#7E952A] text-center'>
          ¡Este mes para ti!
        </p>

        <div className='border border-[#CFD8DC] rounded-md mt-6 md:flex md:flex-row lg:flex lg:flex-row'>
          <div className='grid grid-cols-4 md:mb-4 md:flex md:flex-col md:justify-center md:items-center md:w-1/3 justify-center items-center mt-8 md:mt-12 lg:mt-16'>
            <img
              className='col-start-2 col-end-3 place-self-end md:place-self-center w-[79px] h-[72px] rounded-lg'
              src='raultemporaryImages/offerImg.png'
              alt=''
            />
            <p className='md:tex-base lg:text-xl col-start-3 col-end-4 text-sm ml-4 md:ml-0'>Promocion</p>
          </div>
          <p className='md:w-2/3 md:text-left md:pl-2 md:place-self-center text-xs lg:text-base text-center mt-6 h-[67px] bg-[#F9F9F9] mx-1 mb-3 rounded-md pt-2'>
            solo este mes las mejores promociones para ti
          </p>
        </div>

        <div className='border border-[#CFD8DC] rounded-md mt-6 md:flex md:flex-row lg:flex lg:flex-row'>
          <div className='grid grid-cols-4 md:mb-4 md:flex md:flex-col md:justify-center md:items-center md:w-1/3 lg:mb-4 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-1/3 justify-center items-center mt-8 md:mt-12 lg:mt-16'>
            <img
              className='col-start-2 col-end-3 place-self-end md:place-self-center lg:place-self-center w-[79px] h-[72px] rounded-lg'
              src='raultemporaryImages/promoImg.png'
              alt=''
            />
            <p className='col-start-3 col-end-4 text-sm md:tex-base lg:text-xl ml-4 md:ml-0'>Oferta</p>
          </div>
          <p className='md:w-2/3 md:text-left md:pl-2 md:place-self-center lg:w-2/3 lg:text-left lg:pl-2 lg:place-self-center text-xs lg:text-base text-center mt-6 h-[67px] bg-[#F9F9F9] mx-1 mb-3 rounded-md pt-2'>
            solo este mes las mejores promociones para ti
          </p>
        </div>

        <div className='border border-[#CFD8DC] rounded-md mt-6 md:flex md:flex-row'>
          <div className='grid grid-cols-4 md:mb-4 md:flex md:flex-col md:justify-center md:items-center md:w-1/3 justify-center items-center mt-8 md:mt-12 lg:mt-16'>
            <img
              className='col-start-2 col-end-3 place-self-end md:place-self-center w-[79px] h-[72px] rounded-lg'
              src='raultemporaryImages/menuImg.png'
              alt=''
            />
            <p className='md:tex-base lg:text-xl col-start-3 col-end-4 text-sm ml-4 md:ml-0'>Menu</p>
          </div>
          <p className='md:w-2/3 md:text-left md:pl-2 md:place-self-center text-xs lg:text-base text-center mt-6 h-[67px] bg-[#F9F9F9] mx-1 mb-3 rounded-md pt-2'>
            solo este mes las mejores promociones para ti
          </p>
        </div>

        

        
      </section>

      

      <section className='w-full h-full mt-6 flex flex-col '>
      <CommentSection onNewRating={fetchAverageRating} />
      </section>
    </div>
  );
}
