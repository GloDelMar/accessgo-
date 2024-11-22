import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const ImageCarouselACC = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`https://backend-r159.onrender.com/api/images/${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error("Expected an array, but got:", data);
        setImages([]);
      }
    };
    fetchImages();
  }, [userId]);

  const handleImageClick = (image) => {
    setSelectedImage(image); // Cambia la imagen seleccionada
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Cierra el modal
  };

  return (
    <div className="w-full max-w-[1022px] mx-auto">
      {images.length > 0 ? (
        <Swiper
          spaceBetween={20}  // Espaciado entre las diapositivas
          slidesPerView="auto"  // Permite el deslizamiento sin mostrar todas las imágenes a la vez
          loop={true}  // Hace que el carrusel se repita infinitamente
          centeredSlides={true} // Opcional: centra las diapositivas
          pagination={{
            clickable: true, // Para que se pueda navegar usando la paginación
          }}
           // Para permitir la navegación con flechas
          breakpoints={{
            640: { // En pantallas pequeñas (por ejemplo, móviles)
              slidesPerView: 1, // Muestra 1 imagen
            },
            768: { // En pantallas medianas (tabletas)
              slidesPerView: 2, // Muestra 2 imágenes
            },
            1024: { // En pantallas grandes (escritorios)
              slidesPerView: 4, // Muestra 4 imágenes
            },
          }}
          className="flex justify-center items-center w-full h-[200px]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-[200px] h-[150px] object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(image)} // Al hacer clic, la imagen se agranda
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No images found</p>
      )}

      {/* Modal para mostrar la imagen seleccionada */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <img
              src={selectedImage}
              alt="Selected Image"
              className="w-[80vw] h-[80vh] object-contain" // Ajusta el tamaño de la imagen en el modal
            />
            <button
              onClick={handleCloseModal} // Cierra el modal
              className="absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarouselACC;
