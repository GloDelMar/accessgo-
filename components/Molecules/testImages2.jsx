import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const ImageUploader2 = ({ userId }) => {
  const [images, setImages] = useState([null, null, null, null]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://backend-r159.onrender.com/api/images/${userId}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        // Asumiendo que las imágenes son URLs y que el array tiene hasta 4 imágenes
        const newImages = data.slice(0, 4); // Limitar a 4 imágenes si hay más
        setImages(newImages);
      } else {
        console.error('Expected an array, but got:', data);
        setImages([null, null, null, null]); // Si no se obtiene un array válido, reiniciar
      }
    };

    fetchImages();
  }, [userId]);

  const handleUpload = (index, file) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file); // Aquí puedes decidir si subir a AWS directamente
    setImages(newImages);
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages[index] = null; // Eliminar imagen (solo en el estado, no en AWS)
    setImages(newImages);
  };

  return (
    <div className='flex flex-row gap-4'>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            border: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '8px'
          }}
        >
          {image ? (
            <>
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  display: 'flex',
                  gap: '5px'
                }}
              >
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    padding: '5px',
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: '50%'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <label
                className=" cursor-pointer flex flex-col items-center justify-center"
              >
                <img
                  src='/foto.jpg'
                  alt='Camera Placeholder'
                  className='w-[32px] h-[32px] object-cover'
                  style={{ width: '32px', height: '32px' }}
                />
                <input
                  id={`file-input-${index}`}
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  onChange={(e) => handleUpload(index, e.target.files[0])}
                />
              </label>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader2;
