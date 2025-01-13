import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';

const UploadImageUPP = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `https://backend-r159.onrender.com/api/users/${userId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );

        if (response.ok) {
          const {
            data: { user: userData }
          } = await response.json();

          setSelectedImage(userData.profilePicture || null);
        } else {
          console.error(
            'Error al obtener datos del usuario:',
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchUserData();
  }, [userId]);

   const handleFileChange = async (e) => {
     const file = e.target.files[0];
     if (!file) return;
 
     if (!allowedTypes.includes(file.type)) {
       toast.error('Solo se permiten imágenes JPEG, PNG y WEBP', {
         duration: 10000,
         style: {
           backgroundColor: '#d81717',
           color: '#ffffff'
         }
       });
       return;
     }
 
     if (file.size > maxSize) {
       toast.error('El archivo es demasiado grande. Tamaño máximo: 10MB.', {
         duration: 10000,
         style: {
           backgroundColor: '#d81717',
           color: '#ffffff'
         }
       });
       return;
     }
     setFile(file);
     await handleUpload(file);
   };

  const handleUpload = async (file) => {
    if (!file) {
      toast.error('Selecciona un archivo primero');
      return;
    }

    if (!userId) {
      toast.error(
        'No se ha encontrado el userId. Asegúrate de haber iniciado sesión.',
        {
          duration: 10000,
          style: {
            backgroundColor: '#d81717',
            color: '#ffffff'
          }
        }
      );
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);

    try {
      const response = await fetch(
        'https://backend-r159.onrender.com/api/uploadupp',
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSelectedImage(result.imageUrl);
        console.log(result.imageUrl);
        toast.success('Imagen subida exitosamente', {
          duration: 10000,
          style: {
            backgroundColor: '#1dcb7f',
            color: '#ffffff',
          }
        });
      } else {
        toast.error(result.error || 'Error al subir la imagen', {
          duration: 10000,
          style: {
            backgroundColor: '#d81717',
            color: '#ffffff'
          }
        });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      toast.error('Hubo un problema con la carga de la imagen', {
        duration: 10000,
          style: {
            backgroundColor: '#d81717',
            color: '#ffffff'
          }
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-col lg:flex-col gap-6 p-6 max-w-4xl mx-auto '>
      <h3 className='text-md text-center font-semibold'>Imagen de perfil</h3>

      <div className='max-w-40 max-h-40 p-4 rounded-md bg-[#F5F0E5] lg:w-full flex justify-center'> 
      <div
        className='w-32 h-32 rounded-full overflow-hidden'
        onClick={() => document.getElementById('fileInput').click()}
      >
        <label htmlFor='imgUsuario'>
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt='Foto de perfil'
              width={200}
              height={200}
              className='w-full h-full object-cover cursor-pointer'
            />
          ) : (
            <Image
              src='/iconoframe.png'
              alt='Foto de perfil'
              width={200}
              height={200}
              className='w-full h-full object-cover cursor-pointer'
            />
          )}
        </label>
      </div>

      </div>

      <input
        type='file'
        id='fileInput'
        className='hidden'
        onChange={handleFileChange} 
      />
      <Toaster />
    </div>
  );
};

export default UploadImageUPP;

//UPP significa User Profile Picture, este componente se utiliza para subir una imagen de perfil de usuario
