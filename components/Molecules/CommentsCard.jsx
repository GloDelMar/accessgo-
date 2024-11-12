import React, { useState, useEffect } from 'react';
import { getCommentsByCompanyId } from '@/pages/api/api_comment';
import { useRouter } from 'next/router';

const defaultProfilePic = '/6073873.png';

export default function CommentSection() {
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id: companyId } = router.query; // Obtener el id de la compañía desde la URL

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) {
        setError("Company ID not found");
        setLoading(false);
        return;
      }

      try {
        const commentsData = await getCommentsByCompanyId(companyId);
        setCommentList(commentsData.data || []);
      } catch (error) {
        setError("Failed to fetch company data.");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  // Ordenar los comentarios por la fecha de creación (más reciente primero)
  const sortedComments = commentList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <section className="w-full h-full mt-2 flex flex-col p-2">
      <div className="w-full rounded-lg mt-6">
        <ul className="mt-4 space-y-5">
          {sortedComments.length > 0 ? (
            sortedComments.map((comment) => (
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
            ))
          ) : (
            <p className="text-center text-gray-500">No tienes comentarios.</p>
          )}
        </ul>
      </div>
    </section>
  );
}
