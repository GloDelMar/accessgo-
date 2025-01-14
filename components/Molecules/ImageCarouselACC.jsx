import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='sm:w-[150px] md:w-[300px] lg:w-[800px] max-w-[1022px] mx-auto'>
      {images.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          centeredSlides={false}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 4
            }
          }}
          className='flex justify-center items-center w-full h-[200px]'
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className='w-[200px] h-[200px] object-cover rounded-lg cursor-pointer'
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
