import React, { useState, useEffect } from 'react';

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
      const response = await fetch('https://backend-r159.onrender.com/api/uploadupp', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        // Actualizamos la URL de la imagen en el componente padre
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
    <div>
      <h3>Sube tu imagen</h3>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Subir Imagen'}
      </button>
    </div>
  );
};

export default UploadImageUPP;
