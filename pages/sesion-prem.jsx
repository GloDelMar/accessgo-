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
  Legend,
} from "chart.js";
import { getCompanyById } from "@/pages/api/api_company";
import router from "next/router";
import { getBusinessAverageRanking } from "./api/api_ranking";
import { getCommentsByCompanyId } from "./api/api_comment";
import EstadisticasVisitas from "../components/Molecules/Estadisticas"
import { getPromoByCompanyId } from "./api/api_promos";


ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);


const SesionPremium = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [selectedImages, setSelectedImages] = useState([null, null, null, null]);
  const [rango, setRango] = useState('semana');
  const [promociones, setPromociones] = useState(null);

  const handleRangoChange = (event) => {
    setRango(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formImage = selectedImages.map((image, index) => ({
      [`imagen${index + 1}`]: image,
    }));
    const jsonForm = JSON.stringify(formImage);
    console.log(jsonForm);

    if (selectedImages.some((img) => img)) {
      router.push("/vista-base");
    } else {
      alert("No se han cargado imágenes.");
    }
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        alert("Formato no válido. Usa JPEG, PNG o GIF.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("El tamaño de la imagen no debe superar los 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...selectedImages];
        updatedImages[index] = reader.result;
        setSelectedImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

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
    if (!companyId) return;

    const fetchCompanyData = async () => {
      try {
        setLoading(true);

        const data = await getCompanyById(companyId);
        setCompanyData(data);

        const avgData = await getBusinessAverageRanking(companyId);
        setAverageRating(avgData.data.averageRating || 0);

        const commentsData = await getCommentsByCompanyId(companyId);
        setComments(commentsData.data || []);

        const promocionesData = await getPromoByCompanyId(companyId);
        setPromociones(promocionesData.data || []);

       } catch (error) {
        console.error(error);
        setError('Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEditPromotion = (promotionId) => {
    router.push(`/promociones?id=${promotionId}`);
  };


  return (
    <main className="flex overflow-hidden flex-col items-center px-4 sm:px-10 md:px-20 pt-28 bg-white pb-[1572px] max-sm:px-5 max-sm:py-24">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mb-12">
          ¡Bienvenido!
          <p className="text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mt-2 mb-12">
            {companyData?.data?.company?.companyName || 'Información no disponible.'}
          </p>
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-4xl mx-auto">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="bg-[#F5F0E5] w-full max-w-[231px] h-auto rounded-[25px] shadow-md p-6 text-center">
              <Image
                src={companyData?.data?.company?.profilePicture || '/perfil1.png'}
                alt="Foto de perfil"
                width={300}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
            </div>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col justify-center">
            <div className="bg-white rounded-[30px] shadow-md p-6 w-full">
              <div className="flex flex-col md:flex-row md:justify-start gap-4 md:items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2F4F4F] mb-2 md:mb-0">
                  Tu calificación es de:
                </h3>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                        } fill-current`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Últimos comentarios:</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <p key={comment._id} className="bg-[#F5F0E5] p-2 rounded text-center text-sm">
                      {comment.content}
                    </p>
                  ))
                ) : (
                  <p className="text-center text-sm">No hay comentarios disponibles.</p>
                )}
              </div>

              <button
                className="px-2.5 py-0.5 mt-11 text-base bg-[#F5F0E5] rounded-[30px] md:mt-10"
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? 'Mostrar menos' : 'Todos los comentarios'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl text-center font-semibold mb-10 text-[#2F4F4F]">
            Cambia tus imágenes
          </h3>
          <div className="flex flex-row justify-center gap-5">
            {selectedImages && selectedImages.length > 0 ? (
              selectedImages.map((image, index) => (
                <label key={index} className="flex flex-col items-center">
                  <Image
                    src={image || '/foto.jpg'}
                    alt={`Imagen ${index + 1}`}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => handleImageChange(event, index)}
                  />
                </label>
              ))
            ) : (
              <p className="text-center text-sm">No hay imágenes seleccionadas.</p>
            )}
          </div>
          <div>
            <div className="mt-10 flex justify-center">
              <button
                className="px-12 py-2 border border-transparent rounded-md shadow-sm
                  text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
                onClick={handleSubmit}
              >
                Listo
              </button>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col mt-6'>
          <div className="max-w-xxl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-4">
            <div className="bg-[#2F4F4F] text-white p-4">
              <h2 className="text-2xl lg:text-3xl text-center">
              Tus promociones este mes:
              </h2>
            </div>
            <div className="p-4">
                {/* Indicador de carga */}
                {loading && <div className="text-center">Cargando promociones...</div>}

                {/* Error */}
                {error && <div className="text-red-500">{error}</div>}

                {/* Lista de promociones */}
                {!loading && promociones && promociones.length === 0 && (
                  <div className="text-gray-500">No hay promociones disponibles.</div>
                )}

                {!loading && promociones && promociones.length > 0 && (
                  <ul className="space-y-6">
                    {promociones.map((promocion) => (
                      <li
                        key={promocion._id}
                        className="p-6 border rounded-lg shadow-sm bg-[#F5F0E5] flex flex-col md:flex-row justify-between items-start md:items-center"
                      >
                        {/* Información de la promoción */}
                        <div className="flex-1">
                          <h4 className="text-xl font-bold  mb-2">
                            {promocion.name || "Sin título"}
                          </h4>
                          <p className="mb-2 text-gray-700">
                            {promocion.description || "Sin descripción"}
                          </p>
                          <span className="text-sm text-gray-500">
                            Fecha de vencimiento:{" "}
                            {promocion.endDate
                              ? new Date(promocion.endDate).toLocaleDateString()
                              : "Sin fecha"}
                          </span>
                        </div>

                        {/* Botón de edición */}
                        <button
                          onClick={() => handleEditPromotion(promocion._id)}
                          className="mt-4 md:mt-0 md:ml-6 px-4 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
                        >
                          Editar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl text-center font-semibold my-8 text-[#2F4F4F]">Estas son las estadísticas de visitas a tu perfil de AccessGo Premium</h3>

          <EstadisticasVisitas rango={rango} />

          <select value={rango} onChange={handleRangoChange}>
            <option value="semana">Semana</option>
            <option value="mes">Mes</option>
            <option value="año">Año</option>
          </select>
        </div>


        <div className="flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]">
          <button className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
            <Link legacyBehavior href={`/promociones?id=${companyId}`}>
              <a>Cancelar</a>
            </Link>
          </button>
          <button className="w-[155px] h-[40px] bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C] text-white rounded-lg flex items-center justify-center">
            <Link legacyBehavior href="/sesion-prem">
              <a>Guardar Cambios</a>
            </Link>
          </button>
        </div>
      </div>
    </main>
  );

};

export default SesionPremium;