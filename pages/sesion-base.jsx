import Image from 'next/image';
import Link from 'next/link';
import { getCompanyById } from "@/pages/api/api_company";
import React, { useEffect, useState, useRef } from 'react';
import router from 'next/router';
import { getBusinessAverageRanking } from './api/api_ranking';
import { getCommentsByCompanyId } from './api/api_comment';




const View21 = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [companyId, setCompanyId] = useState(null)
  const [showAllComments, setShowAllComments] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formImage = {
      imagen1: selectedImage1,
      imagen2: selectedImage2,
      imagen3: selectedImage3,
      imagen4: selectedImage4

    };
    console.log(JSON.stringify(formImage));
    const jsonForm = JSON.stringify(formImage);
    if (jsonForm) {
      router.push('/vista-base');
      return (jsonForm);
    } else {
      console.log('HAY ERROR PORQUE NO HAY IMAGENES CARGADAS')
    }
  };
  // console.log(selectedImage1, selectedImage2, selectedImage3, selectedImage4);

  const handleImageChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {

        const imageUrl = reader.result;
        if (imageKey === 'imagenbase1') {
          setSelectedImage1(imageUrl);
        } else if (imageKey === 'imagenbase2') {
          setSelectedImage2(imageUrl);
        } else if (imageKey === 'imagenbase3') {
          setSelectedImage3(imageUrl);
        } else if (imageKey === 'imagenbase4') {
          setSelectedImage4(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setCompanyId(storedUserId);
      } else {
        setError("Company ID not found in localStorage")
        setLoading(false)
      }
    }
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) return;
      try {
        const data = await getCompanyById(companyId);
        setCompanyData(data);

        const avgData = await getBusinessAverageRanking(companyId);
        setAverageRating(avgData.averageRating || 0);

        const commentsData = await getCommentsByCompanyId(companyId);
        setComments(commentsData.data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch company data")
      } finally {
        setLoading(false)
      }
    }

    if (companyId) {
      fetchCompanyData()
    }
  }, [companyId]);

  if (loading) return <p className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-12'>Loading</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        <h1 className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mb-12'>
          ¡Bienvenido!
          <p className='text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-2 mb-12'>
            {companyData?.data?.company?.companyName ||
              'Información no disponible.'}
          </p>
        </h1>

        <div className='flex flex-col lg:flex-row gap-6 p-6 max-w-4xl mx-auto'>
          <div className='w-full lg:w-1/3 flex justify-center'>
            <div className='bg-[#F5F0E5] w-full max-w-[231px] h-auto rounded-[25px] shadow-md p-6 text-center'>
              <Image
                src={
                  companyData?.data?.company?.profilePicture || '/perfil1.png'
                }
                alt='Foto de perfil'
                width={300}
                height={150}
                className='rounded-full mx-auto mb-4'
              />
            </div>
          </div>

          <div className='w-full  lg:w-2/3 flex flex-col justify-center'>
            <div className='bg-white rounded-[30px] shadow-md p-6 w-full'>
              <div className='flex flex-col md:flex-row md:justify-start gap-4 md:items-center mb-4'>
                <h3 className='text-lg font-semibold text-[#2F4F4F] mb-2 md:mb-0'>
                  Tu calificación es de:
                </h3>
                <div className='flex'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"
                        } fill-current`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>
                  Últimos comentarios:
                </h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4'>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <p
                      key={comment._id}
                      className="bg-[#F5F0E5] p-2 rounded text-center text-sm"
                    >
                      {comment.content}
                    </p>
                  ))
                ) : (
                  <p className="text-center text-sm">No hay comentarios disponibles.</p>
                )}
              </div>

              <button
                className='px-2.5 py-0.5 mt-11 text-base bg-[#F5F0E5] rounded-[30px] md:mt-10'
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? 'Mostrar menos' : 'Todos los comentarios'}
              </button>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <h3 className='text-xl text-center font-semibold mb-10 text-[#2F4F4]'>
            Cambia tus imagenes
          </h3>
          <div className='flex flex-row justify-center gap-5'>
            <label className='flex flex-col items-center'>
              {selectedImage1 ? (
                <Image
                  src={selectedImage1}
                  alt='Imagen 1'
                  width={200}
                  height={200}
                  className=''
                />
              ) : (
                <Image
                  src='/foto.jpg'
                  alt='Imagen 1'
                  width={150}
                  height={150}
                  className='rounded-full'
                />
              )}
              <input
                type='file'
                id='img1'
                className='hidden'
                onChange={(event) => handleImageChange(event, 'imagenbase1')}
              />
            </label>
            <label className='flex flex-col items-center'>
              {selectedImage2 ? (
                <Image
                  src={selectedImage2}
                  alt='Imagen 2'
                  width={200}
                  height={200}
                  className=''
                />
              ) : (
                <Image
                  src='/foto.jpg'
                  alt='Imagen 2'
                  width={150}
                  height={150}
                  className='rounded-full'
                />
              )}
              <input
                type='file'
                id='img2'
                className='hidden'
                onChange={(event) => handleImageChange(event, 'imagenbase2')}
              />
            </label>
            <label className='flex flex-col items-center'>
              {selectedImage3 ? (
                <Image
                  src={selectedImage3}
                  alt='Imagen 3'
                  width={300}
                  height={300}
                  className=''
                />
              ) : (
                <Image
                  src='/foto.jpg'
                  alt='Imagen 3'
                  width={150}
                  height={150}
                  className='rounded-full'
                />
              )}
              <input
                type='file'
                id='img3'
                className='hidden'
                onChange={(event) => handleImageChange(event, 'imagenbase3')}
              />
            </label>
            <label className='flex flex-col items-center'>
              {selectedImage4 ? (
                <Image
                  src={selectedImage4}
                  alt='Imagen 4'
                  width={300}
                  height={300}
                  className=''
                />
              ) : (
                <Image
                  src='/foto.jpg'
                  alt='Imagen 4'
                  width={150}
                  height={150}
                  className='rounded-full '
                />
              )}
              <input
                type='file'
                id='img4'
                className='hidden'
                onChange={(event) => handleImageChange(event, 'imagenbase4')}
              />
            </label>
          </div>
          <div>
            <div className='mt-10 flex justify-center'>
              <button
                className='px-12 py-2 border border-transparent rounded-md shadow-sm
                text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
                onClick={(handleSubmit)}
              >
                Listo
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center py-5'>
          <Link legacyBehavior href='/cobro'>
            <button
              className=' mt-20 px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
            >
              Unete a Premium
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default View21;