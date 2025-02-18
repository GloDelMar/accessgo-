'use client';

import { MessageCircle, MoreVertical, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
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
  const { comments, loading, addComment, delComment } = useComments(companyId);
  const [interactedComments, setInteractedComments] = useState({});
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [commens, setCommens] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0);

  const toggleMenu = (commentId) => setMenuOpen(menuOpen === commentId ? null : commentId);

  useEffect(() => {
    if (userId && Array.isArray(comments)) {
      const sortedComments = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const userInteractions = {};
      sortedComments.forEach((comment) => {
        if (comment.likedBy.includes(userId)) {
          userInteractions[comment._id] = 'like';
        } else if (comment.dislikedBy.includes(userId)) {
          userInteractions[comment._id] = 'dislike';
        }
      });

      setCommens(sortedComments);
      setInteractedComments(userInteractions);
    }
  }, [comments, userId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const storedUserType = localStorage.getItem('tipoUsuario');
      setUserId(storedUserId);
      setUserType(storedUserType);

      const storedInteractions = localStorage.getItem(`interactions_${storedUserId}`);
      if (storedInteractions) {
        setInteractedComments(JSON.parse(storedInteractions));
      } else {
        setInteractedComments({});
      }
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
      if (!userId) {
        toast.error('Debe estar logueado para poder dar like.', { style: { backgroundColor: 'red', color: 'white' } });
        return;
      }
  
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);
  
      try {
        const comment = commens.find(c => c._id === commentId);
        const hasLiked = interactedComments[commentId] === 'like';
        const hasDisliked = interactedComments[commentId] === 'dislike';
  
        // 1. Si YA tiene "like", no hace nada
        if (hasLiked) {
          setIsButtonDisabled(false);
          return;
        }
  
        // 2. Si tenía "dislike", primero lo quitamos antes de poner "like"
        if (hasDisliked) {
          const removeResponse = await removeDislike(commentId, userId);
          if (!removeResponse.success) {
            console.error("❌ Error al remover dislike:", removeResponse.message);
            return;
          }
        }
  
        // 3. Ahora agregamos el like
        const response = await addLike(commentId, userId);
        if (response?.success) {
          
          setCommens(prevComments =>
            prevComments.map(c => 
              c._id === commentId 
                ? { ...response.comment, likedBy: [...response.comment.likedBy, userId] }
                : c
            )
          );
          setInteractedComments(prev => ({ ...prev, [commentId]: 'like' }));
        }
      } catch (error) {
        console.error("Error en handleLike:", error);
      } finally {
        setIsButtonDisabled(false);
      }
    },
    [isButtonDisabled, interactedComments, userId, commens]
  );
  
  /**
   * handleDislike: Cuando el usuario hace clic en "dislike".
   * - Si ya tiene "dislike", no hace nada (doble clic).
   * - Si tenía "like", lo quita y pone "dislike" (flipping).
   * - Si no tenía nada, simplemente agrega "dislike".
   */
  const handleDislike = useCallback(
    async (commentId) => {
      if (!userId) {
        toast.error('Debe estar logueado para poder dar dislike.', { style: { backgroundColor: 'red', color: 'white' } });
        return;
      }
  
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);
  
      try {
        const comment = commens.find(c => c._id === commentId);
        const hasLiked = interactedComments[commentId] === 'like';
        const hasDisliked = interactedComments[commentId] === 'dislike';
  
        // 1. Si YA tiene "dislike", no hace nada
        if (hasDisliked) {
          setIsButtonDisabled(false);
          return;
        }
  
        // 2. Si tenía "like", lo quitamos antes de poner "dislike"
        if (hasLiked) {
          const removeResponse = await removeLike(commentId, userId);
          if (!removeResponse.success) {
            console.error("❌ Error al remover like:", removeResponse.message);
            return;
          }
        }
  
        // 3. Ahora agregamos el dislike
        const response = await addDislike(commentId, userId);
        if (response?.success) {
          // 🔥 Forzamos actualización del estado
          setCommens(prevComments =>
            prevComments.map(c => 
              c._id === commentId 
                ? { ...response.comment, dislikedBy: [...response.comment.dislikedBy, userId] }
                : c
            )
          );
          setInteractedComments(prev => ({ ...prev, [commentId]: 'dislike' }));
        }
      } catch (error) {
        console.error("Error en handleDislike:", error);
      } finally {
        setIsButtonDisabled(false);
      }
    },
    [isButtonDisabled, interactedComments, userId, commens]
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
      toast.error('Error al enviar comentario. Intenta de nuevo.', { style: { backgroundColor: 'green', color: 'white' } });
    }
  };

  // Función para eliminar un comentario
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await delComment(commentId);
      if (response?.success) {
        toast.success("Comentario eliminado correctamente.");
        setCommens((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      } else {
        toast.error("Error al eliminar el comentario.");
      }
    } catch (error) {
      toast.error("No se pudo eliminar el comentario.");
      console.error("Error eliminando comentario:", error);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

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
              disabled={isButtonDisabled}
            >
              Dejar un comentario
            </button>
            {!isButtonDisabled && showInput && (
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
                <div className="flex justify-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={`transition-colors ${star <= (hoveredRating || rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                      />
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
      <section className="w-full max-w-3xl mx-auto mt-12 bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-xl h-96 md:h-[500px] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <MessageCircle className="mr-3 text-blue-500" />
          Comentarios
        </h2>

        {/* Botón de menú de opciones para eliminar comentario */}
        {userId === comment.userId?._id && (
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={() => toggleMenu(comment._id)}
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {menuOpen === comment._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                <button
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Eliminar comentario
                </button>
              </div>
            )}
          </div>
        )}
        {commens && commens.length > 0 ? (
          <ul className="space-y-10">
            {commens.map((comment) => (
              <li
                key={comment._id}
                className="relative bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-100"
              >
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                  <Image
                    src={comment.userId?.profilePicture || defaultProfilePic}
                    alt="Foto de perfil"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full border-2 border-blue-200 object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
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
                      <div className="mt-4 flex items-center justify-center">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`text-2xl ${index < comment.rankingId?.stars ? 'text-yellow-400' : 'text-gray-300'}`}
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
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${interactedComments[comment._id] === 'like' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                            } hover:bg-blue-200 hover:text-blue-700`}
                        >
                          <ThumbsUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{comment.likes || 0}</span>
                        </button>
                        <button
                          onClick={() => handleDislike(comment._id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${interactedComments[comment._id] === 'dislike' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                            } hover:bg-red-200 hover:text-red-700`}
                        >
                          <ThumbsDown className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{comment.dislikes || 0}</span>
                        </button>
                      </div>
                    )}
                    {/* Botón de opciones (solo si el usuario es el dueño del comentario) */}
                    {userId === comment.userId?._id && (
                      <div className="absolute top-5 right-0">
                        <button className="p-2 rounded-full" onClick={() => toggleMenu(comment._id)}>
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                        {menuOpen === comment._id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                            <button
                              className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Eliminar comentario
                            </button>
                          </div>
                        )}
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