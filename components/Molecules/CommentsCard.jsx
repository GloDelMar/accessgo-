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
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Ejecutando useEffect para obtener userId y token');
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (storedUserId && token) {
        console.log('Usuario encontrado:', storedUserId);
        setUserId(storedUserId);
      } else {
        console.error('No se encontró userId o token en localStorage');
      }
    }
  }, []);

  useEffect(() => {
    const fetchCommentsAndRankings = async () => {
      if (!companyId) {
        console.log('No hay companyId disponible');
        return;
      }
      console.log('Obteniendo comentarios y calificaciones para la empresa:', companyId);
      setLoading(true);
      try {
        const commentsData = await getCommentsByCompanyId(companyId);
        console.log('Comentarios obtenidos:', commentsData);
        setCommentList(commentsData.data || []);

        const avgData = await getBusinessAverageRanking(companyId);
        console.log('Calificación promedio obtenida:', avgData);
        setAverageRating(avgData.averageRating || 0);
      } catch (error) {
        console.error('Error al obtener comentarios o calificaciones:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommentsAndRankings();
  }, [companyId]);

  const handleCommentSubmit = async () => {
    console.log('Intentando enviar comentario y calificación');
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

    try {
      const rankingData = {
        userId,
        businessId: companyId,
        stars: rating,
      };

      console.log('Datos de calificación a enviar:', rankingData);
      const ratingResponse = await createRanking(rankingData);
      console.log('Respuesta de la API de calificación:', ratingResponse);
      const rankingId = ratingResponse.data._id;

      console.log('Enviando comentario con rankingId:', rankingId);
      await createComment(userId, comment, companyId, rankingId);

      setComment('');
      setRating(0);
      setShowInput(false);

      console.log('Actualizando lista de comentarios después de enviar');
      const updatedComments = await getCommentsByCompanyId(companyId);
      setCommentList(updatedComments.data || []);

      console.log('Actualizando calificación promedio después de enviar');
      const avgData = await getBusinessAverageRanking(companyId);
      setAverageRating(avgData.averageRating || 0);

      alert('Comentario y calificación enviados exitosamente');
    } catch (err) {
      console.error('Error al enviar comentario o calificación:', err);
      alert('Error en la solicitud. Intenta de nuevo.');
    }
  };

  if (loading) {
    console.log('Cargando datos...');
    return <p>Cargando...</p>;
  }

  if (commentList.length === 0 && averageRating === 0) {
    console.log('No hay comentarios ni calificaciones para mostrar');
    return null;
  }

  return (
    <div className="w-full text-[#2F4F4F] h-full mt-2 flex flex-col p-2 max-w-screen-sm md:p-4 lg:p-8">
      <button
        onClick={() => {
          console.log('Cambiando estado de mostrar entrada de comentario');
          setShowInput(!showInput);
        }}
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
            onChange={(e) => {
              console.log('Actualizando comentario:', e.target.value);
              setComment(e.target.value);
            }}
          />
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  console.log('Seleccionando calificación:', star);
                  setRating(star);
                }}
                className={`w-8 h-8 rounded-full border ${star <= rating ? 'bg-yellow-400' : 'bg-gray-200'}`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleCommentSubmit}
            className="mt-2 p-2 bg-[#2F4F4F] rounded-full text-white shadow-md"
          >
            Enviar comentario
          </button>
        </div>
      )}
      <section className="mt-6">
        <ul className="space-y-6">
          {commentList.map((comment) => (
            <li
              key={comment._id}
              className="p-4 bg-white rounded shadow-md flex flex-col items-start"
            >
              <div className="flex items-center mb-2">
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
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
