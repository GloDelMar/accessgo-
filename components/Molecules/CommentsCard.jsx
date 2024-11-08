import { useState, useEffect } from 'react';
import { createComment, getCommentsByCompanyId } from '@/pages/api/api_comment';

export default function CommentSection({ companyId, initialComments }) {
  const [comment, setComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [commentList, setCommentList] = useState(initialComments);

  
  // Cargar comentarios cuando el componente se monte
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByCompanyId(companyId);
        if (response.success) {
          setCommentList(response.data);
        }
      } catch (error) {
        console.error('Error al cargar los comentarios:', error.message);
      }
    };

    fetchComments();
  }, [companyId]); // Vuelve a cargar los comentarios si cambia companyId

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const response = await createComment({
          companyId, // Pasar el ID de la empresa
          text: comment,
          userImage: 'ruta_a_la_imagen', // Ajusta según la información disponible
          username: 'Nombre de usuario',
          rating: 5, // Ajusta la calificación según necesites
        });

        if (response.success) {
          setCommentList([...commentList, response.data]);
          setComment('');
          setShowInput(false);
        }
      } catch (error) {
        console.error('Error al enviar el comentario:', error.message);
      }
    }
  };

  return (
    <section className='w-full h-full mt-6 flex flex-col'>
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

      <div className='w-full border border-[#CFD8DC] rounded-lg mt-6'>
        {commentList.length ? (
          commentList.map((comment, index) => (
            <div key={index} className='flex flex-col border-b border-[#CFD8DC] p-4'>
              <div className='flex flex-row items-center'>
                <img
                  className='w-[39px] h-[45px] md:w-[42px] md:h-[50px] lg:w-[48px] lg:h-[55px] rounded-full p-1'
                  src={comment.userImage || 'jhonDoe.png'}
                  alt='Imagen del usuario'
                />
                <p className='text-center md:text-base lg:text-lg ml-2'>{comment.username || 'Usuario Anónimo'}</p>
                <div className='flex flex-row ml-auto'>
                  {[...Array(comment.rating || 5)].map((_, idx) => (
                    <img
                      key={idx}
                      className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                      src='/estrellita.svg'
                      alt='Estrella'
                    />
                  ))}
                </div>
              </div>
              <p className='mt-2 text-sm md:text-base lg:text-lg text-[#546E7A]'>{comment.text}</p>
            </div>
          ))
        ) : (
          <p className='text-center p-4 text-[#546E7A]'>No hay comentarios para esta empresa.</p>
        )}
      </div>
    </section>
  );
}
