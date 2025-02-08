import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Image from 'next/image';

const ImagenSubiryBorrarBase = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024;

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

  const handleUpload = async (index, file) => {
    if (!file || !userId) {
      toast.error('Imagen incompatible prueba con otra imagen diferente', {
        duration: 10000,
        style: {
          backgroundColor: '#d81717',
          color: '#ffffff'
        }
      });
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);

    try {
      const response = await fetch(
        'http://localhost:8080/api/uploadacc',
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      if (data.url) {
        const newImages = [...images];
        newImages[index] = data.url;
        setImages(newImages);
        toast.success('Imagen subida exitosamente', {
          duration: 10000,
          style: {
            backgroundColor: '#1dcb7f',
            color: '#ffffff'
          }
        });
      } else {
        toast.error('Error al subir imagen', {
          duration: 10000,
          style: {
            backgroundColor: '#d81717',
            color: '#ffffff'
          }
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (index, file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error('Solo se permiten imágenes JPEG, PNG y WEBP', {
        duration: 10000,
        style: { backgroundColor: '#d81717', color: '#ffffff' }
      });
      return;
    }

    if (file.size > maxSize) {
      toast.error('El archivo es demasiado grande. Tamaño máximo: 10MB.', {
        duration: 10000,
        style: { backgroundColor: '#d81717', color: '#ffffff' }
      });
      return;
    }

    handleUpload(index, file);
  };

  const handleDelete = (index) => {
    const imageToDelete = images[index];

    if (!imageToDelete) {
      toast.error('No se encontró la URL de la imagen', {
        duration: 10000,
        style: {
          backgroundColor: '#d81717',
          color: '#ffffff'
        }
      });
      return;
    }

    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas borrar esta imagen?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              const response = await fetch(
                `https://backend-r159.onrender.com/api/deleteacc`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ url: imageToDelete })
                }
              );

              if (response.ok) {
                const newImages = [...images];
                newImages.splice(index, 1);
                setImages(newImages);
                toast.success('Imagen borrada exitosamente', {
                  duration: 10000,
                  style: {
                    backgroundColor: '#1dcb7f',
                    color: '#ffffff'
                  }
                });
              } else {
                toast.error('Error al borrar la imagen', {
                  duration: 10000,
                  style: {
                    backgroundColor: '#d81717',
                    color: '#ffffff'
                  }
                });
              }
            } catch (error) {
              console.error('Failed to delete image:', error);
            }
          }
        },
        {
          label: 'No',
          onClick: () =>
            toast.info('Eliminación cancelada', {
              duration: 10000,
              style: {
                backgroundColor: '#143bed',
                color: '#ffffff'
              }
            })
        }
      ]
    });
  };

  return (
    <div className='flex flex-col justify-center items-center w-full max-w-[1022px] mx-auto'>
      <p className='text-[#2F4F4F] text-md mb-10'>
        Aquí puedes colocar imágenes que ilustren los aspectos que hacen tu
        establecimiento incluyente y accesible. Por ejemplo, muestra fotografías
        de rampas de acceso, señalización en braille, espacios amplios para
        sillas de ruedas, o cualquier otro detalle que facilite la experiencia
        de todas las personas. Estas imágenes ayudarán a destacar las
        características que promueven la inclusión.
      </p>

      {/* className='w-full sm:max-w-[320px] sm:max-h-[200px] place-items-center grid sm:grid-cols-2 sm:gap-2  md:grid-cols-2 md:gap-4 lg:grid-cols-4 mb-8' */}
      <div className='w-full sm:flex sm:flex-col justify-center md:flex-row md:flex-wrap md:gap-4'>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className=' relative sm:w-[200px] sm:h-[200px] mb-8'
              
            >
              {images[index] ? (
                <>
                  <Image
                    src={images[index]}
                    width={200}
                    height={200}
                    alt={`Uploaded ${index}`}
                    className='w-full h-full object-cover'
                    quality={35}
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    className='absolute top-2 right-2 bg-gray-100 p-1 rounded-full'
                  >
                    <Trash2
                      size={16}
                      className='sm:w-[16px] sm:h-[16px] md:w-[24px] md:h-[24px] lg:w-[36px] sm:h-[36px]'
                    />
                  </button>
                </>
              ) : (
                <label className='cursor-pointer flex flex-col items-center'>
                  <Image
                    src='/foto.jpg'
                    width={320}
                    height={320}
                    alt='Upload Placeholder'
                    className='sm:w-full sm:h-full'
                  />
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          ))}
      </div>
      <Toaster />
    </div>
  );
};

export default ImagenSubiryBorrarBase;
