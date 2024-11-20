import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { getCompanyById } from "@/pages/api/api_company";
import router from 'next/router';
import { getBusinessAverageRanking } from './api/api_ranking';
import { getCommentsByCompanyId } from './api/api_comment';


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);


const Table = ({ title, comments, headers }) => (
  <div className="w-full mt-10">
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="py-2 px-4 border-b">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b">Dato 1</td>
          <td className="py-2 px-4 border-b">Dato 2</td>
          <td className="py-2 px-4 border-b">Dato 3</td>
        </tr>
        {comments.map((comment, index) => (
          <tr key={index}>
            <td colSpan={headers.length} className="py-2 px-4 border-b bg-lime-50">
              {comment}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProfileVisitsChart = () => {
  const currentYear = new Date().getFullYear();
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: `Visitas en ${currentYear}`,
        data: [12, 19, 3, 5, 2, 3, 10, 15, 8, 6, 7, 9], // Datos de ejemplo
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full mt-10">
      <h3 className="text-2xl font-bold mb-4">Visitas a tu perfil</h3>
      <Line data={data} options={options} />
    </div>
  );
};

const sesionPremium = () => {
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


  const eventComments = [
    "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones",
    "Otro comentario sobre el evento",
  ];

  const promotionComments = [
    "Comentario sobre una promoción",
    "Otro comentario sobre una promoción",
  ];

  const menuComments = [
    "Comentario sobre el menú",
    "Otro comentario sobre el menú",
  ];

  return (
    <main className="flex overflow-hidden flex-col items-center px-4 sm:px-10 md:px-20 pt-28 bg-white pb-[1572px] max-sm:px-5 max-sm:py-24">
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
        <Table title="Todos tus Eventos" comments={eventComments} headers={['EVENTO', 'FECHA', 'HORARIO']} />
        <Table title="Todas tus Promociones" comments={promotionComments} headers={['PROMOCIÓN', 'FECHA', 'HORARIO']} />
        <Table title="Tu Menú" comments={menuComments} headers={['PLATILLO', 'FECHA', 'HORARIO']} />
        <ProfileVisitsChart /> {/* Add the new ProfileVisitsChart component here */}
      </div>

      <div className="flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]">
        <button className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          <Link legacyBehavior href="/vista-prem"><a>Cancelar</a></Link>
        </button>
        <button className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center">
          <Link legacyBehavior href="/sesion-prem"><a>Guardar Cambios</a></Link>
        </button>
      </div>
    </main>
  );
};

export default sesionPremium;