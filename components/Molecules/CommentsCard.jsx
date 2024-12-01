'use client';

import React, { useState, useEffect } from 'react';
import { useComments } from '../Molecules/useComments';
import { useRouter } from 'next/router';
import Link from 'next/link';

const defaultProfilePic = '/6073873.png';

export default function CommentSection() {
  const router = useRouter();
  const { id: companyId } = router.query;
  const { comments, averageRating, loading, addComment } = useComments(companyId);

  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  const handleCommentSubmit = async () => {
    try {
      await addComment(userId, comment, rating);
      setComment('');
      setRating(0);
      setShowInput(false);
      alert('Comentario enviado exitosamente');
    } catch (error) {
      alert('Error al enviar comentario. Intenta de nuevo.');
    }
  };

  if (loading) return <p>Cargando...</p>;

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
            placeholder="Escribe tu comentario aquí..."
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
          <button
            onClick={handleCommentSubmit}
            className="mt-2 p-2 bg-[#2F4F4F] rounded-full text-white shadow-md"
          >
            Enviar comentario
          </button>
        </div>
      )}
      <section className="w-full max-w-2xl mx-auto mt-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Comentarios</h2>
        {comments.length > 0 ? (
          <ul className="space-y-6">
            {comments.map((comment) => {
             
              return (
                <li key={comment._id} className="bg-white rounded-lg shadow-sm p-4 flex space-x-4">
                  <img
                    src={comment.userId?.profilePicture || defaultProfilePic}
                    alt="Foto de perfil"
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/vistaPerfilUsuario?id=${comment.userId?._id}`}
                        className="text-lg font-semibold text-gray-700 hover:underline"
                      >
                        {comment.userId?.firstName || "Nombre no disponible"}
                      </Link>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{comment.content}</p>
                    {comment.rankingId?.stars && (
                      <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={index < comment.rankingId?.stars ? "text-yellow-400" : "text-gray-300"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-6">Aún no hay comentarios</p>
        )}
      </section>
    </div>
  );
}
