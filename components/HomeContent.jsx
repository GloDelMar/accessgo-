import { getAllCompanies, getCompanyById } from "@/pages/api/api_company";
import { Card, CardContent } from "@mui/material";
import { MapPin } from "lucide-react";
import ParticipaSlider from './Molecules/participaSlider';
import Carousel from './Molecules/Carrusel';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Modal from "./Molecules/MapModal";

import MapComponent from "./Organism/MapComponent";
import MapSection from "./Organism/MapSection";
import Link from 'next/link';







const HomeContent = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllCompanies()
      .then((companyData) => {
        setCompanies(companyData);
        setFilteredCompanies(companyData.slice(-4));
        setLoading(false);
      })
      .catch((error) => {
        console.error('[getCompanies error]', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          setUserLocation({
            latitude: 20.5888,
            longitude: -100.3899,
          });
        }
      );
    } else {
      console.warn("Geolocalización no soportada por el navegador.");
      setUserLocation({
        latitude: 20.5888,
        longitude: -100.3899,
      });
    }
  }, []);

  const images = [
    '/carlay/baston.jpg',
    '/carlay/lse.jpg',
    '/carlay/senas.jpg',
    '/carlay/silla.jpg'
  ];

  const text = [
    'La accesibilidad es un derecho fundamental.',
    'Y AccessGo es el medio de comunicación entre los establecimientos incluyentes y las personas.',
    'AccessGo facilita tu búsqueda de lugares accesibles cerca a tu ubicación actual o por zona a nivel nacional. Como parte de nuestros usuarios podrás compartir opiniones y recomendaciones con toda la comunidad.',
    'AccessGo también es el apoyo para que los negocios, establecimientos y compañías tengan un Mayor alcance de marca y servicio. Demostrando su compromiso con las personas, la accesibilidad y la calidad al unirse como empresa.'
  ];

  const images2 = [
    '/referencias/calific.jpg',
    '/referencias/comentar.jpg',
    '/referencias/geo.jpg',
    '/referencias/rest7.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setLoading(true);
    getAllCompanies()
      .then((companyData) => {
        setCompanies(companyData);
        setFilteredCompanies(companyData.slice(-4));
        setLoading(false);
      })
      .catch((error) => {
        console.error('[getCompanies error]', error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = async (id) => {
    try {
      const companyData = await getCompanyById(id);
      const companyType = companyData?.data?.company?.cuenta;

      if (companyType === 'free') {
        router.push(`vista-base?id=${id}`);
      } else if (companyType === 'premium') {
        router.push(`vista-prem?id=${id}`);
      } else {
        throw new Error('Tipo de compañía inválido.');
      }
    } catch (error) {
      console.error('Error al manejar el clic de la tarjeta:', error.message);
      toast.error('Error al redirigir a la página de la compañía.');
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  const handleButtonClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/MapWithPlaces');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col text-[#2F4F4F] w-full p-4 justify-center font-sans'>
      <h1 className='text-4xl text-center font-bold mb-4'>
        ¡Bienvenido a AccessGo!
      </h1>
      <h2 className='text-2xl text-center font-bold mt-4 mb-8'>
        El punto de unión entre las empresas accesibles y las personas
      </h2>
      <div className='bg-[#2F4F4F] h-[500px] md:h-auto text-white p-4 md:p-6 rounded-lg flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto'>
        <div className='w-full md:w-1/2 flex items-center justify-center'>
          <p className='text-base md:text-xl font-medium text-center px-2 md:px-4 leading-relaxed'>
            {text[currentIndex]}
          </p>
        </div>
        <div className='relative w-full md:w-1/2 h-64 md:h-80 flex justify-center items-center'>
          <Image
            src={images[currentIndex]}
            alt="Accesibilidad"
            className="w-auto h-full object-cover rounded-lg"
            priority={true}
            width={500} // Valor arbitrario solo para cumplir con Next.js
            height={500}
          />
        </div>
      </div>
      <div className='mx-2 mt-4 md:mx-[25px]'>
        <div className='justify-self-center flex flex-col '>
          <div>
            <h1 className='text-4xl text-center md:text-left font-bold mt-4 mb-2'>
              ¡ Únete a nuestra comunidad !
            </h1>
            <div className='mt-10 gap-8 flex flex-col justify-center items-center '>
              <Link legacyBehavior href='/signup'>
                <button
                  className='justify-center  px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
                >
                  Únete ahora
                </button>
              </Link>

              <h3 className='text-2xl align-bottom md:text-left font-bold'>
                Descubre nuevos destinos...
              </h3>
            </div>
          </div>
        </div>

        <div className='hidden lg:hidden md:flex md:flex-wrap md:justify-center gap-4 mt-[51px] mb-4'>
          {filteredCompanies.slice(-3).map((company) => (
            <div
              key={company._id}
              onClick={() => handleCardClick(company._id)}
              className='relative rounded-lg w-[200px] h-[241px] shadow-md overflow-hidden cursor-pointer'
            >
              <Image
                src={
                  company.profilePicture ||
                  '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'
                }
                alt={company.companyName}
                className="absolute inset-0 w-full h-full object-cover"
                fill={true}
                priority={true}

              />
              <div className='relative p-4 w-[200px] h-[241px] bg-black bg-opacity-50 flex flex-col justify-end'>
                <h3 className='text-lg font-semibold text-white'>
                  {company.companyName}
                </h3>
                <div className='flex items-center mt-2'>
                  {Array.from({ length: company.averageRating || 0 }).map(
                    (_, i) => (
                      <svg
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
                      </svg>
                    )
                  )}
                </div>
                <p className='text-sm text-white mt-2'>
                  {company.giro || 'Información de accesibilidad no disponible'}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='hidden lg:grid lg:grid-cols-4 gap-4 justify-center mt-[51px] mb-4'>
          {filteredCompanies.slice(-4).map((company) => (
            <div
              key={company._id}
              onClick={() => handleCardClick(company._id)}
              className='relative rounded-lg w-[200px] h-[241px] shadow-md overflow-hidden cursor-pointer transition-transform transform hover:shadow-[0_0_15px_5px_#2F4F4F] hover:scale-105'
            >
              <Image
                src={
                  company.profilePicture ||
                  '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'
                }
                alt={company.companyName}
                fill={true}
                className='absolute inset-0 w-[80px] object-cover'
                priority={true}
              />
              <div className='relative p-4 w-[200px] h-[241px] bg-black bg-opacity-25 flex flex-col justify-end'>
                <h3 className='text-lg font-semibold text-white'>
                  {company.companyName}
                </h3>
                <div className='flex items-center mt-2'>
                  {[...Array(company.rating || 0)].map((_, i) => (
                    <svg
                      key={i}
                      className='w-5 h-5 text-yellow-400 fill-current'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
                    </svg>
                  ))}
                </div>{' '}
                <div className='flex items-center mt-2'>
                  {Array.from({ length: company.averageRating || 0 }).map(
                    (_, i) => (
                      <svg
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
                      </svg>
                    )
                  )}
                </div>
                <p className='text-sm text-white mt-2'>
                  {company.giro || 'Información de accesibilidad no disponible'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='md:hidden mt-[40px] flex justify-center'>
        <Carousel>
          {filteredCompanies.map((company, index) => (
            <div
              key={company._id}
              onClick={() => handleCardClick(company._id)}
              className='relative border rounded-md w-[90%] max-w-[200px] mx-auto h-[251px] overflow-hidden cursor-pointer'
            >
              <Image
                src={
                  company.profilePicture ||
                  '/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png'
                }
                alt={`Imagen de ${company.companyName}`}
                fill={true}
                className='w-full h-[251px] object-cover'
                priority={true}
              />
              <div className='absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent w-full text-white'>
                <h4 className='text-[15px] font-bold'>{company.companyName}</h4>
                <div className='flex items-center mt-2'>
                  {Array.from({ length: company.averageRating || 0 }).map(
                    (_, i) => (
                      <svg
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z' />
                      </svg>
                    )
                  )}
                </div>
                <p className='text-[10px] mt-2'>
                  {company.giro || 'Información de accesibilidad no disponible'}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Aqui va el mapa */}
      <MapSection
        userLocation={userLocation}
        filteredCompanies={filteredCompanies}
        handleCardClick={handleCardClick}
      />

      {/* <div className='relative mt-4 mb-5 group cursor-pointer flex justify-center'>
        <button
          onClick={handleButtonClick}
          className='flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#F7D547] border border-[#8CC63F] 
               hover:bg-[#F7D547]/10 dark:hover:bg-[#F7D547]/20 rounded-full shadow-md 
               transition-all hover:shadow-lg group-hover:border-[#F7D547]'
        >
          <div
            className='flex items-center justify-center w-8 h-8 bg-[#F7D547]/20 dark:bg-[#F7D547]/30 
                 rounded-full group-hover:bg-[#F7D547]/30'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-5 h-5 text-[#2F4858]'
            >
              <path d='M10.59 15.41L5 12l12-7-3.4 12.15a.5.5 0 01-.82.26l-2.67-2.67a.5.5 0 00-.71 0z' />
            </svg>
          </div>

          <span className='text-sm font-medium text-[#2F4858]'>
            Explorar Mapa
          </span>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-5 h-5 text-[#2F4858]'
          >
            <path d='M12 2a10 10 0 100 20 10 10 0 000-20z' />
            <path d='M9.09 9L15 12l-3 7' />
            <path d='M9 21l3-6 3 6' />
          </svg>
        </button>
      </div> */}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className='text-xl font-bold mb-4'>¡Inicia Sesión!</h2>
        <p className='mb-4'>
          Necesitas iniciar sesión o registrarte para explorar el mapa y ver
          lugares accesibles cercanos a ti.
        </p>
        <div className='flex flex-row justify-center mt-4 space-x-6'>
          <button
            onClick={() => router.push('/login')}
            className='px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
          >
            Ir a Iniciar Sesión
          </button>
          <button
            onClick={() => router.push('/signup')}
            className='px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
          >
            Ir a Registrarse
          </button>
        </div>
      </Modal>

      <div className='mt-[40px] mx-2 text-[#2F4858]'>
        <h3 className='text-2xl mt-8 text-center font-semibold mb-2'>
          Y para ti como Empresa que busca ser parte del cambio:
        </h3>
        <div className='text-center text-xl my-10 md:text-left'>
          <p className='mb-4 font-semibold text-[#2F4858]'>
            AccessGo será de gran ayuda para impulsar tu marca mostrando:
          </p>
          <ul className='list-disc ml-4 list-inside md:list-outside space-y-2'>
            <li>Tu ubicación en tiempo real.</li>
            <li>Compartiendo tus redes sociales.</li>
            <li>Comentarios y calificaciones de tu servicio.</li>
            <li>
              Presenta tus eventos, ofertas, productos o actividades especiales.
            </li>
          </ul>

          <div className='mt-10 gap-8 flex flex-col justify-center items-center '>
            <Link legacyBehavior href='/signup'>
              <button
                className='justify-center  px-6 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
              >
                Únete ahora como empresa
              </button>
            </Link>
          </div>
        </div>
        <div className='hidden w-full w-full  md:grid md:grid-cols-4 mb-12 items-center justify-center gap-2'>
          <Image
            src='/referencias/calific.jpg'
            alt="Imagen de alguien asignandi una calificación a un sitio web"
            className='w-full h-48 object-cover'
            width={400}
            height={320}
            priority={true}
          />
          <Image
            src='/referencias/comentar.jpg'
            className='w-full h-48 object-cover'
            alt="Alguien agregando un comentario en algun sitio web"
            width={400}
            height={320}
            priority={true}
          />
          <Image src='/referencias/geo.jpg' className='w-full h-48 object-cover' alt="Sobre referencias geográficas"
            width={400}
            height={320}
            priority={true} />
          <Image
            src='/referencias/rest7.jpg'
            className='w-full h-48 object-cover'
            alt="sobre referencias"
            width={400}
            height={320}
            priority={true}
          />
        </div>
        <div className='md:hidden flex items-center justify-center gap-10'>
          <div className='relative w-[400px] h-[320px]'>
            <Image
              src={images2[currentIndex]}
              alt='Accesibilidad'
              className='w-full h-48 object-cover'
              width={400}
              height={320}
              priority={true}
            />
          </div>
        </div>

        {/* <div className='sm:hidden'>
          <ParticipaSlider />
        </div> */}
      </div>
    </div>
  );
};

export default HomeContent;