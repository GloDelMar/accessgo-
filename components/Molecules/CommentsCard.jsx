'use client';

import React, { useState, useEffect } from 'react';
import { createComment, getCommentsByCompanyId } from '@/pages/api/api_comment';
import { createRanking, getBusinessAverageRanking, getBusinessRankings } from '@/pages/api/api_ranking';
import { useRouter } from 'next/router';
import Link from 'next/link';

const defaultProfilePic = '/6073873.png';

export default function CommentsComponent() {
  const router = useRouter();
  const { id: companyId } = router.query; // Obtén el ID de la compañía desde la URL
  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Rating seleccionado
  const [showInput, setShowInput] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [rankingList, setRankingList] = useState([]); // Lista de rankings
  const [averageRating, setAverageRating] = useState(0); // Calificación promedio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (storedUserId && token) {
        setUserId(storedUserId);
      } else {
        console.error('No se encontró userId o token en localStorage');
      }
    }
  }, []);

  useEffect(() => {
    const fetchCommentsAndRankings = async () => {
      if (!companyId) return;
      setLoading(true);
      try {
        const commentsData = await getCommentsByCompanyId(companyId);
        setCommentList(commentsData.data || []);

        const rankingsData = await getBusinessRankings(companyId);
        setRankingList(rankingsData.data || []);

        const avgData = await getBusinessAverageRanking(companyId);
        setAverageRating(avgData.averageRating || 0); // Asegúrate de usar la clave correcta del backend
      } catch (error) {
        setError('Error al cargar los comentarios y calificaciones.');
      } finally {
        setLoading(false);
      }
    };
    fetchCommentsAndRankings();
  }, [companyId]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert('Por favor, escribe un comentario antes de enviar.');
      return;
    }
    if (!rating) {
      alert('Por favor, selecciona una calificación.');
      return;
    }
    if (!userId) {
      alert('Debes estar logueado para dejar un comentario.');
      return;
    }
    if (!isChecked) {
      alert('Por favor, confirma que tu opinión es genuina marcando la casilla.');
      return;
    }

    try {
      const rankingData = {
        userId,
        businessId: companyId, // Asegúrate de incluir el ID de la compañía
        stars: rating, // Rating dado
      };

      await createRanking(rankingData); // Crea el ranking para la compañía
      await createComment(userId, comment, companyId); // Crea el comentario asociado

      setComment('');
      setRating(0);
      setShowInput(false);
      setIsChecked(false);

      // Obtener comentarios y calificaciones actualizados
      const updatedComments = await getCommentsByCompanyId(companyId);
      setCommentList(updatedComments.data || []);

      const updatedRankings = await getBusinessRankings(companyId);
      setRankingList(updatedRankings.data || []);

      const avgData = await getBusinessAverageRanking(companyId);
      setAverageRating(avgData.averageRating || 0);

      alert('Comentario y calificación enviados exitosamente');
    } catch (error) {
      console.error('Error al enviar el comentario y calificación:', error);
      alert('Error en la solicitud. Intenta de nuevo.');
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const commentsWithRankings = commentList.map((comment) => {
    const userRanking = rankingList.find((ranking) => ranking.userId === comment.userId);
    return { ...comment, rating: userRanking?.stars || 0 };
  });

  return (
    <div className="w-full text-[#2F4F4F] h-full mt-2 flex flex-col p-2 max-w-screen-sm md:p-4 lg:p-8">
    
      <br />
      <button
        onClick={() => setShowInput(!showInput)}
        className="p-0 w-[196px] h-[28px] md:w-[210px] md:h-[36px] lg:w-[240px] lg:h-[44px] bg-[#2F4F4F] rounded-full text-sm md:text-base lg:text-lg text-center text-white self-center shadow-md shadow-lime-950"
      >
        Dejar un comentario
      </button>
      {showInput && (
        <div className="w-full border rounded p-4 shadow-xl bg-white mt-4 flex flex-col items-center">
          <h3 className="text-xl text-[#2F4F4F] font-semibold">¡Tu opinión es muy valiosa para nosotros!</h3>
          <textarea
            className="w-full border border-[#CFD8DC] rounded-lg p-2"
            rows="3"
            placeholder="Puedes escribirla aquí..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <p className="text-sm mb-1 mt-2 text-[#2F4F4F]">TUS ESTRELLAS</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`w-8 h-8 rounded-full border ${star <= rating ? 'bg-yellow-400' : 'bg-gray-200'}`}
              >
                <svg
                  className="w-5 h-5 m-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.392-2.462a1 1 0 00-1.176 0l-3.392 2.462c-.785.57-1.838-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.24 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                </svg>
              </button>
            ))}
          </div>
          <label className="flex align-center items-center mt-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2 w-5 h-5"
            />
            <span className="text-xs ml-5 font-light mb-3 mt-3 text-[#2F4F4F]">
              Confirmo que mi opinión refleja mi experiencia personal.
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
        ) : commentsWithRankings.length > 0 ? (
          <ul className="mt-4 space-y-5">
            {commentsWithRankings.map((comment) => (
              <li key={comment._id} className="w-full bg-[#F6F9FF] p-4 rounded-md shadow-md relative">
                <div className="flex items-start items-center">
                  <img
                    src={comment.user?.profilePicture || defaultProfilePic}
                    alt="Foto de perfil"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <Link href={`/vistaPerfilUsuario?id=${comment.userId?._id}`} className="text-gray-600 text-sm font-semibold hover:underline">
                      {comment.userId?.firstName || 'Nombre no disponible'}
                    </Link>
                  </div>
                </div>
                <p className="mt-2 text-justify">{comment.content}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="text-center mt-2 text-gray-700 font-semibold">
                  Calificación otorgada:
                  <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.392-2.462a1 1 0 00-1.176 0l-3.392 2.462c-.785.57-1.838-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.24 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                      </svg>
                    ))}
                  </div>
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
