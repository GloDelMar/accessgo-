import { useState } from 'react';
import axios from 'axios';

const UploadImageCPP = ({ companyId, setSelectedImage }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Mostrar imagen previa
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', companyId); // Pasar el companyId

      try {
        const response = await axios.post('http://localhost:8080/api/uploadCPP', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { imageUrl } = response.data;
        setSelectedImage(imageUrl); // Guardar la URL de la imagen
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Hubo un problema al subir la imagen.");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      {image && <img src={image} alt="Vista previa" className="w-32 h-32 rounded-full" />}
    </div>
  );
};

export default UploadImageCPP;
