import React, { useEffect, useState } from "react";
import { createComment } from "@/pages/api/api_comment";
import { useRouter } from 'next/router';

export default function CommentInput() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = router.query;  // El id de la compañía desde la URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        console.log("userId almacenado en localStorage:", storedUserId);
      } else {
        console.error("No se encontró userId en localStorage");
      }
    }
  }, []);
  

  useEffect(() => {
    if (id) {
      console.log("ID de la compañía desde la URL:", id);
    }
  }, [id]);
  
const businessId = id

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("Por favor, escribe un comentario antes de enviar.");
      return;
    }

    if (!userId) {
      alert("Debes estar logueado para dejar un comentario.");
      return;
    }

    try {
      await createComment(userId, comment, businessId);

      alert("Comentario enviado exitosamente");
      setComment(""); // Limpiar el comentario
      setShowInput(false); // Ocultar el input después de enviar el comentario
    } catch (error) {
      alert("Error al enviar el comentario. Intenta de nuevo.");
    }
  };

  return (
    <div className='flex flex-col justify-center max-w-screen-sm h-full md:p-4 lg:p-8 p-2 mt-2'>
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
