import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getCompanyById } from '@/pages/api/api_company';
import router from 'next/router';
import { getBusinessAverageRanking } from './api/api_ranking';
import { getCommentsByCompanyId } from './api/api_comment';

import UploadImageACC from '@/components/Molecules/UploadImageACC';
import ImageCarouselACC from '@/components/Molecules/ImageCarouselACC';
  Legend,
} from "chart.js";
import { getCompanyById } from "@/pages/api/api_company";
import router from "next/router";
import { getBusinessAverageRanking } from "./api/api_ranking";
import { getCommentsByCompanyId } from "./api/api_comment";
import  EstadisticasVisitas from "../components/Molecules/Estadisticas"

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Table = ({ title, comments, headers }) => (
  <div className='w-full mt-10'>
    <h3 className='text-2xl font-bold mb-4'>{title}</h3>
    <table className='min-w-full bg-white border border-gray-200'>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className='py-2 px-4 border-b'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='py-2 px-4 border-b'>Dato 1</td>
          <td className='py-2 px-4 border-b'>Dato 2</td>
          <td className='py-2 px-4 border-b'>Dato 3</td>
        </tr>
        {comments.map((comment, index) => (
          <tr key={index}>
            <td
              colSpan={headers.length}
              className='py-2 px-4 border-b bg-lime-50'
            >
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
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    datasets: [
      {
        label: `Visitas en ${currentYear}`,
        data: [12, 19, 3, 5, 2, 3, 10, 15, 8, 6, 7, 9], // Datos de ejemplo
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className='w-full mt-10'>
      <h3 className='text-2xl font-bold mb-4'>Visitas a tu perfil</h3>
      <Line data={data} options={options} />
    </div>
  );
};


const SesionPremium = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  // const [selectedImages, setSelectedImages] = useState([null, null, null, null]);

  const [selectedImages, setSelectedImages] = useState([null, null, null, null]);
  const [rango, setRango] = useState('semana');  ;
  
  const handleRangoChange = (event) => {
    setRango(event.target.value);
  };


  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formImage = selectedImages.map((image, index) => ({
      [`imagen${index + 1}`]: image
    }));
    const jsonForm = JSON.stringify(formImage);
    console.log(jsonForm);

    if (selectedImages.some((img) => img)) {
      router.push('/vista-base');
    } else {
      alert('No se han cargado imágenes.');
    }
  };

  // const handleImageChange = (event, index) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
  //       alert("Formato no válido. Usa JPEG, PNG o GIF.");
  //       return;
  //     }

  //     if (file.size > 5 * 1024 * 1024) {
  //       alert("El tamaño de la imagen no debe superar los 5MB.");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const updatedImages = [...selectedImages];
  //       updatedImages[index] = reader.result;
  //       setSelectedImages(updatedImages);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setCompanyId(storedUserId);
      } else {
        setError('Company ID not found in localStorage');
        setLoading(false);
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
        setError('Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const eventComments = [
    'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones',
    'Otro comentario sobre el evento'
  ];

  const promotionComments = [
    'Comentario sobre una promoción',
    'Otro comentario sobre una promoción'
  ];

  const menuComments = [
    'Comentario sobre el menú',
    'Otro comentario sobre el menú'
  ];

  return (
    <main className='flex overflow-hidden flex-col items-center px-4 sm:px-10 md:px-20 pt-28 bg-white pb-[1572px] max-sm:px-5 max-sm:py-24'>
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

          <div className='w-full lg:w-2/3 flex flex-col justify-center'>
            <div className='bg-white rounded-[30px] shadow-md p-6 w-full'>
              <div className='flex flex-col md:flex-row md:justify-start gap-4 md:items-center mb-4'>
                <h3 className='text-lg font-semibold text-[#2F4F4F] mb-2 md:mb-0'>
                  Tu calificación es de:
                </h3>
                <div className='flex'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } fill-current`}
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
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
                      className='bg-[#F5F0E5] p-2 rounded text-center text-sm'
                    >
                      {comment.content}
                    </p>
                  ))
                ) : (
                  <p className='text-center text-sm'>
                    No hay comentarios disponibles.
                  </p>
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

        <div className='flex flex-col justify-center items-center h[200px] w[200px]'>
          <h1 className='mt-10 mb-10 text-bold'>Muestra tus accesibilidades</h1>
          <ImageCarouselACC userId={companyId} />
          <UploadImageACC />

          <div className='flex justify-center items-center p-4 ml-1'>
              <Link legacyBehavior href='/vista-prem'>
                <button
                  className=' mt-20 px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
                >
                  Listo
                </button>
              </Link>
            </div>
        </div>

        <Table
          title='Todos tus Eventos'
          comments={eventComments}
          headers={['EVENTO', 'FECHA', 'HORARIO']}
        />
        <Table
          title='Todas tus Promociones'
          comments={promotionComments}
          headers={['PROMOCIÓN', 'FECHA', 'HORARIO']}
        />
        <Table
          title='Tu Menú'
          comments={menuComments}
          headers={['PLATILLO', 'FECHA', 'HORARIO']}
        />
        <ProfileVisitsChart />

        <div className='flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]'>
          <button className='w-[155px] h-[40px] bg-white border-2 rounded-lg'>
            <Link legacyBehavior href='/vista-prem'>
        
        <Table title="Todos tus Eventos" comments={eventComments} headers={['EVENTO', 'FECHA', 'HORARIO']} />
        <Table title="Todas tus Promociones" comments={promotionComments} headers={['PROMOCIÓN', 'FECHA', 'HORARIO']} />
        <Table title="Tu Menú" comments={menuComments} headers={['PLATILLO', 'FECHA', 'HORARIO']} />
        
        <div>
      <h3 className="text-2xl text-center font-semibold my-8 text-[#2F4F4F]">Estas son las estadísticas de visitas a tu perfil de AccessGo Premium</h3>
      
      {/* Componente de estadísticas pasando 'rango' como prop */}
      <EstadisticasVisitas rango={rango} />
      
      {/* Selector de rango */}
      <select value={rango} onChange={handleRangoChange}>
        <option value="semana">Semana</option>
        <option value="mes">Mes</option>
        <option value="año">Año</option>
      </select>
    </div>

  
        <div className="flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]">
          <button className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
            <Link legacyBehavior href="/vista-prem">
              <a>Cancelar</a>
            </Link>
          </button>
          <button className='w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center'>
            <Link legacyBehavior href='/sesion-prem'>
              <a>Guardar Cambios</a>
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SesionPremium;
