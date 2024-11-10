import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const UploadImage = () => {
  const [userId, setUserId] = useState(null); // Estado para guardar el userId
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Usar useEffect para acceder a localStorage solo en el cliente
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Accede a localStorage solo en el cliente
    setUserId(storedUserId); // Guarda el userId en el estado
  }, []); // El array vacío asegura que esto solo se ejecute una vez después del montaje del componente

  // Handler para cuando el archivo se selecciona
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handler para subir la imagen al servidor
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

    setUploading(true); // Indicamos que está subiendo

    const formData = new FormData();
    formData.append('image', file); // Añadimos el archivo al formData
    formData.append('userId', userId); // Añadimos el userId al formData

    try {
      // Realizamos la solicitud POST para subir la imagen
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        // Si la imagen se sube correctamente, obtenemos la URL de la imagen
        setImageUrl(result.imageUrl);
        alert('Imagen subida exitosamente');
      } else {
        alert(result.error || 'Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un problema con la carga de la imagen');
    } finally {
      setUploading(false); // Termina el proceso de carga
    }
  };

  return (
    <div>
      <h3>Sube tu imagen</h3>

      {/* Campo para seleccionar un archivo */}
      <input type='file' onChange={handleFileChange} />

      {/* Botón para subir la imagen */}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Subir Imagen'}
      </button>

      {/* Si la imagen se sube con éxito, se muestra */}
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
        </div>
      )}
    </div>
  );
};

export default UploadImage;
