import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const UploadImage = () => {
  const [userId, setUserId] = useState(null); 
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

 
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); 
    setUserId(storedUserId); 
  }, []); 

  
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
     
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
    
        setImageUrl(result.imageUrl);
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

      {/* Si la imagen se sube con éxito, se muestra
      {imageUrl && (
        <div>
          <p>Imagen subida:</p>
          <Image
            src={imageUrl} // La URL completa de la imagen en S3
            alt='Imagen subida'
            width={300} // Establece el ancho de la imagen
            height={300} // Establece la altura de la imagen
            className='rounded-full' // Puedes añadir clases para personalizar el estilo
          />
        </div> */}
      {/* )} */}
    </div>
  );
};

export default UploadImage;
