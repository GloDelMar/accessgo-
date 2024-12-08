import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';

const UploadImageUPP = ({ userId, setSelectedImage }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
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
        'https://backend-r159.onrender.com/api/uploadupp',
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSelectedImage(result.imageUrl);
        console.log(result.imageUrl)
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

      <label
        htmlFor='fileInput'
        className='px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]'
      >
        {file ? file.name : 'Seleccionar'}
      </label>

      <input
        type='file'
        id='fileInput'
        className='hidden'
        onChange={handleFileChange}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C] ${
          uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'
        } focus:outline-none`}
      >
        {uploading ? 'Subiendo...' : 'Subir'}
      </button>
      <Toaster />
    </div>
  );
};

export default UploadImageUPP;

//UPP significa User Profile Picture, este componente se utiliza para subir una imagen de perfil de usuario