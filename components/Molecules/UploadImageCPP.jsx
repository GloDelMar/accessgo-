import { useState } from 'react';
import axios from 'axios';

const UploadImageCPP = ({ companyId, setSelectedImage }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
      setFileName(file.name); 
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', companyId); 

      try {
        const response = await axios.post('https://backend-r159.onrender.com/api/uploadcpp', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { imageUrl } = response.data;
        setSelectedImage(imageUrl); 
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Hubo un problema al subir la imagen.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center"> 
      
      {image && (
        <img
          src={image}
          alt="Vista previa"
          className="mt-36 w-44 h-40 rounded-full" 
        />
      )}

   
      <input
        type="file"
        id="file-input"
        onChange={handleImageChange}
        accept="image/*"
        className="hidden" 
      />

      
      <label
        htmlFor="file-input"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 mt-10" // Espaciado abajo del botón
      >
        Seleccionar archivo
      </label>

      
      {fileName && (
        <p className="text-gray-700">Archivo seleccionado: {fileName}</p>
      )}
    </div>
  );
};

export default UploadImageCPP;
