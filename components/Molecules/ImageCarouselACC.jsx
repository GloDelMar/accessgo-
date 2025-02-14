import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';

const ImageCarouselACC = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://backend-r159.onrender.com/api/images/${userId}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('Expected an array, but got:', data);
        setImages([]);
      }
    };
    fetchImages();
  }, [userId]);

  const handleImageClick = (image) => setSelectedImage(image);
  const handleCloseModal = () => setSelectedImage(null);

  return (
    <div className="flex justify-center w-full">
      {images.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: images.length > 3, // Activa paginación solo si hay más de 3 imágenes
          }}
          spaceBetween={10} // Espaciado uniforme
          loop={images.length > 3} // Si hay más de 3, activa loop
          centeredSlides={false}
          autoplay={
            images.length > 3
              ? { delay: 3000, disableOnInteraction: false }
              : false // No autoplay si hay 3 imágenes o menos
          }
          slidesPerView={1} // 1 imagen en móvil
          allowTouchMove={images.length > 3} // ❌ Desactiva swipe si hay 3 imágenes o menos
          breakpoints={{
            640: {
              slidesPerView: Math.min(images.length, 2), // Hasta 2 imágenes en tablets pequeñas
              spaceBetween: 8,
            },
            768: {
              slidesPerView: Math.min(images.length, 2), // Hasta 2 imágenes en tablets grandes
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: Math.min(images.length, 3), // Hasta 3 imágenes en laptop
              spaceBetween: 12,
            },
          }}
          className="w-full max-w-[95vw] md:max-w-[750px] lg:max-w-[900px]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <Image
                src={image}
                alt={`Slide ${index}`}
                width={200}
                height={200}
                className="w-[200px] h-[200px] object-cover rounded-lg cursor-pointer mx-auto"
                onClick={() => handleImageClick(image)}
                quality={50}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Esta empresa no ha subido imágenes de su diseño accesible</p>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg w-[90%] max-w-[500px] h-[90%] max-h-[500px]">
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={500}
              height={500}
              className="w-full h-full object-contain"
              quality={100}
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white bg-red-600 rounded-full"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarouselACC;
