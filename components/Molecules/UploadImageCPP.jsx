import React, { useState, useEffect } from 'react';

const UploadImageCPP = ({ setSelectedImage }) => {
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

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);

      const response = await fetch('http://localhost:8080/api/uploadCPP', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        // Si la carga fue exitosa, actualizamos el estado con la URL de la imagen
        setSelectedImage(result.imageUrl); // Aquí se pasa la URL de la imagen al componente padre
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

export default UploadImageCPP;
