'use client';

import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { toast, Toaster } from 'sonner';
import { addDislike, addLike } from '../../pages/api/api_comment';
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

  useEffect(() => {
    const storedUserType = localStorage.getItem('tipoUsuario');
   
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

  const handleLike = async (commentId) => {
    try {
      if (interactedComments[commentId] === "like") {
        toast.error("Ya diste like a este comentario.");
        return;
      }

      const response = await addLike(commentId);
      if (response) {
        setInteractedComments((prev) => ({
          ...prev,
          [commentId]: "like",
        }));

        setCommens((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: (comment.likes || 0) + 1 }
              : comment
          )
        );
      }
    } catch (error) {
      toast.error(error.message, { style: { backgroundColor: "red", color: "white" } });
    }
  };

  const handleDislike = async (commentId) => {
    try {
      if (interactedComments[commentId] === "dislike") {
        toast.error("Ya diste dislike a este comentario.");
        return;
      }

      const response = await addDislike(commentId);
      if (response) {
        setInteractedComments((prev) => ({
          ...prev,
          [commentId]: "dislike",
        }));

        setCommens((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, dislikes: (comment.dislikes || 0) + 1 }
              : comment
          )
        );
      }
    } catch (error) {
      toast.error(error.message, { style: { backgroundColor: "red", color: "white" } });
    }
  };

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
                      className={`w-8 h-8 rounded-full border ${star <= rating ? 'bg-yellow-400' : 'bg-gray-200'
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

      <section className="w-full max-w-3xl mx-auto mt-12 bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <MessageCircle className="mr-3 text-blue-500" />
          Comentarios
        </h2>
        {comments && comments.length > 0 ? (
          <ul className="space-y-10">
            {comments.map((comment) => (
              <li key={comment._id} className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-100">
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
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 text-base mt-2 leading-relaxed">{comment.content}</p>
                    {comment.rankingId?.stars && (
                      <div className="mt-4 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`text-2xl ${index < comment.rankingId?.stars
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
                    {userType !== 'company' && (
                      <div className="mt-6 flex items-center space-x-8">
                        <button
                          onClick={() => handleLike(comment._id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${interactedComments[comment._id] === "like"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                            } hover:bg-blue-200 hover:text-blue-700`}
                        >
                          <ThumbsUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{comment.likes || 0}</span>
                        </button>
                        <button
                          onClick={() => handleDislike(comment._id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${interactedComments[comment._id] === "dislike"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
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
