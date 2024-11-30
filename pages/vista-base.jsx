import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getBusinessAverageRanking } from "./api/api_ranking";
import { getCompanyById } from "./api/api_company";
import CommentSection from "../components/Molecules/CommentsCard";
import AccessVisibility from "@/components/Molecules/muestraAccess";

const defaultProfilePic = "/6073873.png";

const getValueOrDefault = (value, defaultText = "Información no disponible.") => {
  console.log("getValueOrDefault - value:", value, "defaultText:", defaultText);
  return value || defaultText;
};

export default function CardFree() {
  const router = useRouter();
  const { id } = router.query;

  console.log("Router query - id:", id);

  const [companyData, setCompanyData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.log("No ID found in the query");
      return;
    }

    const fetchData = async () => {
      console.log("Fetching data for ID:", id);

      try {
        const [companyRes, avgRatingRes] = await Promise.all([
          getCompanyById(id),
          getBusinessAverageRanking(id),
        ]);

        console.log("Company Response:", companyRes);
        console.log("Average Rating Response:", avgRatingRes);

        setCompanyData(companyRes);
        setAverageRating(avgRatingRes.data.averageRating || 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos.");
      } finally {
        console.log("Finished fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    console.log("Loading state active");
    return <p>Cargando...</p>;
  }
  if (error) {
    console.error("Error state active:", error);
    return <p>{error}</p>;
  }

  const { company } = companyData?.data || {};

  console.log("Company Data:", company);
  console.log("Average Rating:", averageRating);

  return (
    <div className="flex flex-col justify-center md:p-4 lg:p-8">
      <div className="w-full mt-4 flex flex-col justify-center items-center">
        <p className="text-[#2F4F4F] text-[20px] md:text-[40px] lg:text-[56px] text-center font-semibold">
          ¡AccessGo!
        </p>
        <img
          className="w-[236px] h-[300px] md:w-[632px] md:h-[250px] lg:w-[652px] lg:h-[250px] mt-8 object-cover"
          src={company?.profilePicture || "/img-card.png"}
          alt="Foto principal de empresa"
        />
      </div>

      {/* Información de la empresa */}
      <section className="flex flex-col md:flex-row lg:flex-row justify-between p-2 mt-4 w-full">
        <div className="flex flex-col max-w-[500px]">
          <div className="flex items-center">
            <img
              src={company?.profilePicture || defaultProfilePic}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full p-2"
            />
            <p className="text-[#7E952A] text-[20px] md:text-2xl lg:text-3xl font-semibold">
              {getValueOrDefault(company?.companyName)}
            </p>
          </div>
          {/* Calificaciones */}
          <div className="flex flex-rows ml-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                src="/estrellita.svg"
                alt="Estrella"
                className={star <= Math.round(averageRating) ? "opacity-100" : "opacity-30"}
                width={20}
                height={20}
              />
            ))}
          </div>
          <p className="text-xs text-[#455A64] lg:text-md mt-2">
            {getValueOrDefault(company?.giro)}
          </p>
          <p className="text-sm text-[#455A64] lg:text-lg mt-2">
            {getValueOrDefault(company?.description)}
          </p>
        </div>

        {/* Horarios */}
        <div>
          <p className="text-sm text-[#607D8B] mt-2">Horarios</p>
          <div className="flex flex-row mt-2">
            <Image src="/calendarVector.png" alt="Calendario" width={16} height={14} />
            <p className="ml-2 text-sm text-[#546E7A]">
              {(company?.diasDeServicio || []).join(", ") || "Información no disponible."}
            </p>
          </div>
        </div>
      </section>

      {/* Comentarios */}
      <div className="mt-8">
        <CommentSection onNewRating={() => console.log("New rating added.")} />
      </div>
    </div>
  );
}
