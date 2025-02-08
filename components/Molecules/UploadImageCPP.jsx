import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';
import axios from 'axios';

const UploadImageCPP = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024;

  const fetchCompanyData = async () => {
    const companyId = localStorage.getItem('userId');
    if (companyId) {
      setCompanyId(companyId);
    } else {
      console.error('No se encontró el ID de la empresa en localStorage');
    }

    try {
      const response = await axios.get(
        `https://backend-r159.onrender.com/api/company/${companyId}`
      );

      const companyData = response.data.data.company;

      setSelectedImage(companyData.profilePicture || null);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };
  useEffect(() => {
    fetchCompanyData();
  }, []);

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

  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload) {
      toast.error('Selecciona un archivo primero', {
        duration: 10000,
        style: {
          backgroundColor: '#d81717',
          color: '#ffffff'
        }
      });
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
    formData.append('image', fileToUpload);
    formData.append('userId', userId);

    try {
      const response = await fetch('https://backend-r159.onrender.com/api/uploadcpp', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        setSelectedImage(result.imageUrl);
        console.log(result.imageUrl);
        toast.success('Imagen subida exitosamente', {
          duration: 10000,
          style: {
            backgroundColor: '#1dcb7f',
            color: '#ffffff'
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
    <div className='flex flex-col lg:flex-col gap-6 p-6 max-w-4xl mx-auto'>
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
              quality={65}
            />
          ) : (
            <Image
              src='/iconoframe.png'
              alt='Foto de perfil'
              width={200}
              height={200}
              className='w-full h-full object-cover cursor-pointer'
              quality={65}
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

export default UploadImageCPP;
