import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCompanyById } from "./api/api_company";
import { getBusinessAverageRanking } from "./api/api_ranking";
import CommentSection from "../components/Molecules/CommentsCard";
import AccessVisibility from "@/components/Molecules/muestraAccess";

const defaultProfilePic = "public/6073873.png"

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
        console.log("aqui data", data)
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
    <div className="flex flex-col justify-center md:p-4 lg:p-8">
      <div className="w-full mt-4 flex flex-col justify-center items-center">
        <p className="text-[#2F4F4F] text-[20px] md:text-[40px] lg:text-[56px] text-center font-semibold">
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
        <div className="flex flex-col max-w-[500px]">
          <div className="flex items-center ">
            <img
              src={companyData?.data?.company?.profilePicture || defaultProfilePic}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full p-2"
            />
            <p className="w-full h-[40px] text-[#7E952A] text-[20px] md:text-2xl lg:text-3xl font-semibold">
              {companyData?.data?.company?.companyName || "Información no disponible."}
            </p>
          </div>
          <div className="flex flex-rows ml-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                className={`w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px] ${star <= Math.round(averageRating) ? "opacity-100" : "opacity-30"
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
        <div className="border p-3 rounded mt-4 bg-[#ECEFF1] w-[290px]  md:w-full  justify-center flex flex-col items-center text-[#455A64]">
          <h4 value="Place" className="text-[#546E7A] font-semibold">Dirección:</h4>
          <p className="text-center"> {companyData?.data?.company?.address || "Información no disponible."}</p>
          <h4 value="Place" className="text-[#546E7A] font-semibold mt-3">Teléfono:</h4>
          <p className="text-center"> {companyData?.data?.company?.phone || "Información no disponible."}</p>
        </div>

        <div >
          <AccessVisibility companyId={id} />
        </div>
      </div>
      <div className="flex justify-center">
      <CommentSection onNewRating={fetchAverageRating} />
      </div>
    </div>
  );
}
