import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';



const ImageCarouselACC = ({ userId }) => {
  
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  

  return (
    <div className='flex justify-center md:w-[750px] lg:w-[900px]' >
      {images.length > 0 ? (
        <Swiper
          pagination={{
            clickable: images.length > 1,
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={images.length > 1}
          centeredSlides={images.length === 1}
          breakpoints={{
            
            320: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: Math.min(images.length, 2)
            },
            1024: {
              slidesPerView: Math.min(images.length, 4)
            }
          }}
          className={`flex ${
            images.length === 1 ? 'justify-center' : ''
          } flex-col justify-self-center max-w-[250px] md:max-w-[450px] lg:max-w-[900px] h-full`}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className='justify-self-center w-[200px] h-[200px] object-cover rounded-lg cursor-pointer'
                onClick={() => handleImageClick(image)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No images found</p>
      )}

      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='relative bg-white p-4 rounded-lg'>
            <img
              src={selectedImage}
              alt='Selected Image'
              className='w-[80vw] h-[80vh] object-contain'
            />
            <button
              onClick={handleCloseModal}
              className='absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full'
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
