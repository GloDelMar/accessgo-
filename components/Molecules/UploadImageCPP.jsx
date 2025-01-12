import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';
import axios from 'axios';

const UploadImageCPP = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [companyId, setCompanyId] = useState(null);

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
    if (file) {
      setFile(file);
      await handleUpload(file); 
    }
  };

  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload) {
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
    formData.append('image', fileToUpload);
    formData.append('userId', userId);

    try {
      const response = await fetch(
        'http://localhost:8080/api/uploadcpp',
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
    <div className='flex flex-col justify-center items-center space-y-4'>
      <h3 className='text-md text-center font-semibold'>Imagen de perfil</h3>

      <div
        className='flex justify-center lg:justify-start cursor-pointer'
        onClick={() => document.getElementById('fileInput').click()} 
      >
        <label htmlFor='imgUsuario'>
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt='Foto de perfil'
              width={200}
              height={200}
              className='rounded-full cursor-pointer'
            />
          ) : (
            <Image
              src='/iconoframe.png'
              alt='Foto de perfil'
              width={200}
              height={200}
              className='rounded-full cursor-pointer'
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

export default UploadImageCPP;
