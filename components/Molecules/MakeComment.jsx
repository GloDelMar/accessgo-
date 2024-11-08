import React, { useEffect, useState } from "react";
import { createComment } from "@/pages/api/api_comment";
import Image from "next/image";
import { getCompanyById } from "@/pages/api/api_company";

export default function CommentInput() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Verificamos que esté en un entorno del cliente
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setCompanyId(storedUserId);
      } else {
        setError("Company ID not found in localStorage.");
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) return;

      try {
        const data = await getCompanyById(companyId);
        console.log("Datos de compañía", data);
        setCompanyData(data);
      } catch (error) {
        console.error("Error al obtener datos de la compañía:", error);
        setError("Failed to fetch company data.");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchCompanyData();
  }, [companyId]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("Por favor, escribe un comentario antes de enviar.");
      return;
    }
    try {
      await createComment(companyId, comment);
      alert("Comentario enviado exitosamente");
      setComment(""); // Limpiar el campo de comentario después de enviar
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      alert("Error al enviar el comentario. Intenta de nuevo.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex flex-col justify-center max-w-screen-sm h-full md:p-4 lg:p-8'>
      {/* Botón para mostrar el input de comentario */}
      <button
        onClick={() => setShowInput(!showInput)}
        className='p-0 w-[196px] h-[28px] md:w-[210px] md:h-[36px] lg:w-[240px] lg:h-[44px] bg-[#2F4F4F] rounded-full text-sm md:text-base lg:text-lg text-center text-white self-center shadow-md shadow-lime-950'
      >
        Dejar un comentario
      </button>

      {showInput && (
        <div className='w-full mt-4 flex flex-col items-center'>
          <textarea
            className='w-full md:w-3/4 lg:w-1/2 border border-[#CFD8DC] rounded-lg p-2'
            rows='3'
            placeholder='Escribe tu comentario aquí...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className='mt-2 p-2 w-[150px] bg-[#2F4F4F] rounded-full text-white shadow-md'
          >
            Enviar comentario
          </button>
        </div>
      )}
    </div>
  );
}
