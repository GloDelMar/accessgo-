import React, { useState } from 'react';

const UploadImageUPP = ({ userId, setSelectedImage }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    if (!userId) {
      alert(
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
        alert('Imagen subida exitosamente');
      } else {
        alert(result.error || 'Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un problema con la carga de la imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-md font-semibold'>Imagen de perfil</h3>

      <label
        htmlFor='fileInput'
        className='cursor-pointer inline-block bg-[#2F4F4F] text-white px-6 py-3 rounded-md hover:bg-green-400'
      >
        {file ? file.name : 'Seleccionar archivo'}
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
        className={`w-full py-3 text-white rounded-md ${
          uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'
        } focus:outline-none`}
      >
        {uploading ? 'Subiendo...' : 'Subir'}
      </button>
    </div>
  );
};

export default UploadImageUPP;

//UPP significa User Profile Picture, este componente se utiliza para subir una imagen de perfil de usuario
