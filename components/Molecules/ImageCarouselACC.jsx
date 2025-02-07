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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='flex justify-self-center md:w-[750px] lg:w-[900px]' >
      {images.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination]} 
          pagination={{
            clickable: images.length > 1,
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={images.length > 1}
          centeredSlides={images.length === 1}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false,
          }}
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
              <Image
                src={image}
                alt={`Slide ${index}`}
                width={200}
                height={200}
                className='justify-self-center w-[200px] h-[200px] object-cover rounded-lg cursor-pointer'
                onClick={() => handleImageClick(image)}
                quality={20}
                
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No images found</p>
      )}

      {selectedImage && (
        <div  className='max-w-screen max-h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='w-full h-full relative bg-white p-4 rounded-lg'>
            <Image
              src={selectedImage}
              alt='Selected Image'
              width={1000}
              height={1000}
              className='w-full h-full object-contain'
              quality={100}

              
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