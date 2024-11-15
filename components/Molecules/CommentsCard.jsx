import React, { useEffect, useState } from "react";
import { createComment, getCommentsByCompanyId } from "@/pages/api/api_comment";
import { useRouter } from 'next/router';

const defaultProfilePic = '/6073873.png';

export default function CommentsComponent() {
  const router = useRouter();
  const { id: companyId } = router.query;
  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (storedUserId && token) {
        setUserId(storedUserId);
      } else {
        console.error("No se encontró userId o token en localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (!companyId) return;
      setLoading(true);
      try {
        const commentsData = await getCommentsByCompanyId(companyId);
        setCommentList(commentsData.data || []);
      } catch (error) {
        setError("Error al cargar los comentarios.");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [companyId]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("Por favor, escribe un comentario antes de enviar.");
      return;
    }
    if (!userId) {
      alert("Debes estar logueado para dejar un comentario.");
      return;
    }
    if (!isChecked) {
      alert("Por favor, confirma que tu opinión es genuina marcando la casilla.");
      return;
    }
    try {
      await createComment(userId, comment, companyId);
      setComment("");
      setShowInput(false);
      setIsChecked(false); // Limpia el estado del checkbox

      const updatedComments = await getCommentsByCompanyId(companyId);
      setCommentList(updatedComments.data || []);
      alert("Comentario enviado exitosamente");
    } catch (error) {
      alert("Error al enviar el comentario. Intenta de nuevo.");
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const sortedComments = commentList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="w-full text-[#2F4F4F] h-full  mt-2 flex flex-col p-2 max-w-screen-sm md:p-4 lg:p-8">
      <button
        onClick={() => setShowInput(!showInput)}
        className="p-0 w-[196px] h-[28px] md:w-[210px] md:h-[36px] lg:w-[240px] lg:h-[44px] bg-[#2F4F4F] rounded-full text-sm md:text-base lg:text-lg text-center text-white self-center shadow-md shadow-lime-950"
      >
        Dejar un comentario
      </button>
      {showInput && (
        <div className="w-full border rounded p-4 shadow-xl bg-white mt-4 flex flex-col items-center">
          <h3 className="text-xl text-[#2F4F4F] font-semibold">¡Tu opinión es muy valiosa para nosotros!</h3>
          <h4 className="text-md mt-2 text-[#2F4F4F]">En el siguiente espacio puedes contarnos que te ha parecido tu experiencia.
          </h4>
          <p className="text-sm mt-2 mb-1 text-[#2F4F4F]">COMPÁRTENOS TU OPINIÓN</p>
          <textarea
            className="w-full border border-[#CFD8DC] rounded-lg p-2"
            rows="3"
            placeholder="Puedes escribirla aquí..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <p className="text-sm mt-2 mb-1 mt-2 text-[#2F4F4F]">TUS ESTRELLAS</p>
          <p>-aquí van las estrellas que le da-</p>
          <h4 className="text-md mt-2 text-[#2F4F4F]">
            ¡Gracias por tu valoración!
          </h4>
          <label className="flex align-center items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2 w-10 h-10"
            />
            <span className="text-xs ml-5 font-light mb-3 mt-3 text-[#2F4F4F]">
              Haciendo clic aquí, confirmo que mi opinión refleja mi experiencia personal en este establecimiento.
              Declaro que mi opinión es auténtica, que no tengo relación personal ni comercial con el establecimiento, 
              y que no recibí incentivos o pagos para escribirla. Entiendo que AccessGo tiene una política estricta 
              contra opiniones falsas.
            </span>
          </label>
          <button
            onClick={handleCommentSubmit}
            className="mt-2 p-2 w-[150px] bg-[#2F4F4F] rounded-full text-white shadow-md"
          >
            Enviar comentario
          </button>
        </div>
      )}

      <section className="w-full rounded-lg mt-6">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : sortedComments.length > 0 ? (
          <ul className="mt-4 space-y-5">
            {sortedComments.map((comment) => (
              <li key={comment._id} className="w-full bg-[#F6F9FF] p-4 rounded-md shadow-md relative">
                <div className="flex items-start items-center">
                  <img
                    src={comment.user?.profilePicture || defaultProfilePic}
                    alt="Foto de perfil"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">
                      {comment.userId?.firstName || 'Nombre no disponible'}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-justify">{comment.content}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="text-center mt-2 text-gray-700 font-semibold">
                  Calificación otorgada: {comment.rating || 'Sin calificación'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tienes comentarios.</p>
        )}
      </section>
    </div>
  );
}
