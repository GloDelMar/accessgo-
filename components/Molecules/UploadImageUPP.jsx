import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';

const UploadImageUPP = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
    if (file) {
      setFile(file);
      await handleUpload(file); 
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      toast.error('Selecciona un archivo primero');
      return;
    }

    if (!userId) {
      toast.error(
        'No se ha encontrado el userId. Asegúrate de haber iniciado sesión.'
      );
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);

    try {
      const response = await fetch(
        'http://localhost:8080/api/uploadupp',
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSelectedImage(result.imageUrl);
        console.log(result.imageUrl);
        toast.success('Imagen subida exitosamente');
      } else {
        toast.error(result.error || 'Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      toast.error('Hubo un problema con la carga de la imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-4 '>
      <h3 className='text-md text-center font-semibold'>Imagen de perfil</h3>
      <div
        className='flex justify-center lg:justify-start'
        onClick={() => document.getElementById('fileInput').click()}
      >
        <label htmlFor='imgUsuario' className='cursor-pointer'>
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt='Foto de perfil'
              width={200}
              height={200}
              className='rounded-full'
            />
          ) : (
            <Image
              src='/iconoframe.png'
              alt='Foto de perfil'
              width={200}
              height={200}
              className='rounded-full'
            />
          )}
        </label>
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
