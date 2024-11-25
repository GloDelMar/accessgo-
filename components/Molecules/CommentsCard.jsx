'use client';

import React, { useState, useEffect } from 'react';
import { createComment, getCommentsByCompanyId } from '@/pages/api/api_comment';
import { createRanking, getBusinessAverageRanking, getBusinessRankings } from '@/pages/api/api_ranking';
import { useRouter } from 'next/router';
import Link from 'next/link';

const defaultProfilePic = '/6073873.png';

export default function CommentSection() {
  const router = useRouter();
  const { id: companyId } = router.query;

  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [rankingList, setRankingList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
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
        setAverageRating(avgData.averageRating || 0);
      } catch (err) {
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
        businessId: companyId,
        stars: rating,
      };

      const ratingResponse = await createRanking(rankingData);
      const rankingId = ratingResponse.data._id;
     
      await createComment(userId, comment, companyId, rankingId);

      setComment('');
      setRating(0);
      setShowInput(false);
      setIsChecked(false);

      const updatedComments = await getCommentsByCompanyId(companyId);
      setCommentList(updatedComments.data || []);

      const updatedRankings = await getBusinessRankings(companyId);
      setRankingList(updatedRankings.data || []);

      const avgData = await getBusinessAverageRanking(companyId);
      setAverageRating(avgData.averageRating || 0);

      alert('Comentario y calificación enviados exitosamente');
    } catch (err) {
      alert('Error en la solicitud. Intenta de nuevo.');
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
 
  const commentsWithStars = commentList.map((comment) => ({
    ...comment,
    stars: comment.rankingId?.stars || 0,
  }));


  return (
    <div className="w-full text-[#2F4F4F] h-full mt-2 flex flex-col p-2 max-w-screen-sm md:p-4 lg:p-8">
      <button
        onClick={() => setShowInput(!showInput)}
        className="p-0 w-[196px] h-[28px] bg-[#2F4F4F] rounded-full text-sm text-center text-white self-center shadow-md"
      >
        Dejar un comentario
      </button>
      {showInput && (
        <div className="w-full border rounded p-4 shadow-xl bg-white mt-4 flex flex-col items-center">
          <h3 className="text-xl text-[#2F4F4F] font-semibold">¡Tu opinión es muy valiosa para nosotros!</h3>
          <textarea
            className="w-full border rounded-lg p-2"
            rows="3"
            placeholder="Puedes escribirla aquí..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`w-8 h-8 rounded-full border ${star <= rating ? 'bg-yellow-400' : 'bg-gray-200'}`}
              >
                ★
              </button>
            ))}
          </div>
          <label className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Confirmo que mi opinión refleja mi experiencia personal.
          </label>
          <button
            onClick={handleCommentSubmit}
            className="mt-2 p-2 bg-[#2F4F4F] rounded-full text-white shadow-md"
          >
            Enviar comentario
          </button>
        </div>
      )}
      <section className="mt-6">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : commentsWithStars.length > 0 ? (
          <ul>
            {commentsWithStars.map((comment) => (
              <li key={comment._id} className="p-4 bg-white rounded shadow-md">
                <div className="flex items-center">
                  <img
                    src={comment.user?.profilePicture || defaultProfilePic}
                    alt="Foto de perfil"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <Link href={`/vistaPerfilUsuario?id=${comment.userId?._id}`}>
                    {comment.userId?.firstName || 'Nombre no disponible'}
                  </Link>
                </div>
                <p>{comment.content}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="text-center mt-2 text-gray-700 font-semibold">
                  Calificación otorgada:
                  <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= comment.stars ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </section>
    </div>
  );
}
