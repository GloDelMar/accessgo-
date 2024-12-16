import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';




const UpImgCarrouselACC = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [userId, setUserId] = useState(null); 
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

  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('No userId found in localStorage');
    }
  }, []); 

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image || !userId) {
      alert('User ID or image missing');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId); 

    try {
      const response = await fetch('https://backend-r159.onrender.com/api/uploadacc', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    
    <div className="flex flex-col items-center space-y-4">
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
                className='w-[200px] h-[150px] object-cover rounded-lg cursor-pointer'
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

            <label
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <img
                src='/foto.jpg'
                alt='Camera Placeholder'
                style={{ width: '32px', height: '32px' }}
              />
              <input
                id={`file-input-${index}`}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={(e) => handleUpload(index, e.target.files[0])}
              />
            </label>
            <button
              onClick={handleCloseModal}
              className='absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full'
            >
              X
            </button>
          </div>
        </div>
      )}
      <label
        htmlFor="file-upload"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
      >
        {image ? image.name : 'Seleccionar archivo'}
      </label>
      <input
        type="file"
        id="file-upload"
        className="hidden" 
        onChange={handleFileChange}
      />

     
      <button
        onClick={handleUpload}
        disabled={uploading || !image}
        className={`px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none disabled:bg-gray-400`}
      >
        {uploading ? 'Subiendo...' : 'Subir'}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p>Imagen subida con éxito!</p>
          <img src={imageUrl} alt="Uploaded"  className="mt-2 w-[200px]" />
        </div>
      )}
    </div>
  );
};

export default UpImgCarrouselACC;