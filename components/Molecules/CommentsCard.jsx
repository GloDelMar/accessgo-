'use client';

import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { toast, Toaster } from 'sonner';

// IMPORTA TUS FUNCIONES
import {
  addDislike,
  addLike,
  removeDislike,
  removeLike,
} from '../../pages/api/api_comment';

import { useComments } from '../Molecules/useComments';

const defaultProfilePic = '/6073873.png';

export default function CommentSection() {
  const router = useRouter();
  const { id: companyId } = router.query;
  const { comments, loading, addComment } = useComments(companyId);
  const [interactedComments, setInteractedComments] = useState({});
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [commens, setCommens] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (Array.isArray(comments)) {
      setCommens(comments);
    }
  }, [comments]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const storedUserType = localStorage.getItem('tipoUsuario');
      setUserId(storedUserId);
      setUserType(storedUserType);
    }
  }, []);

  /**
   * handleLike: Cuando el usuario hace clic en "like".
   * - Si ya tiene "like", no hace nada (doble clic en el mismo botón).
   * - Si tenía "dislike", lo quita y pone "like" (flipping).
   * - Si no tenía nada, simplemente agrega "like".
   */
  const handleLike = useCallback(
    async (commentId) => {
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);

      try {
        const hasLiked = interactedComments[commentId] === 'like';
        const hasDisliked = interactedComments[commentId] === 'dislike';

        // 1. Si YA tiene "like", no hace nada
        if (hasLiked) {
          setIsButtonDisabled(false);
          return;
        }

        // 2. Si tenía "dislike", lo quitamos y luego ponemos "like"
        if (hasDisliked) {
          // Actualiza estado local a "like"
          setInteractedComments((prev) => ({
            ...prev,
            [commentId]: 'like',
          }));
          // Ajusta contadores localmente
          setCommens((prevComments) =>
            prevComments.map((comment) => {
              if (comment._id !== commentId) return comment;
              return {
                ...comment,
                dislikes: (comment.dislikes || 0) - 1,
                likes: (comment.likes || 0) + 1,
              };
            })
          );
          // Llamadas a la API: removeDislike, después addLike
          await removeDislike(commentId, userId);
          await addLike(commentId, userId);
        } else {
          // 3. Si no tenía nada, se agrega "like"
          setInteractedComments((prev) => ({
            ...prev,
            [commentId]: 'like',
          }));
          setCommens((prevComments) =>
            prevComments.map((comment) => {
              if (comment._id !== commentId) return comment;
              return {
                ...comment,
                likes: (comment.likes || 0) + 1,
              };
            })
          );
          await addLike(commentId, userId);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsButtonDisabled(false);
      }
    },
    [isButtonDisabled, interactedComments, userId]
  );

  /**
   * handleDislike: Cuando el usuario hace clic en "dislike".
   * - Si ya tiene "dislike", no hace nada (doble clic).
   * - Si tenía "like", lo quita y pone "dislike" (flipping).
   * - Si no tenía nada, simplemente agrega "dislike".
   */
  const handleDislike = useCallback(
    async (commentId) => {
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);

      try {
        const hasLiked = interactedComments[commentId] === 'like';
        const hasDisliked = interactedComments[commentId] === 'dislike';

        // 1. Si YA está en "dislike", no hace nada
        if (hasDisliked) {
          setIsButtonDisabled(false);
          return;
        }

        // 2. Si estaba en "like", quitar el like y poner "dislike"
        if (hasLiked) {
          // Actualiza estado local
          setInteractedComments((prev) => ({
            ...prev,
            [commentId]: 'dislike',
          }));
          // Ajusta contadores localmente
          setCommens((prevComments) =>
            prevComments.map((comment) => {
              if (comment._id !== commentId) return comment;
              return {
                ...comment,
                likes: (comment.likes || 0) - 1,
                dislikes: (comment.dislikes || 0) + 1,
              };
            })
          );
          // Primero quita el like en el backend, luego agrega el dislike
          await removeLike(commentId, userId);
          await addDislike(commentId, userId);
        } else {
          // 3. Si no tenía nada, agrega "dislike"
          setInteractedComments((prev) => ({
            ...prev,
            [commentId]: 'dislike',
          }));
          setCommens((prevComments) =>
            prevComments.map((comment) => {
              if (comment._id !== commentId) return comment;
              return {
                ...comment,
                dislikes: (comment.dislikes || 0) + 1,
              };
            })
          );
          await addDislike(commentId, userId);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsButtonDisabled(false);
      }
    },
    [isButtonDisabled, interactedComments, userId]
  );

  // Función para enviar un nuevo comentario
  const handleCommentSubmit = async () => {
    try {
      await addComment(userId, comment, rating);
      setComment('');
      setRating(0);
      setShowInput(false);
      toast.success('Comentario enviado exitosamente');
    } catch (error) {
      toast.error('Error al enviar comentario. Intenta de nuevo.');
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="w-full text-[#2F4F4F] h-full mt-2 flex flex-col p-2 max-w-screen-sm md:p-4 lg:p-8">
      {userId ? (
        userType === 'company' ? (
          <p className="text-red-500 font-semibold text-center">
            Lo sentimos, las cuentas de empresas no pueden dejar comentarios.
          </p>
        ) : (
          <>
            <button
              onClick={() => setShowInput(!showInput)}
              className="p-0 w-[196px] h-[28px] bg-[#2F4F4F] rounded-full text-sm text-center text-white self-center shadow-md"
            >
              Dejar un comentario
            </button>
            {showInput && (
              <div className="w-full border rounded p-4 shadow-xl bg-white mt-4 flex flex-col items-center">
                <h3 className="text-xl text-[#2F4F4F] font-semibold">
                  ¡Tu opinión es muy valiosa para nosotros!
                </h3>
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
                      className={`w-8 h-8 rounded-full border ${
                        star <= rating ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
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
          </>
        )
      ) : (
        <p className="text-center text-gray-500">
          Debes iniciar sesión para dejar un comentario.
        </p>
      )}

      {/* Sección de comentarios */}
      <section className="w-full max-w-3xl mx-auto mt-12 bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <MessageCircle className="mr-3 text-blue-500" />
          Comentarios
        </h2>
        {commens && commens.length > 0 ? (
          <ul className="space-y-10">
            {commens.map((comment) => (
              <li
                key={comment._id}
                className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <Image
                    src={comment.userId?.profilePicture || defaultProfilePic}
                    alt="Foto de perfil"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full border-2 border-blue-200 object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <Link
                        href={`/vistaPerfilUsuario?id=${comment.userId?._id}`}
                        className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                      >
                        {comment.userId?.firstName || 'Nombre no disponible'}
                      </Link>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 text-base mt-2 leading-relaxed">
                      {comment.content}
                    </p>
                    {comment.rankingId?.stars && (
                      <div className="mt-4 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`text-2xl ${
                              index < comment.rankingId?.stars
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          ({comment.rankingId.stars} de 5 estrellas)
                        </span>
                      </div>
                    )}
                    {/* Botones de like / dislike para usuario normal */}
                    {userType !== 'company' && (
                      <div className="mt-6 flex items-center space-x-8">
                        <button
                          onClick={() => handleLike(comment._id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${
                            interactedComments[comment._id] === 'like'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600'
                          } hover:bg-blue-200 hover:text-blue-700`}
                        >
                          <ThumbsUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{comment.likes || 0}</span>
                        </button>
                        <button
                          onClick={() => handleDislike(comment._id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${
                            interactedComments[comment._id] === 'dislike'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600'
                          } hover:bg-red-200 hover:text-red-700`}
                        >
                          <ThumbsDown className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{comment.dislikes || 0}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">Aún no hay comentarios</p>
            <p className="text-gray-500 text-sm mt-2">¡Sé el primero en comentar!</p>
          </div>
        )}
      </section>
      <Toaster position="top-center" />
    </div>
  );
}