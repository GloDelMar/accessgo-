import ParticipaSlider from "./Molecules/participaSlider";
import Carousel from "./Molecules/Carrusel";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAllCompanies, getCompanyById } from "@/pages/api/api_company";
import { toast } from "sonner";
import Modal from "./Molecules/MapModal";

const HomeContent = () => {
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getAllCompanies()
      .then((companyData) => {
        setCompanies(companyData);
        setFilteredCompanies(companyData.slice(-4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("[getCompanies error]", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = async (id) => {
    try {
      const companyData = await getCompanyById(id);
      const companyType = companyData?.data?.company?.cuenta;

      if (companyType === "free") {
        router.push(`vista-base?id=${id}`);
      } else if (companyType === "premium") {
        router.push(`vista-prem?id=${id}`);
      } else {
        throw new Error("Tipo de compañía inválido.");
      }
    } catch (error) {
      console.error("Error al manejar el clic de la tarjeta:", error.message);
      toast.error("Error al redirigir a la página de la compañía.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleButtonClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/MapWithPlaces");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col text-[#2F4F4F] w-full p-4 justify-center font-sans">
      <div className="flex flex-col md:items-center md:flex-row gap-4 mx-[40px] p-2 text-[#2F4F4F]">
        <div className="flex-1 text-center md:text-left mt-[10px]">
          <p className="text-center mt-[8px] md:text-left">Encuentra tu lugar favorito</p>
          <h1 className="text-4xl font-bold mb-2">¡Bienvenido a AccessGo!</h1>
          <p className="mt-[20px]">
            La accesibilidad es un derecho fundamental. Con AccessGo facilitamos tu búsqueda de establecimientos incluyentes, ayudándote a encontrar lugares que se ajusten a tus necesidades específicas.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <img
            className="h-[200px] md:h-[400px]"
            src="/Group 4717@2x.png"
            alt="Tarjetas con tres imágenes de personas con discapacidad siendo incluidas en diferentes escenarios, de títulos: Accesibilidad, Inclusión, AccessGo"
          />
        </div>
      </div>

      <div className="mx-2 mt-[40] md:mx-[25px]">
        <h3 className="text-2xl text-center md:text-left font-bold mb-2">¡Descubre a nuestros socios más recientes!</h3>
        <p className="text-center mt-3 md:text-left">Porque sabemos que buscas lugares diseñados para disfrutar al máximo:</p>
        <div className="hidden lg:hidden md:flex md:flex-wrap md:justify-center gap-4 mt-[51px] mb-4">
          {filteredCompanies.slice(-3).map((company) => (
            <div
              key={company._id}
              onClick={() => handleCardClick(company._id)}
              className="relative rounded-lg w-[200px] h-[241px] shadow-md overflow-hidden cursor-pointer"
            >
              <Image
                src={company.profilePicture || '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'}
                alt={company.companyName}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 w-full"
              />
              <div className="relative p-4 w-[200px] h-[241px] bg-black bg-opacity-50 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">{company.companyName}</h3>
                <div className="flex items-center mt-2">
                  {Array.from({ length: company.averageRating || 0 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white mt-2">
                  {company.giro || 'Información de accesibilidad no disponible'}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 justify-center mt-[51px] mb-4">
          {filteredCompanies.slice(-4).map((company) => (
            <div
              key={company._id}
              onClick={() => handleCardClick(company._id)}
              className="relative rounded-lg w-[200px] h-[241px] shadow-md overflow-hidden cursor-pointer transition-transform transform hover:shadow-[0_0_15px_5px_#2F4F4F] hover:scale-105"
            >
              <Image
                src={company.profilePicture || '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'}
                alt={company.companyName}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 w-[80px]"
              />
              <div className="relative p-4 w-[200px] h-[241px] bg-black bg-opacity-50 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">{company.companyName}</h3>
                <div className="flex items-center mt-2">
                  {[...Array(company.rating || 0)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div> <div className="flex items-center mt-2">
                  {Array.from({ length: company.averageRating || 0 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white mt-2">{company.giro || 'Información de accesibilidad no disponible'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden mt-[40px] flex justify-center">
        <Carousel>
          {filteredCompanies.map((company, index) => (
            <div
              key={company._id}
              onClick={() => handleCardClick(company._id)}
              className="relative border rounded-md w-[90%] max-w-[200px] mx-auto h-[251px] overflow-hidden cursor-pointer"
            >
              <Image
                src={company.profilePicture || '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'}
                alt={`Imagen de ${company.companyName}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-[251px]"
              />
              <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent w-full text-white">
                <h4 className="text-[15px] font-bold">{company.companyName}</h4>
                <div className="flex items-center mt-2">
                  {Array.from({ length: company.averageRating || 0 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[10px] mt-2">{company.giro || 'Información de accesibilidad no disponible'}</p>
              </div>
            </div>
          ))}
        </Carousel>

      </div>

      <p className="text-2xl mt-6 text-center md:text-left font-semibold mb-2">Encuentra los lugares más cercanos a ti con accesibilidad garantizada explorando el mapa en el siguiente botón:
      </p>
      <div className="relative mt-4 mb-5 group cursor-pointer flex justify-center">

        <button
          onClick={handleButtonClick}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#F7D547] border border-[#8CC63F] 
               hover:bg-[#F7D547]/10 dark:hover:bg-[#F7D547]/20 rounded-full shadow-md 
               transition-all hover:shadow-lg group-hover:border-[#F7D547]"
        >
          <div
            className="flex items-center justify-center w-8 h-8 bg-[#F7D547]/20 dark:bg-[#F7D547]/30 
                 rounded-full group-hover:bg-[#F7D547]/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-[#2F4858]"
            >
              <path d="M10.59 15.41L5 12l12-7-3.4 12.15a.5.5 0 01-.82.26l-2.67-2.67a.5.5 0 00-.71 0z" />
            </svg>
          </div>

          <span className="text-sm font-medium text-[#2F4858]">Explorar Mapa</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-[#2F4858]"
          >
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
            <path d="M9.09 9L15 12l-3 7" />
            <path d="M9 21l3-6 3 6" />
          </svg>
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>

        <h2 className="text-xl font-bold mb-4">¡Inicia Sesión!</h2>
        <p className="mb-4">
          Necesitas iniciar sesión o registrarte para explorar el mapa y ver lugares accesibles cercanos a ti.
        </p>
        <div className="flex flex-row justify-center mt-4 space-x-6">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
          >
            Ir a Iniciar Sesión
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
          >
            Ir a Registrarse
          </button>
        </div>
      </Modal>

      <div className="mt-[40px] mx-2 ">
        <h3 className="text-2xl text-center md:text-left font-bold mb-2">Y para ti, que buscas ser parte del cambio:</h3>
        <p className="text-center my-[40px] md:text-left">Sé parte del cambio y muestra tu compromiso con la accesibilidad</p>
        <ul className="hidden sm:flex sm:flex-row items-center justify-center space-x-0 sm:space-x-4 mt-[40px]">
          <Link legacyBehavior href="/voluntariado">
            <li className="card border rounded w-[223px] rounded-[8px] border-[#E8DECF] h-[178px] mb-4 sm:mb-0 cursor-pointer">
              <div><img className="w-[24px] h-[24px] mt-[16px] ml-[16px] mb-[13px]" src="/ayudar.png" alt="icono de ayudar" /></div>
              <div><p className="ml-[16px] font-bold">Voluntariado</p>
                <p className="ml-[16px]">Únete a nuestra red de voluntariado y contribuye con tu tiempo y habilidades.</p>
              </div>
            </li>
          </Link>
          <Link legacyBehavior href="/donaciones">
            <li className="card rounded-[8px] border w-[223px] h-[178px] border-[#E8DECF] mb-4 sm:mb-0 cursor-pointer">
              <div><img className="w-[24px] h-[24px] mt-[16px] ml-[16px] mb-[13px]" src="/donar.svg" alt="icono de donaciones" /></div>
              <div><p className="ml-[16px] font-bold">Donaciones</p>
                <p className="ml-[16px]">Apoya nuestros esfuerzos para mejorar la accesibilidad en espacios públicos.</p>
              </div>
            </li>
          </Link>
        </ul>
        <div className="sm:hidden">
          <ParticipaSlider />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;